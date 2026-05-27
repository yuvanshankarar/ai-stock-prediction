import yfinance as yf
import pandas as pd

def fetch_stock_data(symbol: str):

    # Download stock data
    df = yf.download(
        symbol,
        period="6mo",
        interval="1d",
        progress=False
    )

    # ❗ Step 1: Check empty data
    if df is None or df.empty:
        return None

    # ❗ Step 2: Fix MultiIndex columns issue (VERY IMPORTANT)
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    # ❗ Step 3: Ensure required columns exist
    required_cols = ["Open", "High", "Low", "Close", "Volume"]

    for col in required_cols:
        if col not in df.columns:
            raise ValueError(f"Missing column: {col}. Available: {list(df.columns)}")

    # ❗ Step 4: Clean data
    df = df.dropna(subset=["Close"])

    # ❗ Step 5: Convert index → Date column
    df = df.reset_index()

    # Some systems return "index" instead of "Date"
    if "Date" not in df.columns:
        df.rename(columns={df.columns[0]: "Date"}, inplace=True)

    return df