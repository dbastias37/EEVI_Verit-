from flask import Flask, render_template, request, redirect, jsonify, url_for, session, flash
import json
import os
import sqlite3

DB_PATH = 'db/forum.db'

def init_db():
    new_db = not os.path.exists(DB_PATH)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    if new_db:
        cursor.executescript(
            """
        CREATE TABLE topics (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          category TEXT,
          description TEXT,
          image TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          votes INTEGER DEFAULT 0
        );
        CREATE TABLE posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          topic_id INTEGER,
          author TEXT,
          content TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          votes INTEGER DEFAULT 0,
          FOREIGN KEY(topic_id) REFERENCES topics(id)
        );
        """
        )

    # Asegurar tablas de respuestas y votos
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            topic_id INTEGER NOT NULL,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(topic_id) REFERENCES topics(id) ON DELETE CASCADE
        );
        """
    )
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS votes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            response_id INTEGER NOT NULL,
            delta INTEGER NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(response_id) REFERENCES responses(id) ON DELETE CASCADE
        );
        """
    )
    conn.commit()
    conn.close()

# Inicializa la base de datos si no existe
init_db()

# Crear tabla de respuestas si no existe
db = sqlite3.connect(DB_PATH)
db.execute(
    """
  CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id INTEGER NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(topic_id) REFERENCES topics(id) ON DELETE CASCADE
  );
  """
)
db.commit()
db.close()

from modules import forum as forum_db
from modules.forum import (
    get_topic,
    get_topic_by_id,
    get_responses_for_topic,
    create_response,
    vote_response,
    get_response_topic,
)

app = Flask(__name__)
app.secret_key = 'demo-secret-key'

# Almacenamiento en memoria para usuarios y proyectos de prueba
users = {}
PROJECTS = [
    {
        'id': 1,
        'title': 'Video Corporativo',
        'progress': 0.6,
        'status': 'active',
        'script': 'Guion para video corporativo con entrevistas.\nEscena 1: ...',
        'video_url': 'https://drive.google.com/file/d/xyz/preview',
        'paid': False,
        'download': '#'
    },
    {
        'id': 2,
        'title': 'Cortometraje Documental',
        'progress': 0.85,
        'status': 'active',
        'script': 'Guion de cortometraje documental.\nIntroduccion: ...',
        'video_url': 'https://drive.google.com/file/d/abc/preview',
        'paid': True,
        'download': '#'
    },
    {
        'id': 3,
        'title': 'Animacion Musical',
        'progress': 1.0,
        'status': 'completed',
        'script': 'Guion para animacion musical.\nEscena de apertura ...',
        'video_url': 'https://drive.google.com/file/d/def/preview',
        'paid': True,
        'download': '#'
    }
]

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

# ---------------- DASHBOARD ----------------
def get_user(email):
    return users.get(email)

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    user_email = session.get('user')
    if request.method == 'POST' and not user_email:
        email = request.form['email']
        password = request.form['password']
        if password != '12345678':
            return render_template('dashboard.html', user=None)
        users.setdefault(email, {'email': email, 'profile_pic': None})
        session['user'] = email
        user_email = email
    if not user_email:
        return render_template('dashboard.html', user=None)

    user = get_user(user_email)
    active = [p for p in PROJECTS if p['status'] == 'active']
    completed = [p for p in PROJECTS if p['status'] == 'completed']
    stats = {
        'active': len(active),
        'completed': len(completed),
        'scripts': len(PROJECTS),
        'pending': sum(1 for p in PROJECTS if not p['paid'])
    }
    return render_template('dashboard.html', user=user, projects=PROJECTS,
                           active_projects=active, completed_projects=completed,
                           stats=stats)

@app.route('/dashboard/upload', methods=['POST'])
def upload_profile():
    user_email = session.get('user')
    if not user_email:
        return redirect(url_for('dashboard'))
    file = request.files['photo']
    if file and file.filename:
        path = os.path.join('static', 'uploads', file.filename)
        file.save(path)
        users[user_email]['profile_pic'] = '/' + path
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

@app.route('/forum/<int:topic_id>')
def forum_topic(topic_id):
    try:
        topic = get_topic_by_id(topic_id)
        if topic is None:
            flash("\u26a0\ufe0f Tema no encontrado.", "warning")
            return redirect(url_for('forum_index'))
        responses = get_responses_for_topic(topic_id)
    except Exception:
        flash("No se pudo cargar el tema, intenta más tarde", "danger")
        return redirect(url_for('forum_index'))

    show_delete = False
    if session.get('user') and request.args.get('password') == 'borrar1':
        show_delete = True

    return render_template(
        'forum_detail.html',
        topic=topic,
        responses=responses,
        show_delete=show_delete,
    )

@app.route('/forum/tema/<int:topic_id>')
def forum_topic_view(topic_id):
    topic = get_topic(topic_id)
    if not topic:
        return render_template('404.html'), 404
    # Intentamos cargar respuestas (o recibimos lista vacía)
    responses = get_responses_for_topic(topic_id)
    return render_template('forum_topic.html', topic=topic, responses=responses)

@app.route('/forum/<int:topic_id>/reply', methods=['POST'])
def forum_reply(topic_id):
    author = request.form['author']
    content = request.form['content']
    forum_db.create_post(topic_id, author, content)
    return redirect(url_for('forum_topic', topic_id=topic_id))


@app.route('/forum/<int:topic_id>/response', methods=['POST'])
def create_response_route(topic_id):
    author = request.form.get('author') or session.get('user', 'Anónimo')
    content = request.form.get('content')
    create_response(topic_id, author, content)
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

if __name__ == '__main__':
    app.run(debug=True)
