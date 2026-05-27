from fastapi import APIRouter
from fastapi import HTTPException

import yfinance as yf

router = APIRouter()


@router.get("/stock/{symbol}")
def get_stock(symbol: str):

    try:

        ticker = yf.Ticker(symbol)

        info = ticker.fast_info

        return {

            "symbol":
                symbol.upper(),

            "price":
                info.get("lastPrice"),

            "day_high":
                info.get("dayHigh"),

            "day_low":
                info.get("dayLow"),

            "volume":
                info.get("lastVolume")
        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)
        )