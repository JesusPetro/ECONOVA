from fastapi import APIRouter
import uuid

router = APIRouter(prefix="/session", tags=["session"])


@router.post("/start")
def start_session():
    session_id = str(uuid.uuid4())

    return {
        "session_id": session_id,
        "message": "Session initialized"
    }
