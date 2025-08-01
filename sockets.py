from datetime import datetime
import time
from flask_socketio import emit, join_room, leave_room, request
from extensions import socketio
from pydantic import BaseModel, ValidationError

# Almacén de mensajes en memoria y usuarios conectados
messages_store: list[dict] = []
connected_users: dict[str, dict] = {}


class MessageModel(BaseModel):
    """Valida la estructura de mensajes recibidos"""
    chat_id: str
    userId: str
    displayName: str
    content: str
    timestamp: int


def _ms_to_str(ms: int) -> str:
    """Convierte milisegundos a string formateado."""
    return datetime.fromtimestamp(ms / 1000).strftime("%Y-%m-%d %H:%M:%S")


def _to_ms(ts) -> int:
    """Devuelve un timestamp en milisegundos a partir de múltiples formatos."""
    if isinstance(ts, (int, float)):
        return int(ts)
    if isinstance(ts, str):
        for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%dT%H:%M:%S.%fZ"):
            try:
                return int(datetime.strptime(ts, fmt).timestamp() * 1000)
            except ValueError:
                continue
    return int(time.time() * 1000)


@socketio.on("connect")
def handle_connect(auth):
    user_id = (
        auth.get("userId", f"anon_{request.sid}") if auth else f"anon_{request.sid}"
    )
    display_name = auth.get("displayName", "Anónimo") if auth else "Anónimo"

    print(f"✅ Cliente conectado: {request.sid}")
    connected_users[request.sid] = {
        "userId": user_id,
        "displayName": display_name,
        "rooms": [],
        "connectedAt": _ms_to_str(int(time.time() * 1000)),
    }

    emit(
        "user_registered",
        {"userId": user_id, "socketId": request.sid, "status": "connected"},
    )


@socketio.on("disconnect")
def handle_disconnect():
    user_info = connected_users.pop(request.sid, None)
    if user_info:
        print(f"❌ Cliente desconectado: {request.sid}")


@socketio.on("join")
def handle_join(data):
    """Maneja la suscripción de un usuario a una sala de chat."""
    try:
        if not isinstance(data, dict):
            print(f"[JOIN ERROR] Invalid payload: {data}")
            return

        chat_id = data.get("chat_id")
        user_id = data.get("userId")
        display_name = data.get("displayName", "Anónimo")

        if not chat_id or not user_id or not display_name:
            print(f"[JOIN ERROR] Missing chat_id, userId or displayName in: {data}")
            return

        chat_id = str(chat_id)

        join_room(chat_id)
        print(f"[JOIN] Socket {request.sid} -> sala '{chat_id}'")

        user_record = connected_users.setdefault(
            request.sid,
            {
                "userId": user_id,
                "displayName": display_name,
                "rooms": [],
                "connectedAt": _ms_to_str(int(time.time() * 1000)),
            },
        )
        if chat_id not in user_record["rooms"]:
            user_record["rooms"].append(chat_id)

        room_messages = [
            m for m in messages_store if m.get("chat_id", "global") == chat_id
        ][-50:]
        history = [
            {
                "id": m.get("id"),
                "text": m.get("text", ""),
                "sender": m.get("user", "Anónimo"),
                "timestamp": _to_ms(m.get("timestamp")),
                "isSystem": m.get("isSystem", False),
            }
            for m in room_messages
        ]

        emit(
            "message_history", {"messages": history, "room": chat_id, "count": len(history)}
        )
        emit(
            "user_joined",
            {
                "userId": user_id,
                "room": chat_id,
                "timestamp": _ms_to_str(int(time.time() * 1000)),
            },
            room=chat_id,
            include_self=False,
        )

        emit(
            "new_message",
            {
                "text": f"{display_name} se ha unido al chat.",
                "sender": "Sistema",
                "timestamp": int(time.time() * 1000),
                "isSystem": True,
            },
            to=chat_id,
        )
    except Exception as e:
        print(f"[JOIN ERROR] {e}")


@socketio.on("leave")
def handle_leave(data):
    if not isinstance(data, dict):
        return
    chat_id = str(data.get("chat_id", "global"))
    user_id = data.get("userId", "unknown")

    leave_room(chat_id)
    if (
        request.sid in connected_users
        and chat_id in connected_users[request.sid]["rooms"]
    ):
        connected_users[request.sid]["rooms"].remove(chat_id)

    emit(
        "user_left",
        {
            "userId": user_id,
            "room": chat_id,
            "timestamp": _ms_to_str(int(time.time() * 1000)),
        },
        room=chat_id,
        include_self=False,
    )


def _process_incoming_message(data: dict) -> None:
    chat_id = str(data.get("chat_id", "global"))
    content = str(data.get("content", data.get("text", ""))).strip()
    if not content:
        return

    display_name = (
        data.get("displayName") or data.get("sender") or data.get("user") or "Anónimo"
    )
    user_id = data.get("userId", f"anon_{request.sid}")
    ts_ms = _to_ms(data.get("timestamp"))

    message = {
        "id": len(messages_store) + 1,
        "text": content,
        "user": display_name,
        "timestamp": _ms_to_str(ts_ms),
        "chat_id": chat_id,
        "userId": user_id,
        "socketId": request.sid,
        "isSystem": bool(data.get("isSystem", False)),
    }
    messages_store.append(message)

    emit(
        "new_message",
        {
            "id": message["id"],
            "text": message["text"],
            "sender": display_name,
            "timestamp": ts_ms,
            "isSystem": message["isSystem"],
        },
        room=chat_id,
    )


@socketio.on("send_message")
def handle_send_message(data):
    """Valida y reenvía el mensaje a la sala correspondiente"""
    try:
        msg = MessageModel(**data)
    except ValidationError as e:
        print(f"[MSG ERROR] {e}")
        return

    socketio.emit(
        "new_message",
        msg.model_dump(),
        to=msg.chat_id,
        skip_sid=request.sid,
    )


@socketio.on("new_message")
def handle_new_message(data):
    handle_send_message(data)


# ============================================================================
# Utilidades públicas
# ============================================================================


def get_messages_for_api(chat_id: str = "global") -> list:
    room_messages = [m for m in messages_store if m.get("chat_id", "global") == chat_id]
    return room_messages[-50:]


def ensure_messages_store() -> list:
    global messages_store
    if not isinstance(messages_store, list):
        messages_store = []
    return messages_store


ensure_messages_store()


def get_connected_users_info() -> dict:
    return {
        sid: {
            "userId": data.get("userId"),
            "displayName": data.get("displayName"),
            "rooms": list(data.get("rooms", [])),
            "connectedAt": data.get("connectedAt"),
        }
        for sid, data in connected_users.items()
    }
