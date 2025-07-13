import sqlite3
import shutil
import os
from datetime import datetime
import logging

DB_PATH = 'db/forum.db'

# Column definitions required for projects table
REQUIRED_COLUMNS = {
    'client_id': "INTEGER",
    'status': "TEXT DEFAULT 'draft'",
    'payment_validated': "INTEGER DEFAULT 0",
    'payment_code': "VARCHAR(100)",
    'priority': "TEXT DEFAULT 'normal'",
    'estimated_delivery': "DATE",
    'created_at': "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    'updated_at': "TIMESTAMP",
}

logging.basicConfig(level=logging.INFO, format='[%(levelname)s] %(message)s')


def backup_db(path: str = DB_PATH) -> str:
    """Create a timestamped backup of the database."""
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup = f"{path}.{ts}.bak"
    shutil.copy(path, backup)
    logging.info(f"Backup created at {backup}")
    return backup


def add_missing_columns(conn: sqlite3.Connection) -> None:
    cur = conn.execute("PRAGMA table_info(projects)")
    existing = {row[1] for row in cur.fetchall()}
    for col, ddl in REQUIRED_COLUMNS.items():
        if col not in existing:
            logging.info(f"Adding column {col}")
            conn.execute(f"ALTER TABLE projects ADD COLUMN {col} {ddl}")


def populate_defaults(conn: sqlite3.Connection) -> None:
    conn.execute(
        "UPDATE projects SET created_at=COALESCE(created_at, CURRENT_TIMESTAMP)"
    )
    conn.execute(
        "UPDATE projects SET updated_at=COALESCE(updated_at, CURRENT_TIMESTAMP)"
    )


def migrate(db_path: str = DB_PATH):
    if not os.path.exists(db_path):
        logging.error(f"Database not found at {db_path}")
        return
    backup = backup_db(db_path)
    conn = sqlite3.connect(db_path)
    try:
        add_missing_columns(conn)
        populate_defaults(conn)
        conn.commit()
        logging.info("Migration completed successfully")
    except Exception as e:
        logging.error(f"Migration failed: {e}")
        conn.rollback()
        conn.close()
        shutil.copy(backup, db_path)
        logging.info("Rolled back to original database")
        return
    conn.close()


if __name__ == '__main__':
    migrate()
