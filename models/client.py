from .base import db, TimestampMixin

class Client(db.Model, TimestampMixin):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True, nullable=False)
