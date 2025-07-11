import sqlite3
from datetime import datetime
from typing import List, Dict

DB_PATH = 'db/forum.db'

def _connect():
    return sqlite3.connect(DB_PATH)

def get_topics() -> List[Dict]:
    conn = _connect()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute('SELECT * FROM topics ORDER BY created_at DESC')
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_topic(topic_id: int) -> Dict:
    conn = _connect()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute('SELECT * FROM topics WHERE id=?', (topic_id,))
    row = cur.fetchone()
    conn.close()
    return dict(row) if row else None

def get_posts(topic_id: int) -> List[Dict]:
    conn = _connect()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute('SELECT * FROM posts WHERE topic_id=? ORDER BY created_at ASC', (topic_id,))
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def create_topic(title: str, description: str = None, image: str = None) -> int:
    """Crea un nuevo tema en la tabla topics."""
    conn = _connect()
    cur = conn.cursor()
    cur.execute(
        'INSERT INTO topics (title, description, image, created_at) VALUES (?,?,?,?)',
        (title, description, image, datetime.utcnow())
    )
    conn.commit()
    topic_id = cur.lastrowid
    conn.close()
    return topic_id

def create_post(topic_id: int, author: str, content: str) -> int:
    conn = _connect()
    cur = conn.cursor()
    cur.execute('INSERT INTO posts (topic_id, author, content, created_at) VALUES (?,?,?,?)',
                (topic_id, author, content, datetime.utcnow()))
    conn.commit()
    post_id = cur.lastrowid
    conn.close()
    return post_id

def vote_topic(topic_id: int, direction: str) -> None:
    conn = _connect()
    cur = conn.cursor()
    if direction == 'up':
        cur.execute('UPDATE topics SET votes = votes + 1 WHERE id=?', (topic_id,))
    elif direction == 'down':
        cur.execute('UPDATE topics SET votes = votes - 1 WHERE id=?', (topic_id,))
    conn.commit()
    conn.close()

def vote_post(post_id: int, direction: str) -> None:
    conn = _connect()
    cur = conn.cursor()
    if direction == 'up':
        cur.execute('UPDATE posts SET votes = votes + 1 WHERE id=?', (post_id,))
    elif direction == 'down':
        cur.execute('UPDATE posts SET votes = votes - 1 WHERE id=?', (post_id,))
    conn.commit()
    conn.close()
