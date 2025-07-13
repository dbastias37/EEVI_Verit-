import sqlite3
import shutil
import os
from datetime import datetime

DB_PATH = 'db/forum.db'
MIGRATIONS_FILE = 'db/migrations.sql'


def backup_db(path=DB_PATH):
    ts = datetime.now().strftime('%Y%m%d%H%M%S')
    backup_path = f"{path}.{ts}.bak"
    shutil.copy(path, backup_path)
    return backup_path


def run_migrations(db_path=DB_PATH, migrations_file=MIGRATIONS_FILE):
    if not os.path.exists(db_path):
        print('Database not found')
        return
    backup = backup_db(db_path)
    print(f'Backup created at {backup}')
    conn = sqlite3.connect(db_path)
    with open(migrations_file, 'r', encoding='utf-8') as f:
        sql = f.read()
    conn.executescript(sql)
    conn.commit()
    conn.close()
    print('Migrations applied')


if __name__ == '__main__':
    run_migrations()
