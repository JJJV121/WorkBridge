def calculate_time_to_hire(df):
    hired = df[df["status"] == "Hired"].copy()
    hired["time_to_hire"] = (hired["hired_date"] - hired["applied_date"]).dt.days
    return hired[["candidate_id", "time_to_hire"]]
