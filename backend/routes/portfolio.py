from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models import Balance

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/balance/{username}")
def get_balance(
    username: str,
    db: Session = Depends(get_db)
):

    balance = db.query(Balance).filter(
        Balance.username == username
    ).first()

    if not balance:

        balance = Balance(
            username=username,
            cash=100000
        )

        db.add(balance)
        db.commit()
        db.refresh(balance)

    return {
        "cash": balance.cash
    }



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