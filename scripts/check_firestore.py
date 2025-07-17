import os, json, sys
from google.cloud import firestore
from google.oauth2 import service_account

credentials_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")
if credentials_json is None:
    raise RuntimeError(
        "No se encontró la variable de entorno GOOGLE_APPLICATION_CREDENTIALS_JSON"
    )

credentials_dict = json.loads(credentials_json)
credentials = service_account.Credentials.from_service_account_info(credentials_dict)
db = firestore.Client(credentials=credentials, project=credentials.project_id)

# Intenta leer las colecciones
cols = db.collections()
print("Colecciones en Firestore:")
for c in cols:
    print(" -", c.id)

sys.exit(0)
