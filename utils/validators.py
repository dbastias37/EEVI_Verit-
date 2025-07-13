import re
import uuid


def is_valid_url(url: str) -> bool:
    return url.startswith('http://') or url.startswith('https://')


def sanitize_code(text: str) -> str:
    return re.sub(r'<.*?>', '', text)


def generate_token() -> str:
    return uuid.uuid4().hex
