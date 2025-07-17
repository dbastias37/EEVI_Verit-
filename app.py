import os
import re
import sqlite3
import time
import datetime
from datetime import datetime as dt, timezone
import json
from google.oauth2 import service_account
from google.cloud import firestore
from werkzeug.security import generate_password_hash
from flask import (
    Flask, render_template, request, redirect, jsonify,
    url_for, session, flash, abort
)
from jinja2 import TemplateNotFound

from google.api_core.exceptions import GoogleAPICallError
from utils.template_filters import register_filters



from config import config
from utils.db import db, migrate, get_db, close_db, init_db
from utils.auth import ensure_admin_user
from routes.admin import admin_bp
from routes.client import client_bp
from services.project_manager import ProjectManager
from services.comment_manager import CommentManager
from utils.quotes import get_random_quote
from modules.forum import get_categories
from utils.forum_utils import (
    normalize_topic_data,
    mapeo_datos,
    normalize_response_data,
    get_content_from_form,
    get_form_field,
)

def create_app():
    app = Flask(__name__)
    app.config.from_object(config[os.getenv('APP_ENV', 'development')])
    db.init_app(app)
    migrate.init_app(app, db)
    app.jinja_env.globals['get_random_quote'] = get_random_quote
    app.register_blueprint(admin_bp)
    app.register_blueprint(client_bp)
    app.teardown_appcontext(close_db)

    register_filters(app)

    with app.app_context():
        init_db(app)
        ensure_admin_user()

    return app

app = create_app()

# --- Firebase initialization (local/Render) ---
credentials_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")

if not credentials_json:
    raise Exception("No se encontró la variable de entorno GOOGLE_APPLICATION_CREDENTIALS_JSON")

credentials_dict = json.loads(credentials_json)

cred = service_account.Credentials.from_service_account_info(credentials_dict)

fs_client = firestore.Client(credentials=cred)

foro_ref = fs_client.collection("foro")
respuestas_ref = fs_client.collection("respuestas")

# Ejemplo de guardar una respuesta dentro de un tema
def guardar_respuesta(id_tema, data_respuesta):
    """Guarda una respuesta en la subcolección 'respuestas' de un tema específico."""
    respuestas_ref = foro_ref.document(id_tema).collection("respuestas")
    respuestas_ref.add(data_respuesta)


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





@app.route('/forum/<string:topic_id>')
def view_topic(topic_id):
    try:
        doc = fs_client.collection('foro').document(topic_id).get()
        if not doc.exists:
            abort(404)
        tema = mapeo_datos({**doc.to_dict(), 'id': doc.id})
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

@app.route('/forum/topic/<string:topic_id>/responses')
def get_topic_responses(topic_id):
    """Obtener respuestas de un tema específico"""
    try:
        if str(topic_id).isdigit():
            from modules import forum as forum_db
            rows = forum_db.get_responses_for_topic(int(topic_id))
            responses = [
                {
                    'id': r[0],
                    'author': r[1],
                    'content': r[2],
                    'timestamp': r[3],
                }
                for r in rows
            ]
            return jsonify(responses)

        responses_ref = fs_client.collection('foro').document(topic_id).collection('responses')
        responses = []
        for resp_doc in responses_ref.order_by('created_at').stream():
            rdata = normalize_response_data({**resp_doc.to_dict(), 'id': resp_doc.id})
            responses.append(rdata)
        return jsonify(responses)
    except Exception as e:
        app.logger.error(f"Error getting responses: {e}")
        return jsonify([]), 500


@app.route('/forum/topic/<string:topic_id>/delete', methods=['POST'])
def delete_topic_route(topic_id):
    """Eliminar un tema del foro"""
    try:
        if str(topic_id).isdigit():
            from modules import forum as forum_db
            forum_db.delete_topic_by_id(int(topic_id))
            return jsonify({'success': True})

        fs_client.collection('foro').document(topic_id).delete()
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error(f"Error deleting topic: {e}")
        return jsonify({'error': str(e)}), 500


# Endpoint para crear nuevos temas en Firestore
@app.route('/forum/new', methods=['GET', 'POST'], endpoint='create_new_forum')
def forum_new():
    if request.method == 'POST':
        print("Form data received:", request.form.to_dict())

        nombre = get_form_field(request, ['autor', 'author', 'nombre']) or 'Anónimo'
        categoria = get_form_field(request, ['categoria', 'category']) or ''
        titulo = get_form_field(request, ['titulo', 'title'])
        contenido = get_form_field(request, ['contenido', 'description', 'content'])

        if not titulo or not contenido:
            return "Título y contenido son obligatorios", 400

        nuevo_tema = {
            'author': nombre,
            'category': categoria,
            'title': titulo,
            'description': contenido,
            'created_at': datetime.datetime.utcnow().isoformat()
        }

        fs_client.collection('foro').add(nuevo_tema)
        return redirect(url_for('list_forum'))

    categories = get_categories()
    return render_template('forum_new.html', categories=categories)



