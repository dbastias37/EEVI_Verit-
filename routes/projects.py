from flask import Blueprint, request, jsonify, session
from google.cloud import firestore
from datetime import datetime, timezone
from services.fs_client import fs_client

PROFESIONES_DISPONIBLES = [
    "Editor", "Animador 3D", "Camarógrafo", "Narrador de voz",
    "Fotógrafo", "Sonidista", "Guionista", "Doblaje", "Creador de contenido"
]

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/api/projects')
def get_projects():
    """Obtener todos los proyectos activos"""
    if not fs_client:
        return jsonify({'error': 'Servicio no disponible'}), 503
    try:
        proyectos_ref = fs_client.collection('proyectos')
        proyectos = []
        docs = proyectos_ref.where('estado', 'in', ['abierto', 'en_progreso']).stream()
        for doc in docs:
            proyecto = doc.to_dict()
            proyecto['id'] = doc.id
            miembros_ref = doc.reference.collection('miembros')
            miembros = []
            for miembro_doc in miembros_ref.stream():
                miembros.append(miembro_doc.to_dict())
            proyecto['miembros'] = miembros
            proyectos.append(proyecto)
        proyectos.sort(key=lambda x: x.get('created_at', ''), reverse=True)
        return jsonify({'success': True, 'projects': proyectos})
    except Exception as e:
        print(f"Error getting projects: {e}")
        return jsonify({'error': str(e)}), 500

@projects_bp.route('/api/projects/create', methods=['POST'])
def create_project():
    """Crear un nuevo proyecto"""
    if not session.get('forum_user'):
        return jsonify({'error': 'Debes iniciar sesión'}), 401
    if not fs_client:
        return jsonify({'error': 'Servicio no disponible'}), 503
    try:
        user = session['forum_user']
        form_data = request.form
        import json
        tags = json.loads(form_data.get('tags', '[]'))

        # NUEVO: Procesar profesiones con cupos
        profesiones_requeridas = {}
        for profesion in PROFESIONES_DISPONIBLES:
            cupos = form_data.get(f'cupos_{profesion}')
            if cupos and int(cupos) > 0:
                profesiones_requeridas[profesion] = {
                    'cupos': int(cupos),
                    'ocupados': 0,
                    'activo': True
                }
        proyecto_data = {
            'titulo': form_data.get('titulo'),
            'descripcion': form_data.get('descripcion'),
            'categoria': form_data.get('categoria'),
            'presupuesto': form_data.get('presupuesto', 'A definir'),
            'duracion_estimada': form_data.get('duracion_estimada'),
            'roles_necesarios': form_data.get('roles_necesarios'),
            'tags': tags,
            'profesiones_requeridas': profesiones_requeridas,  # NUEVO
            'autor_id': user['id'],
            'autor_nombre': user['username'],
            'estado': 'abierto',
            'created_at': firestore.SERVER_TIMESTAMP,
            'updated_at': firestore.SERVER_TIMESTAMP
        }
        doc_ref = fs_client.collection('proyectos').add(proyecto_data)
        proyecto_id = doc_ref[1].id
        doc_ref[1].collection('miembros').add({
            'user_id': user['id'],
            'nombre': user['username'],
            'rol': 'Creador',
            'joined_at': firestore.SERVER_TIMESTAMP
        })
        return jsonify({'success': True, 'project_id': proyecto_id})
    except Exception as e:
        print(f"Error creating project: {e}")
        return jsonify({'error': str(e)}), 500

@projects_bp.route('/api/projects/<project_id>/join', methods=['POST'])
def join_project(project_id):
    """Enviar solicitud para unirse a un proyecto"""
    if not session.get('forum_user'):
        return jsonify({'error': 'Debes iniciar sesión'}), 401
    if not fs_client:
        return jsonify({'error': 'Servicio no disponible'}), 503
    try:
        user = session['forum_user']
        proyecto_ref = fs_client.collection('proyectos').document(project_id)
        proyecto = proyecto_ref.get()
        if not proyecto.exists:
            return jsonify({'error': 'Proyecto no encontrado'}), 404
        proyecto_data = proyecto.to_dict()
        miembros_ref = proyecto_ref.collection('miembros')
        existing = miembros_ref.where('user_id', '==', user['id']).get()
        if list(existing):
            return jsonify({'error': 'Ya eres miembro de este proyecto'}), 400
        mensaje_data = {
            'tipo': 'solicitud_proyecto',
            'proyecto_id': project_id,
            'proyecto_titulo': proyecto_data['titulo'],
            'emisor_id': user['id'],
            'emisor_nombre': user['username'],
            'receptor_id': proyecto_data['autor_id'],
            'mensaje': f"{user['username']} quiere unirse a tu proyecto '{proyecto_data['titulo']}'",
            'estado': 'pendiente',
            'leido': False,
            'created_at': firestore.SERVER_TIMESTAMP
        }
        fs_client.collection('mensajes_proyecto').add(mensaje_data)
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error joining project: {e}")
        return jsonify({'error': str(e)}), 500

