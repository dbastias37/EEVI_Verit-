import pytest
import app

@pytest.fixture
def client():
    app.app.config['TESTING'] = True
    with app.app.test_client() as client:
        yield client

def test_packs_route(client, monkeypatch):
    monkeypatch.setattr('utils.drive_previews.fetch_previews', lambda: [])
    resp = client.get('/packs')
    assert resp.status_code == 200
