from flask import Blueprint, request, jsonify, session
from datetime import datetime
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
    """Obtener solicitudes de amistad pendientes"""
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        
        # Devolver array vacío por ahora
        return jsonify({'success': True, 'solicitudes': []})
        
    except Exception as e:
        logging.error(f"Error getting friend requests: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500
