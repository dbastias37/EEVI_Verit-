from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import session

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on('join')
def handle_join(data):
    room = data.get('chat_id')
    join_room(room)
    print(f"{session.get('forum_user', {}).get('username')} joined room {room}")

@socketio.on('leave')
def handle_leave(data):
    room = data.get('chat_id')
    leave_room(room)
    print(f"{session.get('forum_user', {}).get('username')} left room {room}")

@socketio.on('new_message')
def handle_new_message(data):
    room = data.get('chat_id')
    emit('message', data, room=room, include_self=False)