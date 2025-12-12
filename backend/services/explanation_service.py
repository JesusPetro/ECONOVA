from typing import Dict


# -----------------------------
# Mensajes base por tipo de residuo
# -----------------------------
WASTE_EXPLANATIONS = {
    "reciclable": (
        "El residuo fue clasificado como reciclable porque el material detectado "
        "puede ser procesado y reutilizado en sistemas de reciclaje."
    ),
    "no_reciclable": (
        "El residuo fue clasificado como no reciclable porque corresponde a basura "
        "mixta o materiales que no pueden separarse fácilmente para reciclaje."
    ),
    "desconocido": (
        "No se pudo identificar claramente el tipo de residuo a partir de la imagen."
    )
}

# Explicaciones específicas por objeto
OBJECT_EXPLANATIONS = {
    "Metal": "Los objetos metálicos suelen ser reciclables y pueden fundirse para crear nuevos productos.",
    "Paper": "El papel puede reciclarse cuando está limpio y seco, reduciendo el uso de materia prima.",
    "Plastic": "El plástico identificado es un material comúnmente reciclable si se deposita correctamente.",
    "Cardboard": "El cartón es reciclable y puede reutilizarse en la fabricación de nuevos empaques.",
    "Glass": "El vidrio puede reciclarse múltiples veces sin perder sus propiedades.",
    "Random Trash": "La basura mixta dificulta la separación de materiales y generalmente no es reciclable."
}


def generate_explanation(waste_result: Dict) -> Dict:
    """
    Genera una explicación en lenguaje natural basada en el resultado
    de la lógica de residuos.

    Args:
        waste_result (dict): {
            type: str,
            main_object: str,
            confidence: float
        }

    Returns:
        dict: { "text": str }
    """

    waste_type = waste_result.get("type", "desconocido")
    main_object = waste_result.get("main_object")

    base_text = WASTE_EXPLANATIONS.get(
        waste_type,
        WASTE_EXPLANATIONS["desconocido"]
    )

    object_text = ""
    if main_object and main_object in OBJECT_EXPLANATIONS:
        object_text = " " + OBJECT_EXPLANATIONS[main_object]

    explanation = base_text + object_text

    return {
        "text": explanation
    }
