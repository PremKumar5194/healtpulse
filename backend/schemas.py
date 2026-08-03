from pydantic import BaseModel, field_validator
from datetime import datetime


class HealthInput(BaseModel):
    pregnancies: int
    age: int
    glucose: float
    blood_pressure: float
    skin_thickness: float
    insulin: float
    bmi: float
    diabetes_pedigree_function: float

    @field_validator("pregnancies")
    @classmethod
    def validate_pregnancies(cls, v):
        if v < 0 or v > 20:
            raise ValueError("Pregnancies must be between 0 and 20")
        return v

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

    @field_validator("skin_thickness")
    @classmethod
    def validate_skin_thickness(cls, v):
        if v < 0 or v > 100:
            raise ValueError("Skin thickness must be between 0 and 100")
        return v

    @field_validator("insulin")
    @classmethod
    def validate_insulin(cls, v):
        if v < 0:
            raise ValueError("Insulin cannot be negative")
        return v

    @field_validator("bmi")
    @classmethod
    def validate_bmi(cls, v):
        if v <= 0 or v > 100:
            raise ValueError("BMI must be between 0 and 100")
        return v

    @field_validator("diabetes_pedigree_function")
    @classmethod
    def validate_dpf(cls, v):
        if v < 0 or v > 3:
            raise ValueError("Diabetes pedigree function must be between 0 and 3")
        return v


class PredictionOutput(BaseModel):
    id: int
    pregnancies: int
    age: int
    glucose: float
    blood_pressure: float
    skin_thickness: float
    insulin: float
    bmi: float
    diabetes_pedigree_function: float
    result: str
    confidence: float
    created_at: datetime
    shap_contributions: dict[str, float] = {}

    class Config:
        from_attributes = True