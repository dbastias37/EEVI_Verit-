import sqlite3
import re
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Tuple
from flask import current_app

DB_PATH = 'db/forum.db'


def init_db():
    """Inicializar base de datos del foro"""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            topic_id INTEGER NOT NULL,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(topic_id) REFERENCES topics(id)
          )
        """
    )
    conn.commit()
    conn.close()


def get_db():
    """Obtener conexión a la base de datos principal"""
    conn = sqlite3.connect("verite.db", timeout=10, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def slugify(text: str) -> str:
    """Generar slug URL seguro"""
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', text).strip('-').lower()
    return slug


def _parse_datetime(value):
    """Helper para convertir strings de fecha en objetos datetime"""
    if isinstance(value, str):
        for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M:%S.%f"):
            try:
                return datetime.strptime(value, fmt)
            except ValueError:
                continue
        try:
            return datetime.fromisoformat(value)
        except Exception:
            return datetime.now(timezone.utc)
    return value


def get_categories() -> List[str]:
    """Devolver lista de categorías predefinidas"""
    return [
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


# Frases inspiracionales para la comunidad
INSPIRATIONAL_QUOTES = [
    "La inteligencia humana es un destello del misterio que se comunica mediante el lenguaje",
    "El sonido real conecta emociones auténticas",
    "Cada grabación cuenta una historia única",
    "La creatividad nace de la experiencia genuina",
    "El audio verdadero trasciende la tecnología"
]


def get_posts(topic_id: int) -> List[Dict]:
    """Obtener posts de un tema específico"""
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute('SELECT * FROM posts WHERE topic_id=? ORDER BY created_at ASC', (topic_id,))
        rows = cur.fetchall()
        result = []
        for row in rows:
            d = dict(row)
            d['created_at'] = _parse_datetime(d.get('created_at'))
            result.append(d)
        return result
    except sqlite3.OperationalError:
        return []
    finally:
        conn.close()


def get_topics() -> List[Dict]:
    """Obtener todos los temas del foro"""
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute('SELECT * FROM topics ORDER BY created_at DESC')
        rows = cur.fetchall()
        result = []
        for row in rows:
            d = dict(row)
            d['created_at'] = _parse_datetime(d.get('created_at'))
            result.append(d)
        return result
    except sqlite3.OperationalError:
        return []
    finally:
        conn.close()


def get_all_topics() -> Tuple[List[Dict], bool]:
    """Devolver todos los temas y si es modo demo"""
    topics = get_topics()
    if not topics:
        topics = [{
            'id': None,
            'title': 'Título demo',
            'body': 'Este es un contenido de demostración. ¡Crea tu primer tema!',
            'category': None,
            'created_at': datetime.now(timezone.utc),
            'likes': 0,
            'responses': [{
                'author': 'Demo',
                'body': 'Respuesta demo',
                'created_at': datetime.now(timezone.utc)
            }]
        }]
        demo_mode = True
    else:
        demo_mode = False
        for t in topics:
            t['likes'] = t.get('votes', 0)
            t['responses'] = get_posts(t['id'])
    return topics, demo_mode


def get_topic_by_id(topic_id: int):
    """Obtener tema por ID"""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    try:
        cur.execute("SELECT id, slug, title, description, category, created_at FROM topics WHERE id = ?", (topic_id,))
        row = cur.fetchone()
        if not row:
            return None
        return {
            'id': row[0],
            'slug': row[1],
            'title': row[2],
            'description': row[3],
            'category': row[4],
            'created_at': row[5],
        }
    finally:
        conn.close()


def get_responses_for_topic(topic_id):
    """Obtener respuestas para un tema"""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    try:
        cur.execute(
            "SELECT id, author, content, created_at FROM responses WHERE topic_id = ? ORDER BY created_at",
            (topic_id,),
        )
        rows = cur.fetchall()
        return rows
    except sqlite3.OperationalError:
        return []
    finally:
        conn.close()


def create_response(topic_id: int, author: str, content: str) -> int:
    """Insertar nueva respuesta"""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    try:
        cur.execute(
            'INSERT INTO responses (topic_id, author, content, created_at) VALUES (?,?,?,?)',
            (topic_id, author, content, datetime.now(timezone.utc))
        )
        conn.commit()
        return cur.lastrowid
    except Exception as e:
        current_app.logger.warning(f"Could not create response: {e}")
        return 0
    finally:
        conn.close()


def create_topic(form, files) -> int:
    """Crear nuevo tema"""
    title = form['title']
    category = form['category']
    description = form.get('description')
    file = files.get('file')
    image = file.filename if file and file.filename else None
    slug = slugify(title)

    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute(
            'INSERT INTO topics (title, slug, category, description, image, created_at) VALUES (?,?,?,?,?,?)',
            (title, slug, category, description, image, datetime.now(timezone.utc))
        )
        conn.commit()
        topic_id = cur.lastrowid
        return topic_id
    finally:
        conn.close()


def vote_topic(topic_id: int, direction: str) -> None:
    """Votar por un tema"""
    conn = get_db()
    cur = conn.cursor()
    try:
        if direction == 'up':
            cur.execute('UPDATE topics SET votes = votes + 1 WHERE id=?', (topic_id,))
        elif direction == 'down':
            cur.execute('UPDATE topics SET votes = votes - 1 WHERE id=?', (topic_id,))
        conn.commit()
    finally:
        conn.close()


def vote_post(post_id: int, direction: str) -> None:
    """Votar por un post"""
    conn = get_db()
    cur = conn.cursor()
    try:
        if direction == 'up':
            cur.execute('UPDATE posts SET votes = votes + 1 WHERE id=?', (post_id,))
        elif direction == 'down':
            cur.execute('UPDATE posts SET votes = votes - 1 WHERE id=?', (post_id,))
        conn.commit()
    finally:
        conn.close()
