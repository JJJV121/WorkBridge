import pandas as pd

def load_candidates():
    return pd.read_csv("data/candidates.csv", parse_dates=["applied_date", "hired_date"])
