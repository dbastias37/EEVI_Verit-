from flask import Blueprint, render_template
from utils.drive_previews import fetch_previews

packs_bp = Blueprint('packs', __name__)

@packs_bp.route('/packs')
def packs():
    previews = fetch_previews()
    return render_template('packs.html', previews=previews)

