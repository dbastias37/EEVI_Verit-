from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import request
from datetime import datetime

# Almacén temporal de mensajes (en producción usar BD)
messages_store = []


def register_socket_events(socketio: SocketIO) -> None:
    """Registra todos los eventos de socket"""

    @socketio.on('connect')
    def handle_connect():
        print(f'Cliente conectado: {request.sid}')
        emit('connection_response', {'status': 'connected', 'id': request.sid})

    @socketio.on('disconnect')
    def handle_disconnect():
        print(f'Cliente desconectado: {request.sid}')

    @socketio.on('join')
    def handle_join(data):
        chat_id = data.get('chat_id', 'global')
        join_room(chat_id)
        print(f'Cliente {request.sid} se unió a sala {chat_id}')
        room_messages = [m for m in messages_store if m.get('chat_id') == chat_id]
        recent_messages = room_messages[-50:] if room_messages else []
        emit('message_history', recent_messages)

    @socketio.on('leave')
    def handle_leave(data):
        chat_id = data.get('chat_id', 'global')
        leave_room(chat_id)
        print(f'Cliente {request.sid} salió de sala {chat_id}')

    @socketio.on('new_message')
    def handle_new_message(data):
        chat_id = data.get('chat_id', 'global')
        message = {
            'id': len(messages_store) + 1,
            'text': data.get('text', ''),
            'sender': data.get('sender', 'Anónimo'),
            'timestamp': data.get('timestamp', int(datetime.now().timestamp() * 1000)),
            'chat_id': chat_id,
            'isSystem': False
        }
        messages_store.append(message)
        emit('message', message, room=chat_id, include_self=True)
        print(f'Mensaje enviado en sala {chat_id}: {message["text"][:50]}...')

    @socketio.on('chat message')
    def handle_chat_message_legacy(data):
        """Compatibilidad con eventos antiguos"""
        handle_new_message({
            'text': data.get('text', data.get('message', '')),
            'sender': data.get('sender', 'Anónimo'),
            'chat_id': 'global'
        })


def get_messages_for_room(chat_id: str = 'global', limit: int = 50):
    """Obtener mensajes para una sala específica"""
    room_messages = [m for m in messages_store if m.get('chat_id') == chat_id]
    return room_messages[-limit:] if room_messages else []
