from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from datetime import datetime
import os
import logging

# Imports existentes
from routes.admin import admin_bp
from routes.client import client_bp
from routes.auth import auth_bp
from routes.projects import projects_bp
from routes.messages import messages_bp

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

# ===== CONFIGURACIÓN CRÍTICA DB_PATH =====
if os.environ.get('RENDER'):
    app.config['DB_PATH'] = '/opt/render/project/src/verite.db'
else:
    app.config['DB_PATH'] = 'verite.db'

app.secret_key = os.environ.get('SECRET_KEY', 'tu_secret_key_aqui')

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

if FRIENDS_AVAILABLE:
    app.register_blueprint(friends_bp, url_prefix='/friends')

if STATUS_AVAILABLE:
    app.register_blueprint(status_bp, url_prefix='/status')

if FORUM_AUTH_AVAILABLE:
    app.register_blueprint(forum_auth_bp, url_prefix='/forum')

# ===== AGREGAR RUTAS DE FORUM FALTANTES =====
from utils.template_filters import register_filters
register_filters(app)

@app.context_processor
def inject_global_vars():
    from utils.quotes import get_random_quote
    return {
        'get_random_quote': get_random_quote
    }

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
    try:
        return redirect(url_for('client.home'))
    except Exception as e:
        logging.error(f"Error in index route: {e}")
        return f"Error: {e}", 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = not os.environ.get('RENDER')
    app.run(host='0.0.0.0', port=port, debug=debug)
