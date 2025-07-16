import os
import re
import sqlite3
import time
from werkzeug.security import generate_password_hash
from flask import (
    Flask, render_template, request, redirect, jsonify,
    url_for, session, flash, abort
)
from jinja2 import TemplateNotFound

from firebase_admin import credentials, initialize_app, firestore, exceptions
from google.api_core.exceptions import GoogleAPICallError


def init_firestore():
    try:
        cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS', 'serviceAccountKey.json')
        if not os.path.isfile(cred_path):
            raise FileNotFoundError(f"Credenciales no encontradas: {cred_path}")
        # Inicializar solo una vez
        if not firestore._apps:
            cred = credentials.Certificate(cred_path)
            initialize_app(cred)
        return firestore.client()
    except exceptions.FirebaseError as e:
        # Log de error y reintento o fallback
        app.logger.error(f"Firebase init failed: {e}")
        raise RuntimeError("No se pudo conectar a Firestore, revisa tus credenciales o secreto en Render.")

from config import config
from utils.db import db, migrate, get_db, close_db, init_db
from utils.auth import ensure_admin_user
from routes.admin import admin_bp
from routes.client import client_bp
from services.project_manager import ProjectManager
from services.comment_manager import CommentManager
from utils.quotes import get_random_quote

def create_app():
    app = Flask(__name__)
    app.config.from_object(config[os.getenv('APP_ENV', 'development')])
    db.init_app(app)
    migrate.init_app(app, db)
    app.jinja_env.globals['get_random_quote'] = get_random_quote
    app.register_blueprint(admin_bp)
    app.register_blueprint(client_bp)
    app.teardown_appcontext(close_db)

    with app.app_context():
        init_db(app)
        ensure_admin_user()

    return app

app = create_app()
fs_client = init_firestore()


@app.errorhandler(GoogleAPICallError)
def handle_firestore_error(e):
    app.logger.error(f"Firestore RPC failed: {e}")
    return render_template('503.html'), 503


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


def update_status(project_id, status):
    _proj_mgr().update_status(project_id, status)


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
def list_forum():
    try:
        docs = (
            fs_client.collection('foro')
            .order_by('timestamp', direction=firestore.Query.DESCENDING)
            .stream()
        )
        temas = [{**doc.to_dict(), 'id': doc.id} for doc in docs]
        return render_template('forum.html', temas=temas)
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore query failed: {e}")
        raise


@app.route('/forum/new', methods=['POST'])
def new_topic():
    payload = request.form or request.json
    try:
        fs_client.collection('foro').add(
            {
                'titulo': payload['titulo'],
                'contenido': payload['contenido'],
                'autor': payload.get('autor', 'Anónimo'),
                'timestamp': firestore.SERVER_TIMESTAMP,
            }
        )
        return redirect(url_for('list_forum'))
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore write failed: {e}")
        raise


@app.route('/forum/<topic_id>')
def view_topic(topic_id):
    try:
        doc = fs_client.collection('foro').document(topic_id).get()
        if not doc.exists:
            abort(404)
        tema = {**doc.to_dict(), 'id': doc.id}
        return render_template('topic.html', tema=tema)
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore read failed: {e}")
        raise


@app.route('/<page>')
def render_page(page):
    try:
        return render_template(f"{page}.html")
    except TemplateNotFound:
        abort(404)


if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])
