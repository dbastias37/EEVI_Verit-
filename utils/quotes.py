from random import choice
from modules.forum import INSPIRATIONAL_QUOTES

def get_random_quote() -> str:
    """Devuelve una frase motivacional aleatoria."""
    return choice(INSPIRATIONAL_QUOTES)
