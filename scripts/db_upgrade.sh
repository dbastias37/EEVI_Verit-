#!/bin/bash
set -e
DB_FILE="${DB_PATH:-db/forum.db}"
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP="${DB_FILE%.db}.backup_${TIMESTAMP}.db"
cp "$DB_FILE" "$BACKUP"
if flask db upgrade; then
  echo "Database upgraded. Backup stored at $BACKUP"
else
  echo "Upgrade failed. Restoring backup." >&2
  cp "$BACKUP" "$DB_FILE"
  exit 1
fi
