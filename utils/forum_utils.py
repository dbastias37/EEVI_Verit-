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
