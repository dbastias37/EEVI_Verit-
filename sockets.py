from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import session, request
from datetime import datetime
import json

socketio = SocketIO(cors_allowed_origins="*", async_mode='eventlet')

# Store global para mensajes
messages_store = []

@socketio.on('connect')
def handle_connect():
    print(f'✅ Cliente conectado: {request.sid}')
    emit('status', {'connected': True, 'id': request.sid})

@socketio.on('disconnect')
def handle_disconnect():
    print(f'❌ Cliente desconectado: {request.sid}')

@socketio.on('join')
def handle_join(data):
    room = data.get('chat_id', 'global')
    join_room(room)
    username = session.get('forum_user', {}).get('username', 'Anónimo')
    print(f'👥 {username} ({request.sid}) joined room {room}')
    
    # Enviar historial inmediatamente
    room_messages = [msg for msg in messages_store if msg.get('chat_id') == room]
    recent_messages = room_messages[-50:] if room_messages else []
    emit('message_history', recent_messages)

@socketio.on('leave')
def handle_leave(data):
    room = data.get('chat_id', 'global')
    leave_room(room)
    print(f'👋 Cliente salió de room {room}')

@socketio.on('new_message')
def handle_new_message(data):
    room = data.get('chat_id', 'global')
    
    message = {
        'id': len(messages_store) + 1,
        'text': data.get('text', ''),
        'sender': data.get('sender', 'Anónimo'),
        'timestamp': data.get('timestamp', int(datetime.now().timestamp() * 1000)),
        'chat_id': room,
        'isSystem': False
    }
    
    # Guardar en store
    messages_store.append(message)
    
    # CRÍTICO: Emitir a TODOS en la sala incluyendo sender
    emit('message', message, room=room, include_self=True)
    print(f'💬 Mensaje emitido en {room}: "{message["text"][:30]}..." a {len(socketio.server.manager.rooms.get("/", {}).get(room, []))} clientes')

# Función para API REST

def get_messages_for_api(chat_id='global'):
    room_messages = [msg for msg in messages_store if msg.get('chat_id') == chat_id]
    return room_messages[-50:] if room_messages else []
