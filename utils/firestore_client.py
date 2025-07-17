import functools
import json
import os
from google.cloud import firestore
from google.oauth2 import service_account

@functools.lru_cache(maxsize=1)
def get_fs_client():
    """Return a cached Firestore client using credentials from env."""
    credentials_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    if credentials_json is None:
        raise RuntimeError(
            "No se encontró la variable de entorno GOOGLE_APPLICATION_CREDENTIALS_JSON"
        )
    credentials_dict = json.loads(credentials_json)
    credentials = service_account.Credentials.from_service_account_info(
        credentials_dict
    )
    return firestore.Client(credentials=credentials, project=credentials.project_id)
