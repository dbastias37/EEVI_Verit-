import os
import sqlite3
import tempfile
import importlib

import app
import modules.forum as forum_db


def setup_db(tmp_path):
    db_file = tmp_path / "test.db"
    app.app.config['DB_PATH'] = str(db_file)
    forum_db.DB_PATH = str(db_file)
    app.init_db()
    forum_db.init_db()
    return db_file


def test_add_and_query_project(tmp_path):
    setup_db(tmp_path)
    app.add_project("Test", "cat", "url", "client@example.com")
    projects = app.get_projects_for_email("client@example.com")
    assert len(projects) == 1
    assert projects[0]['title'] == "Test"
    conn = sqlite3.connect(app.app.config['DB_PATH'])
    client_email = conn.execute("SELECT email FROM clients").fetchone()[0]
    conn.close()
    assert client_email == "client@example.com"


def test_update_project_video(tmp_path):
    setup_db(tmp_path)
    app.add_project("Test", "cat", "url", "client@example.com")
    projects = app.get_projects_for_email("client@example.com")
    pid = projects[0]['id']
    app.update_project_video(pid, "newurl", "other@example.com")
    updated = app.get_projects_for_email("other@example.com")
    assert updated[0]['video_url'] == "newurl"
