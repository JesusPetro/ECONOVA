from pydantic import BaseModel
from typing import List, Optional


# Health
class HealthResponse(BaseModel):
    status: str
    service: str
    model_loaded: bool


# Clasificación (metadata)
class Detection(BaseModel):
    label: str
    confidence: float


class WasteResult(BaseModel):
    type: str
    confidence: float
    main_object: str


class Explanation(BaseModel):
    text: str


class GamificationResult(BaseModel):
    new_achievement: bool
    title: Optional[str] = None
    description: Optional[str] = None


class ClassificationResponse(BaseModel):
    waste: WasteResult
    detections: List[Detection]
    explanation: Explanation
    gamification: Optional[GamificationResult] = None


# Session
class SessionResponse(BaseModel):
    session_id: str
    message: str


class SessionProgress(BaseModel):
    total_classifications: int
    correct: int
    streak: int
    achievements: List[str]
