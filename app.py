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

session = appbuilder.get_session
user_model = appbuilder.sm.user_model
if not session.query(user_model).filter_by(username='admin').first():
    admin_role = appbuilder.sm.find_role('Admin')
    admin = user_model(
        username='admin',
        first_name='Admin',
        last_name='User',
        email='admin@eevi.cl',
        active=True,
        password=appbuilder.sm.hash_password('admin123'),
    )
    admin.roles.append(admin_role)
    session.add(admin)
    session.commit()

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
