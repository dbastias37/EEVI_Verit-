from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from datetime import datetime
import os
import logging

# Solo imports que SABEMOS que existen
from routes.admin import admin_bp
from routes.client import client_bp
from routes.auth import auth_bp
from routes.projects import projects_bp
from routes.messages import messages_bp

# NUEVOS - Solo si los creaste
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

# Configuración de logging
logging.basicConfig(level=logging.INFO)

# Crear instancia Flask
app = Flask(__name__)

# Configuración básica
app.secret_key = os.environ.get('SECRET_KEY', 'tu_secret_key_aqui')

# Registrar blueprints que SABEMOS que existen
app.register_blueprint(admin_bp, url_prefix='/admin')
app.register_blueprint(client_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(projects_bp, url_prefix='/projects')
app.register_blueprint(messages_bp, url_prefix='/messages')

# Registrar nuevos blueprints solo si existen
if FRIENDS_AVAILABLE:
    app.register_blueprint(friends_bp, url_prefix='/friends')
    
if STATUS_AVAILABLE:
    app.register_blueprint(status_bp, url_prefix='/status')

# Ruta principal básica
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
