import os, json, sys
import firebase_admin
from firebase_admin import credentials, firestore

# Carga credenciales
cred_json = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")
if not cred_json:
    raise RuntimeError(
        "No se encontró la variable de entorno GOOGLE_APPLICATION_CREDENTIALS_JSON"
    )

cred = credentials.Certificate(json.loads(cred_json))
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Intenta leer las colecciones
db = firestore.client()
cols = db.collections()
print("Colecciones en Firestore:")
for c in cols:
    print(" -", c.id)

sys.exit(0)
