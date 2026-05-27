from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from backend.database import SessionLocal

from backend.models.trade import Trade

router = APIRouter()

STARTING_BALANCE = 100000


# DATABASE
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# BUY/SELL TRADE
@router.post("/trade")
def place_trade(

    symbol: str,

    action: str,

    shares: float,

    price: float,

    db: Session = Depends(get_db)
):

    trade = Trade(

        symbol=symbol.upper(),

        action=action.upper(),

        shares=shares,

        price=price
    )

    db.add(trade)

    db.commit()

    db.refresh(trade)

    return {
        "message": "Trade Executed"
    }


# TRADE HISTORY
@router.get("/trades")
def get_trades(

    db: Session = Depends(get_db)
):

    trades = db.query(
        Trade
    ).all()

    history = []

    balance = STARTING_BALANCE

    for trade in trades:

        trade_value = (
            trade.shares *
            trade.price
        )

        if trade.action == "BUY":

            balance -= trade_value

        else:

            balance += trade_value

        history.append({

            "symbol": trade.symbol,

            "action": trade.action,

            "shares": trade.shares,

            "price": trade.price,

            "value": round(
                trade_value,
                2
            )
        })

    return {

        "starting_balance":
            STARTING_BALANCE,

        "current_balance":
            round(balance, 2),

        "trades":
            history
    }