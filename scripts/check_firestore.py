import os, json, sys
from firebase_admin import credentials, initialize_app, firestore

# Carga credenciales
path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "serviceAccountKey.json")
cred = credentials.Certificate(path)
initialize_app(cred)

# Intenta leer las colecciones
db = firestore.client()
cols = db.collections()
print("Colecciones en Firestore:")
for c in cols:
    print(" -", c.id)

sys.exit(0)
