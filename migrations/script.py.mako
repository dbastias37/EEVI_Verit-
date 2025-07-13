"""${message}"""
revision = '${up_revision}'
down_revision = ${down_revision | repr}
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa

def upgrade():
    pass

def downgrade():
    pass
