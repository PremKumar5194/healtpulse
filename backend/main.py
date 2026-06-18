from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from backend.database import engine, get_db, Base
from backend import models, schemas

# Create tables in MySQL automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HealtPulse API",
    description="AI Powered Disease Risk Checker",
    version="1.0.0"
)

# GET - Home
@app.get("/")
def home():
    return {"message": "Welcome to HealtPulse API!"}

# GET - Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "app": "HealtPulse"}

# POST - Predict
@app.post("/predict", response_model=schemas.PredictionOutput)
def predict(data: schemas.HealthInput, db: Session = Depends(get_db)):

    # Dummy prediction for now (ML model comes later!)
    result = "High Risk" if data.glucose > 140 else "Low Risk"
    confidence = 0.87

    # Save to MySQL
    prediction = models.Prediction(
        age=data.age,
        glucose=data.glucose,
        blood_pressure=data.blood_pressure,
        bmi=data.bmi,
        insulin=data.insulin,
        result=result,
        confidence=confidence
    )
    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return prediction

# GET - History
@app.get("/history")
def history(db: Session = Depends(get_db)):
    predictions = db.query(models.Prediction).all()
    return predictions