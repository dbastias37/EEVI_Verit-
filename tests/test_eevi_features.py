import os
import sqlite3
import unittest
from models import ProjectManager, CommentManager, PaymentValidator, get_db
from flask import Flask

class TestEEVI(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.secret_key = 'test'
        self.ctx = self.app.app_context()
        self.ctx.push()
        if os.path.exists('test.db'):
            os.remove('test.db')
        conn = sqlite3.connect('test.db')
        with open('db/schema.sql') as f:
            conn.executescript(f.read())
        with open('db/migrations.sql') as f:
            try:
                conn.executescript(f.read())
            except sqlite3.OperationalError:
                pass
        conn.execute("INSERT INTO users (email, username, verified) VALUES ('c@e', 'c', 1)")
        conn.commit()
        conn.close()
        self.app.config['DB_PATH'] = 'test.db'
        from models import DB_PATH as orig
        import models
        models.DB_PATH = 'test.db'

    def tearDown(self):
        self.ctx.pop()
        os.remove('test.db')

    def test_project_manager(self):
        pm = ProjectManager()
        pid = pm.create('t','cat','',1)
        projects = pm.list_by_client(1)
        self.assertEqual(len(projects),1)
        pm.change_status(pid,'active')
        p = get_db().execute('SELECT status FROM projects WHERE id=?',(pid,)).fetchone()
        self.assertEqual(p['status'],'active')

    def test_comment_manager(self):
        pm = ProjectManager()
        pid = pm.create('t','cat','',1)
        cm = CommentManager()
        cid = cm.add(pid,1,'hola')
        comments = cm.list_for_project(pid)
        self.assertEqual(len(comments),1)
        cm.delete(cid,1)
        comments = cm.list_for_project(pid)
        self.assertEqual(len(comments),0)

    def test_payment_validator(self):
        pm = ProjectManager()
        pid = pm.create('t','cat','',1)
        pv = PaymentValidator()
        ok = pv.validate(pid,1,'pagado123')
        self.assertTrue(ok)
        row = get_db().execute('SELECT payment_validated FROM projects WHERE id=?',(pid,)).fetchone()
        self.assertEqual(row['payment_validated'],1)

if __name__ == '__main__':
    unittest.main()
