from random import choice

_QUOTES = [
    "La creatividad es inteligencia divirtiéndose.",
    "El éxito es la suma de pequeños esfuerzos repetidos cada día.",
    "Transforma tus ideas en realidad.",
    "Cada proyecto es una oportunidad para crecer.",
    "La constancia vence al talento cuando el talento no se esfuerza."
]

def get_random_quote() -> str:
    """Devuelve una frase motivacional aleatoria."""
    return choice(_QUOTES)
