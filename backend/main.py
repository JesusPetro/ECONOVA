from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from api.health import router as health_router
from api.classify import router as classify_router
from api.session import router as session_router

from services.gamification_service import update_progress



app = FastAPI(
    title="Waste Classifier API",
    description="Backend para clasificación de residuos con visión por computador",
    version="0.1.0"
)

# CORS (permitir todo)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Routers
app.include_router(health_router)
app.include_router(classify_router)
app.include_router(session_router)

# Root (opcional)
@app.get("/")
def root():
    return {
        "message": "Waste Classifier API is running"
    }
