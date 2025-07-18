from .base import db, TimestampMixin

class User(db.Model, TimestampMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)
    username = db.Column(db.String(64))
    role = db.Column(db.String(32), default='user')
    verified = db.Column(db.Boolean, default=False)
    verification_code = db.Column(db.String(120))
    profile_pic = db.Column(db.String(256))

    projects = db.relationship('Project', backref='owner', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)
