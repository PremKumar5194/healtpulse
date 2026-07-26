import json

import joblib
import shap

from ml.config.train_config import TrainConfig
from ml.pipeline.preprocessing import load_and_clean_data


def load_model(config: TrainConfig):
    """Load the trained model saved by train.py."""
    return joblib.load(config.model_path)


def explain_single_prediction(model, patient_row) -> dict:
    """Compute SHAP contributions for one patient's data.

    patient_row must be a DataFrame with exactly one row, matching the
    feature columns the model was trained on.
    """
    explainer = shap.TreeExplainer(model)
    shap_values = explainer(patient_row)

    # shap_values.values shape: (1 row, n_features, 2 classes)
    # We want class 1 (diabetic) contributions, for our single row
    contributions = shap_values.values[0, :, 1]
    base_value = shap_values.base_values[0, 1]
    feature_names = patient_row.columns.tolist()

    breakdown = {
        "base_value": float(base_value),
        "contributions": {
            name: float(value)
            for name, value in zip(feature_names, contributions)
        },
        "predicted_probability": float(model.predict_proba(patient_row)[0][1]),
    }
    return breakdown


def main() -> None:
    config = TrainConfig()
    model = load_model(config)

    df = load_and_clean_data(config)
    X = df.drop("Outcome", axis=1)

    # Take the first row as a demo example
    example_patient = X.iloc[[0]]

    result = explain_single_prediction(model, example_patient)

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()