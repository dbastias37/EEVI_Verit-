import os
import shutil
import sqlite3
import subprocess
from pathlib import Path


def test_alembic_upgrade_preserves_data(tmp_path):
    db_src = Path('db/forum.db')
    db_copy = tmp_path / 'forum.db'
    shutil.copy(db_src, db_copy)

    conn = sqlite3.connect(db_copy)
    tables = [row[0] for row in conn.execute("SELECT name FROM sqlite_master WHERE type='table'")]
    before = {t: conn.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0] for t in tables}
    conn.close()

    env = dict(os.environ, DB_PATH=str(db_copy))
    subprocess.run(['alembic', '-c', 'migrations/alembic.ini', 'upgrade', 'head'], check=True, env=env)

    conn = sqlite3.connect(db_copy)
    after = {t: conn.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0] for t in tables}
    conn.close()

    assert before == after
