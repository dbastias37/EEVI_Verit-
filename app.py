import os
import re
import sqlite3
import time
from datetime import datetime as dt, timezone, timedelta
import json

try:
    from google.cloud import firestore
except Exception:  # pragma: no cover - optional deps for tests
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
from utils.user_auth import (
    create_user,
    get_user,
    check_password,
    save_profile_pic,
)
from routes.admin import admin_bp
from routes.client import client_bp
from routes.auth import auth_bp
from routes.forum_auth import forum_auth_bp
from routes.projects import projects_bp
from routes.messages import messages_bp
from routes.friends import friends_bp
from routes.chat import chat_bp
from routes.user_status import status_bp
from services.project_manager import ProjectManager
from services.comment_manager import CommentManager
from services.fs_client import fs_client
from utils.quotes import get_random_quote
from modules.forum import get_categories
from utils.forum_utils import (
    normalize_topic_data,
    mapeo_datos,
    normalize_response_data,
    get_content_from_form,
    get_form_field,
)

# Crear la instancia de Flask globalmente
app = Flask(__name__)
app.config.from_object(config[os.getenv('APP_ENV', 'development')])

# Inicializar extensiones
db.init_app(app)
migrate.init_app(app, db)

# Configurar template globals y filtros
app.jinja_env.globals['get_random_quote'] = get_random_quote
register_filters(app)

