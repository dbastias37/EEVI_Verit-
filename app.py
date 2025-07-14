import os
import re
import sqlite3
import time
import json
from flask import (
    Flask, render_template, request, redirect, jsonify,
    url_for, session, flash, abort
)
from jinja2 import TemplateNotFound

from config import config
from utils.db import db, migrate, get_db, close_db, init_db
from routes.admin import admin_bp
from routes.client import client_bp
from services.project_manager import ProjectManager
from services.comment_manager import CommentManager
from modules import forum as forum_db
from modules.forum import (
    get_topic,
    get_topic_by_id,
    get_responses_for_topic,
    vote_response,
    get_response_topic,
)


def create_app():
    app = Flask(__name__)
    app.config.from_object(config[os.getenv('APP_ENV', 'development')])
    db.init_app(app)
    migrate.init_app(app, db)
    app.register_blueprint(admin_bp, url_prefix='/admin')
    app.register_blueprint(client_bp)
    app.teardown_appcontext(close_db)

    with app.app_context():
        init_db(app)
        forum_db.init_db()
        ensure_admin_user()

    return app

app = create_app()

# ---------- Helper functions used by tests and routes ----------

def db_conn():
    conn = sqlite3.connect(app.config['DB_PATH'], timeout=10, check_same_thread=False)
    conn.execute('PRAGMA journal_mode=WAL;')
    conn.execute('PRAGMA synchronous=NORMAL;')
    return conn


def create_user(email, password, is_admin=False):
    code = '123456789'
    conn = get_db()
    for _ in range(3):
        try:
            with conn:
                conn.execute(
                    'INSERT INTO users (email, password, is_admin, verification_code) VALUES (?,?,?,?)',
                    (email, password, int(is_admin), code),
                )
            print(f"Código de verificación para {email}: {code}")
            break
        except sqlite3.OperationalError as e:
            if 'database is locked' in str(e):
                time.sleep(0.1)
                continue
            raise


def get_user(email):
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('SELECT id, email, profile_pic, verified, is_admin FROM users WHERE email=?', (email,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    return {
        'id': row[0],
        'email': row[1],
        'profile_pic': row[2],
        'verified': row[3],
        'is_admin': row[4],
    }


def check_password(email, password):
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('SELECT password, verified FROM users WHERE email=?', (email,))
    row = cur.fetchone()
    conn.close()
    return row and row[0] == password and row[1]


def save_profile_pic(email, path):
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('UPDATE users SET profile_pic=? WHERE email=?', (path, email))
    conn.commit()
    conn.close()


def ensure_admin_user():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('SELECT id FROM users WHERE email=?', ('admin@verite.cl',))
    if not cur.fetchone():
        cur.execute(
            'INSERT INTO users (email, password, is_admin, verified) VALUES (?,?,1,1)',
            ('admin@verite.cl', 'Admin777')
        )
        conn.commit()
    conn.close()

# Wrappers around services

def _proj_mgr():
    return ProjectManager(app.config['DB_PATH'])


def _cmt_mgr():
    return CommentManager(app.config['DB_PATH'])


def add_project(title, category, url, client_email):
    _proj_mgr().add_project(title, category, url, client_email)


def update_project_video(project_id, url, client_email=None):
    _proj_mgr().update_project_video(project_id, url, client_email)


def activate_payment(project_id):
    _proj_mgr().activate_payment(project_id)


def delete_video(project_id):
    _proj_mgr().delete_video(project_id)


def get_projects_for_email(email):
    return _proj_mgr().get_projects_for_email(email)


def get_all_projects():
    return _proj_mgr().get_all_projects()


def add_comment(project_id, user_id, text):
    _cmt_mgr().add_comment(project_id, user_id, text)


def get_comments(project_id):
    return _cmt_mgr().get_comments(project_id)


def get_all_comments():
    return _cmt_mgr().get_all_comments()

# ------------- Forum routes (remain here) -------------

@app.route('/forum')
def forum_index():
    try:
        topics = forum_db.get_topics()
    except Exception:
        flash("Error al cargar el foro, inténtalo más tarde", "danger")
        return redirect(url_for('client.home'))

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


@app.route('/forum/tema/<int:topic_id>', methods=['GET', 'POST'])
def forum_topic_view(topic_id):
    if request.method == 'POST':
        author = request.form['author']
        content = request.form['response']
        conn = sqlite3.connect(app.config['DB_PATH'])
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO responses (topic_id, author, content) VALUES (?, ?, ?)",
            (topic_id, author, content)
        )
        conn.commit()
        conn.close()
        return redirect(url_for('forum_topic_view', topic_id=topic_id))
    topic = get_topic(topic_id)
    if not topic:
        return render_template('404.html'), 404
    responses = get_responses_for_topic(topic_id)
    return render_template('forum_topic.html', topic=topic, responses=responses)


@app.route('/forum/<int:topic_id>/reply', methods=['POST'])
def forum_reply(topic_id):
    author = request.form['author']
    content = request.form['content']
    forum_db.create_post(topic_id, author, content)
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


@app.route('/<page>')
def render_page(page):
    try:
        return render_template(f"{page}.html")
    except TemplateNotFound:
        abort(404)


if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
