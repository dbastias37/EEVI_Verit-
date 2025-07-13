import app
import sqlite3
import modules.forum as forum_db


def setup_db(tmp_path):
    db_file = tmp_path / "test.db"
    app.app.config['DB_PATH'] = str(db_file)
    forum_db.DB_PATH = str(db_file)
    app.init_db()
    forum_db.init_db()
    return db_file


def test_add_comment(tmp_path):
    setup_db(tmp_path)
    app.create_user('c@e.com', 'p')
    app.add_project('T', 'c', '', 'c@e.com')
    proj = app.get_projects_for_email('c@e.com')[0]
    user = app.get_user('c@e.com')
    app.add_comment(proj['id'], user['id'], 'hola')
    comments = app.get_comments(proj['id'])
    assert len(comments) == 1
    assert comments[0]['text'] == 'hola'
