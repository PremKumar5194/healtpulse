from pydantic import BaseModel
from datetime import datetime

# Input schema → what user SENDS to API
class HealthInput(BaseModel):
    age: int
    glucose: float
    blood_pressure: float
    bmi: float
    insulin: float

# Output schema → what API RETURNS to user
class PredictionOutput(BaseModel):
    id: int
    age: int
    glucose: float
    blood_pressure: float
    bmi: float
    insulin: float
    result: str
    confidence: float
    created_at: datetime

    class Config:
        from_attributes = True