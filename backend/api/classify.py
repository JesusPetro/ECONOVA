from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse

import cv2
import numpy as np
from io import BytesIO

router = APIRouter(prefix="/classify", tags=["classification"])


@router.post(
    "/image",
    summary="Clasifica una imagen y devuelve la imagen procesada",
    responses={
        200: {"content": {"image/jpeg": {}}},
        400: {"description": "Imagen inválida"}
    }
)
async def classify_image(image: UploadFile = File(...)):
    # Validación básica
    if image.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Formato de imagen no soportado")

    # Leer imagen desde el request
    image_bytes = await image.read()
    np_img = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    if img is None:
        raise HTTPException(status_code=400, detail="No se pudo leer la imagen")

    # (Placeholder) Procesamiento
    # Aquí luego irá YOLO
    h, w, _ = img.shape
    cv2.rectangle(img, (20, 20), (w - 20, h - 20), (0, 255, 0), 2)
    cv2.putText(
        img,
        "Imagen recibida",
        (30, 60),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )

    # Convertir imagen de vuelta a bytes
    success, encoded_img = cv2.imencode(".jpg", img)
    if not success:
        raise HTTPException(status_code=500, detail="Error procesando la imagen")

    return StreamingResponse(
        BytesIO(encoded_img.tobytes()),
        media_type="image/jpeg"
    )
