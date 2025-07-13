from .base import db, TimestampMixin

class Comment(db.Model, TimestampMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    project = db.relationship('Project', backref=db.backref('comments', lazy=True))
    user = db.relationship('User', backref=db.backref('comments', lazy=True))
