from flask import Blueprint, jsonify, session
from google.cloud import firestore
from app import fs_client

messages_bp = Blueprint('messages', __name__)

@messages_bp.route('/api/messages/projects')
def get_project_messages():
    """Obtener mensajes de proyectos para el usuario actual"""
    if not session.get('forum_user'):
        return jsonify({'error': 'No autenticado'}), 401
    if not fs_client:
        return jsonify({'error': 'Servicio no disponible'}), 503
    try:
        user = session['forum_user']
        mensajes_ref = fs_client.collection('mensajes_proyecto')
        mensajes = mensajes_ref.where('receptor_id', '==', user['id']).order_by('created_at', direction=firestore.Query.DESCENDING).limit(20).stream()
        messages_list = []
        for doc in mensajes:
            msg = doc.to_dict()
            msg['id'] = doc.id
            messages_list.append(msg)
        return jsonify({'success': True, 'messages': messages_list})
    except Exception as e:
        print(f"Error getting messages: {e}")
        return jsonify({'error': str(e)}), 500

@messages_bp.route('/api/messages/<message_id>/read', methods=['POST'])
def mark_message_read(message_id):
    """Marcar mensaje como leído"""
    if not session.get('forum_user'):
        return jsonify({'error': 'No autenticado'}), 401
    if not fs_client:
        return jsonify({'error': 'Servicio no disponible'}), 503
    try:
        fs_client.collection('mensajes_proyecto').document(message_id).update({'leido': True})
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error marking message as read: {e}")
        return jsonify({'error': str(e)}), 500

@messages_bp.route('/api/messages/<message_id>/reject', methods=['POST'])
def reject_message(message_id):
    """Rechazar una solicitud"""
    if not session.get('forum_user'):
        return jsonify({'error': 'No autenticado'}), 401
    if not fs_client:
        return jsonify({'error': 'Servicio no disponible'}), 503
    try:
        fs_client.collection('mensajes_proyecto').document(message_id).update({
            'estado': 'rechazado',
            'leido': True
        })
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error rejecting message: {e}")
        return jsonify({'error': str(e)}), 500

