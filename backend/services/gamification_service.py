from typing import Dict, Optional

# -----------------------------
# Estado en memoria (hackathon)
# -----------------------------
# Estructura:
# sessions = {
#   session_id: {
#       "total": int,
#       "correct": int,
#       "streak": int,
#       "achievements": set()
#   }
# }
sessions: Dict[str, Dict] = {}


# -----------------------------
# Reglas de logros
# -----------------------------
ACHIEVEMENTS = {
    "eco_aprendiz": {
        "title": "Eco Aprendiz",
        "description": "Clasificaste correctamente 3 residuos.",
        "condition": lambda s: s["correct"] >= 3
    },
    "reciclador_constante": {
        "title": "Reciclador Constante",
        "description": "Lograste una racha de 5 clasificaciones correctas.",
        "condition": lambda s: s["streak"] >= 5
    },
    "primer_paso": {
        "title": "Primer Paso Verde",
        "description": "Realizaste tu primera clasificación.",
        "condition": lambda s: s["total"] >= 1
    }
}


def init_session(session_id: str):
    """
    Inicializa una sesión si no existe.
    """
    if session_id not in sessions:
        sessions[session_id] = {
            "total": 0,
            "correct": 0,
            "streak": 0,
            "achievements": set()
        }


def update_progress(
    session_id: Optional[str],
    waste_type: str
) -> Optional[Dict]:
    """
    Actualiza progreso del usuario y evalúa si hay un nuevo logro.

    Args:
        session_id (str | None)
        waste_type (str): reciclable | no_reciclable | desconocido

    Returns:
        dict | None: información del logro desbloqueado
    """

    if session_id is None:
        return None

    init_session(session_id)
    session = sessions[session_id]

    session["total"] += 1

    # Consideramos "correcto" todo lo que no sea desconocido
    if waste_type != "desconocido":
        session["correct"] += 1
        session["streak"] += 1
    else:
        session["streak"] = 0

    # -----------------------------
    # Evaluar logros
    # -----------------------------
    for key, achievement in ACHIEVEMENTS.items():
        if key in session["achievements"]:
            continue

        if achievement["condition"](session):
            session["achievements"].add(key)
            return {
                "new_achievement": True,
                "title": achievement["title"],
                "description": achievement["description"]
            }

    return {
        "new_achievement": False
    }


def get_progress(session_id: str) -> Dict:
    """
    Devuelve el progreso actual de la sesión.
    """
    init_session(session_id)
    s = sessions[session_id]

    return {
        "total_classifications": s["total"],
        "correct": s["correct"],
        "streak": s["streak"],
        "achievements": list(s["achievements"])
    }
