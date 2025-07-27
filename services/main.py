from flask import Flask
from flask_session import Session
from flask_cors import CORS
from routes.chat import chat_bp
from routes.forum_auth import forum_auth_bp
from services.sockets import socketio  # 👈 Importa socketio

app = Flask(__name__)
app.config.from_pyfile('config.py')

# Inicializaciones
Session(app)
CORS(app, supports_credentials=True)
socketio.init_app(app)  # 👈 Conecta socketio a la app Flask

# Blueprints
app.register_blueprint(chat_bp, url_prefix='/chat')
app.register_blueprint(forum_auth_bp, url_prefix='/forum')

# Resto de tu configuración...

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)  # 👈 Usa socketio.run para habilitar WebSocket
