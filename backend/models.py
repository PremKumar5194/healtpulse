from sqlalchemy import Column, Integer, Float, DateTime, String
from backend.database import Base
import datetime

class Prediction(Base):
    __tablename__ = "predictions"

    id                          = Column(Integer, primary_key=True, index=True)
    pregnancies                 = Column(Integer)
    age                         = Column(Integer)
    glucose                     = Column(Float)
    blood_pressure              = Column(Float)
    skin_thickness              = Column(Float)
    insulin                     = Column(Float)
    bmi                         = Column(Float)
    diabetes_pedigree_function  = Column(Float)
    result                      = Column(String(50))   # "High Risk" or "Low Risk"
    confidence                  = Column(Float)        # e.g. 0.87 = 87%
    created_at                  = Column(DateTime, default=datetime.datetime.utcnow)