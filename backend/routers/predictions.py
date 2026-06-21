from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"]
)

# POST - Create prediction
@router.post("/", response_model=schemas.PredictionOutput)
def predict(data: schemas.HealthInput, db: Session = Depends(get_db)):
    result = "High Risk" if data.glucose > 140 else "Low Risk"
    confidence = 0.87

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

# GET - All predictions (history)
@router.get("/", response_model=list[schemas.PredictionOutput])
def history(db: Session = Depends(get_db)):
    predictions = db.query(models.Prediction).all()
    return predictions

# GET - Single prediction
@router.get("/{prediction_id}", response_model=schemas.PredictionOutput)
def get_prediction(prediction_id: int, db: Session = Depends(get_db)):
    prediction = db.query(models.Prediction).filter(models.Prediction.id == prediction_id).first()
    if prediction is None:
        raise HTTPException(status_code=404, detail="Prediction not found")
    return prediction

# PUT - Update prediction
@router.put("/{prediction_id}", response_model=schemas.PredictionOutput)
def update_prediction(prediction_id: int, data: schemas.HealthInput, db: Session = Depends(get_db)):
    prediction = db.query(models.Prediction).filter(models.Prediction.id == prediction_id).first()
    if prediction is None:
        raise HTTPException(status_code=404, detail="Prediction not found")

    prediction.age = data.age
    prediction.glucose = data.glucose
    prediction.blood_pressure = data.blood_pressure
    prediction.bmi = data.bmi
    prediction.insulin = data.insulin

    db.commit()
    db.refresh(prediction)
    return prediction

# DELETE - Remove prediction
@router.delete("/{prediction_id}")
def delete_prediction(prediction_id: int, db: Session = Depends(get_db)):
    prediction = db.query(models.Prediction).filter(models.Prediction.id == prediction_id).first()
    if prediction is None:
        raise HTTPException(status_code=404, detail="Prediction not found")

    db.delete(prediction)
    db.commit()
    return {"message": f"Prediction {prediction_id} deleted successfully"}