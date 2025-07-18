import os
import sqlite3
from flask import g, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# SQLAlchemy database instance
db = SQLAlchemy()
# Flask-Migrate instance
migrate = Migrate()

def get_db():
    """Return a SQLite connection applying WAL and synchronous pragmas."""
    if 'db' not in g:
        path = current_app.config['DB_PATH']
        conn = sqlite3.connect(path, timeout=10, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute('PRAGMA journal_mode=WAL;')
        conn.execute('PRAGMA synchronous=NORMAL;')
        g.db = conn
    return g.db

def close_db(exception=None):
    conn = g.pop('db', None)
    if conn is not None:
        conn.close()

def ensure_projects_schema(cursor):
    """Create the projects table and add any missing columns."""
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
    )
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            category TEXT,
            video_url TEXT,
            client_id INTEGER,
            active INTEGER DEFAULT 0,
            paid INTEGER DEFAULT 0,
            progress REAL DEFAULT 0,
            status TEXT DEFAULT 'active',
            script TEXT,
            download TEXT,
            FOREIGN KEY(client_id) REFERENCES clients(id)
        );
        """
    )
    cursor.execute("PRAGMA table_info(projects)")
    existing = [row[1] for row in cursor.fetchall()]
    required = {
        "title": "TEXT",
        "category": "TEXT",
        "video_url": "TEXT",
        "client_id": "INTEGER",
        "active": "INTEGER DEFAULT 0",
        "paid": "INTEGER DEFAULT 0",
        "progress": "REAL DEFAULT 0",
        "status": "TEXT DEFAULT 'active'",
        "script": "TEXT",
        "download": "TEXT",
    }
    for col, ctype in required.items():
        if col not in existing:
            cursor.execute(f"ALTER TABLE projects ADD COLUMN {col} {ctype}")

    if "client_email" in existing and "client_id" in existing:
        cursor.execute(
            "SELECT DISTINCT client_email FROM projects WHERE client_email IS NOT NULL AND client_email != ''"
        )
        emails = [row[0] for row in cursor.fetchall()]
        for email in emails:
            username = email.split("@")[0]
            cursor.execute(
                "INSERT OR IGNORE INTO clients (username, email) VALUES (?, ?)",
                (username, email),
            )
        cursor.execute(
            "UPDATE projects SET client_id = (SELECT id FROM clients WHERE email = projects.client_email) WHERE client_email IS NOT NULL AND client_email != '' AND client_id IS NULL"
        )
        cursor.execute("ALTER TABLE projects DROP COLUMN client_email")


def init_db(app):
    """Initialize or upgrade the main database using schema.sql."""
    conn = sqlite3.connect(app.config['DB_PATH'])
    cursor = conn.cursor()
    schema_path = os.path.join(os.path.dirname(__file__), "..", "db", "schema.sql")
    with open(schema_path, "r", encoding="utf-8") as f:
        cursor.executescript(f.read())
    try:
        cursor.execute("SELECT slug FROM topics LIMIT 1")
    except sqlite3.OperationalError:
        cursor.execute("ALTER TABLE topics ADD COLUMN slug TEXT UNIQUE")

    ensure_projects_schema(cursor)

    # Ensure new columns exist in users table
    cursor.execute("PRAGMA table_info(users)")
    existing = [row[1] for row in cursor.fetchall()]
    if 'username' not in existing:
        cursor.execute("ALTER TABLE users ADD COLUMN username TEXT")
    if 'role' not in existing:
        cursor.execute("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'")

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            text TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(project_id) REFERENCES projects(id),
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
        """
    )
    conn.commit()
    conn.close()
