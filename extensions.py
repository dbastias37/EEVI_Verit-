from flask_socketio import SocketIO

# SocketIO instance shared across the project
socketio = SocketIO(
    cors_allowed_origins="*",
    async_mode='eventlet',  # Importante para tu setup
    logger=True,
    engineio_logger=True
)

