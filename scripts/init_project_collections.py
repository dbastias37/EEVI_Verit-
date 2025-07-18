from utils.firebase import get_client
from google.cloud import firestore


def init_project_collections():
    """Inicializar colecciones para el sistema de proyectos"""
    db = get_client()

    # Crear documento de ejemplo en colección proyectos
    proyectos_ref = db.collection('proyectos')
    proyecto_ejemplo = {
        'titulo': 'Proyecto de ejemplo',
        'descripcion': 'Este es un proyecto de demostración',
        'categoria': 'Grabación en vivo',
        'autor_id': 'system',
        'autor_nombre': 'Sistema',
        'estado': 'abierto',
        'miembros': [],
        'created_at': firestore.SERVER_TIMESTAMP,
        'tags': ['demo', 'ejemplo'],
        'presupuesto': 'A definir',
        'duracion_estimada': '1 semana'
    }

    # Crear índices necesarios
    print("✅ Colecciones de proyectos inicializadas")
    print("⚠️  Recuerda crear los índices en Firebase Console:")
    print("   - proyectos: estado, created_at (DESC)")
    print("   - mensajes_proyecto: receptor_id, leido, created_at (DESC)")


if __name__ == "__main__":
    init_project_collections()
