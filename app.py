import os
from flask import Flask, flash, redirect, send_from_directory
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import Column, Integer, String

app = Flask(__name__)
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


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    file_path = os.path.join(BUILD_DIR, path)
    if path and os.path.exists(file_path):
        return send_from_directory(BUILD_DIR, path)
    return send_from_directory(BUILD_DIR, 'index.html')


if __name__ == "__main__":
    app.run(debug=True)
