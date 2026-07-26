# ml/fetch_data.py
import requests
import os

URL = "https://raw.githubusercontent.com/npradaschnor/Pima-Indians-Diabetes-Dataset/master/diabetes.csv"

def fetch_dataset():
    os.makedirs("ml/data", exist_ok=True)
    save_path = "ml/data/diabetes.csv"

    response = requests.get(URL, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
    response.raise_for_status()

    with open(save_path, "wb") as f:
        f.write(response.content)

    print(f"Saved dataset to {save_path}")

if __name__ == "__main__":
    fetch_dataset()