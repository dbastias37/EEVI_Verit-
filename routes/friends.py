from flask import Blueprint, request, jsonify, session
from datetime import datetime
from services.fs_client import fs_client
import logging

friends_bp = Blueprint('friends', __name__)

@friends_bp.route('/send_friend_request', methods=['POST'])
def send_friend_request():
    """Crear solicitud de amistad"""
    try:
        if not session.get('forum_user'):
            return jsonify({'success': False, 'error': 'No autenticado'}), 401

        data = request.get_json() or {}
        receptor_id = data.get('receptor_id')

        if not receptor_id:
            return jsonify({'success': False, 'error': 'Receptor requerido'}), 400

        user = session['forum_user']

        # Comprobar que no exista ya amistad o solicitud pendiente
        pending = fs_client.collection('solicitudes_amistad')\
            .where('emisor_id', '==', user['id'])\
            .where('receptor_id', '==', receptor_id)\
            .where('estado', '==', 'pendiente')\
            .stream()
        if any(True for _ in pending):
            return jsonify({'success': False, 'error': 'Solicitud ya enviada'}), 400

        # Revisar amistad existente en ambos sentidos
        q1 = fs_client.collection('amigos')\
            .where('user_id_1', '==', user['id'])\
            .where('user_id_2', '==', receptor_id)\
            .stream()
        q2 = fs_client.collection('amigos')\
            .where('user_id_1', '==', receptor_id)\
            .where('user_id_2', '==', user['id'])\
            .stream()
        if any(True for _ in q1) or any(True for _ in q2):
            return jsonify({'success': False, 'error': 'Ya son amigos'}), 400

        solicitud = {
            'emisor_id': user['id'],
            'emisor_nombre': user['username'],
            'receptor_id': receptor_id,
            'estado': 'pendiente',
            'created_at': datetime.utcnow()
        }
        fs_client.collection('solicitudes_amistad').add(solicitud)
        fs_client.collection('notificaciones').add({
            'user_id': receptor_id,
            'tipo': 'friend_request',
            'mensaje': f"{user['username']} te envió una solicitud de amistad",
            'leido': False,
            'created_at': datetime.utcnow()
        })
        return jsonify({'success': True, 'message': 'Solicitud enviada correctamente'})

    except Exception as e:
        logging.error(f"Error sending friend request: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@friends_bp.route('/respond_friend_request', methods=['POST'])
def respond_friend_request():
    """Aceptar/Rechazar amistad"""
    try:
        if not session.get('forum_user'):
            return jsonify({'success': False, 'error': 'No autenticado'}), 401

        data = request.get_json() or {}
        solicitud_id = data.get('solicitud_id')
        accion = data.get('accion')

        if not solicitud_id or accion not in ['aceptar', 'rechazar']:
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

        if accion == 'aceptar':
            fs_client.collection('amigos').add({
                'user_id_1': solicitud['emisor_id'],
                'user_id_2': solicitud['receptor_id'],
                'created_at': datetime.utcnow()
            })

        fs_client.collection('notificaciones').add({
            'user_id': solicitud['emisor_id'],
            'tipo': 'friend_' + ('accepted' if accion == 'aceptar' else 'rejected'),
            'mensaje': f"{session['forum_user']['username']} {'aceptó' if accion == 'aceptar' else 'rechazó'} tu solicitud de amistad",
            'leido': False,
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


@friends_bp.route('/list', methods=['GET'])
def list_friends():
    """Listar amigos del usuario autenticado"""
    if not session.get('forum_user'):
        return jsonify({'success': False, 'error': 'No autenticado'}), 401

    user_id = session['forum_user']['id']

    try:
        q1 = fs_client.collection('amigos').where('user_id_1', '==', user_id).stream()
        q2 = fs_client.collection('amigos').where('user_id_2', '==', user_id).stream()
        amigos = []
        for d in q1:
            data = d.to_dict()
            data['id'] = d.id
            data['amigo_id'] = data['user_id_2']
            amigos.append(data)
        for d in q2:
            data = d.to_dict()
            data['id'] = d.id
            data['amigo_id'] = data['user_id_1']
            amigos.append(data)
        return jsonify({'success': True, 'amigos': amigos})
    except Exception as e:
        logging.error(f"Error listing friends: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500
