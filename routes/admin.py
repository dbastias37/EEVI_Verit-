from flask import (
    Blueprint, render_template, request, redirect,
    url_for, session, current_app, flash
)
from werkzeug.utils import secure_filename
import os
from utils.db import get_db
from utils.auth import ensure_admin_user
from services.project_manager import ProjectManager
from services.comment_manager import CommentManager
from utils.security import admin_required

# Blueprint with short name used for endpoint prefix
admin_bp = Blueprint('admin', __name__, url_prefix='/admin')


@admin_bp.before_request
def auto_login_admin():
    """Ensure a default admin session exists for all admin routes."""
    if session.get('is_admin'):
        return
    conn = get_db()
    admin = conn.execute(
        "SELECT id FROM users WHERE is_admin=1 LIMIT 1"
    ).fetchone()
    if not admin:
        admin_id = ensure_admin_user()
    else:
        admin_id = admin['id']
    if admin_id:
        session['user_id'] = admin_id
        session['is_admin'] = True
        session['admin'] = 'admin@verite.cl'


def _manager():
    return ProjectManager(current_app.config['DB_PATH'])

def _comments():
    return CommentManager(current_app.config['DB_PATH'])


@admin_bp.route('/')
@admin_required
def admin():
    mgr = _manager()
    cmt = _comments()
    projects = mgr.get_all_projects()
    comments = cmt.get_all_comments()
    stats = {
        'total': len(projects),
        'revision': sum(1 for p in projects if p.get('status') == 'revision'),
        'finalizado': sum(1 for p in projects if p.get('status') == 'finalizado'),
        'pagado': sum(1 for p in projects if p.get('status') == 'pagado')
    }
    open_projects = [p for p in projects if p.get('status') != 'finalizado']
    return render_template('admin_panel.html', projects=projects,
                           comments=comments, stats=stats,
                           open_projects=open_projects)


@admin_bp.route('/projects')
@admin_required
def projects():
    """Listar proyectos"""
    mgr = _manager()
    cmt = _comments()
    projects = mgr.get_all_projects()
    comments = cmt.get_all_comments()
    stats = {
        'total': len(projects),
        'revision': sum(1 for p in projects if p.get('status') == 'revision'),
        'finalizado': sum(1 for p in projects if p.get('status') == 'finalizado'),
        'pagado': sum(1 for p in projects if p.get('status') == 'pagado')
    }
    open_projects = [p for p in projects if p.get('status') != 'finalizado']
    return render_template('admin_panel.html', projects=projects,
                           comments=comments, stats=stats,
                           open_projects=open_projects)


