def recruiter_stats(df):
    return df[df["status"] == "Hired"]["recruiter"].value_counts()
