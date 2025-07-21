from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home_enhanced.html")

@app.route("/chat")
def chat():
    return render_template("chat.html")

@app.route("/<path:path>")
def catch_all(path):
    return render_template("home_enhanced.html")
