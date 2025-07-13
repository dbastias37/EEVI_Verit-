from flask import Flask, render_template, request, redirect, jsonify, url_for, session
import json
import os
import sqlite3

DB_PATH = 'db/forum.db'

def init_db():
    if not os.path.exists(DB_PATH):
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.executescript("""
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
        """)
        conn.commit()
        conn.close()

# Inicializa la base de datos si no existe
init_db()

from modules import forum as forum_db

app = Flask(__name__)
app.secret_key = 'demo-secret-key'

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
    latest = forum_db.get_latest_topic()
    existing = forum_db.get_topics()
    if not existing and not session.get('forum_redirected'):
        session['forum_redirected'] = True
        return redirect(url_for('forum_new'))
    topics, demo_mode = forum_db.get_all_topics()
    return render_template(
        'forum_index.html',
        categories=forum_db.get_categories(),
        topics=topics,
        quotes=forum_db.INSPIRATIONAL_QUOTES,
        demo_id=latest['id'] if latest else 0,
        demo_mode=demo_mode,
    )

@app.route('/forum/new', methods=['GET', 'POST'])
def forum_new():
    if request.method == 'POST':
        topic_id = forum_db.create_topic(request.form, request.files)
        return redirect(url_for('forum_topic', topic_id=topic_id))
    return render_template('forum_new.html', categories=forum_db.get_categories())

@app.route('/forum/<int:topic_id>')
def forum_topic(topic_id):
    topic = forum_db.get_topic_by_id(topic_id)
    responses = forum_db.get_responses_for_topic(topic_id)
    return render_template('forum_topic.html', topic=topic, responses=responses)

@app.route('/forum/<int:topic_id>/reply', methods=['POST'])
def forum_reply(topic_id):
    author = request.form['author']
    content = request.form['content']
    forum_db.create_post(topic_id, author, content)
    return redirect(f'/forum/{topic_id}')

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
