from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_appbuilder import AppBuilder, Model
from flask_appbuilder.models.sqla.interface import SQLAInterface
from flask_appbuilder.views import ModelView
from sqlalchemy import Column, Integer, String

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['CSRF_ENABLED'] = True

db = SQLAlchemy(app)
appbuilder = AppBuilder(app, db.session)

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
