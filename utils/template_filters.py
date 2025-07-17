"""Template filters for EEVI forum"""

from datetime import datetime, timezone
import math


def time_ago(timestamp):
    """Convertir timestamp a formato 'hace X tiempo'"""
    if not timestamp:
        return "Fecha desconocida"
    
    now = datetime.now(timezone.utc)
    
    # Handle Firestore timestamp
    if hasattr(timestamp, 'timestamp'):
        dt = timestamp.replace(tzinfo=timezone.utc)
    else:
        # Handle string timestamp
        try:
            dt = datetime.fromisoformat(str(timestamp).replace('Z', '+00:00'))
        except:
            return str(timestamp)
    
    diff = now - dt
    seconds = diff.total_seconds()
    
    if seconds < 60:
        return "Hace unos segundos"
    elif seconds < 3600:
        minutes = math.floor(seconds / 60)
        return f"Hace {minutes} minuto{'s' if minutes != 1 else ''}"
    elif seconds < 86400:
        hours = math.floor(seconds / 3600)
        return f"Hace {hours} hora{'s' if hours != 1 else ''}"
    else:
        days = math.floor(seconds / 86400)
        return f"Hace {days} día{'s' if days != 1 else ''}"


def register_filters(app):
    """Register all template filters with the Flask app"""
    app.jinja_env.filters['time_ago'] = time_ago
