from fastapi import APIRouter
from models.schemas import HealthResponse

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "waste-classifier-api",
        "model_loaded": True
    }
