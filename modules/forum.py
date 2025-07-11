import sqlite3
from datetime import datetime
from typing import List, Dict

DB_PATH = 'db/forum.db'

# Categorías fijas para el foro
FIXED_CATEGORIES = [
    "Grabación en vivo",
    "Diseño sonoro",
    "Foley y efectos",
    "Edición de vídeo",
    "Edición de audio",
    "Mezcla y masterización",
    "Micrófonos y equipamiento",
    "Workflows DAW y plugins",
    "Ambientes y field recording",
    "Postproducción",
    "Formatos y codecs",
    "Consejos de producción",
]

def get_categories() -> List[str]:
    """Devuelve la lista de categorías predefinidas."""
    return FIXED_CATEGORIES

def _connect():
    return sqlite3.connect(DB_PATH)

def get_topics(category: str = None) -> List[Dict]:
    """Devuelve la lista de temas, opcionalmente filtrados por categoría."""
    conn = _connect()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    if category:
        cur.execute('SELECT * FROM topics WHERE category=? ORDER BY created_at DESC', (category,))
    else:
        cur.execute('SELECT * FROM topics ORDER BY created_at DESC')
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_latest_topic() -> Dict:
    conn = _connect()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute('SELECT * FROM topics ORDER BY created_at DESC LIMIT 1')
    row = cur.fetchone()
    conn.close()
    return dict(row) if row else None

def get_recent_topics(category: str = None, limit: int = 3) -> List[Dict]:
    """Obtiene los temas más recientes de una categoría o generales."""
    conn = _connect()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    if category:
        cur.execute('SELECT * FROM topics WHERE category=? ORDER BY created_at DESC LIMIT ?', (category, limit))
    else:
        cur.execute('SELECT * FROM topics ORDER BY created_at DESC LIMIT ?', (limit,))
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

# Aliases utilizadas por la aplicación
def get_all_topics() -> List[Dict]:
    return get_topics()

def get_topic_by_id(topic_id: int) -> Dict:
    return get_topic(topic_id)

def get_replies(topic_id: int) -> List[Dict]:
    return get_posts(topic_id)

def create_topic(form, files) -> int:
    """Crea un nuevo tema en la tabla topics a partir de un formulario."""
    title = form['title']
    category = form['category']
    description = form.get('description')
    file = files.get('file')
    image = file.filename if file and file.filename else None

    conn = _connect()
    cur = conn.cursor()
    cur.execute(
        'INSERT INTO topics (title, category, description, image, created_at) VALUES (?,?,?,?,?)',
        (title, category, description, image, datetime.utcnow())
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
