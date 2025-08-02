import os
from flask_socketio import SocketIO

# SocketIO instance shared across the project
# Configurar el dominio permitido para CORS en producción
render_domain = os.getenv("RENDER_EXTERNAL_URL")
cors_origins = [render_domain] if render_domain else "*"

socketio = SocketIO(
    cors_allowed_origins=cors_origins,
    async_mode='eventlet',  # Importante para tu setup
    logger=True,
    engineio_logger=True
)

