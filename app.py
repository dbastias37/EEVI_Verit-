
from flask import Flask, render_template, Blueprint, redirect, url_for
from routes.chat import chat_bp   # <- conserva tu blueprint de chat
from routes.packs import packs_bp
from routes.forum_auth import forum_auth

app = Flask(__name__, static_folder="static", template_folder="templates")

# ╭─────────────────────────────────────────────────────────────╮
# │ 1.  LEGACY 'client'  → cubre url_for('client.home')         │
# ╰─────────────────────────────────────────────────────────────╯
client = Blueprint("client", __name__)

@client.route("/client/home", endpoint="home")
def client_home():
    # Una sola redirección hacia la raíz
    return redirect(url_for("home"), code=302)

app.register_blueprint(client, url_prefix="")   # sin prefijo

# ╭─────────────────────────────────────────────────────────────╮
# │ 2.  Blueprint de autenticación del foro                     │
# ╰─────────────────────────────────────────────────────────────╯
app.register_blueprint(forum_auth)

# ╭─────────────────────────────────────────────────────────────╮
# │ 3.  ALIAS list_forum  → cubre url_for('list_forum')         │
# ╰─────────────────────────────────────────────────────────────╯
@app.route("/projects", endpoint="list_forum")
def list_forum():
    """Enlace 'BUSCAR PROYECTO' de la navbar"""
    return render_template("home_enhanced.html")

# ╭─────────────────────────────────────────────────────────────╮
# │ 4.  Rutas principales SPA                                  │
# ╰─────────────────────────────────────────────────────────────╯
@app.route("/", methods=["GET", "HEAD"])
def home():
    return render_template("home_enhanced.html")

@app.route("/<path:sub>", methods=["GET", "HEAD"])
def spa_routes(sub):
    # Captura /dashboard, /servicios, etc.
    return render_template("home_enhanced.html")

# ╭─────────────────────────────────────────────────────────────╮
# │ 5.  Blueprint de chat (el tuyo existente)                  │
# ╰─────────────────────────────────────────────────────────────╯
app.register_blueprint(chat_bp, url_prefix="/chat")
app.register_blueprint(packs_bp)
