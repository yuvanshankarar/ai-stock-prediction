import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv("../datasets/AAPL.csv")

plt.figure(figsize=(12,6))

plt.plot(data['Close'])

plt.title("AAPL Closing Price")

plt.xlabel("Days")
plt.ylabel("Price")

plt.grid(True)

plt.show()