from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import engine, Base
from backend.routers import predictions

# Create tables in MySQL automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HealtPulse API",
    description="AI Powered Disease Risk Checker",
    version="1.0.0"
)

# Allow frontend (localhost:5173) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router
app.include_router(predictions.router)

# GET - Home
@app.get("/")
def home():
    return {"message": "Welcome to HealtPulse API!"}

# GET - Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "app": "HealtPulse"}