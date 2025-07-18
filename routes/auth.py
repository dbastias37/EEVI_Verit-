from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash
from utils.user_auth import create_user, get_user, check_password

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = get_user(email)
        if user and check_password(email, password):
            session['user'] = email
            session['forum_user'] = {
                'id': user['id'],
                'email': email,
                'username': user.get('username', email.split('@')[0]),
                'role': user.get('role', 'user'),
            }
            session['role'] = user.get('role', 'user')
            if user['role'] == 'admin':
                session['admin'] = email
                return redirect(url_for('admin.admin'))
            if user['role'] == 'client':
                return redirect(url_for('client.dashboard'))
            return redirect(url_for('list_forum'))
        flash('Credenciales inválidas', 'error')
    return render_template('login.html')

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']
        create_user(email, password, username=username, role='user')
        flash('Usuario creado. Revisa tu email para verificar', 'success')
        return redirect(url_for('auth.login'))
    return render_template('register.html')