@admin_bp.route('/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        from app import get_user, check_password
        email = request.form['email']
        password = request.form['password']
        user = get_user(email)
        if user and user['is_admin'] and check_password(email, password):
            session['admin'] = email
            return redirect(url_for('admin.admin'))
    return render_template('admin_login_form.html')


@admin_bp.route('/signup', methods=['GET', 'POST'])
def admin_signup():
    if request.method == 'POST':
        from app import create_user
        email = request.form['email']
        password = request.form['password']
        create_user(email, password, True)
        return redirect(url_for('client.verify', email=email))
    return render_template('admin_signup.html')


@admin_bp.route('/project/add', methods=['POST'])
@admin_required
def admin_add_project():
    mgr = _manager()
    title = request.form['title']
    category = request.form['category']
    video_url = request.form['video_url']
    client_email = request.form['client_email']
    mgr.add_project(title, category, video_url, client_email)
    return redirect(url_for('admin.admin'))


@admin_bp.route('/project/upload', methods=['POST'])
@admin_required
def admin_upload_project():
    mgr = _manager()
    title = request.form['title']
    category = request.form['category']
    client_email = request.form['client_email']
    file = request.files.get('video_file')
    video_url = ''
    if file and file.filename:
        filename = secure_filename(file.filename)
        path = os.path.join('static', 'uploads', filename)
        file.save(path)
        video_url = '/' + path
    else:
        video_url = request.form.get('video_url', '')
    mgr.add_project(title, category, video_url, client_email)
    return redirect(url_for('admin.admin'))


@admin_bp.route('/logout', methods=['POST'])
@admin_required
def admin_logout():
    session.pop('admin', None)
    return redirect(url_for('admin.admin'))


@admin_bp.route('/project/<int:project_id>/update', methods=['POST'])
@admin_required
def admin_update_project(project_id):
    mgr = _manager()
    video_url = request.form.get('video_url', '')
    client_email = request.form.get('client_email', '')
    mgr.update_project_video(project_id, video_url, client_email)
    return redirect(url_for('admin.admin'))


@admin_bp.route('/project/<int:project_id>/activate', methods=['POST'])
@admin_required
def admin_activate_payment(project_id):
    mgr = _manager()
    mgr.activate_payment(project_id)
    return redirect(url_for('admin.admin'))


@admin_bp.route('/project/<int:project_id>/delete', methods=['POST'])
@admin_required
def admin_delete_video(project_id):
    mgr = _manager()
    mgr.delete_video(project_id)
    return redirect(url_for('admin.admin'))


@admin_bp.route('/project/<int:project_id>/status', methods=['POST'])
@admin_required
def admin_update_status(project_id):
    mgr = _manager()
    status = request.form.get('status', '')
    if status:
        mgr.update_status(project_id, status)
    return redirect(url_for('admin.admin'))


@admin_bp.route('/clientes')
def admin_clients():
    return render_template('admin_clients.html')


@admin_bp.route('/clients')
def clients():
    """Vista Clientes (en)"""
    return render_template('admin/clients.html')

@admin_bp.route('/usuarios')
def admin_users():
    return render_template('admin_users.html')

@admin_bp.route('/comentarios')
def admin_comments():
    return render_template('admin_comments.html')


@admin_bp.route('/comments')
def comments():
    """Vista Comentarios (en)"""
    return render_template('admin/comments.html')


# ----- Admin Packs CRUD -----

@admin_bp.route('/packs')
def packs_list():
    db = get_db()
    packs = db.execute("SELECT * FROM packs ORDER BY id DESC").fetchall()
    return render_template('admin/packs_list.html', packs=packs)


@admin_bp.route('/packs/new', methods=['GET','POST'])
def pack_new():
    if request.method == 'POST':
        name = request.form['name']
        slug = request.form['slug']
        desc = request.form['description']
        price = request.form['price']
        image = request.form['image_url']
        db = get_db()
        db.execute(
            "INSERT INTO packs (name, slug, description, price, image_url) VALUES (?,?,?,?,?)",
            (name, slug, desc, price, image)
        )
        db.commit()
        flash("Pack creado correctamente", "success")
        return redirect(url_for('admin.packs_list'))
    return render_template('admin/pack_form.html', pack=None)


@admin_bp.route('/packs/<int:id>/edit', methods=['GET','POST'])
def pack_edit(id):
    db = get_db()
    pack = db.execute("SELECT * FROM packs WHERE id = ?", (id,)).fetchone()
    if not pack:
        flash("Pack no encontrado", "error")
        return redirect(url_for('admin.packs_list'))
    if request.method == 'POST':
        db.execute(
            "UPDATE packs SET name=?, slug=?, description=?, price=?, image_url=? WHERE id=?",
            (request.form['name'], request.form['slug'], request.form['description'],
             request.form['price'], request.form['image_url'], id)
        )
        db.commit()
        flash("Pack actualizado", "success")
        return redirect(url_for('admin.packs_list'))
    return render_template('admin/pack_form.html', pack=pack)


@admin_bp.route('/packs/<int:id>/delete', methods=['POST'])
def pack_delete(id):
    password = request.form.get('password','')
    if password != 'eliminar2025':
        flash("Contraseña incorrecta", "error")
    else:
        db = get_db()
        db.execute("DELETE FROM packs WHERE id = ?", (id,))
        db.commit()
        flash("Pack eliminado", "success")
    return redirect(url_for('admin.packs_list'))
