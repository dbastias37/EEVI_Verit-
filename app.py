from flask import Flask, render_template, request, redirect, jsonify, url_for
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
    return render_template(
        'forum_index.html',
        categories=forum_db.get_categories(),
        topics=forum_db.get_all_topics(),
        quotes=forum_db.INSPIRATIONAL_QUOTES,
    )

@app.route('/forum/new', methods=['GET', 'POST'])
def forum_new():
    if request.method == 'POST':
        topic_id = forum_db.create_topic(request.form, request.files)
        return redirect(url_for('forum_topic', id=topic_id))
    return render_template('forum_new.html', categories=forum_db.get_categories())

@app.route('/forum/<int:id>')
def forum_topic(id):
    topic = forum_db.get_topic_by_id(id)
    replies = forum_db.get_replies(id)
    return render_template('forum_topic.html', topic=topic, replies=replies)

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

if __name__ == '__main__':
    app.run(debug=True)
