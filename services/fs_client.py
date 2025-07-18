try:
    from google.oauth2 import service_account
    from google.cloud import firestore
except Exception:  # pragma: no cover - optional deps for tests
    service_account = None
    firestore = None

fs_client = None

try:
    if service_account and firestore:
        from utils.firebase import get_client
        fs_client = get_client()
except Exception as e:  # pragma: no cover - runtime env may lack creds
    print(f"Warning: Firebase no disponible: {e}")
