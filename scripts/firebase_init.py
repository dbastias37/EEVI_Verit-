import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

firebase_creds_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")
if not firebase_creds_json:
    raise RuntimeError(
        "No se encontró la variable de entorno GOOGLE_APPLICATION_CREDENTIALS_JSON"
    )

cred_dict = json.loads(firebase_creds_json)
cred = credentials.Certificate(cred_dict)
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

print("✅ Firestore inicializado correctamente")
