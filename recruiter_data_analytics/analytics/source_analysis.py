def source_success(df):
    hired = df[df["status"] == "Hired"]
    return hired["source"].value_counts()
