import os
import json
from google.oauth2 import service_account
from google.cloud import firestore


_client = None


def get_client():
    """Return a Firestore client initialized from env variable."""
    global _client
    if _client:
        return _client

    credentials_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    if not credentials_json:
        raise RuntimeError(
            "No se encontró la variable de entorno GOOGLE_APPLICATION_CREDENTIALS_JSON"
        )

    credentials_dict = json.loads(credentials_json)
    cred = service_account.Credentials.from_service_account_info(credentials_dict)

    _client = firestore.Client(credentials=cred)
    return _client
