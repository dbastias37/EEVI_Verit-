"""Initial schema."""
from alembic import op
import sqlalchemy as sa

revision = '0001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    if 'clients' not in inspector.get_table_names():
        op.create_table(
            'clients',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('username', sa.String(80)),
            sa.Column('email', sa.String(120), unique=True, nullable=False),
            sa.Column('created_at', sa.DateTime, server_default=sa.text('CURRENT_TIMESTAMP')),
        )
    if 'projects' not in inspector.get_table_names():
        op.create_table(
            'projects',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('title', sa.String(120)),
            sa.Column('category', sa.String(120)),
            sa.Column('video_url', sa.String(255)),
            sa.Column('client_id', sa.Integer, sa.ForeignKey('clients.id')),
            sa.Column('active', sa.Boolean, server_default='0'),
            sa.Column('paid', sa.Boolean, server_default='0'),
            sa.Column('progress', sa.Float, server_default='0'),
            sa.Column('status', sa.String(50), server_default='active'),
            sa.Column('script', sa.Text),
            sa.Column('download', sa.String(255)),
        )
    if 'users' not in inspector.get_table_names():
        op.create_table(
            'users',
            sa.Column('id', sa.Integer, primary_key=True),
            sa.Column('email', sa.String(120), unique=True, nullable=False),
            sa.Column('password', sa.String(128)),
            sa.Column('is_admin', sa.Boolean, server_default='0'),
            sa.Column('verified', sa.Boolean, server_default='0'),
            sa.Column('verification_code', sa.String(120)),
            sa.Column('profile_pic', sa.String(256)),
            sa.Column('created_at', sa.DateTime, server_default=sa.text('CURRENT_TIMESTAMP')),
        )
