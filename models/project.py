from datetime import datetime
from .base import db
from .user import User, TimestampMixin


class Project(db.Model, TimestampMixin):
    __tablename__ = 'project'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship(User, backref=db.backref('projects', lazy=True))
