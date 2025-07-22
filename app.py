from flask import Flask, flash, redirect
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import Column, Integer, String

app = Flask(__name__)
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


if __name__ == "__main__":
    app.run(debug=True)
