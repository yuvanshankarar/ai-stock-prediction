from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/prediction/{symbol}")
def predict_stock(symbol: str):

    signal = random.choice([
        "BUY",
        "SELL",
        "HOLD"
    ])

    confidence = random.randint(
        60,
        95
    )

    return {
        "symbol": symbol,
        "signal": signal,
        "confidence": confidence
    }