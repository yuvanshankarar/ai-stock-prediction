from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models.portfolio import Portfolio

import yfinance as yf

router = APIRouter()


# DATABASE
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# BUY STOCK
@router.post("/portfolio/buy")
def buy_stock(

    symbol: str,
    shares: float,
    buy_price: float,

    db: Session = Depends(get_db)
):

    stock = Portfolio(

        symbol=symbol.upper(),

        shares=shares,

        buy_price=buy_price
    )

    db.add(stock)

    db.commit()

    db.refresh(stock)

    return {
        "message": "Stock Added"
    }


# GET PORTFOLIO
@router.get("/portfolio")
def get_portfolio(

    db: Session = Depends(get_db)
):

    stocks = db.query(
        Portfolio
    ).all()

    result = []

    total_value = 0.0

    total_profit = 0.0

    for stock in stocks:

        # LIVE PRICE
        ticker = yf.Ticker(
            stock.symbol
        )

        current_price = ticker.history(
            period="1d"
        )["Close"].iloc[-1]

        # ensure numeric types (avoid SQLAlchemy column objects)
        shares = float(stock.shares)
        buy_price = float(stock.buy_price)

        invested = shares * buy_price

        current_value = shares * float(current_price)

        profit = current_value - invested

        total_value += current_value

        total_profit += profit

        result.append({

            "symbol": stock.symbol,

            "shares": stock.shares,

            "buy_price": stock.buy_price,

            "current_price": round(
                float(current_price),
                2
            ),

            "invested": round(
                invested,
                2
            ),

            "current_value": round(
                current_value,
                2
            ),

            "profit": round(
                profit,
                2
            )
        })

    return {

        "portfolio": result,

        "total_value": round(
            total_value,
            2
        ),

        "total_profit": round(
            total_profit,
            2
        )
    }