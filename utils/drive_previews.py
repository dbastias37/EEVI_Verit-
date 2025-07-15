import os
import json
import functools
import base64
from flask import url_for
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import google.auth.exceptions

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]


def _default():
    """Return default preview list"""
    return [
        {
            "name": "preview_default",
            "url": url_for(
                "static", filename="previews/default_preview.mp3", _external=False
            ),
        }
    ]

@functools.lru_cache(maxsize=1)
def fetch_previews():
    try:
        creds_json = os.environ.get("GOOGLE_CREDS_JSON", "")
        if not creds_json and os.getenv("GOOGLE_CREDS_B64"):
            creds_json = base64.b64decode(os.environ["GOOGLE_CREDS_B64"]).decode()
        creds_info = json.loads(creds_json)
        creds = service_account.Credentials.from_service_account_info(
            creds_info, scopes=SCOPES
        )
        drive = build("drive", "v3", credentials=creds, cache_discovery=False)
        res = drive.files().list(
            q=f"'{os.getenv('DRIVE_PREVIEWS_FOLDER')}' in parents and mimeType contains 'audio/' and trashed=false",
            fields="files(id,name,size)"
        ).execute()
        items = [
            {
                "name": f["name"].replace('_preview.mp3', ''),
                "url": f"https://drive.google.com/uc?export=download&id={f['id']}"
            }
            for f in res.get('files', [])
        ]
        if not items:
            return _default()
        return items
    except (HttpError, google.auth.exceptions.GoogleAuthError, KeyError, ValueError) as e:
        print(f"[Drive] fallback → {e}")
        return _default()

