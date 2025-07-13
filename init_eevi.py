import sqlite3
import os
from datetime import datetime
from uuid import uuid4

DB_PATH = 'db/forum.db'

sample_users = [
    ("admin@example.com", "adminpass", "admin", 1, 1),
    ("client1@example.com", "pass", "client1", 0, 1),
    ("client2@example.com", "pass", "client2", 0, 1),
]

sample_projects = [
    ("Video 1", "promo", "", 2, 'draft', 'normal'),
    ("Video 2", "promo", "", 3, 'draft', 'high'),
]


def init_db():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
    conn = sqlite3.connect(DB_PATH)
    with open('db/schema.sql', 'r', encoding='utf-8') as f:
        conn.executescript(f.read())
    if os.path.exists('db/migrations.sql'):
        with open('db/migrations.sql', 'r', encoding='utf-8') as f:
            try:
                conn.executescript(f.read())
            except sqlite3.OperationalError:
                pass
    conn.commit()
    for email, pwd, username, is_admin, verified in sample_users:
        conn.execute(
            "INSERT INTO users (email, password, username, is_admin, verified) VALUES (?,?,?,?,?)",
            (email, pwd, username, is_admin, verified),
        )
    conn.commit()
    for title, category, url, client_id, status, priority in sample_projects:
        conn.execute(
            "INSERT INTO projects (title, category, video_url, client_id, status, priority, created_at) VALUES (?,?,?,?,?,?,?)",
            (title, category, url, client_id, status, priority, datetime.utcnow()),
        )
    conn.commit()
    conn.close()


if __name__ == '__main__':
    init_db()
