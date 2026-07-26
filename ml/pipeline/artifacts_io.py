import json
import os

import joblib
from sklearn.ensemble import RandomForestClassifier

from ml.config.train_config import TrainConfig


def save_artifacts(model: RandomForestClassifier, metrics: dict, config: TrainConfig) -> None:
    """Persist the trained model and its metrics to disk."""
    os.makedirs(os.path.dirname(config.model_path), exist_ok=True)

    joblib.dump(model, config.model_path)

    with open(config.metrics_path, "w") as f:
        json.dump(metrics, f, indent=2)