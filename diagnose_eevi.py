import sqlite3
import os
import sys
from typing import List

DB_PATH = 'db/forum.db'


def get_columns(db_path: str = DB_PATH) -> List[str]:
    """Return list of column names in the projects table."""
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return []
    conn = sqlite3.connect(db_path)
    cur = conn.execute("PRAGMA table_info(projects)")
    cols = [row[1] for row in cur.fetchall()]
    conn.close()
    return cols


def main(db_path: str = DB_PATH):
    print(f"Inspecting database: {db_path}")
    cols = get_columns(db_path)
    if not cols:
        print("No projects table found or table is empty.")
        return
    print("Current columns in 'projects':")
    for c in cols:
        print(f" - {c}")

    conn = sqlite3.connect(db_path)
    cur = conn.execute("SELECT COUNT(*) FROM projects")
    count = cur.fetchone()[0]
    print(f"Total project records: {count}")
    conn.close()


if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else DB_PATH
    main(path)
