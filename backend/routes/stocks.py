from fastapi import APIRouter
from fastapi import HTTPException

import yfinance as yf

router = APIRouter()


@router.get("/stock/{symbol}")
def get_stock(symbol: str):

    try:

        ticker = yf.Ticker(symbol)

        # CURRENT INFO
        info = ticker.fast_info

        # HISTORICAL DATA
        history = ticker.history(

            period="1mo",

            interval="1d"
        )

        # CHART DATA
        chart_data = []

        for index, row in history.iterrows():

            chart_data.append({

                "date":
                    str(index.date()),

                "close":
                    float(row["Close"])
            })

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
                info.get("lastVolume"),

            "chart_data":
                chart_data
        }

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)
        )