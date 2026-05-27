from backend.services.data_fetch import fetch_stock_data

stocks = ["AAPL", "MSFT", "TSLA"]

for stock in stocks:

    data = fetch_stock_data(stock)

    if data is not None:
        data.to_csv(f"../datasets/{stock}.csv")

        print(f"{stock} dataset saved")