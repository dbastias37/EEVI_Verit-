"""Inicialización de Firestore para todo el backend."""

import json
import os
from google.cloud import firestore
from google.oauth2 import service_account

_db = None


def _load_credentials() -> service_account.Credentials:
    """Obtiene las credenciales desde variables de entorno o archivo."""
    json_env = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    file_env = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

    if json_env:
        return service_account.Credentials.from_service_account_info(json.loads(json_env))

    if file_env and os.path.exists(file_env):
        return service_account.Credentials.from_service_account_file(file_env)

    if os.path.exists("serviceAccountKey.json"):
        return service_account.Credentials.from_service_account_file("serviceAccountKey.json")

    raise RuntimeError(
        "Credenciales Firebase no encontradas. "
        "Define GOOGLE_APPLICATION_CREDENTIALS_JSON o proporciona serviceAccountKey.json"
    )


def get_client() -> firestore.Client:
    """Devuelve un cliente de Firestore reutilizable."""
    global _db
    if _db is None:
        cred = _load_credentials()
        _db = firestore.Client(credentials=cred, project=cred.project_id)
    return _db


# Instancia global para usar en todo el proyecto
db = get_client()

