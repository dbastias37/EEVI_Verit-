import os
import json
import firebase_admin
from firebase_admin import credentials, firestore


def get_client():
    """Initialize Firebase using local file or env var and return Firestore client."""
    if not firebase_admin._apps:
        if os.environ.get("RENDER"):
            cred_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")
            if not cred_json:
                raise RuntimeError(
                    "No se encontró la variable de entorno GOOGLE_APPLICATION_CREDENTIALS_JSON"
                )
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
        else:
            cred = credentials.Certificate("serviceAccountKey.json")
        firebase_admin.initialize_app(cred)
    return firestore.client()
