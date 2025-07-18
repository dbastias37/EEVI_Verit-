from flask import Blueprint, request, jsonify, session
from datetime import datetime, timedelta
from services.fs_client import fs_client

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
        user_id = session['user_id']
        estado_data = {
            'user_id': user_id,
            'estado': new_status,
            'ultima_actividad': datetime.now(),
            'en_chat': False,
            'proyecto_activo': None
        }
        existing_query = fs_client.collection('usuarios_estado').where('user_id', '==', user_id).stream()
        existing_docs = list(existing_query)
        if existing_docs:
            doc_ref = existing_docs[0].reference
            doc_ref.update({
                'estado': new_status,
                'ultima_actividad': datetime.now()
            })
        else:
            fs_client.collection('usuarios_estado').add(estado_data)
        return jsonify({'success': True, 'status': new_status})
    except Exception as e:
        print(f"Error updating user status: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@status_bp.route('/get_online_users', methods=['GET'])
def get_online_users():
    """Obtener usuarios conectados"""
    try:
        cutoff_time = datetime.now() - timedelta(minutes=5)
        usuarios_query = fs_client.collection('usuarios_estado')\
                          .where('estado', 'in', ['online', 'ocupado'])\
                          .where('ultima_actividad', '>=', cutoff_time)
        usuarios_estado = usuarios_query.stream()
        users = []
        for doc in usuarios_estado:
            estado_data = doc.to_dict()
            user_data = {
                'user_id': estado_data['user_id'],
                'estado': estado_data['estado'],
                'ultima_actividad': estado_data['ultima_actividad'],
                'nombre': 'Usuario'
            }
            try:
                user_profile = fs_client.collection('usuarios').document(estado_data['user_id']).get()
                if user_profile.exists:
                    profile_data = user_profile.to_dict()
                    user_data['nombre'] = profile_data.get('nombre_publico', 'Usuario')
            except Exception:
                pass
            users.append(user_data)
        users.sort(key=lambda x: x['ultima_actividad'], reverse=True)
        return jsonify({'success': True, 'users': users})
    except Exception as e:
        print(f"Error getting online users: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500
