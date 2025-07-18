from werkzeug.security import generate_password_hash, check_password_hash
from utils.db import get_db


def create_user(email: str, password: str, is_admin: bool = False,
                username: str | None = None, role: str = "user") -> int:
    """Create a new user in the local database."""
    conn = get_db()
    cur = conn.cursor()
    username = username or email.split("@")[0]
    hashed = generate_password_hash(password)
    cur.execute(
        "INSERT INTO users (email, password, is_admin, username, role) VALUES (?,?,?,?,?)",
        (email, hashed, int(is_admin), username, role),
    )
    conn.commit()
    return cur.lastrowid


def get_user(email: str):
    """Return user dict by email or None."""
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE email=?", (email,))
    row = cur.fetchone()
    return dict(row) if row else None


def check_password(email: str, password: str) -> bool:
    """Validate a password for a given user."""
    user = get_user(email)
    if not user:
        return False
    return check_password_hash(user["password"], password)


def save_profile_pic(email: str, path: str) -> None:
    """Update profile picture path for a user."""
    conn = get_db()
    conn.execute("UPDATE users SET profile_pic=? WHERE email=?", (path, email))
    conn.commit()

