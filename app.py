from flask import Flask, render_template, Blueprint, redirect, url_for
from routes.chat import chat_bp

app = Flask(__name__, static_folder="static", template_folder="templates")
app.register_blueprint(chat_bp, url_prefix="/chat")

legacy = Blueprint("client", __name__)

@legacy.route("/")
def home_redirect():
    return redirect(url_for("home"))

app.register_blueprint(legacy, url_prefix="")


@app.route("/", methods=["GET", "HEAD"])
def home():
    return render_template("home_enhanced.html")


@app.route("/chat-page")
def chat_page():
    return render_template("chat.html")


@app.route("/<path:sub>")
def spa_routes(sub):
    return render_template("home_enhanced.html")
