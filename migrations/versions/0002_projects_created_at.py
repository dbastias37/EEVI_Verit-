"""Add created_at to projects."""
from alembic import op
import sqlalchemy as sa

revision = '0002'
down_revision = '0001'
branch_labels = None
depends_on = None

def upgrade():
    conn = op.get_bind()
    insp = sa.inspect(conn)
    cols = [c['name'] for c in insp.get_columns('projects')]
    if 'created_at' not in cols:
        op.add_column('projects', sa.Column('created_at', sa.DateTime, server_default=sa.text('CURRENT_TIMESTAMP')))
        op.execute("UPDATE projects SET created_at=CURRENT_TIMESTAMP WHERE created_at IS NULL")

def downgrade():
    conn = op.get_bind()
    insp = sa.inspect(conn)
    cols = [c['name'] for c in insp.get_columns('projects')]
    if 'created_at' in cols:
        op.drop_column('projects', 'created_at')