@projects_bp.route('/api/projects/<project_id>/accept/<user_id>', methods=['POST'])
def accept_member(project_id, user_id):
    """Aceptar a un miembro en el proyecto"""
    if not session.get('forum_user'):
        return jsonify({'error': 'Debes iniciar sesión'}), 401
    if not fs_client:
        return jsonify({'error': 'Servicio no disponible'}), 503
    try:
        current_user = session['forum_user']
        proyecto_ref = fs_client.collection('proyectos').document(project_id)
        proyecto = proyecto_ref.get()
        if not proyecto.exists:
            return jsonify({'error': 'Proyecto no encontrado'}), 404
        proyecto_data = proyecto.to_dict()
        if proyecto_data['autor_id'] != current_user['id']:
            return jsonify({'error': 'No tienes permisos'}), 403
        usuario_ref = fs_client.collection('usuarios').document(user_id)
        usuario = usuario_ref.get()
        if not usuario.exists:
            return jsonify({'error': 'Usuario no encontrado'}), 404
        usuario_data = usuario.to_dict()
        proyecto_ref.collection('miembros').add({
            'user_id': user_id,
            'nombre': usuario_data['username'],
            'rol': 'Colaborador',
            'joined_at': firestore.SERVER_TIMESTAMP
        })
        mensajes = fs_client.collection('mensajes_proyecto').where('proyecto_id', '==', project_id).where('emisor_id', '==', user_id).where('tipo', '==', 'solicitud_proyecto').stream()
        for msg in mensajes:
            msg.reference.update({'estado': 'aceptado', 'leido': True})
        fs_client.collection('mensajes_proyecto').add({
            'tipo': 'notificacion',
            'proyecto_id': project_id,
            'proyecto_titulo': proyecto_data['titulo'],
            'emisor_id': current_user['id'],
            'receptor_id': user_id,
            'mensaje': f"Has sido aceptado en el proyecto '{proyecto_data['titulo']}'",
            'estado': 'info',
            'leido': False,
            'created_at': firestore.SERVER_TIMESTAMP
        })
        return jsonify({'success': True})
    except Exception as e:
        print(f"Error accepting member: {e}")
        return jsonify({'error': str(e)}), 500


@projects_bp.route('/get_project_requests', methods=['GET'])
def get_project_requests():
    if not session.get('forum_user'):
        return jsonify({'success': False, 'error': 'No autenticado'}), 401

    user_id = session['forum_user']['id']

    try:
        proyectos_ref = fs_client.collection('proyectos')
        mis_proyectos = proyectos_ref.where('autor_id', '==', user_id).stream()

        solicitudes_list = []
        for proyecto_doc in mis_proyectos:
            proyecto_id = proyecto_doc.id

            solicitudes_ref = fs_client.collection('solicitudes_proyecto')
            solicitudes = solicitudes_ref.where('proyecto_id', '==', proyecto_id)\
                                       .where('estado', '==', 'pendiente')\
                                       .stream()

            for solicitud_doc in solicitudes:
                solicitud = solicitud_doc.to_dict()
                solicitud['id'] = solicitud_doc.id
                solicitudes_list.append(solicitud)

        return jsonify({'success': True, 'solicitudes': solicitudes_list})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@projects_bp.route('/respond_project_request', methods=['POST'])
def respond_project_request():
    """Responder a solicitud de proyecto"""
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'No autenticado'}), 401

        data = request.get_json()
        solicitud_id = data.get('solicitud_id')
        accion = data.get('accion')  # 'aceptar' o 'rechazar'

        if not solicitud_id or not accion:
            return jsonify({'success': False, 'error': 'Datos incompletos'}), 400

        # TODO: Implementar lógica real
        return jsonify({'success': True, 'message': f'Solicitud {accion}ada correctamente'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@projects_bp.route('/request_join', methods=['POST'])
def request_join():
    """Enviar solicitud para unirse a proyecto"""
    try:
        if 'user_id' not in session:
            return jsonify({'success': False, 'error': 'No autenticado'}), 401

        data = request.get_json()
        proyecto_id = data.get('proyecto_id')
        profesion = data.get('profesion_solicitada')
        mensaje = data.get('mensaje')

        if not all([proyecto_id, profesion, mensaje]):
            return jsonify({'success': False, 'error': 'Datos incompletos'}), 400

        solicitud = {
            'proyecto_id': proyecto_id,
            'solicitante_id': session['user_id'],
            'solicitante_nombre': session.get('user_name', 'Usuario'),
            'profesion_solicitada': profesion,
            'mensaje': mensaje,
            'estado': 'pendiente',
            'fecha_solicitud': datetime.now()
        }

        # TODO: Guardar en Firebase cuando esté configurado
        # db.collection('solicitudes_proyecto').add(solicitud)

        return jsonify({'success': True, 'message': 'Solicitud enviada correctamente'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@projects_bp.route('/get_all_projects', methods=['GET'])
def get_all_projects():
    """Obtener todos los proyectos disponibles"""
    try:
        projects_mock = [
            {
                'id': '1',
                'titulo': 'Cortometraje Experimental',
                'descripcion': 'Proyecto innovador sobre realidad urbana',
                'estado_proyecto': 'abierto',
                'autor_nombre': 'Director Creativo',
                'moneda': 'CLP',
                'presupuesto_rango': '500.000 - 1.000.000',
                'profesiones_requeridas': {
                    'Editor': {'cupos': 1, 'ocupados': 0, 'activo': True},
                    'Camarógrafo': {'cupos': 2, 'ocupados': 1, 'activo': True}
                }
            }
        ]

        return jsonify({'success': True, 'projects': projects_mock})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
