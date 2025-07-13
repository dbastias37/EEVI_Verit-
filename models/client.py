from datetime import datetime
from .base import db
from .user import TimestampMixin


class Client(db.Model, TimestampMixin):
    __tablename__ = 'client'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
