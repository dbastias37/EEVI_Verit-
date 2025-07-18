import os
from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify, abort, current_app
from services.project_manager import ProjectManager
from services.comment_manager import CommentManager
from utils.security import login_required
from utils.db import get_db
from utils.user_auth import create_user, check_password, get_user, save_profile_pic
from utils.validators import is_valid_url
from google.api_core.exceptions import GoogleAPICallError

client_bp = Blueprint('client', __name__)


@client_bp.route('/status', methods=['GET'])
def status():
    """Health check endpoint."""
    return jsonify(ok=True)


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
    db = get_db()
    return db.execute("SELECT * FROM packs ORDER BY id DESC").fetchall()


def get_all_services():
    import json
    with open('services/info.json', 'r', encoding='utf-8') as f:
        return json.load(f)


@client_bp.route('/packs', endpoint='packs')
def packs():
    """Muestra la galería de packs disponibles."""
    packs = get_all_packs()
    return render_template('packs.html', packs=packs)


@client_bp.route('/', methods=['GET'])
def home():
    from google.cloud import firestore
    from utils.drive_previews import fetch_previews
    from utils.forum_utils import mapeo_datos
    from services.fs_client import fs_client
    try:
        docs = (
            fs_client.collection('foro')
            .order_by('created_at', direction=firestore.Query.DESCENDING)
            .limit(1)
            .stream()
        )
        latest = None
        for d in docs:
            latest = mapeo_datos({**d.to_dict(), 'id': d.id})
            break
    except GoogleAPICallError as e:
        current_app.logger.error(f"Firestore query failed: {e}")
        raise
    packs = get_all_packs()
    services = get_all_services()
    previews = fetch_previews()
    stats = {
        'total_sounds': len(packs) * 50 if packs else 800,
        'projects_completed': 120,
        'satisfaction': 98,
        'avg_delivery': '24h'
    }
    return render_template(
        'home.html', latest=latest, packs=packs, services=services, stats=stats, previews=previews
    )




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
        if check_password(email, password):
            session['user'] = email
            user = get_user(email)
            session['forum_user'] = {
                'id': user['id'],
                'email': email,
                'username': user.get('username', email.split('@')[0]),
                'role': user.get('role', 'user'),
            }
            return redirect(url_for('client.dashboard'))
    return render_template('dashboard_login.html')


@client_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
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
        save_profile_pic(user_email, '/' + path)
    return redirect(url_for('client.dashboard'))


@client_bp.route('/dashboard/logout', methods=['POST'])
@login_required
def logout():
    user_email = session.pop('user', None)
    session.pop('forum_user', None)
    if user_email:
        from app import remove_online
        user = get_user(user_email)
        if user:
            remove_online(user['id'])
    return redirect(url_for('client.dashboard'))


@client_bp.route('/project/<int:project_id>/comments', methods=['GET', 'POST'])
def project_comments(project_id):
    cm = _comments()
    if request.method == 'POST':
        user_email = session.get('user')
        if not user_email:
            abort(401)
        user = get_user(user_email)
        text = request.form.get('text') or (request.get_json() or {}).get('text')
        if text:
            cm.add_comment(project_id, user['id'], text)
        return jsonify(success=True)
    return jsonify(cm.get_comments(project_id))


@client_bp.route('/packs/<int:id>', endpoint='pack_detail')
def pack_detail(id):
    """Vista detalle de un pack."""
    db = get_db()
    pack = db.execute("SELECT * FROM packs WHERE id=?", (id,)).fetchone()
    if pack:
        return render_template('pack_detail.html', pack=pack, sounds=[])
    return "Pack no encontrado", 404


@client_bp.route('/api/random-quote')
def api_random_quote():
    """Devuelve una frase motivacional en formato JSON."""
    from utils.quotes import get_random_quote
    return jsonify({"quote": get_random_quote()}), 200
