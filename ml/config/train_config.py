import os
from dataclasses import dataclass, field

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ML_ROOT = os.path.dirname(BASE_DIR)


@dataclass
class TrainConfig:
    data_path: str = os.path.join(ML_ROOT, "data", "diabetes.csv")
    model_path: str = os.path.join(ML_ROOT, "artifacts", "model.pkl")
    metrics_path: str = os.path.join(ML_ROOT, "artifacts", "metrics.json")
    zero_as_missing_cols: list[str] = field(
        default_factory=lambda: ["Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI"]
    )
    test_size: float = 0.2
    random_state: int = 42
    cv_folds: int = 5
    param_grid: dict = field(
        default_factory=lambda: {
            "n_estimators": [100, 200],
            "max_depth": [6, 8],
            "min_samples_leaf": [1, 4],
        }
    )