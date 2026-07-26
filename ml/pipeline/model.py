from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    make_scorer,
    recall_score,
)
from sklearn.model_selection import GridSearchCV, StratifiedKFold, train_test_split
import pandas as pd

from ml.config.train_config import TrainConfig


def train_model(df: pd.DataFrame, config: TrainConfig) -> tuple[RandomForestClassifier, dict]:
    """Split the data, run a grid search tuned for class-1 recall, and
    evaluate the best model on the held-out test set.

    Returns the fitted model and a dict of evaluation metrics.
    """
    X = df.drop("Outcome", axis=1)
    y = df["Outcome"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=config.test_size, random_state=config.random_state, stratify=y
    )

    recall_class1 = make_scorer(recall_score, pos_label=1)
    cv = StratifiedKFold(n_splits=config.cv_folds, shuffle=True, random_state=config.random_state)

    grid_search = GridSearchCV(
        estimator=RandomForestClassifier(random_state=config.random_state, class_weight="balanced"),
        param_grid=config.param_grid,
        scoring=recall_class1,
        cv=cv,
        n_jobs=2,
    )
    grid_search.fit(X_train, y_train)

    best_model = grid_search.best_estimator_
    y_pred = best_model.predict(X_test)

    report = classification_report(y_test, y_pred, output_dict=True)
    matrix = confusion_matrix(y_test, y_pred).tolist()

    metrics = {
        "best_params": grid_search.best_params_,
        "cv_best_recall": grid_search.best_score_,
        "test_classification_report": report,
        "test_confusion_matrix": matrix,
    }

    return best_model, metrics