from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import session, request
from datetime import datetime
import json

socketio = SocketIO(cors_allowed_origins="*", async_mode='eventlet')

# Store para mensajes (mantener formato BD)
messages_store = []
connected_users = {}

def normalize_timestamp(timestamp):
    """Convertir timestamp a formato BD string"""
    if isinstance(timestamp, (int, float)):
        return datetime.fromtimestamp(timestamp / 1000).strftime('%Y-%m-%d %H:%M:%S')
    elif isinstance(timestamp, str):
        return timestamp
    else:
        return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

def timestamp_to_ms(timestamp):
    """Convertir timestamp string a milisegundos"""
    if isinstance(timestamp, str):
        try:
            return int(datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S').timestamp() * 1000)
        except:
            return int(datetime.now().timestamp() * 1000)
    elif isinstance(timestamp, (int, float)):
        return int(timestamp)
    else:
        return int(datetime.now().timestamp() * 1000)

@socketio.on('connect')
def handle_connect(auth):
    user_id = auth.get('userId', f'anon_{request.sid}') if auth else f'anon_{request.sid}'
    display_name = auth.get('displayName', 'Anónimo') if auth else 'Anónimo'

    connected_users[request.sid] = {
        'userId': user_id,
        'displayName': display_name,
        'rooms': [],
        'connectedAt': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    print(f'✅ Usuario conectado: {user_id} ({display_name}) - Socket: {request.sid}')
    emit('user_registered', {
        'userId': user_id,
        'socketId': request.sid,
        'status': 'connected'
    })

@socketio.on('disconnect')
def handle_disconnect():
    user_info = connected_users.pop(request.sid, {})
    user_id = user_info.get('userId', 'unknown')
    print(f'❌ Usuario desconectado: {user_id} - Socket: {request.sid}')

@socketio.on('join')
def handle_join(data):
    room = data.get('chat_id', 'global')
    user_id = data.get('userId', 'unknown')

    join_room(room)

    if request.sid in connected_users:
        if room not in connected_users[request.sid]['rooms']:
            connected_users[request.sid]['rooms'].append(room)

    print(f'👥 Usuario {user_id} se unió a sala {room} - Socket: {request.sid}')

    # Enviar historial normalizado
    room_messages = [msg for msg in messages_store if msg.get('chat_id', 'global') == room]
    recent_messages = room_messages[-50:] if room_messages else []

    normalized_messages = []
    for msg in recent_messages:
        normalized_msg = dict(msg)
        if 'timestamp' in normalized_msg and isinstance(normalized_msg['timestamp'], str):
            normalized_msg['timestampMs'] = timestamp_to_ms(normalized_msg['timestamp'])
        normalized_messages.append(normalized_msg)

    emit('message_history', {
        'messages': normalized_messages,
        'room': room,
        'count': len(normalized_messages)
    })

    emit('user_joined', {
        'userId': user_id,
        'room': room,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }, room=room, include_self=False)

@socketio.on('leave')
def handle_leave(data):
    room = data.get('chat_id', 'global')
    user_id = data.get('userId', 'unknown')

    leave_room(room)

    if request.sid in connected_users:
        if room in connected_users[request.sid]['rooms']:
            connected_users[request.sid]['rooms'].remove(room)

    print(f'👋 Usuario {user_id} salió de sala {room}')

    emit('user_left', {
        'userId': user_id,
        'room': room,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }, room=room, include_self=False)

@socketio.on('new_message')
def handle_new_message(data):
    room = data.get('chat_id', 'global')
    user_id = data.get('userId', 'unknown')

    user_info = connected_users.get(request.sid)
    if not user_info:
        emit('error', {'message': 'Usuario no registrado'})
        return

    verified_user_id = user_info['userId']

    message = {
        'id': len(messages_store) + 1,
        'text': data.get('text', ''),
        'user': data.get('user', data.get('sender', 'Anónimo')),
        'timestamp': normalize_timestamp(data.get('timestamp')),
        'chat_id': room,
        'userId': verified_user_id,
        'socketId': request.sid,
        'isSystem': False
    }

    messages_store.append(message)

    print(f'💬 Mensaje de {verified_user_id} en {room}: "{message["text"][:30]}..." - ID: {message["id"]}')

    emit_message = dict(message)
    emit_message['sender'] = message['user']
    emit_message['timestampMs'] = timestamp_to_ms(message['timestamp'])

    emit('message', emit_message, room=room, include_self=True)

    room_clients = socketio.server.manager.rooms.get("/", {}).get(room, [])
    print(f'📡 Mensaje distribuido a {len(room_clients)} clientes en sala {room}')

@socketio.on('update_user_info')
def handle_update_user_info(data):
    if request.sid in connected_users:
        old_name = connected_users[request.sid]['displayName']
        new_name = data.get('displayName', old_name)

        connected_users[request.sid]['displayName'] = new_name

        print(f'📝 Usuario {connected_users[request.sid]["userId"]} cambió nombre: "{old_name}" → "{new_name}"')

        emit('user_info_updated', {
            'userId': connected_users[request.sid]['userId'],
            'displayName': new_name,
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })

# Función para API (mantener formato BD)

def get_messages_for_api(chat_id='global'):
    room_messages = [msg for msg in messages_store if msg.get('chat_id', 'global') == chat_id]
    return room_messages[-50:] if room_messages else []

def get_connected_users_info():
    return {
        'total': len(connected_users),
        'users': list(connected_users.values())
    }
