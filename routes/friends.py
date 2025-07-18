from flask import Blueprint, request, jsonify, session

friends_bp = Blueprint('friends', __name__)

@friends_bp.route('/send_friend_request', methods=['POST'])
def send_friend_request():
    """Enviar solicitud de amistad."""
    return jsonify({'message': 'Not implemented'}), 501

@friends_bp.route('/respond_friend_request', methods=['POST'])
def respond_friend_request():
    """Aceptar o rechazar una solicitud."""
    return jsonify({'message': 'Not implemented'}), 501

@friends_bp.route('/get_friends', methods=['GET'])
def get_friends():
    """Obtener lista de amigos del usuario actual."""
    return jsonify({'friends': []})
