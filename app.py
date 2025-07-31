from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from datetime import datetime
from flask_login import LoginManager, current_user, UserMixin
from dotenv import load_dotenv

import os
import logging
import time
import uuid

# Imports existentes )necesito estructurar todo)
from routes.chat import chat_bp
from routes.admin import admin_bp
from routes.client import client_bp
from routes.auth import auth_bp
from routes.projects import projects_bp
from routes.messages import messages_bp
from routes.chat_api import chat_api_bp
from routes.forum_stats import forum_bp as forum_stats_bp

from extensions import socketio
import sockets  # Importar el módulo de sockets

# Nuevos blueprints
try:
    from routes.friends import friends_bp
    FRIENDS_AVAILABLE = True
except ImportError:
    FRIENDS_AVAILABLE = False

try:
    from routes.user_status import status_bp
    STATUS_AVAILABLE = True
except ImportError:
    STATUS_AVAILABLE = False

try:
    from routes.forum_auth import forum_auth_bp
    FORUM_AUTH_AVAILABLE = True
except ImportError:
    FORUM_AUTH_AVAILABLE = False

# Configuración
logging.basicConfig(level=logging.INFO)
app = Flask(__name__)

from flask_cors import CORS
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

# --- Autenticación mínima para evitar fallos de import ---
login_manager = LoginManager(app)


def generate_unique_id():
    return str(uuid.uuid4())


def current_timestamp():
    return int(time.time() * 1000)


class Anonymous(UserMixin):
    """Representa a un usuario no autenticado."""
    id = "anonymous"


@login_manager.user_loader
def load_user(user_id):
    # Siempre devolvemos un usuario anónimo
    return Anonymous()

# ===== CONFIGURACIÓN CRÍTICA DB_PATH =====
if os.environ.get('RENDER'):
    app.config['DB_PATH'] = '/opt/render/project/src/verite.db'
else:
    app.config['DB_PATH'] = 'verite.db'

# Configuración de la clave secreta usando variable de entorno
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY", "default-secret-key")

# Configurar SocketIO con dominio permitido desde variables de entorno
render_domain = os.getenv("RENDER_EXTERNAL_URL")
cors_origins = [render_domain] if render_domain else "*"
socketio.init_app(app, cors_allowed_origins=cors_origins, async_mode="eventlet")

# Inicializar BD
from utils.db import init_db
try:
    init_db(app)
    print(f"✅ BD inicializada: {app.config['DB_PATH']}")
except Exception as e:
    print(f"⚠️ Error BD: {e}")

