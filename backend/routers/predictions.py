from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas
from ml.inference import predict_and_explain

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"]
)

# POST - Create prediction
@router.post("/", response_model=schemas.PredictionOutput)
def predict(data: schemas.HealthInput, db: Session = Depends(get_db)):
    prediction_result = predict_and_explain(data.model_dump())

    prediction = models.Prediction(
        pregnancies=data.pregnancies,
        age=data.age,
        glucose=data.glucose,
        blood_pressure=data.blood_pressure,
        skin_thickness=data.skin_thickness,
        insulin=data.insulin,
        bmi=data.bmi,
        diabetes_pedigree_function=data.diabetes_pedigree_function,
        result=prediction_result["result"],
        confidence=prediction_result["confidence"],
    )
    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return schemas.PredictionOutput(
        **prediction.__dict__,
        shap_contributions=prediction_result["shap_contributions"],
    )


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

    prediction_result = predict_and_explain(data.model_dump())

    prediction.pregnancies = data.pregnancies
    prediction.age = data.age
    prediction.glucose = data.glucose
    prediction.blood_pressure = data.blood_pressure
    prediction.skin_thickness = data.skin_thickness
    prediction.insulin = data.insulin
    prediction.bmi = data.bmi
    prediction.diabetes_pedigree_function = data.diabetes_pedigree_function
    prediction.result = prediction_result["result"]
    prediction.confidence = prediction_result["confidence"]

    db.commit()
    db.refresh(prediction)

    return schemas.PredictionOutput(
        **prediction.__dict__,
        shap_contributions=prediction_result["shap_contributions"],
    )


# DELETE - Remove prediction
@router.delete("/{prediction_id}")
def delete_prediction(prediction_id: int, db: Session = Depends(get_db)):
    prediction = db.query(models.Prediction).filter(models.Prediction.id == prediction_id).first()
    if prediction is None:
        raise HTTPException(status_code=404, detail="Prediction not found")

    db.delete(prediction)
    db.commit()
    return {"message": f"Prediction {prediction_id} deleted successfully"}