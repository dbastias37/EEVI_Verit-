from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from utils.user_auth import create_user, get_user, check_password as check_local_password
from google.cloud import firestore
from datetime import datetime, timedelta
import re

forum_auth_bp = Blueprint('forum_auth', __name__, template_folder='templates')

# Frases rotativas para usuarios existentes
LOGIN_PHRASES = [
    "Soy usuario antiguo déjame pasar!...",
    "tengo cuenta...",
    "Permiso, ya hice esto. llévame al login",
    "No necesito registro jaja...",
    "Soy usuario frecuente, tengo cuenta!",
    "Bla, bla, bla! déjame entrar...",
    "Ingresar a mi cuenta"
]

@forum_auth_bp.route('/')
def vforum_auth():
    """Vista unificada de registro/login"""
    if session.get('forum_user'):
        return redirect(url_for('list_forum'))

    professions = [
        "Filmmakers",
        "Desarrolladores de videojuegos",
        "Editores",
        "Audiovisuales",
        "Youtubers"
    ]

    return render_template('vforum_auth.html',
                         professions=professions,
                         login_phrases=LOGIN_PHRASES)

@forum_auth_bp.route('/register', methods=['POST'])
def vforum_register():
    """Registro de nuevo usuario en Firebase"""
    from app import usuarios_ref

    email = request.form.get('email')
    password = request.form.get('password')
    username = request.form.get('username')

    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
        return jsonify({'error': 'Email inválido'}), 400

    existing = usuarios_ref.where('email', '==', email).get()
    if list(existing) or get_user(email):
        return jsonify({'error': 'Email ya registrado'}), 400

    user_data = {
        'email': email,
        'username': username,
        'password_hash': generate_password_hash(password),
        'profile_pic': '/static/img/avatar.png',
        'created_at': firestore.SERVER_TIMESTAMP,
        'last_seen': firestore.SERVER_TIMESTAMP,
        'is_online': True,
        'role': 'user'
    }

    doc_ref = usuarios_ref.add(user_data) if usuarios_ref else (None, type('x',(object,),{'id':None}))
    create_user(email, password, username=username)

    local_user = get_user(email)
    session['forum_user'] = {
        'id': doc_ref[1].id if doc_ref else local_user['id'],
        'email': email,
        'username': username,
        'role': 'user'
    }
    session['user'] = email

    return jsonify({'success': True, 'redirect': url_for('list_forum')})

@forum_auth_bp.route('/login', methods=['POST'])
def vforum_login():
    """Login de usuario existente"""
    from app import usuarios_ref

    email = request.form.get('email')
    password = request.form.get('password')

    users = usuarios_ref.where('email', '==', email).limit(1).get() if usuarios_ref else []
    user_doc = None
    for doc in users:
        user_doc = doc
        break

    if not user_doc:
        local_user = get_user(email)
        if not local_user or not check_local_password(email, password):
            return jsonify({'error': 'Usuario no encontrado'}), 404
        user_data = {
            'username': local_user.get('username', email.split('@')[0]),
            'role': local_user.get('role', 'user'),
            'profile_pic': local_user.get('profile_pic')
        }
    else:
        user_data = user_doc.to_dict()
        if not check_password_hash(user_data['password_hash'], password):
            return jsonify({'error': 'Contraseña incorrecta'}), 401
        if not get_user(email):
            create_user(email, password, username=user_data.get('username'))

    user_doc.reference.update({
        'last_seen': firestore.SERVER_TIMESTAMP,
        'is_online': True
    })

    local_user = get_user(email)
    session['forum_user'] = {
        'id': user_doc.id if user_doc else local_user['id'],
        'email': email,
        'username': user_data.get('username', local_user.get('username')),
        'role': user_data.get('role', 'user'),
        'profile_pic': user_data.get('profile_pic', local_user.get('profile_pic'))
    }
    session['user'] = email

    return jsonify({'success': True, 'redirect': url_for('list_forum')})

@forum_auth_bp.route('/logout')
def vforum_logout():
    """Cerrar sesión"""
    if 'forum_user' in session:
        from app import usuarios_ref
        user_id = session['forum_user']['id']
        if usuarios_ref:
            usuarios_ref.document(user_id).update({'is_online': False})
        session.pop('forum_user')
    session.pop('user', None)

    return redirect(url_for('client.home'))


# Alias legacy para mantener compatibilidad con templates antiguos
@forum_auth_bp.route('/list', endpoint='list_forum')
def list_forum():
    """Redirige al inicio del foro."""
    from flask import redirect, url_for
    return redirect(url_for('forum_auth.vforum_auth'))
