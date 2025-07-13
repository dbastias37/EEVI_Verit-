from flask import Blueprint, render_template, request, redirect, url_for, session, current_app
from services.project_manager import ProjectManager
from services.comment_manager import CommentManager
from utils.security import admin_required

# Blueprint with short name used for endpoint prefix
admin_bp = Blueprint('admin', __name__)


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
        'active': sum(1 for p in projects if p.get('status') == 'active'),
        'completed': sum(1 for p in projects if p.get('status') == 'completed'),
        'pending': sum(1 for p in projects if not p.get('paid'))
    }
    open_projects = [p for p in projects if p.get('status') != 'completed']
    return render_template('admin_dashboard.html', projects=projects,
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

