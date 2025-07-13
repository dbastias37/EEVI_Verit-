import sqlite3
from uuid import uuid4

DB_PATH = 'db/forum.db'

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# Add the new column if it doesn't exist
try:
    cur.execute("SELECT username FROM users LIMIT 1")
except sqlite3.OperationalError:
    cur.execute("ALTER TABLE users ADD COLUMN username TEXT")
    conn.commit()

# Fill temporary usernames for existing records
cur.execute("SELECT id FROM users WHERE username IS NULL OR username = ''")
rows = cur.fetchall()
for (user_id,) in rows:
    temp = f"user_{uuid4().hex[:8]}"
    cur.execute("UPDATE users SET username=? WHERE id=?", (temp, user_id))

conn.commit()
conn.close()
