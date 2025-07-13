from functools import wraps
from flask import session, redirect, url_for, abort


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'user' not in session:
            return redirect(url_for('client.dashboard_login'))
        return f(*args, **kwargs)
    return wrapper


def admin_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get('admin'):
            return redirect(url_for('admin_bp.admin'))
        return f(*args, **kwargs)
    return wrapper
