from fastapi import APIRouter

import yfinance as yf

from backend.services.news_sentiment import (
    analyze_sentiment
)

router = APIRouter()


@router.get("/news/{symbol}")
def get_news(symbol: str):

    ticker = yf.Ticker(symbol)

    news = ticker.news

    results = []

    for item in news[:5]:

        title = item.get("title", "")

        sentiment = analyze_sentiment(
            title
        )

        results.append({

            "title": title,

            "sentiment":
                sentiment["label"],

            "score":
                sentiment["score"]
        })

    return {

        "symbol": symbol.upper(),

        "news": results
    }