# Registrar blueprints
app.register_blueprint(admin_bp, url_prefix='/admin')
app.register_blueprint(client_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(projects_bp, url_prefix='/projects')
app.register_blueprint(messages_bp, url_prefix='/messages')
app.register_blueprint(chat_bp, url_prefix='/chat')
app.register_blueprint(chat_api_bp, url_prefix='/api')

if FRIENDS_AVAILABLE:
    app.register_blueprint(friends_bp, url_prefix='/friends')

if STATUS_AVAILABLE:
    app.register_blueprint(status_bp, url_prefix='/status')

if FORUM_AUTH_AVAILABLE:
    app.register_blueprint(forum_auth_bp, url_prefix='/forum')

# Estadísticas del foro
app.register_blueprint(forum_stats_bp, url_prefix='/forum')

# ===== AGREGAR RUTAS DE FORUM FALTANTES =====
from utils.template_filters import register_filters
register_filters(app)

@app.context_processor
def inject_global_vars():
    from utils.quotes import get_random_quote
    return {
        'get_random_quote': get_random_quote
    }

# ----- APIs de chat -----
@app.route('/api/messages', methods=['GET'])
def api_get_messages():
    try:
        chat_id = request.args.get('chat_id', 'global')

        # Verificar si existe el store de sockets
        try:
            messages = sockets.get_messages_for_api(chat_id)
            if messages:
                print(f"📡 API: Enviando {len(messages)} mensajes desde store")
                return jsonify(messages)
        except (AttributeError, NameError):
            print("⚠️ Store de sockets no disponible")

        # Fallback: mensajes básicos para que funcione
        fallback_messages = [
            {"id":1,"text":"Sistema inicializado","timestamp":"2025-07-28 04:00:00","user":"Sistema","chat_id":"global"}
        ]

        print(f"📡 API: Enviando mensajes fallback: {len(fallback_messages)}")
        return jsonify(fallback_messages)

    except Exception as e:
        print(f"❌ Error en API get_messages: {e}")
        # NUNCA devolver respuesta vacía que cause JSON error
        return jsonify([])


@app.route('/api/messages', methods=['POST'])
def api_post_message():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Asegurar que sockets.messages_store existe
        if not hasattr(sockets, 'messages_store'):
            sockets.messages_store = []

        message = {
            'id': len(sockets.messages_store) + 1,
            'text': data.get('text', ''),
            'user': data.get('user', data.get('sender', 'Anónimo')),
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'chat_id': data.get('chat_id', 'global')
        }

        sockets.messages_store.append(message)

        # CRÍTICO: Emitir evento correcto "message" no "new_message"
        try:
            emit_message = dict(message)
            emit_message['sender'] = message['user']
            socketio.emit('message', emit_message, room=message['chat_id'])
            print(f"💬 Socket: Mensaje emitido correctamente")
        except Exception as socket_error:
            print(f"⚠️ Error Socket.IO: {socket_error}")

        print(f"💬 API: Mensaje guardado - ID: {message['id']}")
        return jsonify(message), 201

    except Exception as e:
        print(f"❌ Error en API post_message: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/debug/users')
def debug_users():
    """Debug: Ver usuarios conectados"""
    try:
        from sockets import get_connected_users_info
        return jsonify(get_connected_users_info())
    except:
        return jsonify({'error': 'No disponible'}), 500

# ======== Rutas estáticas y debug ========
@app.route('/static/dist/<path:filename>')
def serve_static_dist(filename):
    from flask import send_from_directory
    import os
    dist_path = os.path.join(app.root_path, 'static', 'dist')
    if os.path.exists(os.path.join(dist_path, filename)):
        return send_from_directory(dist_path, filename)
    else:
        print(f"❌ Archivo no encontrado: {filename}")
        return "File not found", 404

@app.route('/debug/chat-status')
def debug_chat_status():
    try:
        store_size = len(getattr(sockets, 'messages_store', []))
        import os
        bundle_path = os.path.join(app.root_path, 'static', 'dist', 'bundle.js')
        bundle_exists = os.path.exists(bundle_path)
        bundle_size = os.path.getsize(bundle_path) if bundle_exists else 0

        return jsonify({
            'messages_store_size': store_size,
            'bundle_exists': bundle_exists,
            'bundle_size_bytes': bundle_size,
            'status': 'ok' if bundle_size > 0 and store_size >= 0 else 'error'
        })
    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'})

# ===== RUTAS DE FORUM PRINCIPALES =====
@app.route('/forum')
def list_forum():
    """Ruta principal del foro"""
    try:
        from modules.forum import get_categories
        from services.fs_client import fs_client
        from google.cloud import firestore

        # Obtener categorías
        categories = get_categories()

        # Obtener temas desde Firebase
        temas = []
        if fs_client:
            try:
                docs = fs_client.collection('foro').order_by('created_at', direction=firestore.Query.DESCENDING).limit(10).stream()
                for doc in docs:
                    tema = doc.to_dict()
                    tema['id'] = doc.id
                    temas.append(tema)
            except Exception as e:
                print(f"Error loading forum topics: {e}")

        # Usuarios online mock
        online_staff = []

        return render_template('forum.html', 
                             categories=categories,
                             temas=temas,
                             online_staff=online_staff)
    except Exception as e:
        logging.error(f"Error in list_forum: {e}")
        return render_template('forum.html', 
                             categories=[],
                             temas=[],
                             online_staff=[])

@app.route('/forum/new', methods=['GET', 'POST'])
def create_new_forum():
    """Crear nuevo tema en el foro"""
    if request.method == 'GET':
        from modules.forum import get_categories
        categories = get_categories()
        return render_template('forum_new.html', categories=categories)

    # POST - crear tema
    try:
        from services.fs_client import fs_client
        from google.cloud import firestore

        if not fs_client:
            return redirect(url_for('list_forum'))

        titulo = request.form.get('titulo')
        categoria = request.form.get('categoria')
        contenido = request.form.get('contenido')
        autor = request.form.get('autor', 'Anónimo')

        # Crear tema en Firebase
        tema_data = {
            'titulo': titulo,
            'categoria': categoria,
            'contenido': contenido,
            'autor': autor,
            'created_at': firestore.SERVER_TIMESTAMP
        }

        doc_ref = fs_client.collection('foro').add(tema_data)
        return redirect(url_for('forum_topic_view', topic_id=doc_ref[1].id))

    except Exception as e:
        logging.error(f"Error creating forum topic: {e}")
        return redirect(url_for('list_forum'))

@app.route('/forum/topic/<topic_id>')
def forum_topic_view(topic_id):
    """Ver tema específico del foro"""
    try:
        from services.fs_client import fs_client

        if not fs_client:
            return render_template('forum_topic.html', topic=None, responses=[])

        # Obtener tema
        doc = fs_client.collection('foro').document(topic_id).get()
        if not doc.exists:
            return render_template('forum_topic.html', topic=None, responses=[])

        topic = doc.to_dict()
        topic['id'] = doc.id

        # Obtener respuestas
        responses = []
        responses_ref = fs_client.collection('foro').document(topic_id).collection('respuestas')
        for resp_doc in responses_ref.order_by('created_at').stream():
            response = resp_doc.to_dict()
            response['id'] = resp_doc.id
            responses.append(response)

        return render_template('forum_topic.html', topic=topic, responses=responses)

    except Exception as e:
        logging.error(f"Error loading topic {topic_id}: {e}")
        return render_template('forum_topic.html', topic=None, responses=[])

@app.route('/forum/topic/<topic_id>/reply', methods=['POST'])
def forum_reply(topic_id):
    """Responder a un tema del foro"""
    try:
        from services.fs_client import fs_client
        from google.cloud import firestore

        if not fs_client:
            return redirect(url_for('forum_topic_view', topic_id=topic_id))

        author = request.form.get('author', 'Anónimo')
        content = request.form.get('content')

        if not content:
            return redirect(url_for('forum_topic_view', topic_id=topic_id))

        # Crear respuesta
        response_data = {
            'author': author,
            'content': content,
            'created_at': firestore.SERVER_TIMESTAMP
        }

        fs_client.collection('foro').document(topic_id).collection('respuestas').add(response_data)
        return redirect(url_for('forum_topic_view', topic_id=topic_id))

    except Exception as e:
        logging.error(f"Error creating reply: {e}")
        return redirect(url_for('forum_topic_view', topic_id=topic_id))


@app.route('/forum/topics')
def forum_topics_api():
    """Retorna temas filtrados por categoría"""
    category = request.args.get('category', '')
    try:
        from services.fs_client import fs_client
        from google.cloud import firestore

        if not fs_client:
            return jsonify({'success': True, 'topics': []})

        query = fs_client.collection('foro')
        if category:
            query = query.where('categoria', '==', category)

        docs = query.order_by('created_at', direction=firestore.Query.DESCENDING).limit(20).stream()

        topics = []
        for doc in docs:
            d = doc.to_dict()
            d['id'] = doc.id
            topics.append({
                'id': d.get('id'),
                'title': d.get('titulo') or d.get('title'),
                'author': d.get('autor') or d.get('author', 'Anónimo'),
                'category': d.get('categoria') or d.get('category', ''),
                'preview': (d.get('contenido') or d.get('description') or '')[:100],
                'created_at': d.get('created_at')
            })
        return jsonify({'success': True, 'topics': topics})

    except Exception as e:
        logging.error(f"Error loading topics: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

# ===== MANEJO DE ERRORES =====
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    logging.error(f"Internal error: {error}")
    return render_template('503.html'), 500

@app.errorhandler(KeyError)
def handle_key_error(error):
    logging.error(f"KeyError: {error}")
    return f"Configuration error: {error}", 500

@app.teardown_appcontext
def close_db(error):
    from utils.db import close_db
    close_db(error)

# ===== RUTA PRINCIPAL =====
@app.route('/')
def index():
    """Renderiza la vista inicial Home Enhanced."""
    return render_template('home.html')




if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = not os.environ.get('RENDER')
    socketio.run(app, host='0.0.0.0', port=port, debug=debug)
