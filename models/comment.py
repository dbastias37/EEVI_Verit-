from datetime import datetime
from .base import db
from .user import User, TimestampMixin
from .project import Project


class Comment(db.Model, TimestampMixin):
    __tablename__ = 'comment'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))

    user = db.relationship(User, backref=db.backref('comments', lazy=True))
    project = db.relationship(Project, backref=db.backref('comments', lazy=True))
