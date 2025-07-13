from flask import (
    Flask,
    render_template,
    request,
    redirect,
    jsonify,
    url_for,
    session,
    flash,
    abort,
    g,
)
import json
import re
import os
import sqlite3
import time
import uuid
from jinja2 import TemplateNotFound

DB_PATH = 'db/forum.db'


def get_db():
    """Return a connection stored in ``g`` or create a new one."""
    if 'db' not in g:
        conn = sqlite3.connect(
            DB_PATH,
            timeout=10,
            check_same_thread=False,
        )
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA synchronous=NORMAL;")
        g.db = conn
    return g.db


def ensure_projects_schema(cursor):
    """Create the projects table and add any missing columns."""
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            category TEXT,
            video_url TEXT,
            client_email TEXT,
            active INTEGER DEFAULT 0,
            paid INTEGER DEFAULT 0,
            progress REAL DEFAULT 0,
            status TEXT DEFAULT 'active',
            script TEXT,
            download TEXT
        );
        """
    )
    cursor.execute("PRAGMA table_info(projects)")
    existing = [row[1] for row in cursor.fetchall()]
    required = {
        "title": "TEXT",
        "category": "TEXT",
        "video_url": "TEXT",
        "client_email": "TEXT",
        "active": "INTEGER DEFAULT 0",
        "paid": "INTEGER DEFAULT 0",
        "progress": "REAL DEFAULT 0",
        "status": "TEXT DEFAULT 'active'",
        "script": "TEXT",
        "download": "TEXT",
    }
    for col, ctype in required.items():
        if col not in existing:
            cursor.execute(f"ALTER TABLE projects ADD COLUMN {col} {ctype}")


def init_db():
    """Initialize or upgrade the forum database using ``schema.sql``."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Execute the entire schema in one call
    schema_path = os.path.join(os.path.dirname(__file__), "db", "schema.sql")
    with open(schema_path, "r", encoding="utf-8") as f:
        cursor.executescript(f.read())

    # Ensure slug column exists for older databases
    try:
        cursor.execute("SELECT slug FROM topics LIMIT 1")
    except sqlite3.OperationalError:
        cursor.execute("ALTER TABLE topics ADD COLUMN slug TEXT UNIQUE")

    # Ensure projects table and columns exist
    ensure_projects_schema(cursor)

    conn.commit()
    conn.close()

# Inicializa la base de datos si no existe
init_db()

from modules import forum as forum_db
from modules.forum import (
    get_topic,
    get_topic_by_id,
    get_responses_for_topic,
    vote_response,
    get_response_topic,
)

app = Flask(__name__)
app.secret_key = 'demo-secret-key'
forum_db.init_db()


