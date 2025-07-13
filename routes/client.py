import os
from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify, abort, current_app
from services.project_manager import ProjectManager
from services.comment_manager import CommentManager
from utils.security import login_required
from utils.validators import is_valid_url

client_bp = Blueprint('client', __name__)


def _projects():
    return ProjectManager(current_app.config['DB_PATH'])


def _comments():
    return CommentManager(current_app.config['DB_PATH'])


def get_drive_preview_url(share_url):
    if not share_url:
        return ''
    import re
    match = re.search(r"/d/([A-Za-z0-9_-]+)/", share_url)
    if match:
        file_id = match.group(1)
        return f"https://drive.google.com/file/d/{file_id}/preview"
    return share_url


def get_all_packs():
    import json
    with open('packs/info.json', 'r', encoding='utf-8') as f:
        return json.load(f)


def get_all_services():
    import json
    with open('services/info.json', 'r', encoding='utf-8') as f:
        return json.load(f)


@client_bp.route('/')
def home():
    from modules import forum as forum_db
    latest = forum_db.get_latest_topic()
    packs = get_all_packs()
    services = get_all_services()
    return render_template('home.html', latest=latest, packs=packs, services=services)


@client_bp.route('/packs')
def packs():
    return render_template('packs.html', packs=get_all_packs())


@client_bp.route('/services')
def services_page():
    return render_template('services.html', services=get_all_services())


@client_bp.route('/academy')
def academy():
    return render_template('academy.html')


@client_bp.route('/dashboard')
@login_required
def dashboard():
    user_email = session['user']
    from app import get_user
    user = get_user(user_email)
    mgr = _projects()
    projects = mgr.get_projects_for_email(user_email)
    for proj in projects:
        proj['embed_url'] = get_drive_preview_url(proj.get('video_url', ''))
    active = [p for p in projects if p['status'] == 'active']
    completed = [p for p in projects if p['status'] == 'completed']
    stats = {
        'active': len(active),
        'completed': len(completed),
        'scripts': len(projects),
        'pending': sum(1 for p in projects if not p['paid'])
    }
    return render_template('dashboard.html', user=user, projects=projects,
                           active_projects=active, completed_projects=completed, stats=stats)


@client_bp.route('/dashboard/login', methods=['GET', 'POST'])
def dashboard_login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        from app import check_password
        if check_password(email, password):
            session['user'] = email
            return redirect(url_for('client.dashboard'))
    return render_template('dashboard_login.html')


@client_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        from app import create_user
        create_user(email, password)
        return redirect(url_for('client.verify', email=email))
    return render_template('signup.html')


@client_bp.route('/verify', methods=['GET', 'POST'])
def verify():
    email = request.args.get('email') or request.form.get('email')
    if request.method == 'POST':
        code = request.form['code']
        from utils.db import get_db
        conn = get_db()
        cur = conn.cursor()
        cur.execute('SELECT verification_code FROM users WHERE email=?', (email,))
        row = cur.fetchone()
        if row and row[0] == code:
            cur.execute('UPDATE users SET verified=1 WHERE email=?', (email,))
            conn.commit()
            return redirect(url_for('client.dashboard_login'))
        abort(401)
    return render_template('verify.html', email=email)


@client_bp.route('/dashboard/upload', methods=['POST'])
@login_required
def upload_profile():
    user_email = session['user']
    file = request.files['photo']
    if file and file.filename:
        path = os.path.join('static', 'uploads', file.filename)
        file.save(path)
        from app import save_profile_pic
        save_profile_pic(user_email, '/' + path)
    return redirect(url_for('client.dashboard'))


@client_bp.route('/dashboard/logout', methods=['POST'])
@login_required
def logout():
    session.pop('user', None)
    return redirect(url_for('client.dashboard'))


@client_bp.route('/project/<int:project_id>/comments', methods=['GET', 'POST'])
def project_comments(project_id):
    cm = _comments()
    if request.method == 'POST':
        user_email = session.get('user')
        if not user_email:
            abort(401)
        from app import get_user
        user = get_user(user_email)
        text = request.form.get('text') or (request.get_json() or {}).get('text')
        if text:
            cm.add_comment(project_id, user['id'], text)
        return jsonify(success=True)
    return jsonify(cm.get_comments(project_id))


@client_bp.route('/pack/<string:pack_id>')
def ver_pack(pack_id):
    packs = get_all_packs()
    pack = next((p for p in packs if p['id'] == pack_id), None)
    if pack:
        return render_template('pack.html', pack=pack)
    return "Pack no encontrado", 404

