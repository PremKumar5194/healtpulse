import numpy as np
import pandas as pd

from ml.config.train_config import TrainConfig


def load_and_clean_data(config: TrainConfig) -> pd.DataFrame:
    """Load the raw CSV and replace disguised-zero missing values with the
    Outcome-grouped median for each affected column."""
    df = pd.read_csv(config.data_path)

    df[config.zero_as_missing_cols] = df[config.zero_as_missing_cols].replace(0, np.nan)

    for col in config.zero_as_missing_cols:
        df[col] = df.groupby("Outcome")[col].transform(lambda x: x.fillna(x.median()))

    return df