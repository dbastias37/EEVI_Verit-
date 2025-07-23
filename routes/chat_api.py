from flask import Blueprint, jsonify, request, current_app
from services.chat_manager import ChatManager

chat_api_bp = Blueprint('chat_api', __name__)


def _mgr():
    return ChatManager(current_app.config['DB_PATH'])


@chat_api_bp.get('/messages')
def get_messages():
    messages = _mgr().get_messages()
    return jsonify(messages)


@chat_api_bp.post('/messages')
def post_message():
    data = request.get_json() or {}
    user = data.get('user')
    text = data.get('text')
    if not user or not text:
        return jsonify({'error': 'Invalid data'}), 400
    message = _mgr().add_message(user, text)
    return jsonify(message), 201
