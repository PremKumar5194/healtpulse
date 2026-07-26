import logging

from ml.config.train_config import TrainConfig
from ml.pipeline.preprocessing import load_and_clean_data
from ml.pipeline.model import train_model
from ml.pipeline.artifacts_io import save_artifacts

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)


def main() -> None:
    config = TrainConfig()

    logger.info(f"Loading data from {config.data_path}")
    df = load_and_clean_data(config)
    logger.info(f"Loaded {len(df)} rows, {df['Outcome'].sum()} positive cases")

    logger.info("Starting training and grid search...")
    model, metrics = train_model(df, config)
    logger.info(f"Best params: {metrics['best_params']}")
    logger.info(f"Test recall (class 1): {metrics['test_classification_report']['1']['recall']:.3f}")
    logger.info(f"Confusion matrix: {metrics['test_confusion_matrix']}")

    save_artifacts(model, metrics, config)
    logger.info(f"Model saved to {config.model_path}")
    logger.info(f"Metrics saved to {config.metrics_path}")


if __name__ == "__main__":
    main()