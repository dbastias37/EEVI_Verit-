import os
import re
import sqlite3
import time
import firebase_admin
from google.cloud import firestore
from werkzeug.security import generate_password_hash
from flask import (
    Flask, render_template, request, redirect, jsonify,
    url_for, session, flash, abort
)
from jinja2 import TemplateNotFound

from firebase_admin import credentials, firestore as fs, exceptions
from google.api_core.exceptions import GoogleAPICallError
from utils.template_filters import register_filters

def create_app():
    app = Flask(__name__)
    app.config.from_object(config[os.getenv('APP_ENV', 'development')])
    db.init_app(app)
    migrate.init_app(app, db)
    app.jinja_env.globals['get_random_quote'] = get_random_quote
    
    # Registrar filtros de template
    register_filters(app)
    
    app.register_blueprint(admin_bp)
    app.register_blueprint(client_bp)
    app.teardown_appcontext(close_db)

    with app.app_context():
        init_db(app)
        ensure_admin_user()

    return app

def init_firestore() -> "google.cloud.firestore.Client":
    """
    Devuelve un cliente Firestore usando Firebase Admin SDK como singleton.
    Lee la ruta del JSON desde la variable de entorno GOOGLE_APPLICATION_CREDENTIALS
    (en Render: /etc/secrets/serviceAccountKey.json).
    """
    try:
        if not firebase_admin._apps:
            cred_path = os.getenv(
                "GOOGLE_APPLICATION_CREDENTIALS",
                "serviceAccountKey.json"
            )
            if not os.path.isfile(cred_path):
                raise FileNotFoundError(f"Credenciales no encontradas: {cred_path}")
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)

        return fs.client()
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
# Agregar estas rutas al final de app.py, antes de if __name__ == '__main__':

@app.route('/forum/topic/<topic_id>/responses')
def get_topic_responses(topic_id):
    """Obtener respuestas de un tema específico"""
    try:
        # Obtener respuestas de Firestore
        responses_ref = fs_client.collection('foro').document(topic_id).collection('responses')
        responses = []
        for resp_doc in responses_ref.order_by('timestamp').stream():
            response_data = resp_doc.to_dict()
            responses.append({
                'id': resp_doc.id,
                'author': response_data.get('author', 'Anónimo'),
                'content': response_data.get('content', ''),
                'timestamp': response_data.get('timestamp')
            })
        
        return jsonify(responses)
    except Exception as e:
        app.logger.error(f"Error getting responses: {e}")
        return jsonify([]), 500


@app.route('/forum/topic/<topic_id>/delete', methods=['POST'])
def delete_topic(topic_id):
    """Eliminar un tema del foro"""
    try:
        # Verificar que el usuario sea el autor (aquí deberías implementar tu lógica de autenticación)
        # Por ahora, permitimos eliminar cualquier tema
        
        # Eliminar el documento de Firestore
        fs_client.collection('foro').document(topic_id).delete()
        
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error(f"Error deleting topic: {e}")
        return jsonify({'error': str(e)}), 500


# Actualizar la ruta existente forum_new para manejar mejor los datos
@app.route('/forum/new', methods=['GET', 'POST'])
def forum_new():
    """Crear nuevo tema en el foro"""
    if request.method == 'GET':
        categories = get_categories()
        return render_template('forum_new.html', categories=categories)
    
    try:
        payload = request.form or request.json
        
        # Crear el documento en Firestore
        doc_ref = fs_client.collection('foro').add({
            'titulo': payload['titulo'],
            'contenido': payload['contenido'],
            'category': payload.get('category', ''),
            'author': payload.get('autor', 'Anónimo'),
            'timestamp': firestore.SERVER_TIMESTAMP,
            'votes': 0
        })
        
        # Redirigir al foro principal después de crear
        return redirect(url_for('list_forum'))
        
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore write failed: {e}")
        raise
    except Exception as e:
        app.logger.error(f"Error creating topic: {e}")
        return redirect(url_for('list_forum'))


