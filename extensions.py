from flask_socketio import SocketIO

# SocketIO instance shared across the project.  It is created here so that
# modules can import it without creating circular dependencies.
socketio = SocketIO(cors_allowed_origins="*")