if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])


@app.route('/forum/topic/<string:topic_id>')
def forum_topic_view(topic_id):
    """Vista individual de un tema del foro"""
    try:
        if str(topic_id).isdigit():
            # Compatibilidad con IDs numéricos de SQLite
            from modules import forum as forum_db
            tema = forum_db.get_topic_by_id(int(topic_id))
            if not tema:
                abort(404)
            raw_responses = forum_db.get_responses_for_topic(int(topic_id))
            responses = [
                normalize_response_data(
                    {
                        "id": r[0],
                        "author": r[1],
                        "content": r[2],
                        "created_at": r[3],
                    }
                )
                for r in raw_responses
            ]
            return render_template("forum_topic.html", topic=tema, responses=responses)

        # ID de Firestore (string)
        doc = fs_client.collection('foro').document(str(topic_id)).get()
        if not doc.exists:
            abort(404)

        tema = mapeo_datos({**doc.to_dict(), 'id': doc.id})

        # Obtener respuestas del tema
        responses_ref = fs_client.collection('foro').document(str(topic_id)).collection('responses')
        responses = []
        for resp_doc in responses_ref.order_by('created_at').stream():
            rdata = normalize_response_data({**resp_doc.to_dict(), 'id': resp_doc.id})
            responses.append(rdata)

        return render_template('forum_topic.html', topic=tema, responses=responses)
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore read failed: {e}")
        raise


@app.route('/forum/topic/<string:topic_id>/reply', methods=['POST'])
def forum_reply(topic_id):
    """Agregar respuesta a un tema"""
    try:
        payload = request.form or request.json
        content = get_content_from_form(payload)

        if str(topic_id).isdigit():
            from modules import forum as forum_db
            forum_db.create_response(int(topic_id), payload.get('author', 'Anónimo'), content)
            return redirect(url_for('forum_topic_view', topic_id=topic_id))

        # Agregar respuesta a la subcolección del tema en Firestore
        fs_client.collection('foro').document(str(topic_id)).collection('responses').add({
            'author': payload.get('author', 'Anónimo'),
            'content': content,
            'created_at': firestore.SERVER_TIMESTAMP
        })

        return redirect(url_for('forum_topic_view', topic_id=topic_id))
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore write failed: {e}")
        raise


@app.route('/forum/<string:post_id>/responder', methods=['POST'])
def responder(post_id):
    """Guardar una respuesta en la subcolección 'respuestas' de un post"""
    try:
        payload = request.form or request.json or {}
        contenido = get_content_from_form(payload)
        if not contenido:
            return jsonify({'error': 'La respuesta no puede estar vacía'}), 400

        respuesta_data = {
            'content': contenido,
            'created_at': datetime.datetime.utcnow(),
            'author': 'Anónimo'
        }

        fs_client.collection('foro').document(post_id).collection('respuestas').add(respuesta_data)

        return jsonify({'success': True, 'mensaje': 'Respuesta guardada correctamente'}), 200

    except Exception as e:
        print(f'Error al guardar respuesta: {e}')
        return jsonify({'error': str(e)}), 500


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


def safe_get_timestamp(item):
    """Safely extract a datetime object for sorting."""
    ts = (
        item.get('created_at')
        or item.get('timestamp')
        or item.get('fecha')
    )
    if ts is None:
        return dt.min.replace(tzinfo=timezone.utc)
    if isinstance(ts, dt):
        if ts.tzinfo is None:
            return ts.replace(tzinfo=timezone.utc)
        return ts.astimezone(timezone.utc)
    if isinstance(ts, str):
        try:
            if ts.endswith('Z'):
                ts = ts[:-1] + '+00:00'
            ts_dt = dt.fromisoformat(ts)
        except ValueError:
            return dt.min.replace(tzinfo=timezone.utc)
        if ts_dt.tzinfo is None:
            return ts_dt.replace(tzinfo=timezone.utc)
        return ts_dt.astimezone(timezone.utc)
    return dt.min.replace(tzinfo=timezone.utc)




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


# Ruta principal del foro
@app.route('/forum')
def list_forum():
    try:
        temas = [
            mapeo_datos({**doc.to_dict(), 'id': doc.id})
            for doc in foro_ref.stream()
        ]
        temas = sorted(temas, key=safe_get_timestamp, reverse=True)

        # Obtener categorías
        categories = get_categories()

        return render_template('forum.html', temas=temas, categories=categories)
    except GoogleAPICallError as e:
        app.logger.error(f"Firestore query failed: {e}")
        raise
