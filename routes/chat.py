from flask import Blueprint, request, jsonify, session

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/create_chat', methods=['POST'])
def create_chat():
    """Crear chat individual o grupal."""
    return jsonify({'message': 'Not implemented'}), 501

@chat_bp.route('/send_message', methods=['POST'])
def send_message():
    """Enviar mensaje a un chat."""
    return jsonify({'message': 'Not implemented'}), 501

@chat_bp.route('/get_messages/<chat_id>', methods=['GET'])
def get_messages(chat_id):
    """Obtener mensajes de un chat."""
    return jsonify({'messages': []})
