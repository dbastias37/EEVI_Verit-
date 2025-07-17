import os
from firebase_admin import credentials, initialize_app, firestore

cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS', 'serviceAccountKey.json')
if not os.path.isfile(cred_path):
    raise RuntimeError(f"Archivo no encontrado: {cred_path}")

initialize_app(credentials.Certificate(cred_path))
print('✅ Firestore inicializado correctamente')
