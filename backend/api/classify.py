from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import cv2
import numpy as np

from services.yolo_service import yolo_service

router = APIRouter(prefix="/classify", tags=["classification"])


@router.post(
    "/image",
    summary="Clasifica una imagen y retorna el material detectado",
    responses={
        200: {"description": "Material detectado"},
        400: {"description": "Imagen inválida"}
    }
)
async def classify_image(image: UploadFile = File(...)):
    # Validación básica
    if image.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Formato de imagen no soportado")

    # Leer imagen
    image_bytes = await image.read()
    np_img = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    if img is None:
        raise HTTPException(status_code=400, detail="No se pudo leer la imagen")

    # Inferencia YOLO
    material = yolo_service.predict_material(img)

    if material is None:
        return JSONResponse(
            status_code=200,
            content={"material": "No detectado"}
        )

    return {
        "material": material
    }
