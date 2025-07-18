from flask import Blueprint, request, jsonify, session
from datetime import datetime
from services.fs_client import fs_client
import logging

friends_bp = Blueprint('friends', __name__)

@friends_bp.route('/send_friend_request', methods=['POST'])
def send_friend_request():
    """Enviar solicitud de amistad"""
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
            
        data = request.get_json()
        receptor_id = data.get('receptor_id')
        
        if not receptor_id:
            return jsonify({'success': False, 'error': 'Receptor requerido'}), 400
            
        # Por ahora solo confirmar
        return jsonify({'success': True, 'message': 'Solicitud enviada correctamente'})
        
    except Exception as e:
        logging.error(f"Error sending friend request: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@friends_bp.route('/respond_friend_request', methods=['POST'])
def respond_friend_request():
    """Aceptar/rechazar solicitud de amistad"""
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        
        # Por ahora solo confirmar
        return jsonify({'success': True, 'message': 'Solicitud procesada'})
        
    except Exception as e:
        logging.error(f"Error responding to friend request: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@friends_bp.route('/get_friend_requests', methods=['GET'])
def get_friend_requests():
    if not session.get('forum_user'):
        return jsonify({'success': False, 'error': 'No autenticado'}), 401

    user_id = session['forum_user']['id']

    try:
        # Obtener solicitudes de amistad desde Firebase
        solicitudes_ref = fs_client.collection('solicitudes_amistad')
        solicitudes = solicitudes_ref.where('receptor_id', '==', user_id)\
                                   .where('estado', '==', 'pendiente')\
                                   .stream()

        solicitudes_list = []
        for doc in solicitudes:
            solicitud = doc.to_dict()
            solicitud['id'] = doc.id
            solicitudes_list.append(solicitud)

        return jsonify({'success': True, 'solicitudes': solicitudes_list})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
