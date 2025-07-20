from flask import Blueprint, request, jsonify, session, current_app
from services.fs_client import fs_client
from google.cloud import firestore
from google.api_core.exceptions import FailedPrecondition
from datetime import datetime

chat_bp = Blueprint('chat', __name__)


def get_or_create_individual_chat(u1: str, u2: str) -> str:
    """Devuelve el chat individual existente o lo crea"""
    pair_key = "_".join(sorted([u1, u2]))
    existing = fs_client.collection('chats').where('pair_key', '==', pair_key).where('activo', '==', True).stream()
    for ch in existing:
        return ch.id

    chat = fs_client.collection('chats').add({
        'tipo': 'individual',
        'participantes': [u1, u2],
        'pair_key': pair_key,
        'ultimo_mensaje': None,
        'proyecto_id': None,
        'activo': True,
        'created_at': firestore.SERVER_TIMESTAMP
    })
    return chat[1].id

@chat_bp.route('/create_chat', methods=['POST'])
def create_chat():
    """Crear chat individual o grupal."""
    try:
        if not session.get('forum_user'):
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        data = request.get_json() or {}
        participantes = data.get('participantes') or data.get('user_ids')
        name = data.get('name', '')
        proyecto_id = data.get('proyecto_id')

        if not participantes or len(participantes) < 2:
            return jsonify({'success': False, 'error': 'Participantes insuficientes'}), 400

        if len(participantes) == 2:
            chat_id = get_or_create_individual_chat(participantes[0], participantes[1])
            return jsonify({'success': True, 'chat_id': chat_id})

        chat = fs_client.collection('chats').add({
            'tipo': 'grupal',
            'participantes': participantes,
            'name': name,
            'proyecto_id': proyecto_id,
            'ultimo_mensaje': None,
            'activo': True,
            'created_at': firestore.SERVER_TIMESTAMP
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
        mensaje = data.get('mensaje') or data.get('texto')
        if not chat_id or not mensaje:
            return jsonify({'success': False, 'error': 'Datos incompletos'}), 400
        user = session['forum_user']
        fs_client.collection('mensajes_chat').add({
            'chat_id': chat_id,
            'autor_id': user['id'],
            'autor_nombre': user['username'],
            'mensaje': mensaje,
            'fecha': firestore.SERVER_TIMESTAMP,
            'leido_por': [user['id']],
            'tipo': 'texto'
        })
        fs_client.collection('chats').document(chat_id).update({
            'ultimo_mensaje': {
                'autor_id': user['id'],
                'mensaje': mensaje,
                'fecha': firestore.SERVER_TIMESTAMP
            }
        })
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@chat_bp.get('/get_messages/<chat_id>')
def get_messages(chat_id):
    """Devuelve los mensajes del chat ordenados por fecha.
    Si ocurre cualquier error se registra y se responde success:false, messages=[]
    para evitar un 500 que rompa el front-end.
    """
    try:
        docs = (
            fs_client.collection('mensajes_chat')
                     .where('chat_id', '==', chat_id)
                     .order_by('fecha')
                     .stream()
        )
        messages = [d.to_dict() for d in docs]
        return jsonify(success=True, messages=messages), 200

    except FailedPrecondition as e:
        # Índice faltante: notifica al front-end para que detenga el polling
        idx_url = (
            'https://console.firebase.google.com/project/eevi-db-registroweb'
            '/firestore/indexes'
        )
        current_app.logger.error('Falta índice mensajes_chat chat_id+fecha')
        return jsonify(
            success=False,
            need_index=True,
            index_url=idx_url,
            error='Firestore index missing'
        ), 200

    except Exception as e:
        current_app.logger.exception('Error get_messages %s', chat_id)
        return jsonify(success=False, error=str(e)), 200

@chat_bp.route('/get_user_chats', methods=['GET'])
def get_user_chats():
    try:
        if not session.get('forum_user'):
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        user_id = session['forum_user']['id']
        chats = fs_client.collection('chats')\
            .where('participantes', 'array_contains', user_id)\
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
