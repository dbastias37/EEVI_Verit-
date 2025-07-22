import os
from flask import Flask, flash, redirect, send_from_directory, render_template
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import Column, Integer, String

app = Flask(__name__)
# ——————— Registrar todos los Blueprints ———————
from routes.admin       import admin_bp
from routes.auth        import auth_bp
from routes.chat        import chat_bp
from routes.client      import client_bp
from routes.forum_auth  import forum_auth_bp
from routes.forum_stats import forum_bp
from routes.friends     import friends_bp
from routes.messages    import messages_bp
from routes.packs       import packs_bp
from routes.projects    import projects_bp
from routes.user_status import status_bp

app.register_blueprint(admin_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(client_bp)
app.register_blueprint(forum_auth_bp)
app.register_blueprint(forum_bp)
app.register_blueprint(friends_bp)
app.register_blueprint(messages_bp)
app.register_blueprint(packs_bp)
app.register_blueprint(projects_bp)
app.register_blueprint(status_bp)
# ———————————————————————————
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BUILD_DIR = os.path.join(BASE_DIR, 'dist')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['CSRF_ENABLED'] = True

# Base de datos
db = SQLAlchemy(app)

# Crea las tablas automaticamente
with app.app_context():
    db.create_all()
# DB init skipped for Render deployment

# Modelo
class Recurso(db.Model):
    id = Column(Integer, primary_key=True)
    nombre = Column(String(150), unique=True, nullable=False)
    descripcion = Column(String(500))



@app.route('/')
def home():
    return render_template('home_enhanced.html')

@app.route('/<path:path>')
def serve_react(path):
    file_path = os.path.join(BUILD_DIR, path)
    if path and os.path.exists(file_path):
        return send_from_directory(BUILD_DIR, path)
    return send_from_directory(BUILD_DIR, 'index.html')


if __name__ == "__main__":
    app.run(debug=True)
