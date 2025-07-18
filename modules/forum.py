import sqlite3
import re
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Tuple
from flask import current_app

DB_PATH = 'db/forum.db'

# Inicializa la base de datos del foro creando la tabla de respuestas
def init_db():
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
    """Devuelve una conexión SQLite a la base de datos del foro."""
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS responses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          topic_id INTEGER NOT NULL,
          author TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TEXT NOT NULL
        );
        """
    )
    conn.commit()
    return conn

# Genera un slug URL seguro basado en el título
def slugify(text: str) -> str:
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', text).strip('-').lower()
    return slug

# Helper para convertir cadenas de fecha en objetos datetime
def _parse_datetime(value):
    if isinstance(value, str):
        for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M:%S.%f"):  # formatos comunes de SQLite
            try:
                return datetime.strptime(value, fmt)
            except ValueError:
                continue
        try:
            return datetime.fromisoformat(value)
        except Exception:
            return datetime.now(timezone.utc)
    return value

# Categorías fijas para el foro
# Agregar esta función al archivo modules/forum.py si no existe

def get_categories() -> List[str]:
    """Devuelve la lista de categorías predefinidas."""
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

# Frases de Terence McKenna para inspirar la comunidad
INSPIRATIONAL_QUOTES = [
    "La inteligencia humana es un destello del misterio que se comunica mediante el lenguaje",
    "Cooperar es descubrir que nuestras mentes resuenan en la misma frecuencia cósmica",
    "El lenguaje nos construye tanto como nosotros lo construimos a él",
    "La experiencia directa es la brújula que nos orienta en mundos invisibles",
    "Cuando compartimos visiones, tejemos comunidades de sentido",
    "La mente florece en la interacción con otras mentes",
    "Una cultura saludable valora la exploración interior y la expresa con palabras claras",
    "Encontrar a otros buscadores es reconocer nuestro propio eco en la inmensidad",
    "El conocimiento verdadero surge cuando cuestionamos nuestras certezas",
    "La imaginación es el motor secreto de la evolución humana",
    "Habitar el lenguaje es habitar una realidad expandida",
    "La cooperación amplifica la creatividad más allá de lo imaginable",
    "Nuestro destino se entreteje en las redes de la comunidad consciente",
    "Escuchar al otro es abrir una puerta a paisajes inesperados",
    "Las ideas son entidades vivas que buscan hospedarse en nuestras voces",
    "Explorar la mente juntos es cartografiar lo desconocido",
    "El viaje interior se vuelve real cuando se comparte con la tribu",
    "La libertad nace de asumir la responsabilidad de nuestra propia experiencia",
    "Cada conversación puede revelarnos un universo entero",
    "El verdadero aprendizaje comienza cuando abandonamos el miedo",
    "La inteligencia colectiva es el resultado de miles de mentes en sintonía",
    "El lenguaje es una herramienta para convocar a la imaginación a la realidad",
    "Cooperar significa escuchar profundamente y actuar con autenticidad",
    "La comunidad es el espejo donde la conciencia se reconoce",
    "Encontrar a otros es encontrar caminos inexplorados de nosotros mismos",
    "La curiosidad compartida disuelve las fronteras entre individuos",
    "El propósito de la mente es superar sus propias limitaciones",
    "Cada palabra es una chispa que puede encender la transformación",
    "Nos volvemos verdaderamente humanos cuando damos voz a nuestras visiones",
    "La experiencia directa es el jardín donde germinan las ideas poderosas",
    "Somos arquitectos de significado y nuestros ladrillos son las palabras",
    "La cooperación creativa es la danza de múltiples inteligencias entrelazadas",
    "Hallamos comunidad en la medida en que nos abrimos a la escucha sincera",
    "El lenguaje es el puente que une la mente con la infinitud",
    "Una cultura viva se define por la profundidad de sus conversaciones",
    "El misterio se revela a través de la participación activa de la mente",
    "Cuando colaboramos, la realidad se vuelve un lienzo compartido",
    "La inteligencia es un fuego que se aviva con el oxígeno del diálogo",
    "Cada encuentro es una oportunidad de renovar nuestra visión del mundo",
    "La experiencia es una maestra que sólo habla en silencio",
    "El poder de las palabras radica en su capacidad para invocar lo desconocido",
    "Cooperar es danzar con la inteligencia colectiva del planeta",
    "La comunidad consciente es un laboratorio de transformación permanente",
    "El lenguaje nos permite soñar juntos y construir esos sueños",
    "En cada conversación se oculta la posibilidad de un descubrimiento",
    "Encontrar a otros es ampliar la frontera de lo posible",
    "La mente humana evoluciona al ritmo de las preguntas que se atreve a formular",
    "La cooperación nos recuerda que todos somos exploradores de un mismo misterio",
    "La experiencia directa es el antídoto contra las ilusiones de la cultura",
    "El lenguaje compartido forja la unidad de la tribu",
    "La inteligencia se expande cuando se escucha sin prejuicios",
    "Cooperar es enlazar perspectivas para construir realidades nuevas",
    "En la comunidad hallamos la resonancia que impulsa nuestra creatividad",
    "Las palabras son semillas de mundos que esperan germinar",
    "Encontrar a otros afinados en la misma búsqueda es un acto de magia",
    "La mente es un jardín que florece con el intercambio constante de ideas",
    "Cada diálogo es un puente hacia tierras desconocidas de la conciencia",
    "La verdadera comprensión surge al compartir la experiencia inmediata",
    "Cooperar es descubrir que la inteligencia se multiplica en la diversidad",
    "El lenguaje es un mapa que creamos juntos para navegar la inmensidad",
]

def get_categories() -> List[str]:
    """Devuelve la lista de categorías predefinidas."""
    return FIXED_CATEGORIES

def _connect():
    return get_db()

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
    topics = []
    for row in rows:
        d = dict(row)
        d['created_at'] = _parse_datetime(d.get('created_at'))
        topics.append(d)
    return topics

def get_latest_topic() -> Dict:
    conn = _connect()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute('SELECT * FROM topics ORDER BY created_at DESC LIMIT 1')
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    d = dict(row)
    d['created_at'] = _parse_datetime(d.get('created_at'))
    return d

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
    result = []
    for row in rows:
        d = dict(row)
        d['created_at'] = _parse_datetime(d.get('created_at'))
        result.append(d)
    return result

def get_topic(topic_id: int) -> Dict:
    conn = _connect()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute('SELECT * FROM topics WHERE id=?', (topic_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    d = dict(row)
    d['created_at'] = _parse_datetime(d.get('created_at'))
    return d

def get_topic_by_slug(slug: str) -> Dict:
    """Obtiene un tema por su slug."""
    conn = _connect()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute('SELECT * FROM topics WHERE slug=?', (slug,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    d = dict(row)
    d['created_at'] = _parse_datetime(d.get('created_at'))
    return d

def get_posts(topic_id: int) -> List[Dict]:
    conn = _connect()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute('SELECT * FROM posts WHERE topic_id=? ORDER BY created_at ASC', (topic_id,))
    rows = cur.fetchall()
    conn.close()
    result = []
    for row in rows:
        d = dict(row)
        d['created_at'] = _parse_datetime(d.get('created_at'))
        result.append(d)
    return result

# Aliases utilizadas por la aplicación
def get_all_topics() -> Tuple[List[Dict], bool]:
    """Devuelve todos los temas y si se trata de un modo demo."""
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
        # Adjuntar votos y respuestas reales
        for t in topics:
            t['likes'] = t.get('votes', 0)
            t['responses'] = get_posts(t['id'])
    return topics, demo_mode

def get_topic_by_id(topic_id: int):
    conn = sqlite3.connect(DB_PATH)
    cur  = conn.cursor()
    cur.execute("SELECT id, slug, title, description, category, created_at FROM topics WHERE id = ?", (topic_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    return {
        'id':          row[0],
        'slug':        row[1],
        'title':       row[2],
        'description': row[3],
        'category':    row[4],
        'created_at':  _parse_datetime(row[5]),
    }

def get_replies(topic_id: int) -> List[Dict]:
    return get_posts(topic_id)

def get_response_score(response_id: int) -> int:
    """Suma todos los votos de una respuesta."""
    conn = _connect()
    cur = conn.cursor()
    try:
        cur.execute('SELECT COALESCE(SUM(delta), 0) FROM votes WHERE response_id=?', (response_id,))
        row = cur.fetchone()
        return row[0] if row and row[0] is not None else 0
    except Exception as e:
        current_app.logger.warning(f"Could not get response score: {e}")
        return 0
    finally:
        conn.close()


def get_responses_for_topic(topic_id):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    try:
        cur.execute(
            "SELECT id, author, content, created_at FROM responses WHERE topic_id = ? ORDER BY created_at",
            (topic_id,),
        )
        rows = cur.fetchall()
    except sqlite3.OperationalError:
        rows = []
    conn.close()
    return rows


def create_response(topic_id: int, author: str, content: str) -> int:
    """Inserta una nueva respuesta en la base de datos."""
    conn = _connect()
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


def vote_response(response_id: int, delta: int) -> None:
    """Registra un voto para una respuesta."""
    conn = _connect()
    cur = conn.cursor()
    try:
        cur.execute(
            'INSERT INTO votes (response_id, delta, created_at) VALUES (?,?,?)',
            (response_id, delta, datetime.now(timezone.utc))
        )
        conn.commit()
    except Exception as e:
        current_app.logger.warning(f"Could not vote response: {e}")
    finally:
        conn.close()


def get_response_topic(response_id: int):
    """Obtiene el id del tema asociado a una respuesta."""
    conn = _connect()
    cur = conn.cursor()
    try:
        cur.execute('SELECT topic_id FROM responses WHERE id=?', (response_id,))
        row = cur.fetchone()
        return row[0] if row else None
    except Exception as e:
        current_app.logger.warning(f"Could not get response topic: {e}")
        return None
    finally:
        conn.close()

def create_topic(form, files) -> int:
    """Crea un nuevo tema en la tabla topics a partir de un formulario."""
    title = form['title']
    category = form['category']
    description = form.get('description')
    file = files.get('file')
    image = file.filename if file and file.filename else None

    slug = slugify(title)

    conn = _connect()
    cur = conn.cursor()
    cur.execute(
        'INSERT INTO topics (title, slug, category, description, image, created_at) VALUES (?,?,?,?,?,?)',
        (title, slug, category, description, image, datetime.now(timezone.utc))
    )
    conn.commit()
    topic_id = cur.lastrowid
    conn.close()
    return topic_id

def create_post(topic_id: int, author: str, content: str) -> int:
    conn = _connect()
    cur = conn.cursor()
    cur.execute('INSERT INTO posts (topic_id, author, content, created_at) VALUES (?,?,?,?)',
                (topic_id, author, content, datetime.now(timezone.utc)))
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

def delete_topic_by_id(topic_id: int) -> None:
    """Elimina un tema y sus posts asociados."""
    conn = _connect()
    cur = conn.cursor()
    cur.execute('DELETE FROM posts WHERE topic_id=?', (topic_id,))
    cur.execute('DELETE FROM topics WHERE id=?', (topic_id,))
    conn.commit()
    conn.close()


def get_categories() -> List[str]:
    """Devuelve la lista de categorías predefinidas."""
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
