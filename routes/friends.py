from flask import Blueprint, request, jsonify, session
from datetime import datetime
from services.fs_client import fs_client
import logging

friends_bp = Blueprint('friends', __name__)

@friends_bp.route('/send_friend_request', methods=['POST'])
def send_friend_request():
    """Enviar solicitud de amistad"""
    try:
        if not session.get('forum_user'):
            return jsonify({'success': False, 'error': 'No autenticado'}), 401
            
        data = request.get_json()
        receptor_id = data.get('receptor_id')
        
        if not receptor_id:
            return jsonify({'success': False, 'error': 'Receptor requerido'}), 400
            
        user = session['forum_user']
        solicitud = {
            'emisor_id': user['id'],
            'emisor_nombre': user['username'],
            'receptor_id': receptor_id,
            'estado': 'pendiente',
            'created_at': datetime.utcnow()
        }
        fs_client.collection('solicitudes_amistad').add(solicitud)
        return jsonify({'success': True, 'message': 'Solicitud enviada correctamente'})
        
    except Exception as e:
        logging.error(f"Error sending friend request: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@friends_bp.route('/respond_friend_request', methods=['POST'])
def respond_friend_request():
    """Aceptar/rechazar solicitud de amistad"""
    try:
        if not session.get('forum_user'):
            return jsonify({'success': False, 'error': 'No autenticado'}), 401

        data = request.get_json()
        solicitud_id = data.get('solicitud_id')
        accion = data.get('accion')
        if not solicitud_id or not accion:
            return jsonify({'success': False, 'error': 'Datos incompletos'}), 400

        solicitud_ref = fs_client.collection('solicitudes_amistad').document(solicitud_id)
        doc = solicitud_ref.get()
        if not doc.exists:
            return jsonify({'success': False, 'error': 'Solicitud no encontrada'}), 404
        solicitud = doc.to_dict()
        if solicitud['receptor_id'] != session['forum_user']['id']:
            return jsonify({'success': False, 'error': 'No autorizado'}), 403

        estado = 'aceptado' if accion == 'aceptar' else 'rechazado'
        solicitud_ref.update({'estado': estado})

        fs_client.collection('notificaciones').add({
            'user_id': solicitud['emisor_id'],
            'mensaje': f"{session['forum_user']['username']} { 'aceptó' if accion == 'aceptar' else 'rechazó' } tu solicitud de amistad",
            'leido': False,
            'created_at': datetime.utcnow()
        })

        if accion == 'aceptar':
            fs_client.collection('chats').add({
                'user_ids': [solicitud['emisor_id'], solicitud['receptor_id']],
                'name': 'Chat privado',
                'created_at': datetime.utcnow()
            })

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
