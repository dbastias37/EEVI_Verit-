from flask import Flask, render_template, Blueprint, redirect, url_for, request
from routes.chat import chat_bp

app = Flask(__name__, static_folder="static", template_folder="templates")

# Legacy blueprint to support old `client.*` links
legacy = Blueprint("client", __name__)

@legacy.route("/")
def home_redirect():
    return redirect(url_for("home"))

# --- Compatibilidad para la plantilla base (COMUNIDAD) ----------------------
from flask import Blueprint, redirect, url_for

forum_auth = Blueprint("forum_auth", __name__)

@forum_auth.route("/forum", endpoint="vforum_auth")
def forum_redirect():
    # Redirige a la SPA manteniendo ruta /forum
    return redirect(url_for("spa_routes", sub="forum"))

# Registrar el alias
app.register_blueprint(forum_auth, url_prefix="")
# ---------------------------------------------------------------------------

app.register_blueprint(legacy, url_prefix="")
app.register_blueprint(chat_bp, url_prefix="/chat")


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
