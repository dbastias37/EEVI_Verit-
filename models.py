import sqlite3
from datetime import datetime, timedelta
from flask import g, session, abort, request
from functools import wraps

DB_PATH = 'db/forum.db'

# ---------------------- DB CONNECTION ----------------------

def get_db():
    if 'db' not in g:
        conn = sqlite3.connect(DB_PATH, timeout=10, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL;")
        g.db = conn
    return g.db


def close_db(exception=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

# ---------------------- MODELS ----------------------

class ProjectManager:
    ALLOWED_STATES = ['draft', 'active', 'closed', 'archived']
    TRANSITIONS = {
        'draft': ['active', 'archived'],
        'active': ['closed', 'archived'],
        'closed': ['archived'],
    }

    def create(self, title, category, url, client_id, priority='normal'):
        conn = get_db()
        cur = conn.execute(
            """
            INSERT INTO projects (title, category, video_url, client_id, priority, status, created_at)
            VALUES (?,?,?,?,?, 'draft', ?)
            """,
            (title, category, url, client_id, priority, datetime.utcnow()),
        )
        conn.commit()
        return cur.lastrowid

    def change_status(self, project_id, new_status):
        conn = get_db()
        cur = conn.execute("SELECT status FROM projects WHERE id=?", (project_id,))
        row = cur.fetchone()
        if not row:
            abort(404)
        current = row['status']
        if new_status not in self.ALLOWED_STATES or new_status not in self.TRANSITIONS.get(current, []):
            abort(400)
        conn.execute(
            "UPDATE projects SET status=?, updated_at=? WHERE id=?",
            (new_status, datetime.utcnow(), project_id),
        )
        conn.commit()

    def list_by_client(self, client_id):
        cur = get_db().execute(
            "SELECT * FROM projects WHERE client_id=? ORDER BY created_at DESC",
            (client_id,),
        )
        return [dict(r) for r in cur.fetchall()]


class CommentManager:
    def add(self, project_id, user_id, text, comment_type='text', parent=None):
        conn = get_db()
        cur = conn.execute(
            """
            INSERT INTO comments (project_id, user_id, comment_text, comment_type, parent_comment_id, created_at)
            VALUES (?,?,?,?,?,?)
            """,
            (project_id, user_id, text, comment_type, parent, datetime.utcnow()),
        )
        conn.commit()
        return cur.lastrowid

    def delete(self, comment_id, user_id):
        conn = get_db()
        conn.execute(
            "UPDATE comments SET is_deleted=1 WHERE id=? AND user_id=?",
            (comment_id, user_id),
        )
        conn.commit()

    def list_for_project(self, project_id):
        cur = get_db().execute(
            "SELECT * FROM comments WHERE project_id=? AND is_deleted=0 ORDER BY created_at",
            (project_id,),
        )
        return [dict(r) for r in cur.fetchall()]


class PaymentValidator:
    CODE = 'pagado123'

    def __init__(self, max_requests=5, window_minutes=15):
        self.max_requests = max_requests
        self.window = timedelta(minutes=window_minutes)

    def validate(self, project_id, user_id, code):
        conn = get_db()
        now = datetime.utcnow()
        success = code == self.CODE
        conn.execute(
            """
            INSERT INTO payment_attempts (project_id, user_id, attempted_code, success, ip_address, user_agent, session_id, attempted_at)
            VALUES (?,?,?,?,?,?,?,?)
            """,
            (
                project_id,
                user_id,
                code,
                int(success),
                request.remote_addr,
                request.headers.get('User-Agent'),
                session.get('session_id'),
                now,
            ),
        )
        if success:
            conn.execute(
                "UPDATE projects SET payment_validated=1, updated_at=? WHERE id=?",
                (now, project_id),
            )
        conn.commit()
        return success

    def recent_attempts(self, user_id):
        since = datetime.utcnow() - self.window
        cur = get_db().execute(
            "SELECT attempted_at FROM payment_attempts WHERE user_id=? AND attempted_at>?",
            (user_id, since),
        )
        return [r['attempted_at'] for r in cur.fetchall()]


# ---------------------- DECORATORS ----------------------

def admin_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get('admin'):
            abort(403)
        return f(*args, **kwargs)
    return wrapper


def project_access_required(f):
    @wraps(f)
    def wrapper(project_id, *args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            abort(403)
        cur = get_db().execute(
            "SELECT client_id FROM projects WHERE id=?",
            (project_id,),
        )
        row = cur.fetchone()
        if not row or row['client_id'] != user_id:
            abort(403)
        return f(project_id, *args, **kwargs)
    return wrapper


def rate_limit_payment(max_requests=5, window_minutes=15):
    validator = PaymentValidator(max_requests, window_minutes)

    def decorator(f):
        @wraps(f)
        def wrapper(project_id, *args, **kwargs):
            user_id = session.get('user_id')
            attempts = validator.recent_attempts(user_id)
            if len(attempts) >= max_requests:
                abort(429)
            return f(project_id, *args, **kwargs)
        return wrapper
    return decorator

