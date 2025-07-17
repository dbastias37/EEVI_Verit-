"""Template filters for EEVI forum"""

from datetime import datetime, timezone, timedelta

CHILE_TZ = timezone(timedelta(hours=-3))


def format_timestamp_local(timestamp):
    """Convert a timestamp in UTC or ISO string to Chile local time."""
    if not timestamp:
        return "Fecha desconocida"

    if hasattr(timestamp, "timestamp"):
        dt = timestamp.replace(tzinfo=timezone.utc)
    elif isinstance(timestamp, datetime):
        dt = timestamp if timestamp.tzinfo else timestamp.replace(tzinfo=timezone.utc)
    else:
        try:
            dt = datetime.fromisoformat(str(timestamp).replace("Z", "+00:00"))
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
        except Exception:
            return str(timestamp)

    local_dt = dt.astimezone(CHILE_TZ)
    return local_dt.strftime("%d/%m/%Y, %H:%M - Chile")


def timestamp_local(timestamp):
    """Template filter to show local Chile time."""
    return format_timestamp_local(timestamp)


def register_filters(app):
    """Register template filters with the Flask app"""
    app.jinja_env.filters["timestamp_local"] = timestamp_local
