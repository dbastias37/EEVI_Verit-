from flask import Flask, render_template, Blueprint, redirect, url_for, request
from routes.chat import chat_bp

app = Flask(__name__, static_folder="static", template_folder="templates")

# --- Compatibilidad plantilla COMUNIDAD ------------------------------------
from flask import Blueprint, redirect, url_for, render_template

client = Blueprint("client", __name__)

# 1. endpoint client.home   →  /client/home   (redirige 1 vez al root)
@client.route("/client/home", endpoint="home")
def client_home():
    return redirect(url_for("home"), code=302)
 n91ti7-codex/corrige-bucle-302-en-app.py


# 2. endpoint forum_auth.vforum_auth  →  /forum   (único redirect válido)
@client.route("/forum", endpoint="vforum_auth")
def client_forum():
    return render_template("home_enhanced.html")   # sin redirect para evitar bucle

# Registrar blueprint
app.register_blueprint(client, url_prefix="")
# ---------------------------------------------------------------------------
app.register_blueprint(chat_bp, url_prefix="/chat")

# --- Alias para COMUNIDAD ----------------------------------------------------
from flask import Blueprint, render_template
main

# 2. endpoint forum_auth.vforum_auth  →  /forum   (único redirect válido)
@client.route("/forum", endpoint="vforum_auth")
def client_forum():
    return render_template("home_enhanced.html")   # sin redirect para evitar bucle

 n91ti7-codex/corrige-bucle-302-en-app.py
# Registrar blueprint
app.register_blueprint(client, url_prefix="")
# ---------------------------------------------------------------------------

app.register_blueprint(chat_bp, url_prefix="/chat")

@forum_auth.route("/forum", endpoint="vforum_auth")
def forum_alias():
    return render_template("home_enhanced.html")

app.register_blueprint(forum_auth, url_prefix="")
# -----------------------------------------------------------------------------

# --- Alias para BUSCAR PROYECTO --------------------------------------------
@app.route("/projects", endpoint="list_forum")
def list_forum():
    # Reutiliza la misma SPA
    return render_template("home_enhanced.html")
# ---------------------------------------------------------------------------
 main


@app.route("/", methods=["GET", "HEAD"])
def home():
    if request.method == "HEAD":
        return "", 200
    return render_template("home_enhanced.html")


@app.route("/chat-page")
def chat_page():
    return render_template("chat.html")


@app.route("/<path:sub>")
def spa_routes(sub):
    return render_template("home_enhanced.html")
