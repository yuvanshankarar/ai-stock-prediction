from fastapi import APIRouter
from fastapi import HTTPException

import yfinance as yf
import pandas as pd

from backend.services.indicators import (
    add_indicators
)

router = APIRouter()


@router.get("/stock/{symbol}")
def get_stock(symbol: str):

    try:

        # DOWNLOAD DATA
        ticker = yf.Ticker(symbol)

        df = ticker.history(

            period="6mo",

            interval="1d"
        )

        # EMPTY CHECK
        if df.empty:

            raise HTTPException(

                status_code=404,

                detail="No stock data found"
            )

        # RESET INDEX
        df = df.reset_index()

        # FIX MULTIINDEX
        if isinstance(
            df.columns,
            pd.MultiIndex
        ):

            df.columns = (
                df.columns
                .get_level_values(0)
            )

        # VALIDATE CLOSE
        if "Close" not in df.columns:

            raise HTTPException(

                status_code=500,

                detail="Close column missing"
            )

        # ADD INDICATORS
        df = add_indicators(df)

        # REMOVE NaN
        df = df.dropna()

        latest = df.iloc[-1]

        # SIGNAL
        rsi = latest["rsi"]

        if rsi < 30:

            signal = "BUY"

        elif rsi > 70:

            signal = "SELL"

        else:

            signal = "HOLD"

        # MOCK PREDICTION
        prediction = (
            float(latest["Close"]) * 1.02
        )

        # RECOMMENDATION
        recommendation_data = {

            "recommendation":
                signal,

            "confidence":
                75,

            "reasons": [

                "Technical indicators analyzed",

                "Deployment mode active"
            ]
        }

        # CHART DATA
        chart_data = [

            {

                "date":
                    str(row["Date"]),

                "open":
                    float(row["Open"]),

                "high":
                    float(row["High"]),

                "low":
                    float(row["Low"]),

                "close":
                    float(row["Close"]),

                "volume":
                    int(row["Volume"]),

                "rsi":
                    float(row["rsi"]),

                "macd":
                    float(row["macd"]),

                "macd_signal":
                    float(row["macd_signal"])
            }

            for _, row in df.iterrows()
        ]

        return {

            "symbol":
                symbol.upper(),

            "latest_close":
                float(latest["Close"]),

            "rsi":
                float(latest["rsi"]),

            "macd":
                float(latest["macd"]),

            "macd_signal":
                float(latest["macd_signal"]),

            "signal":
                signal,

            "predicted_price":
                prediction,

            "recommendation":
                recommendation_data,

            "chart_data":
                chart_data
        }

    except Exception as e:

        print(
            "Stock Route Error:",
            e
        )

        raise HTTPException(

            status_code=500,

            detail=str(e)
        )