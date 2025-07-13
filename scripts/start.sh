#!/bin/bash
set -e
source "$HOME/.venv/bin/activate" 2>/dev/null || true
./scripts/db_upgrade.sh
exec gunicorn app:app
