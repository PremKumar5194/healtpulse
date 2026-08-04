import pandas as pd
import joblib
import shap

from ml.config.train_config import TrainConfig

FEATURE_ORDER = [
    "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
    "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
]

_model = None
_explainer = None


def _get_model():
    global _model
    if _model is None:
        config = TrainConfig()
        _model = joblib.load(config.model_path)
    return _model


def _get_explainer():
    global _explainer
    if _explainer is None:
        _explainer = shap.TreeExplainer(_get_model())
    return _explainer


def predict_and_explain(patient_data: dict) -> dict:
    """
    patient_data keys must be: pregnancies, glucose, blood_pressure,
    skin_thickness, insulin, bmi, diabetes_pedigree_function, age
    """
    row = pd.DataFrame([{
        "Pregnancies": patient_data["pregnancies"],
        "Glucose": patient_data["glucose"],
        "BloodPressure": patient_data["blood_pressure"],
        "SkinThickness": patient_data["skin_thickness"],
        "Insulin": patient_data["insulin"],
        "BMI": patient_data["bmi"],
        "DiabetesPedigreeFunction": patient_data["diabetes_pedigree_function"],
        "Age": patient_data["age"],
    }])[FEATURE_ORDER]

    model = _get_model()
    explainer = _get_explainer()

    probability = float(model.predict_proba(row)[0][1])
    result = "High Risk" if probability >= 0.5 else "Low Risk"

    shap_values = explainer(row)
    contributions = shap_values.values[0, :, 1]

    return {
        "result": result,
        "confidence": probability,  
        "shap_contributions": {
            name: float(value)
            for name, value in zip(FEATURE_ORDER, contributions)
        },
    }       