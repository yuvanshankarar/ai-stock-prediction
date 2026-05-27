from fastapi import APIRouter, HTTPException
import pandas as pd

from backend.services.risk_analysis import (
    calculate_risk_metrics
)

from backend.services.data_fetch import fetch_stock_data
from backend.services.indicators import add_indicators
from backend.services.predict import predict_price
from backend.services.recommendation import (
    generate_recommendation
)

router = APIRouter()


@router.get("/stock/{symbol}")
def get_stock(symbol: str):

    try:

        df = fetch_stock_data(symbol)

        if df is None or df.empty:
            raise HTTPException(
                status_code=404,
                detail="No stock data found"
            )

        df = add_indicators(df)

        df = df.dropna()

        latest = df.iloc[-1]

        rsi = latest["rsi"]

        if rsi < 30:
            signal = "BUY"

        elif rsi > 70:
            signal = "SELL"

        else:
            signal = "HOLD"

        prediction = predict_price(symbol)

        # MOCK SENTIMENT SCORE

        sentiment_score = 0.8

        risk_metrics = calculate_risk_metrics(symbol)

        recommendation_data = generate_recommendation(
            rsi=latest["rsi"],
            macd=latest["macd"],
            macd_signal=latest["macd_signal"],
            predicted_price=prediction,
            current_price=latest["Close"],
            sentiment_score=sentiment_score
        )

        date_col = (
            "Date"
            if "Date" in df.columns
            else df.columns[0]
        )

        chart_data = []

        for _, row in df.iterrows():

            chart_data.append({
                "date": str(row[date_col]),
                "open": float(row["Open"]),
                "high": float(row["High"]),
                "low": float(row["Low"]),
                "close": float(row["Close"]),
                "volume": float(row["Volume"]),
                "rsi": float(row["rsi"]),
                "macd": float(row["macd"]),
                "macd_signal": float(row["macd_signal"])
            })

        return {
           
            "symbol": symbol.upper(),
            "latest_close": float(latest["Close"]),
            "rsi": float(latest["rsi"]),
            "macd": float(latest["macd"]),
            "macd_signal": float(latest["macd_signal"]),
            "signal": signal,
            "predicted_price": prediction,
            "recommendation":
         recommendation_data,
            "risk_analysis":
              risk_metrics,
            "chart_data": chart_data
        }

    except Exception as e:

        print("SERVER ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )