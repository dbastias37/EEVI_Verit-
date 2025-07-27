from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import session

socketio = SocketIO(cors_allowed_origins="*")  # puedes afinar esto en producción

@socketio.on('connect')
def handle_connect():
    print(f"Usuario conectado: {session.get('forum_user', {}).get('username', 'anónimo')}")

@socketio.on('join')
def handle_join(data):
    room = data.get('room')
    join_room(room)
    print(f"Usuario se unió a la sala: {room}")

@socketio.on('leave')
def handle_leave(data):
    room = data.get('room')
    leave_room(room)
    print(f"Usuario salió de la sala: {room}")

@socketio.on('send_message')
def handle_send_message(data):
    room = data.get('room')
    message = data.get('message')
    user = session.get('forum_user', {'username': 'anónimo'})
    emit('new_message', {
        'message': message,
        'autor_nombre': user.get('username'),
        'autor_id': user.get('id'),
    }, room=room)