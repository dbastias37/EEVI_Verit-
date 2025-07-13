import sys
from models_defensive import ProjectManager
from diagnose_eevi import get_columns

DB_PATH = 'db/forum.db'


def main(db_path: str = DB_PATH):
    cols = get_columns(db_path)
    if 'created_at' in cols and 'updated_at' in cols:
        print('Columns created_at and updated_at exist.')
    else:
        print('Required columns missing:', cols)

    pm = ProjectManager()
    projects = pm.list_by_client(1)
    print(f"Retrieved {len(projects)} projects for client 1")


if __name__ == '__main__':
    path = sys.argv[1] if len(sys.argv) > 1 else DB_PATH
    main(path)
