from fastapi import APIRouter
from backend.database import SessionLocal
from backend.models import Holding, Transaction

router = APIRouter()


# BUY STOCK
@router.post("/buy")
def buy_stock(data: dict):

    username = data["username"]

    symbol = data["symbol"]

    quantity = int(data["quantity"])

    price = float(data["price"])

    db = SessionLocal()

    holding = db.query(Holding).filter(
        Holding.username == username,
        Holding.symbol == symbol
    ).first()

    # EXISTING HOLDING
    if holding:

        total_quantity = holding.quantity + quantity

        total_cost = (
            holding.average_price * holding.quantity
        ) + (price * quantity)

        holding.quantity = total_quantity

        holding.average_price = (
            total_cost / total_quantity
        )

    # NEW HOLDING
    else:

        holding = Holding(

            username=username,

            symbol=symbol,

            quantity=quantity,

            average_price=price
        )

        db.add(holding)

    # SAVE TRANSACTION
    transaction = Transaction(

        username=username,

        symbol=symbol,

        quantity=quantity,

        price=price,

        type="BUY"
    )

    db.add(transaction)

    db.commit()

    return {
        "message": f"Bought {quantity} shares of {symbol}"
    }


# SELL STOCK
@router.post("/sell")
def sell_stock(data: dict):

    username = data["username"]

    symbol = data["symbol"]

    quantity = int(data["quantity"])

    price = float(data["price"])

    db = SessionLocal()

    holding = db.query(Holding).filter(
        Holding.username == username,
        Holding.symbol == symbol
    ).first()

    # VALIDATION
    if not holding:

        return {
            "message": "No holdings found"
        }

    if holding.quantity < quantity:

        return {
            "message": "Not enough shares"
        }

    holding.quantity -= quantity

    # DELETE EMPTY HOLDING
    if holding.quantity == 0:

        db.delete(holding)

    # SAVE TRANSACTION
    transaction = Transaction(

        username=username,

        symbol=symbol,

        quantity=quantity,

        price=price,

        type="SELL"
    )

    db.add(transaction)

    db.commit()

    return {
        "message": f"Sold {quantity} shares of {symbol}"
    }