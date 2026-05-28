from fastapi import APIRouter
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models import Holding, Transaction

router = APIRouter()


# DATABASE SESSION
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# GET HOLDINGS
@router.get("/portfolio/{username}")
def get_portfolio(username: str):

    db = SessionLocal()

    holdings = db.query(Holding).filter(
        Holding.username == username
    ).all()

    result = []

    for h in holdings:

        result.append({

            "symbol": h.symbol,

            "quantity": h.quantity,

            "average_price": h.average_price
        })

    return result


# GET TRANSACTION HISTORY
@router.get("/transactions/{username}")
def get_transactions(username: str):

    db = SessionLocal()

    transactions = db.query(Transaction).filter(
        Transaction.username == username
    ).all()

    result = []

    for t in transactions:

        result.append({

            "symbol": t.symbol,

            "quantity": t.quantity,

            "price": t.price,

            "type": t.type
        })

    return result