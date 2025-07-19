from flask import Blueprint, request, jsonify, session
from services.fs_client import fs_client
from google.cloud import firestore
from datetime import datetime

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/create_chat', methods=['POST'])
def create_chat():
    """Crear chat individual o grupal."""
    try:
        if not session.get('forum_user'):
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        data = request.get_json() or {}
        user_ids = data.get('user_ids')
        name = data.get('name', '')
        if not user_ids or len(user_ids) < 2:
            return jsonify({'success': False, 'error': 'Participantes insuficientes'}), 400
        chat = fs_client.collection('chats').add({
            'user_ids': user_ids,
            'name': name,
            'created_at': firestore.SERVER_TIMESTAMP,
            'ultimo_mensaje': None
        })
        return jsonify({'success': True, 'chat_id': chat[1].id})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@chat_bp.route('/send_message', methods=['POST'])
def send_message():
    """Enviar mensaje a un chat."""
    try:
        if not session.get('forum_user'):
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        data = request.get_json() or {}
        chat_id = data.get('chat_id')
        texto = data.get('texto')
        if not chat_id or not texto:
            return jsonify({'success': False, 'error': 'Datos incompletos'}), 400
        user = session['forum_user']
        fs_client.collection('mensajes_chat').add({
            'chat_id': chat_id,
            'user_id': user['id'],
            'username': user['username'],
            'texto': texto,
            'fecha': firestore.SERVER_TIMESTAMP
        })
        fs_client.collection('chats').document(chat_id).update({
            'ultimo_mensaje': {
                'texto': texto,
                'fecha': firestore.SERVER_TIMESTAMP
            }
        })
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@chat_bp.route('/get_messages/<chat_id>', methods=['GET'])
def get_messages(chat_id):
    """Obtener mensajes de un chat."""
    try:
        if not session.get('forum_user'):
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        mensajes = fs_client.collection('mensajes_chat')\
            .where('chat_id', '==', chat_id)\
            .order_by('fecha')\
            .stream()
        result = []
        for m in mensajes:
            data = m.to_dict()
            data['id'] = m.id
            result.append(data)
        return jsonify({'success': True, 'messages': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@chat_bp.route('/get_user_chats', methods=['GET'])
def get_user_chats():
    try:
        if not session.get('forum_user'):
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        user_id = session['forum_user']['id']
        chats = fs_client.collection('chats')\
            .where('user_ids', 'array_contains', user_id)\
            .order_by('ultimo_mensaje.fecha', direction=firestore.Query.DESCENDING)\
            .stream()
        result = []
        for c in chats:
            data = c.to_dict()
            data['id'] = c.id
            result.append(data)
        return jsonify({'success': True, 'chats': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
