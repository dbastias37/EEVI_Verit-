import os
import json
import functools
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

@functools.lru_cache(maxsize=1)
def fetch_previews():
    creds_info = json.loads(os.environ["GOOGLE_CREDS_JSON"])
    creds = service_account.Credentials.from_service_account_info(
        creds_info, scopes=SCOPES
    )
    drive = build("drive", "v3", credentials=creds, cache_discovery=False)
    res = drive.files().list(
        q=f"'{os.getenv('DRIVE_PREVIEWS_FOLDER')}' in parents and mimeType contains 'audio/' and trashed=false",
        fields="files(id,name,size)"
    ).execute()
    return [
        {
            "name": f["name"].replace('_preview.mp3', ''),
            "url": f"https://drive.google.com/uc?export=download&id={f['id']}"
        }
        for f in res.get('files', [])
    ]