# Registrar blueprints
app.register_blueprint(admin_bp)
app.register_blueprint(client_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(forum_auth_bp)
app.register_blueprint(projects_bp)
app.register_blueprint(messages_bp)
app.register_blueprint(friends_bp, url_prefix='/friends')
app.register_blueprint(chat_bp, url_prefix='/chat')
app.register_blueprint(status_bp, url_prefix='/status')

# Inicializar Firebase/Firestore si está disponible
usuarios_ref = None
foro_ref = None

try:
    if fs_client:
        usuarios_ref = fs_client.collection('usuarios')
        foro_ref = fs_client.collection('foro')
except Exception as e:  # pragma: no cover - runtime env may lack Firestore
    print(f"Warning: Firebase no disponible: {e}")

# Funciones helper para usuarios online
def mark_online(user_id, role):
    ONLINE_USERS[user_id] = {
        'id': user_id,
        'role': role,
        'last': dt.now(timezone.utc)
    }

def prune_online():
    now = dt.now(timezone.utc)
    for uid, info in list(ONLINE_USERS.items()):
        if (now - info['last']).total_seconds() > 300:
            ONLINE_USERS.pop(uid, None)

def remove_online(user_id):
    ONLINE_USERS.pop(user_id, None)

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

    five_minutes_ago = dt.now(timezone.utc) - timedelta(minutes=5)
    online_staff = []
    try:
        staff_query = usuarios_ref.where('role', 'in', ['admin', 'moderator']).where('is_online', '==', True).stream()
        for doc in staff_query:
            user = doc.to_dict()
            last_seen = user.get('last_seen')
            if last_seen and last_seen > five_minutes_ago:
                online_staff.append({
                    'id': doc.id,
                    'username': user['username'],
                    'role': user['role'],
                    'profile_pic': user.get('profile_pic', '/static/img/avatar.png')
                })
    except Exception as e:
        print(f"Error getting online staff: {e}")
    
    return online_staff

def safe_get_timestamp(item):
    ts = item.get('created_at') or item.get('last_seen')
    if not ts:
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

# Context processor para el foro
@app.context_processor
def forum_context():
    online_staff = get_online_staff() if usuarios_ref else []

    online_count = 0
    if usuarios_ref:
        try:
            five_minutes_ago = dt.now(timezone.utc) - timedelta(minutes=5)
            online_users = usuarios_ref.where('is_online', '==', True).stream()
            for doc in online_users:
                user = doc.to_dict()
                if user.get('last_seen') and user['last_seen'] > five_minutes_ago:
                    online_count += 1
        except Exception:
            pass

    total_topics = 0
    if foro_ref:
        try:
            total_topics = len(list(foro_ref.stream()))
        except Exception:
            pass

    return {
        'forum_stats': {
            'total_topics': total_topics,
            'total_responses': 0,
            'active_members': len(list(usuarios_ref.stream())) if usuarios_ref else 0,
            'online_now': online_count
        },
        'online_staff': online_staff
    }

# Rutas específicas del foro (ahora con app definido)
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

        if fs_client:
            nuevo_tema = {
                'author': nombre,
                'category': categoria,
                'title': titulo,
                'description': contenido,
                'created_at': dt.now(timezone.utc).isoformat()
            }
            try:
                fs_client.collection('foro').add(nuevo_tema)
                return redirect(url_for('list_forum'))
            except Exception as e:
                print(f"Error creating topic: {e}")
                flash('Error al crear el tema', 'error')

    categories = get_categories()
    return render_template('forum_new.html', categories=categories)

@app.route('/forum/topic/<string:topic_id>')
def forum_topic_view(topic_id):
    """Vista individual de un tema del foro"""
    try:
        if str(topic_id).isdigit():
            from modules import forum as forum_db
            tema = forum_db.get_topic_by_id(int(topic_id))
            if not tema:
                abort(404)
            raw_responses = forum_db.get_responses_for_topic(int(topic_id))
            responses = []
            for r in raw_responses:
                responses.append({
                    'id': r[0],
                    'author': r[1],
                    'content': r[2],
                    'created_at': r[3]
                })
            return render_template('forum_topic.html', topic=tema, responses=responses)
        else:
            # Procesamiento para Firestore
            if not fs_client:
                abort(503)
            
            doc = fs_client.collection('foro').document(topic_id).get()
            if not doc.exists:
                abort(404)
            
            topic_data = doc.to_dict()
            topic = normalize_topic_data({**topic_data, 'id': doc.id})
            
            # Obtener respuestas
            responses_ref = fs_client.collection('foro').document(topic_id).collection('respuestas')
            responses = []
            try:
                for resp_doc in responses_ref.stream():
                    resp_data = resp_doc.to_dict()
                    responses.append(normalize_response_data({**resp_data, 'id': resp_doc.id}))
            except Exception as e:
                print(f"Error getting responses: {e}")
            
            return render_template('forum_topic.html', topic=topic, responses=responses)
            
    except Exception as e:
        app.logger.error(f"Error al mostrar el tema: {e}")
        abort(500)

@app.route('/forum/<string:post_id>/responder', methods=['POST'])
def responder(post_id):
    """Guardar una respuesta en la subcolección 'respuestas' de un post"""
    if not fs_client:
        return jsonify({'error': 'Servicio no disponible'}), 503
        
    try:
        payload = request.form or request.json or {}
        contenido = get_content_from_form(payload)
        if not contenido:
            return jsonify({'error': 'La respuesta no puede estar vacía'}), 400

        respuesta_data = {
            'content': contenido,
            'created_at': dt.now(timezone.utc),
            'author': 'Anónimo'
        }

        fs_client.collection('foro').document(post_id).collection('respuestas').add(respuesta_data)

        return jsonify({'success': True, 'mensaje': 'Respuesta guardada correctamente'}), 200

    except Exception as e:
        print(f'Error al guardar respuesta: {e}')
        return jsonify({'error': str(e)}), 500

@app.route('/forum/topic/<string:topic_id>/reply', methods=['POST'])
def forum_reply(topic_id):
    """Manejar respuestas a temas del foro"""
    if request.method == 'POST':
        author = request.form.get('author', 'Anónimo')
        content = request.form.get('content', '')
        
        if not content.strip():
            flash('El contenido no puede estar vacío', 'error')
            return redirect(url_for('forum_topic_view', topic_id=topic_id))
        
        try:
            if fs_client and not str(topic_id).isdigit():
                # Firestore
                respuesta_data = {
                    'author': author,
                    'content': content,
                    'created_at': dt.now(timezone.utc)
                }
                fs_client.collection('foro').document(topic_id).collection('respuestas').add(respuesta_data)
            else:
                # SQLite
                from modules import forum as forum_db
                forum_db.create_response(int(topic_id), author, content)
            
            flash('Respuesta agregada correctamente', 'success')
        except Exception as e:
            print(f"Error adding reply: {e}")
            flash('Error al agregar la respuesta', 'error')
        
        return redirect(url_for('forum_topic_view', topic_id=topic_id))

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
    
    try:
        usuarios_ref.document(user_id).update({'profile_pic': profile_pic})
        return jsonify(success=True)
    except Exception as e:
        print(f"Error updating avatar: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/forum')
def list_forum():
    """Listar temas del foro"""
    try:
        temas = []
        if fs_client:
            try:
                docs = foro_ref.stream()
                temas = [
                    mapeo_datos({**doc.to_dict(), 'id': doc.id})
                    for doc in docs
                ]
            except Exception as e:
                print(f"Error getting forum topics: {e}")
        
        categories = get_categories()
        return render_template('forum.html', temas=temas, categories=categories)
        
    except Exception as e:
        app.logger.error(f"Error al listar el foro: {e}")
        abort(500)

# Función para crear la app (mantener para compatibilidad)
def create_app():
    return app

# Inicializar la base de datos al arrancar
with app.app_context():
    try:
        init_db(app)
    except Exception as e:
        print(f"Warning: Could not initialize database: {e}")

if __name__ == '__main__':
    app.run(debug=os.getenv('APP_ENV', 'development') == 'development')
