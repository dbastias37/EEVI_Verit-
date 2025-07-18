from flask import Blueprint, request, jsonify, session
from datetime import datetime, timedelta
import logging

status_bp = Blueprint('status', __name__)

@status_bp.route('/update_status', methods=['POST'])
def update_status():
    """Actualizar estado de conexión del usuario"""
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'No autenticado'}), 401

        data = request.get_json()
        new_status = data.get('status', 'online')

        if new_status not in ['online', 'ocupado', 'offline']:
            return jsonify({'success': False, 'error': 'Estado inválido'}), 400

        # Por ahora solo confirmar (sin Firebase)
        return jsonify({'success': True, 'status': new_status})

    except Exception as e:
        logging.error(f"Error updating user status: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@status_bp.route('/get_online_users', methods=['GET'])
def get_online_users():
    """Obtener usuarios conectados"""
    try:
        # Devolver lista de ejemplo para testing
        mock_users = [
            {
                'user_id': '1',
                'nombre': 'Usuario Demo',
                'estado': 'online',
                'ultima_actividad': datetime.now().isoformat()
            }
        ]

        return jsonify({'success': True, 'users': mock_users})

    except Exception as e:
        logging.error(f"Error getting online users: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500