# Actualizar la ruta list_forum para incluir las categorías
@app.route('/forum')
def list_forum():
    try:
        docs = (
            fs_client.collection('foro')
            .order_by('timestamp', direction=firestore.Query.DESCENDING)
            .stream()
        )
        temas = [{**doc.to_dict(), 'id': doc.id} for doc in docs]
        
        # Obtener categorías
        from modules.forum import get_categories
        categories = get_categories()
        
        return render_template('forum.html', temas=temas, categories=categories)
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore query failed: {e}")
        raise

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])

# Agregar estas rutas a tu app.py para el foro moderno

@app.route('/forum/new', methods=['GET', 'POST'])
def forum_new():
    """Crear nuevo tema en el foro"""
    if request.method == 'GET':
        categories = get_categories()
        return render_template('forum_new.html', categories=categories)
    
    try:
        payload = request.form or request.json
        fs_client.collection('foro').add({
            'titulo': payload['title'],
            'contenido': payload['description'],
            'category': payload['category'],
            'autor': payload.get('autor', 'Anónimo'),
            'timestamp': firestore.SERVER_TIMESTAMP,
            'votes': 0
        })
        return redirect(url_for('list_forum'))
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore write failed: {e}")
        raise


@app.route('/forum/topic/<int:topic_id>')
def forum_topic_view(topic_id):
    """Vista individual de un tema del foro"""
    try:
        # Convertir topic_id a string para Firestore
        doc = fs_client.collection('foro').document(str(topic_id)).get()
        if not doc.exists:
            abort(404)
        
        tema = {**doc.to_dict(), 'id': doc.id}
        
        # Obtener respuestas del tema
        responses_ref = fs_client.collection('foro').document(str(topic_id)).collection('responses')
        responses = []
        for resp_doc in responses_ref.order_by('timestamp').stream():
            responses.append({**resp_doc.to_dict(), 'id': resp_doc.id})
        
        return render_template('forum_topic.html', topic=tema, responses=responses)
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore read failed: {e}")
        raise


@app.route('/forum/topic/<int:topic_id>/reply', methods=['POST'])
def forum_reply(topic_id):
    """Agregar respuesta a un tema"""
    try:
        payload = request.form or request.json
        
        # Agregar respuesta a la subcolección del tema
        fs_client.collection('foro').document(str(topic_id)).collection('responses').add({
            'author': payload.get('author', 'Anónimo'),
            'content': payload['content'],
            'timestamp': firestore.SERVER_TIMESTAMP
        })
        
        return redirect(url_for('forum_topic_view', topic_id=topic_id))
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore write failed: {e}")
        raise


# Funciones helper para el template
@app.template_filter('truncate_words')
def truncate_words(text, count=10):
    """Truncar texto a cierto número de palabras"""
    if not text:
        return ""
    words = text.split()
    if len(words) <= count:
        return text
    return ' '.join(words[:count]) + '...'


@app.template_filter('time_ago')
def time_ago(timestamp):
    """Convertir timestamp a formato 'hace X tiempo'"""
    if not timestamp:
        return "Fecha desconocida"
    
    from datetime import datetime, timezone
    import math
    
    now = datetime.now(timezone.utc)
    if hasattr(timestamp, 'timestamp'):
        # Firestore timestamp
        diff = now - timestamp.replace(tzinfo=timezone.utc)
    else:
        # String timestamp
        try:
            dt = datetime.fromisoformat(str(timestamp).replace('Z', '+00:00'))
            diff = now - dt
        except:
            return str(timestamp)
    
    seconds = diff.total_seconds()
    
    if seconds < 60:
        return "Hace unos segundos"
    elif seconds < 3600:
        minutes = math.floor(seconds / 60)
        return f"Hace {minutes} minuto{'s' if minutes != 1 else ''}"
    elif seconds < 86400:
        hours = math.floor(seconds / 3600)
        return f"Hace {hours} hora{'s' if hours != 1 else ''}"
    else:
        days = math.floor(seconds / 86400)
        return f"Hace {days} día{'s' if days != 1 else ''}"


# Context processor para datos globales del foro
@app.context_processor
def forum_context():
    """Inyectar datos globales del foro en todos los templates"""
    return {
        'forum_stats': {
            'total_topics': 342,
            'total_responses': 1247,
            'active_members': 89,
            'online_now': 12
        }
    }
