from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="HealtPulse API",
    description="AI Powered Disease Risk Checker",
    version="1.0.0"
)

# Define input data structure
class HealthInput(BaseModel):
    age: int
    glucose: float
    blood_pressure: float
    bmi: float
    insulin: float

# GET - Home
@app.get("/")
def home():
    return {"message": "Welcome to HealtPulse API!"}

# GET - Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "app": "HealtPulse"}

# POST - Predict
@app.post("/predict")
def predict(data: HealthInput):
    return {
        "received": data,
        "status": "prediction coming soon!",
        "age": data.age,
        "glucose": data.glucose
    }