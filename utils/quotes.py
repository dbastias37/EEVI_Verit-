import random

try:
    from modules.forum import INSPIRATIONAL_QUOTES
except Exception:
    INSPIRATIONAL_QUOTES = [
        "Sigue creando, pase lo que pase"
    ]

def get_random_quote() -> str:
    """Devuelve una frase aleatoria.

    Si las frases no están disponibles, retorna un fallback.
    """
    if not INSPIRATIONAL_QUOTES:
        return ""
    return random.choice(INSPIRATIONAL_QUOTES)
