import app
import pytest

@pytest.fixture
def client():
    app.app.config['TESTING'] = True
    with app.app.test_client() as client:
        yield client

def test_status(client):
    resp = client.get('/status')
    assert resp.status_code == 200
    assert resp.get_json() == {"ok": True}
