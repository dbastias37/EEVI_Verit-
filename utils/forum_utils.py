"""Utility functions for forum data normalization."""

def normalize_topic_data(data):
    """Map topic fields to a consistent English schema.

    Supports legacy Spanish field names by returning a new dict with keys:
    id, title, description, author, category, created_at.
    """
    if not data:
        return None

    return {
        'id': data.get('id'),
        'title': data.get('title') or data.get('titulo'),
        'description': data.get('description') or data.get('contenido'),
        'author': data.get('author') or data.get('autor'),
        'category': data.get('category') or data.get('categoria'),
        'created_at': data.get('created_at') or data.get('fecha') or data.get('timestamp'),
    }


def mapeo_datos(data):
    """Alias en castellano de ``normalize_topic_data``."""
    return normalize_topic_data(data)


def normalize_response_data(data):
    """Normaliza los campos de una respuesta."""
    if not data:
        return None

    return {
        'id': data.get('id'),
        'author': data.get('author') or data.get('autor', 'Anónimo'),
        'content': data.get('content') or data.get('contenido'),
        'created_at': data.get('created_at')
            or data.get('fecha_creacion')
            or data.get('timestamp'),
    }

def get_content_from_form(payload):
    """Extract response content supporting multiple possible field names."""
    return (
        payload.get('content')
        or payload.get('contenido')
        or payload.get('response_content')
        or payload.get('respuesta')
        or payload.get('response')
        or ''
    )
