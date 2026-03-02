from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# --- Models ---
class QuizSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    score: int
    total: int
    answers: List[dict]
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class QuizSubmissionCreate(BaseModel):
    score: int
    total: int
    answers: List[dict]

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "Unde Seismice API - Active"}

@api_router.get("/health")
async def health():
    return {"status": "healthy"}

@api_router.post("/quiz/submit", response_model=QuizSubmission)
async def submit_quiz(data: QuizSubmissionCreate):
    submission = QuizSubmission(**data.model_dump())
    doc = submission.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.quiz_submissions.insert_one(doc)
    return submission

@api_router.get("/quiz/scores")
async def get_quiz_scores():
    scores = await db.quiz_submissions.find({}, {"_id": 0}).sort("timestamp", -1).to_list(50)
    return scores

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Point specifically to the 'build' folder
frontend_build = Path(__file__).parent.parent / "frontend" / "build"

if frontend_build.exists():
    # Serve all the built React files
    app.mount("/", StaticFiles(directory=str(frontend_build), html=True), name="static")

    # Catch-all: If someone goes to a sub-page, send them to index.html
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        file_path = frontend_build / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(frontend_build / "index.html")
else:
    logger.warning(f"Frontend build folder not found at {frontend_build}")
