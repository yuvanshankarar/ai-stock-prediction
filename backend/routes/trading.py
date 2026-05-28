from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models import User
from backend.models import Holding
from backend.models import Trade

router = APIRouter()


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/buy")


def buy_stock(

    username: str,

    symbol: str,

    quantity: float,

    price: float,

    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:

        return {
            "error": "User not found"
        }

    total_cost = quantity * price

    if user.balance < total_cost:

        return {
            "error": "Insufficient balance"
        }

    user.balance -= total_cost

    holding = db.query(Holding).filter(

        Holding.user_id == user.id,

        Holding.symbol == symbol

    ).first()

    if holding:

        holding.quantity += quantity

    else:

        holding = Holding(

            symbol=symbol,

            quantity=quantity,

            average_price=price,

            user_id=user.id
        )

        db.add(holding)

    trade = Trade(

        symbol=symbol,

        action="BUY",

        quantity=quantity,

        price=price,

        user_id=user.id
    )

    db.add(trade)

    db.commit()

    return {
        "message": "Stock purchased"
    }


@router.post("/sell")

def sell_stock(

    username: str,

    symbol: str,

    quantity: float,

    price: float,

    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:

        return {
            "error": "User not found"
        }

    holding = db.query(Holding).filter(

        Holding.user_id == user.id,

        Holding.symbol == symbol

    ).first()

    if not holding:

        return {
            "error": "No holdings found"
        }

    if holding.quantity < quantity:

        return {
            "error": "Not enough shares"
        }

    total_sale = quantity * price

    user.balance += total_sale

    holding.quantity -= quantity

    trade = Trade(

        symbol=symbol,

        action="SELL",

        quantity=quantity,

        price=price,

        user_id=user.id
    )

    db.add(trade)

    db.commit()

    return {
        "message": "Stock sold"
    }