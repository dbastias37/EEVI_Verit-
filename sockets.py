from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import session, request
from datetime import datetime
import json

socketio = SocketIO(cors_allowed_origins="*", async_mode='eventlet')

# Store global para mensajes y usuarios conectados
messages_store = []
connected_users = {}  # {socket_id: {userId, displayName, rooms}}

@socketio.on('connect')
def handle_connect(auth):
    user_id = auth.get('userId', f'anon_{request.sid}') if auth else f'anon_{request.sid}'
    display_name = auth.get('displayName', 'Anónimo') if auth else 'Anónimo'

    connected_users[request.sid] = {
        'userId': user_id,
        'displayName': display_name,
        'rooms': [],
        'connectedAt': datetime.now().isoformat()
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

    room_messages = [msg for msg in messages_store if msg.get('chat_id') == room]
    recent_messages = room_messages[-50:] if room_messages else []
    emit('message_history', {
        'messages': recent_messages,
        'room': room,
        'count': len(recent_messages)
    })

    emit('user_joined', {
        'userId': user_id,
        'room': room,
        'timestamp': datetime.now().isoformat()
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
        'timestamp': datetime.now().isoformat()
    }, room=room, include_self=False)

@socketio.on('new_message')
def handle_new_message(data):
    room = data.get('chat_id', 'global')
    user_id = data.get('userId', 'unknown')
    sender_name = data.get('sender', 'Anónimo')

    user_info = connected_users.get(request.sid)
    if not user_info:
        emit('error', {'message': 'Usuario no registrado'})
        return

    verified_user_id = user_info['userId']

    message = {
        'id': len(messages_store) + 1,
        'text': data.get('text', ''),
        'sender': sender_name,
        'userId': verified_user_id,
        'socketId': request.sid,
        'timestamp': data.get('timestamp', int(datetime.now().timestamp() * 1000)),
        'chat_id': room,
        'isSystem': False
    }

    messages_store.append(message)

    print(f'💬 Mensaje de {verified_user_id} ({sender_name}) en {room}: "{message["text"][:30]}..."')

    emit('message', message, room=room, include_self=True)

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
            'timestamp': datetime.now().isoformat()
        })

# Función para API

def get_messages_for_api(chat_id='global'):
    room_messages = [msg for msg in messages_store if msg.get('chat_id') == chat_id]
    return room_messages[-50:] if room_messages else []

def get_connected_users_info():
    return {
        'total': len(connected_users),
        'users': list(connected_users.values())
    }
