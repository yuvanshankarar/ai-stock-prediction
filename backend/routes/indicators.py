from fastapi import APIRouter
import yfinance as yf

router = APIRouter()


@router.get("/rsi/{symbol}")
def get_rsi(symbol: str):

    data = yf.download(
        symbol,
        period="3mo",
        auto_adjust=True,
        progress=False
    )

    if data.empty:
        return {
            "symbol": symbol.upper(),
            "rsi": 0
        }

    close = data["Close"].squeeze()

    delta = close.diff()

    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)

    avg_gain = gain.rolling(window=14).mean()
    avg_loss = loss.rolling(window=14).mean()

    rs = avg_gain / avg_loss

    rsi = 100 - (100 / (1 + rs))

    latest_rsi = round(
        float(rsi.dropna().iloc[-1]),
        2
    )

    return {
        "symbol": symbol.upper(),
        "rsi": latest_rsi
    }


@router.get("/macd/{symbol}")
def get_macd(symbol: str):

    data = yf.download(
        symbol,
        period="6mo",
        auto_adjust=True,
        progress=False
    )

    if data.empty:
        return {
            "symbol": symbol.upper(),
            "macd": 0,
            "signal": 0
        }

    close = data["Close"].squeeze()

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
            float(macd.dropna().iloc[-1]),
            2
        ),
        "signal": round(
            float(signal.dropna().iloc[-1]),
            2
        )
    }
