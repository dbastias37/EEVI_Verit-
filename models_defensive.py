"""Temporary defensive models for EEVI.

This module provides a drop-in replacement for ProjectManager.list_by_client
that works with both old and new database schemas. Import other objects
from the original models module.
"""
from typing import List, Dict
import sqlite3
from models import ProjectManager as BaseProjectManager, get_db


class ProjectManager(BaseProjectManager):
    """Project manager with resilient list_by_client."""

    def list_by_client(self, client_id) -> List[Dict]:
        conn = get_db()
        cur = conn.execute("PRAGMA table_info(projects)")
        cols = {row[1] for row in cur.fetchall()}

        where = []
        params = []
        if 'client_id' in cols:
            where.append('client_id=?')
            params.append(client_id)
        elif 'client_email' in cols:
            # Fallback: assume client_id argument is actually email
            where.append('client_email=?')
            params.append(client_id)

        condition = ' AND '.join(where) if where else '1=1'
        order = ' ORDER BY created_at DESC' if 'created_at' in cols else ''
        query = f"SELECT * FROM projects WHERE {condition}{order}"
        cur = conn.execute(query, params)
        return [dict(r) for r in cur.fetchall()]
