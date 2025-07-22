from flask import Blueprint, render_template
from utils.db import get_db

packs_bp = Blueprint('packs', __name__)

@packs_bp.route('/packs', endpoint='index')
def list_packs():
    """Listar packs disponibles"""
    db = get_db()
    packs = db.execute('SELECT * FROM packs ORDER BY id DESC').fetchall()
    return render_template('packs.html', packs=packs)

@packs_bp.route('/packs/<int:id>')
def pack_detail(id):
    """Detalle de un pack"""
    db = get_db()
    pack = db.execute('SELECT * FROM packs WHERE id=?', (id,)).fetchone()
    if not pack:
        return 'Pack no encontrado', 404
    return render_template('pack_detail.html', pack=pack, sounds=[])
