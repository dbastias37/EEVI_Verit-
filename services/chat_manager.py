import sqlite3
from typing import List, Dict

class ChatManager:
    def __init__(self, db_path: str):
        self.db_path = db_path

    def db_conn(self):
        conn = sqlite3.connect(self.db_path, timeout=10, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute('PRAGMA journal_mode=WAL;')
        conn.execute('PRAGMA synchronous=NORMAL;')
        return conn

    def add_message(self, user: str, text: str) -> Dict:
        conn = self.db_conn()
        cur = conn.cursor()
        cur.execute('INSERT INTO chat_messages (user, text) VALUES (?, ?)', (user, text))
        message_id = cur.lastrowid
        conn.commit()
        cur.execute('SELECT id, user, text, timestamp FROM chat_messages WHERE id=?', (message_id,))
        row = cur.fetchone()
        conn.close()
        if row:
            return dict(row)
        return {'id': message_id, 'user': user, 'text': text, 'timestamp': None}

    def get_messages(self) -> List[Dict]:
        conn = self.db_conn()
        cur = conn.cursor()
        cur.execute('SELECT id, user, text, timestamp FROM chat_messages ORDER BY timestamp')
        rows = cur.fetchall()
        conn.close()
        return [dict(r) for r in rows]
