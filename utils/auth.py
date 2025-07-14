import sqlite3
import secrets

from utils.db import get_db


def ensure_admin_user():
    """Create a default admin user if none exists and return its id."""
    conn = get_db()
    try:
        admin = conn.execute(
            "SELECT id FROM users WHERE is_admin=1 LIMIT 1"
        ).fetchone()
    except sqlite3.OperationalError:
        # database or table not ready
        return None

    if admin:
        return admin['id']

    password = secrets.token_hex(8)
    conn.execute(
        "INSERT INTO users (email, password, is_admin, verified) VALUES (?, ?, 1, 1)",
        ("admin@verite.cl", password),
    )
    conn.commit()
    admin = conn.execute(
        "SELECT id FROM users WHERE is_admin=1 LIMIT 1"
    ).fetchone()
    return admin['id'] if admin else None
