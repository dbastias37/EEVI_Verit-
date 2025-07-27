from flask_socketio import SocketIO, emit
from flask import session

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    print('Usuario conectado')

@socketio.on('disconnect')
def handle_disconnect():
    print('Usuario desconectado')

@socketio.on('chat message')
def handle_chat_message(data):
    # Opcional: puedes guardar en Firestore aquí si quieres persistencia
    print('Mensaje recibido:', data)
    emit('chat message', data, broadcast=True)