@app.teardown_appcontext
def close_db(exception=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def db_conn():
    conn = sqlite3.connect(DB_PATH, timeout=10, check_same_thread=False)
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA synchronous=NORMAL;")
    return conn


def create_user(email, password, is_admin=False):
    # Use a fixed verification code for both admins and regular users
    code = "123456789"
    conn = get_db()
    for _ in range(3):
        try:
            with conn:
                conn.execute(
                    'INSERT INTO users (email, password, is_admin, verification_code) VALUES (?,?,?,?)',
                    (email, password, int(is_admin), code),
                )
            print(f"Código de verificación para {email}: {code}")
            break
        except sqlite3.OperationalError as e:
            if 'database is locked' in str(e):
                time.sleep(0.1)
                continue
            raise


def get_user(email):
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('SELECT id, email, profile_pic, verified, is_admin FROM users WHERE email=?', (email,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    return {
        'id': row[0],
        'email': row[1],
        'profile_pic': row[2],
        'verified': row[3],
        'is_admin': row[4],
    }


def check_password(email, password):
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('SELECT password, verified FROM users WHERE email=?', (email,))
    row = cur.fetchone()
    conn.close()
    return row and row[0] == password and row[1]


def save_profile_pic(email, path):
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('UPDATE users SET profile_pic=? WHERE email=?', (path, email))
    conn.commit()
    conn.close()


def get_projects_for_email(email):
    conn = db_conn()
    cur = conn.cursor()
    query = 'SELECT id,title,progress,status,script,video_url,paid,download FROM projects WHERE client_email=?'
    try:
        cur.execute(query, (email,))
    except sqlite3.OperationalError:
        # If columns are missing, try to fix schema and retry
        ensure_projects_schema(cur)
        conn.commit()
        cur.execute(query, (email,))
    rows = cur.fetchall()
    conn.close()
    projects = []
    for r in rows:
        projects.append({
            'id': r[0],
            'title': r[1],
            'progress': r[2],
            'status': r[3],
            'script': r[4],
            'video_url': r[5],
            'paid': bool(r[6]),
            'download': r[7],
        })
    return projects


def get_all_projects():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('SELECT id,title,video_url,client_email,paid FROM projects')
    rows = cur.fetchall()
    conn.close()
    result = []
    for r in rows:
        result.append({
            'id': r[0],
            'title': r[1],
            'video_url': r[2],
            'client_email': r[3],
            'paid': bool(r[4]),
        })
    return result


def add_project(title, category, url, client_email):
    conn = db_conn()
    cur = conn.cursor()
    cur.execute(
        'INSERT INTO projects (title, category, video_url, client_email) VALUES (?,?,?,?)',
        (title, category, url, client_email),
    )
    conn.commit()
    conn.close()


def update_project_video(project_id, url, client_email=None):
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('UPDATE projects SET video_url=? WHERE id=?', (url, project_id))
    if client_email:
        cur.execute('UPDATE projects SET client_email=? WHERE id=?', (client_email, project_id))
    conn.commit()
    conn.close()


def activate_payment(project_id):
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('UPDATE projects SET paid=1 WHERE id=?', (project_id,))
    conn.commit()
    conn.close()


def delete_video(project_id):
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('UPDATE projects SET video_url="" WHERE id=?', (project_id,))
    conn.commit()
    conn.close()


def get_drive_preview_url(share_url):
    """Return Google Drive embed URL from a public share link."""
    if not share_url:
        return ""
    match = re.search(r"/d/([A-Za-z0-9_-]+)/", share_url)
    if match:
        file_id = match.group(1)
        return f"https://drive.google.com/file/d/{file_id}/preview"
    return share_url

# Ruta para cargar info de los packs
def get_all_packs():
    with open('packs/info.json', 'r', encoding='utf-8') as f:
        return json.load(f)

# Datos de servicios
def get_all_services():
    with open('services/info.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def home():
    latest = forum_db.get_latest_topic()
    packs = get_all_packs()
    services = get_all_services()
    return render_template('home.html', latest=latest, packs=packs, services=services)

@app.route('/packs')
def packs():
    return render_template('packs.html', packs=get_all_packs())

@app.route('/services')
def services():
    return render_template('services.html', services=get_all_services())

@app.route('/academy')
def academy():
    return render_template('academy.html')

@app.route('/dashboard')
def dashboard():
    user_email = session.get('user')
    if not user_email:
        return render_template('dashboard.html', user=None)

    user = get_user(user_email)
    projects = get_projects_for_email(user_email)
    for proj in projects:
        proj['embed_url'] = get_drive_preview_url(proj.get('video_url', ''))
    active = [p for p in projects if p['status'] == 'active']
    completed = [p for p in projects if p['status'] == 'completed']
    stats = {
        'active': len(active),
        'completed': len(completed),
        'scripts': len(projects),
        'pending': sum(1 for p in projects if not p['paid'])
    }
    return render_template(
        'dashboard.html',
        user=user,
        projects=projects,
        active_projects=active,
        completed_projects=completed,
        stats=stats,
    )


@app.route('/dashboard/login', methods=['GET', 'POST'])
def dashboard_login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if check_password(email, password):
            session['user'] = email
            return redirect(url_for('dashboard'))
    return render_template('dashboard_login.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        for _ in range(3):
            try:
                create_user(email, password)
                return redirect(url_for('verify', email=email))
            except sqlite3.OperationalError as e:
                if 'database is locked' in str(e):
                    time.sleep(0.1)
                    continue
                flash('Error al registrar usuario', 'danger')
                break
        else:
            flash('Base de datos ocupada, intenta de nuevo', 'danger')
    return render_template('signup.html')


@app.route('/verify', methods=['GET', 'POST'])
def verify():
    email = request.args.get('email') or request.form.get('email')
    if request.method == 'POST':
        code = request.form['code']
        conn = db_conn()
        cur = conn.cursor()
        cur.execute('SELECT verification_code FROM users WHERE email=?', (email,))
        row = cur.fetchone()
        if row and row[0] == code:
            cur.execute('UPDATE users SET verified=1 WHERE email=?', (email,))
            conn.commit()
            conn.close()
            return redirect(url_for('dashboard_login'))
        conn.close()
        flash('Código incorrecto', 'danger')
    return render_template('verify.html', email=email)

@app.route('/dashboard/upload', methods=['POST'])
def upload_profile():
    user_email = session.get('user')
    if not user_email:
        return redirect(url_for('dashboard'))
    file = request.files['photo']
    if file and file.filename:
        path = os.path.join('static', 'uploads', file.filename)
        file.save(path)
        save_profile_pic(user_email, '/' + path)
    return redirect(url_for('dashboard'))

@app.route('/dashboard/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return redirect(url_for('dashboard'))

@app.route('/pack/<string:pack_id>')
def ver_pack(pack_id):
    packs = get_all_packs()
    pack = next((p for p in packs if p['id'] == pack_id), None)
    if pack:
        return render_template('pack.html', pack=pack)
    return "Pack no encontrado", 404

# ---------------- ADMIN ----------------
@app.route('/admin')
def admin():
    admin_email = session.get('admin')
    if not admin_email:
        return render_template('admin_login.html')
    projects = get_all_projects()
    return render_template('admin_dashboard.html', projects=projects)


@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = get_user(email)
        if user and user['is_admin'] and check_password(email, password):
            session['admin'] = email
            return redirect(url_for('admin'))
    return render_template('admin_login_form.html')


@app.route('/admin/signup', methods=['GET', 'POST'])
def admin_signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        create_user(email, password, True)
        return redirect(url_for('verify', email=email))
    return render_template('admin_signup.html')


@app.route('/admin/project/add', methods=['POST'])
def admin_add_project():
    if not session.get('admin'):
        return redirect(url_for('admin'))
    title = request.form['title']
    category = request.form['category']
    video_url = request.form['video_url']
    client_email = request.form['client_email']
    add_project(title, category, video_url, client_email)
    return redirect(url_for('admin'))


@app.route('/admin/logout', methods=['POST'])
def admin_logout():
    session.pop('admin', None)
    return redirect(url_for('admin'))


@app.route('/admin/project/<int:project_id>/update', methods=['POST'])
def admin_update_project(project_id):
    if not session.get('admin'):
        return redirect(url_for('admin'))
    video_url = request.form.get('video_url', '')
    client_email = request.form.get('client_email', '')
    update_project_video(project_id, video_url, client_email)
    return redirect(url_for('admin'))


@app.route('/admin/project/<int:project_id>/activate', methods=['POST'])
def admin_activate_payment(project_id):
    if not session.get('admin'):
        return redirect(url_for('admin'))
    activate_payment(project_id)
    return redirect(url_for('admin'))


@app.route('/admin/project/<int:project_id>/delete', methods=['POST'])
def admin_delete_video(project_id):
    if not session.get('admin'):
        return redirect(url_for('admin'))
    delete_video(project_id)
    return redirect(url_for('admin'))

# ---------------- VFORUM ----------------
@app.route('/forum')
def forum_index():
    try:
        topics = forum_db.get_topics()
    except Exception:
        flash("Error al cargar el foro, inténtalo más tarde", "danger")
        return redirect(url_for('home'))

    return render_template(
        'forum_index.html',
        topics=topics,
        quotes=forum_db.INSPIRATIONAL_QUOTES,
    )

@app.route('/forum/new', methods=['GET', 'POST'])
def forum_new():
    if request.method == 'POST':
        topic_id = forum_db.create_topic(request.form, request.files)
        return redirect(url_for('forum_topic_view', topic_id=topic_id))
    return render_template('forum_new.html', categories=forum_db.get_categories())

@app.route('/forum/tema/<int:topic_id>', methods=['GET', 'POST'])
def forum_topic_view(topic_id):
    if request.method == 'POST':
        author = request.form['author']
        content = request.form['response']
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO responses (topic_id, author, content) VALUES (?, ?, ?)",
            (topic_id, author, content)
        )
        conn.commit()
        conn.close()
        return redirect(url_for('forum_topic_view', topic_id=topic_id))
    topic = get_topic(topic_id)
    if not topic:
        return render_template('404.html'), 404
    responses = get_responses_for_topic(topic_id)
    return render_template('forum_topic.html', topic=topic, responses=responses)

@app.route('/forum/<int:topic_id>/reply', methods=['POST'])
def forum_reply(topic_id):
    author = request.form['author']
    content = request.form['content']
    forum_db.create_post(topic_id, author, content)
    return redirect(url_for('forum_topic_view', topic_id=topic_id))




@app.route('/forum/response/<int:response_id>/vote', methods=['POST'])
def vote_response_route(response_id):
    delta = int(request.form.get('delta', 0))
    vote_response(response_id, delta)
    topic_id = get_response_topic(response_id)
    return redirect(url_for('forum_topic_view', topic_id=topic_id))

@app.route('/forum/vote-topic', methods=['POST'])
def vote_topic():
    data = request.get_json()
    forum_db.vote_topic(data['id'], data['direction'])
    return jsonify(success=True)

@app.route('/forum/vote-post', methods=['POST'])
def vote_post():
    data = request.get_json()
    forum_db.vote_post(data['id'], data['direction'])
    return jsonify(success=True)

@app.route('/forum/<int:id>/delete', methods=['POST'])
def delete_topic(id):
    if request.form.get('password') == 'borrar1':
        forum_db.delete_topic_by_id(id)
    return redirect(url_for('forum_index'))

from flask import abort, render_template
from jinja2 import TemplateNotFound

@app.route('/<page>')
def render_page(page):
    try:
        return render_template(f"{page}.html")
    except TemplateNotFound:
        abort(404)

if __name__ == '__main__':
    app.run(debug=True)
