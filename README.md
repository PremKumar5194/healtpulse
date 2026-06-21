# HealtPulse

AI-powered disease risk checker - predicts diabetes risk based on health metrics, with full explainability and history tracking.

## Project Overview

HealtPulse is a full-stack ML application that:
- Accepts patient health data (age, glucose, BMI, etc.)
- Predicts disease risk using a trained ML model
- Explains predictions using SHAP values
- Stores prediction history in MySQL
- Provides a clean REST API for frontend integration

## Tech Stack

**Backend:** FastAPI, SQLAlchemy, Pydantic
**Database:** MySQL
**ML:** Scikit-learn, SHAP (coming soon)
**Frontend:** React, Tailwind CSS, Recharts (coming soon)
**DevOps:** Docker, GitHub Actions (coming soon)
**Environment:** uv

## Installation

```bash
# Clone the repo
git clone https://github.com/PremKumar5194/healtpulse.git
cd healtpulse

# Create virtual environment with uv
uv venv
.venv\Scripts\activate

# Install dependencies
uv sync
```

## Environment Setup

Create a `.env` file in the root folder:

```
DATABASE_URL=mysql+pymysql://healtpulse_user:password123@localhost/healtpulse
```

## Running the App

```bash
uvicorn backend.main:app --reload
```

Visit:
- API: `http://127.0.0.1:8000`
- Swagger Docs: `http://127.0.0.1:8000/docs`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Welcome message |
| GET | `/health` | Health check |
| POST | `/predictions/` | Create a prediction |
| GET | `/predictions/` | Get all predictions |
| GET | `/predictions/{id}` | Get one prediction |
| PUT | `/predictions/{id}` | Update a prediction |
| DELETE | `/predictions/{id}` | Delete a prediction |

## Project Structure

```
healtpulse/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── routers/
│       └── predictions.py
├── ml/              (coming soon)
├── frontend/        (coming soon)
└── README.md
```

## Roadmap

- [x] FastAPI backend with full CRUD
- [x] MySQL integration
- [x] Input validation
- [ ] ML model training (Random Forest + SHAP)
- [ ] React frontend
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Cloud deployment

## Author
Prem Kumar - [GitHub](https://github.com/PremKumar5194)