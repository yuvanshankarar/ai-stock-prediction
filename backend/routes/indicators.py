from fastapi import APIRouter
import yfinance as yf
import pandas as pd

router = APIRouter()

@router.get("/rsi/{symbol}")
def get_rsi(symbol: str):

    data = yf.download(
        symbol,
        period="3mo",
        progress=False
    )

    close = data["Close"]

    delta = close.diff()

    gain = delta.where(
        delta > 0,
        0
    )

    loss = -delta.where(
        delta < 0,
        0
    )

    avg_gain = gain.rolling(14).mean()
    avg_loss = loss.rolling(14).mean()

    rs = avg_gain / avg_loss

    rsi = 100 - (
        100 / (1 + rs)
    )

    latest_rsi = round(
        float(rsi.iloc[-1]),
        2
    )

    return {
        "symbol": symbol.upper(),
        "rsi": latest_rsi
    }

@router.get("/macd/{symbol}")
def get_macd(symbol: str):

    import yfinance as yf

    data = yf.download(
        symbol,
        period="6mo",
        progress=False
    )

    close = data["Close"]

    ema12 = close.ewm(
        span=12,
        adjust=False
    ).mean()

    ema26 = close.ewm(
        span=26,
        adjust=False
    ).mean()

    macd = ema12 - ema26

    signal = macd.ewm(
        span=9,
        adjust=False
    ).mean()

    return {
        "symbol": symbol.upper(),
        "macd": round(
            float(macd.iloc[-1]),
            2
        ),
        "signal": round(
            float(signal.iloc[-1]),
            2
        )
    }