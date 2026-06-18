from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# MySQL connection string
DATABASE_URL = "mysql+pymysql://healtpulse_user:password123@localhost/healtpulse"

# Create engine
engine = create_engine(DATABASE_URL)

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency → get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()