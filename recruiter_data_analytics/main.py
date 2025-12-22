from analytics.data_loader import load_candidates
from analytics.hiring_funnel import hiring_funnel
from analytics.time_to_hire import calculate_time_to_hire
from analytics.source_analysis import source_success
from analytics.recruiter_performance import recruiter_stats
from visualization.charts import bar_chart

df = load_candidates()

bar_chart(hiring_funnel(df), "Hiring Funnel")
bar_chart(source_success(df), "Hiring Source Effectiveness")
bar_chart(recruiter_stats(df), "Recruiter Performance")

print(calculate_time_to_hire(df))
