import sys
from utils.firebase import get_client

db = get_client()
cols = db.collections()
print("Colecciones en Firestore:")
for c in cols:
    print(" -", c.id)

sys.exit(0)
