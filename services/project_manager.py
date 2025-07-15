import sqlite3
from typing import List, Dict

class ProjectManager:
    def __init__(self, db_path: str):
        self.db_path = db_path

    def db_conn(self):
        conn = sqlite3.connect(self.db_path, timeout=10, check_same_thread=False)
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA synchronous=NORMAL;")
        return conn

    def get_or_create_client(self, email: str, username: str | None = None) -> int:
        conn = self.db_conn()
        cur = conn.cursor()
        cur.execute('SELECT id FROM clients WHERE email=?', (email,))
        row = cur.fetchone()
        if row:
            conn.close()
            return row[0]
        if not username:
            username = email.split('@')[0]
        cur.execute('INSERT INTO clients (username, email) VALUES (?, ?)', (username, email))
        client_id = cur.lastrowid
        conn.commit()
        conn.close()
        return client_id

    def add_project(self, title: str, category: str, url: str, client_email: str) -> None:
        client_id = self.get_or_create_client(client_email)
        conn = self.db_conn()
        cur = conn.cursor()
        cur.execute(
            'INSERT INTO projects (title, category, video_url, client_id) VALUES (?,?,?,?)',
            (title, category, url, client_id),
        )
        conn.commit()
        conn.close()

    def update_project_video(self, project_id: int, url: str, client_email: str | None = None) -> None:
        conn = self.db_conn()
        cur = conn.cursor()
        cur.execute('UPDATE projects SET video_url=? WHERE id=?', (url, project_id))
        if client_email:
            client_id = self.get_or_create_client(client_email)
            cur.execute('UPDATE projects SET client_id=? WHERE id=?', (client_id, project_id))
        conn.commit()
        conn.close()

    def activate_payment(self, project_id: int) -> None:
        conn = self.db_conn()
        conn.execute('UPDATE projects SET paid=1 WHERE id=?', (project_id,))
        conn.commit()
        conn.close()

    def delete_video(self, project_id: int) -> None:
        conn = self.db_conn()
        conn.execute('UPDATE projects SET video_url="" WHERE id=?', (project_id,))
        conn.commit()
        conn.close()

    def get_projects_for_email(self, email: str) -> List[Dict]:
        conn = self.db_conn()
        cur = conn.cursor()
        query = (
            'SELECT p.id,p.title,p.progress,p.status,p.script,'
            'p.video_url,p.paid,p.download FROM projects p '
            'JOIN clients c ON p.client_id=c.id WHERE c.email=?'
        )
        try:
            cur.execute(query, (email,))
        except sqlite3.OperationalError:
            from utils.db import ensure_projects_schema
            ensure_projects_schema(cur)
            conn.commit()
            cur.execute(query, (email,))
        rows = cur.fetchall()
        conn.close()
        result = []
        for r in rows:
            result.append({
                'id': r[0],
                'title': r[1],
                'progress': r[2],
                'status': r[3],
                'script': r[4],
                'video_url': r[5],
                'paid': bool(r[6]),
                'download': r[7],
            })
        return result

    def get_all_projects(self) -> List[Dict]:
        conn = self.db_conn()
        cur = conn.cursor()
        cur.execute(
            'SELECT p.id,p.title,p.video_url,c.email,p.paid,p.status '
            'FROM projects p JOIN clients c ON p.client_id=c.id'
        )
        rows = cur.fetchall()
        conn.close()
        projects = []
        for r in rows:
            projects.append({
                'id': r[0],
                'title': r[1],
                'video_url': r[2],
                'client_email': r[3],
                'paid': bool(r[4]),
                'status': r[5],
            })
        return projects

    def update_status(self, project_id: int, status: str) -> None:
        conn = self.db_conn()
        conn.execute('UPDATE projects SET status=? WHERE id=?', (status, project_id))
        conn.commit()
        conn.close()
