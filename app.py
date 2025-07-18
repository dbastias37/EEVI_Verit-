import os
import re
import sqlite3
import time
import datetime
from datetime import datetime as dt, timezone
from datetime import datetime as dt, timezone, timedelta
import json
try:
    from google.oauth2 import service_account
    from google.cloud import firestore
except Exception:  # pragma: no cover - optional deps for tests
    service_account = None
    firestore = None
from werkzeug.security import generate_password_hash
from flask import (
    Flask, render_template, request, redirect, jsonify,
    url_for, session, flash, abort
)
from jinja2 import TemplateNotFound

ONLINE_USERS = {}

from google.api_core.exceptions import GoogleAPICallError
from utils.template_filters import register_filters



from config import config
from utils.db import db, migrate, get_db, close_db, init_db
from utils.auth import ensure_admin_user
from routes.admin import admin_bp
from routes.client import client_bp
from routes.auth import auth_bp
from routes.forum_auth import forum_auth_bp
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

def mark_online(user_id, role):
    ONLINE_USERS[user_id] = {
        'id': user_id,
        'role': role,
        'last': dt.utcnow()
        'last': dt.now(timezone.utc)
    }

def prune_online():
    now = dt.utcnow()
    now = dt.now(timezone.utc)
    for uid, info in list(ONLINE_USERS.items()):
        if (now - info['last']).total_seconds() > 300:
            ONLINE_USERS.pop(uid, None)

def remove_online(user_id):
    ONLINE_USERS.pop(user_id, None)

# Sistema mejorado de usuarios online
def update_online_status():
    """Actualizar estado online en Firebase cada 5 minutos"""
    if session.get('forum_user') and usuarios_ref:
        user_id = session['forum_user']['id']
        usuarios_ref.document(user_id).update({
            'last_seen': firestore.SERVER_TIMESTAMP,
            'is_online': True
        })

def get_online_staff():
    """Obtener staff online desde Firebase"""
    if not usuarios_ref:
        return []

    five_minutes_ago = datetime.utcnow() - timedelta(minutes=5)
    five_minutes_ago = datetime.datetime.now(datetime.timezone.utc) - timedelta(minutes=5)
    online_staff = []
    staff_query = usuarios_ref.where('role', 'in', ['admin', 'moderator']).where('is_online', '==', True).stream()

    for doc in staff_query:
        user = doc.to_dict()
        if user.get('last_seen') and user['last_seen'] > five_minutes_ago:
            online_staff.append({
                'id': doc.id,
                'username': user['username'],
                'role': user['role'],
                'profile_pic': user.get('profile_pic', '/static/img/avatar.png')
            })

    return online_staff

def create_app():
    app = Flask(__name__)
    app.config.from_object(config[os.getenv('APP_ENV', 'development')])
    db.init_app(app)
    migrate.init_app(app, db)
    app.jinja_env.globals['get_random_quote'] = get_random_quote
    app.register_blueprint(admin_bp)
    app.register_blueprint(client_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(forum_auth_bp)
@@ -344,51 +344,51 @@ def delete_topic_route(topic_id):
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
            'created_at': datetime.datetime.now(datetime.timezone.utc).isoformat()
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
@@ -439,51 +439,51 @@ def forum_reply(topic_id):

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
            'created_at': datetime.datetime.now(datetime.timezone.utc),
            'author': 'Anónimo'
        }

        fs_client.collection('foro').document(post_id).collection('respuestas').add(respuesta_data)

        return jsonify({'success': True, 'mensaje': 'Respuesta guardada correctamente'}), 200

    except Exception as e:
        print(f'Error al guardar respuesta: {e}')
        return jsonify({'error': str(e)}), 500


@app.route('/api/update-forum-avatar', methods=['POST'])
def update_forum_avatar():
    """Sincronizar foto de perfil del foro"""
    if not usuarios_ref:
        return jsonify({'error': 'Servicio no disponible'}), 503
    data = request.get_json() or {}
    user_id = data.get('user_id')
    profile_pic = data.get('profile_pic')
    if not user_id or not profile_pic:
        return jsonify({'error': 'Datos faltantes'}), 400
    usuarios_ref.document(user_id).update({'profile_pic': profile_pic})
    return jsonify(success=True)

@@ -513,51 +513,51 @@ def safe_get_timestamp(item):
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
    online_staff = get_online_staff() if usuarios_ref else []

    online_count = 0
    if usuarios_ref:
        five_minutes_ago = datetime.datetime.utcnow() - datetime.timedelta(minutes=5)
        five_minutes_ago = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(minutes=5)
        online_users = usuarios_ref.where('is_online', '==', True).stream()
        for doc in online_users:
            user = doc.to_dict()
            if user.get('last_seen') and user['last_seen'] > five_minutes_ago:
                online_count += 1

    return {
        'forum_stats': {
            'total_topics': len(list(foro_ref.stream())) if foro_ref else 0,
            'total_responses': 0,
            'active_members': len(list(usuarios_ref.stream())) if usuarios_ref else 0,
            'online_now': online_count
        },
        'online_staff': online_staff
    }


# Ruta principal del foro
@app.route('/forum')
def list_forum():
    try:
        temas = [
            mapeo_datos({**doc.to_dict(), 'id': doc.id})
            for doc in foro_ref.stream()
        ]
