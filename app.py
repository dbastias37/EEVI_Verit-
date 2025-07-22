# Se reemplaza inicialización de DB para evitar get_bind error en Render
from flask import Flask, flash, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_appbuilder import AppBuilder, Model
from flask_appbuilder.models.sqla.interface import SQLAInterface
from flask_appbuilder.views import ModelView
from flask_appbuilder.security.manager import AUTH_DB
from sqlalchemy import Column, Integer, String, or_

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['CSRF_ENABLED'] = True
app.config['AUTH_TYPE'] = AUTH_DB
app.config['AUTH_USER_REGISTRATION'] = True
app.config['AUTH_USER_REGISTRATION_ROLE'] = 'Public'

db = SQLAlchemy(app)
appbuilder = AppBuilder(app, db.session)

# Desactivar la advertencia de TRACK_MODIFICATIONS
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Auto‐crear tablas y usuario admin sin consola
with app.app_context():
    db.create_all()
    from flask_appbuilder.security.sqla.models import User
    sm = appbuilder.sm
    if not User.query.filter_by(username='admin').first():
        sm.add_user(
            username='admin',
            first_name='Administrador',
            last_name='EEVI',
            email='admin@eevi.cl',
            role=sm.find_role('Admin'),
            password='admin123'
        )

# Modelo
class Recurso(Model):
    id = Column(Integer, primary_key=True)
    nombre = Column(String(150), unique=True, nullable=False)
    descripcion = Column(String(500))

# Vista
class RecursoView(ModelView):
    datamodel = SQLAInterface(Recurso)


appbuilder.add_view(RecursoView, "Recursos", icon="fa-folder", category="Contenido")

if __name__ == "__main__":
    app.run(debug=True)
