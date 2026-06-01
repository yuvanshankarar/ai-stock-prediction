from fastapi import APIRouter
import yfinance as yf

router = APIRouter()

@router.get("/history/{symbol}")
def get_history(symbol: str):

    stock = yf.Ticker(symbol)

    hist = stock.history(period="1mo")

    data = []

    for index, row in hist.iterrows():

        data.append({
            "date": str(index.date()),
            "open": float(row["Open"]),
            "high": float(row["High"]),
            "low": float(row["Low"]),
            "close": float(row["Close"])
        })

    return data