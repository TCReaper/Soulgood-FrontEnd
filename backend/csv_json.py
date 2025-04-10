import pandas as pd

df=pd.read_csv("hr_export.csv")
df.to_json("hr_export.json",orient="records")