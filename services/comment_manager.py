import sqlite3
from typing import List, Dict

class CommentManager:
    def __init__(self, db_path: str):
        self.db_path = db_path

    def db_conn(self):
        conn = sqlite3.connect(self.db_path, timeout=10, check_same_thread=False)
        conn.execute('PRAGMA journal_mode=WAL;')
        conn.execute('PRAGMA synchronous=NORMAL;')
        return conn

    def add_comment(self, project_id: int, user_id: int, text: str) -> None:
        conn = self.db_conn()
        cur = conn.cursor()
        cur.execute('INSERT INTO comments (project_id, user_id, text) VALUES (?,?,?)',
                    (project_id, user_id, text))
        conn.commit()
        conn.close()

    def get_comments(self, project_id: int) -> List[Dict]:
        conn = self.db_conn()
        cur = conn.cursor()
        cur.execute(
            'SELECT u.email, c.text, c.created_at '
            'FROM comments c JOIN users u ON c.user_id=u.id '
            'WHERE c.project_id=? ORDER BY c.created_at',
            (project_id,)
        )
        rows = cur.fetchall()
        conn.close()
        result = []
        for row in rows:
            user = row[0].split('@')[0]
            result.append({'user': user, 'text': row[1], 'date': row[2]})
        return result

    def get_all_comments(self) -> List[Dict]:
        conn = self.db_conn()
        cur = conn.cursor()
        cur.execute(
            'SELECT p.title, u.email, c.text, c.created_at '
            'FROM comments c '
            'JOIN users u ON c.user_id=u.id '
            'JOIN projects p ON c.project_id=p.id '
            'ORDER BY c.created_at DESC'
        )
        rows = cur.fetchall()
        conn.close()
        return [
            {
                'project': row[0],
                'user_email': row[1],
                'text': row[2],
                'date': row[3],
            }
            for row in rows
        ]
