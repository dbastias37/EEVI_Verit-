from flask import Blueprint, request, jsonify, session
from datetime import datetime
from services.fs_client import fs_client

friends_bp = Blueprint('friends', __name__)

@friends_bp.route('/send_friend_request', methods=['POST'])
def send_friend_request():
    """Enviar solicitud de amistad."""
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        data = request.get_json()
        receptor_id = data.get('receptor_id')
        if not receptor_id:
            return jsonify({'success': False, 'error': 'Datos incompletos'}), 400
        solicitante_id = session['user_id']
        solicitud = {
            'solicitante_id': solicitante_id,
            'receptor_id': receptor_id,
            'solicitante_nombre': session.get('user_name', 'Usuario'),
            'estado': 'pendiente',
            'fecha_solicitud': datetime.now()
        }
        fs_client.collection('amistades').add(solicitud)
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error sending friend request: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@friends_bp.route('/respond_friend_request', methods=['POST'])
def respond_friend_request():
    """Aceptar o rechazar una solicitud."""
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        data = request.get_json()
        solicitud_id = data.get('solicitud_id')
        accion = data.get('accion')
        if not solicitud_id or not accion:
            return jsonify({'success': False, 'error': 'Datos incompletos'}), 400
        solicitud_ref = fs_client.collection('amistades').document(solicitud_id)
        solicitud_doc = solicitud_ref.get()
        if not solicitud_doc.exists:
            return jsonify({'success': False, 'error': 'Solicitud no encontrada'}), 404
        solicitud_data = solicitud_doc.to_dict()
        if solicitud_data['receptor_id'] != session['user_id']:
            return jsonify({'success': False, 'error': 'No autorizado'}), 403
        nuevo_estado = 'aceptada' if accion == 'aceptar' else 'rechazada'
        solicitud_ref.update({
            'estado': nuevo_estado,
            'fecha_respuesta': datetime.now()
        })
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error responding friend request: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@friends_bp.route('/get_friend_requests', methods=['GET'])
def get_friend_requests():
    """Obtener solicitudes de amistad pendientes"""
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
        user_id = session['user_id']
        solicitudes_query = fs_client.collection('amistades')\
                             .where('receptor_id', '==', user_id)\
                             .where('estado', '==', 'pendiente')
        solicitudes = []
        for doc in solicitudes_query.stream():
            solicitud_data = doc.to_dict()
            solicitud_data['id'] = doc.id
            solicitudes.append(solicitud_data)
        return jsonify({'success': True, 'solicitudes': solicitudes})
    except Exception as e:
        print(f"Error getting friend requests: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@friends_bp.route('/get_friends', methods=['GET'])
def get_friends():
    """Obtener lista de amigos del usuario actual."""
    try:
        if 'user_id' not in session:
            return jsonify({'friends': []})
        user_id = session['user_id']
        amistades = fs_client.collection('amistades')\
                     .where('estado', '==', 'aceptada')\
                     .where('receptor_id', '==', user_id).stream()
        friends = []
        for doc in amistades:
            info = doc.to_dict()
            friends.append(info)
        return jsonify({'friends': friends})
    except Exception:
        return jsonify({'friends': []})
