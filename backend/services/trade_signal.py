def generate_signal(data):
    latest = data.iloc[-1]

    if latest["Close"] > latest["SMA20"]:
        return "BUY"

    return "SELL"