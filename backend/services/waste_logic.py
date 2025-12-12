from typing import List, Dict

# -----------------------------
# Mapeo CLASE YOLO → tipo de residuo
# -----------------------------
CLASS_TO_WASTE = {
    "Metal": "reciclable",
    "Paper": "reciclable",
    "Plastic": "reciclable",
    "cardboard": "reciclable",
    "glass": "reciclable",

    # Basura mixta / no clasificada
    "Random Trash": "no_reciclable"
}

# Prioridad ambiental
WASTE_PRIORITY = {
    "no_reciclable": 2,
    "reciclable": 1
}


def decide_waste_type(detections: List[Dict]) -> Dict:
    """
    Decide el tipo de residuo usando SOLO las clases del modelo YOLO.

    Args:
        detections (list): [
            { "label": str, "confidence": float, "bbox": [...] }
        ]

    Returns:
        dict: {
            type, main_object, confidence
        }
    """

    if not detections:
        return {
            "type": "desconocido",
            "main_object": None,
            "confidence": 0.0
        }

    candidates = []

    for det in detections:
        label = det["label"]
        confidence = det["confidence"]

        waste_type = CLASS_TO_WASTE.get(label)

        if waste_type is None:
            continue

        candidates.append({
            "label": label,
            "waste_type": waste_type,
            "confidence": confidence,
            "priority": WASTE_PRIORITY[waste_type]
        })

    if not candidates:
        return {
            "type": "desconocido",
            "main_object": None,
            "confidence": 0.0
        }

    # -----------------------------
    # Regla de decisión:
    # 1. Prioridad ambiental
    # 2. Mayor confianza
    # -----------------------------
    candidates.sort(
        key=lambda x: (x["priority"], x["confidence"]),
        reverse=True
    )

    best = candidates[0]

    return {
        "type": best["waste_type"],
        "main_object": best["label"],
        "confidence": round(best["confidence"], 2)
    }
