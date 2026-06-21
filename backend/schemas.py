from pydantic import BaseModel, field_validator
from datetime import datetime

# Input schema → what user SENDS to API
class HealthInput(BaseModel):
    age: int
    glucose: float
    blood_pressure: float
    bmi: float
    insulin: float

    @field_validator("age")
    @classmethod
    def validate_age(cls, v):
        if v < 0 or v > 120:
            raise ValueError("Age must be between 0 and 120")
        return v

    @field_validator("glucose")
    @classmethod
    def validate_glucose(cls, v):
        if v <= 0:
            raise ValueError("Glucose must be greater than 0")
        return v

    @field_validator("blood_pressure")
    @classmethod
    def validate_blood_pressure(cls, v):
        if v <= 0:
            raise ValueError("Blood pressure must be greater than 0")
        return v

    @field_validator("bmi")
    @classmethod
    def validate_bmi(cls, v):
        if v <= 0 or v > 100:
            raise ValueError("BMI must be between 0 and 100")
        return v

    @field_validator("insulin")
    @classmethod
    def validate_insulin(cls, v):
        if v < 0:
            raise ValueError("Insulin cannot be negative")
        return v


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