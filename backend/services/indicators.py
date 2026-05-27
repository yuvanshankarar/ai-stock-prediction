import pandas as pd
import ta


def add_indicators(df: pd.DataFrame):

    df = df.copy()

    # Keep as Pandas Series
    close = df["Close"].astype(float)

    # RSI
    df["rsi"] = ta.momentum.RSIIndicator(
        close=close,
        window=14
    ).rsi()

    # MACD
    macd = ta.trend.MACD(close=close)

    df["macd"] = macd.macd()
    df["macd_signal"] = macd.macd_signal()

    return df