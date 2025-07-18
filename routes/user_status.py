from flask import Blueprint, request, jsonify, session

status_bp = Blueprint('status', __name__)

@status_bp.route('/update_status', methods=['POST'])
def update_status():
    """Actualizar el estado de conexión del usuario."""
    return jsonify({'message': 'Not implemented'}), 501

@status_bp.route('/get_online_users', methods=['GET'])
def get_online_users():
    """Obtener usuarios actualmente en línea."""
    return jsonify({'users': []})
