from .base import db, TimestampMixin

class Project(db.Model, TimestampMixin):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    category = db.Column(db.String(120))
    video_url = db.Column(db.String(255))
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    active = db.Column(db.Boolean, default=False)
    paid = db.Column(db.Boolean, default=False)
    progress = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(50), default='active')
    script = db.Column(db.Text)
    download = db.Column(db.String(255))

    client = db.relationship('Client', backref=db.backref('projects', lazy=True))
    comments = db.relationship('Comment', backref='project', lazy=True)
