import yfinance as yf

print("Downloading...")

data = yf.download("AAPL", period="1mo")

if data is None or data.empty:
	print("No data downloaded.")
else:
	print(data.tail())