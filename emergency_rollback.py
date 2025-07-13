"""Restore the latest backup created by fix_missing_columns.py."""
import glob
import shutil
import os

DB_PATH = 'db/forum.db'


def latest_backup(path: str = DB_PATH) -> str | None:
    backups = sorted(glob.glob(f"{path}.*.bak"))
    return backups[-1] if backups else None


def rollback(db_path: str = DB_PATH):
    backup = latest_backup(db_path)
    if not backup:
        print('No backup found')
        return
    shutil.copy(backup, db_path)
    print(f'Restored {db_path} from {backup}')


if __name__ == '__main__':
    rollback()
