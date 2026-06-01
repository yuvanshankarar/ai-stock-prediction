from fastapi import APIRouter
from backend.database import SessionLocal
from backend.models import Holding, Transaction, Balance

router = APIRouter()


# BUY STOCK
@router.post("/buy")
def buy_stock(data: dict):

    db = SessionLocal()

    username = data["username"]
    symbol = data["symbol"]
    quantity = int(data["quantity"])
    price = float(data["price"])

    cost = quantity * price

    # GET BALANCE
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

    # CHECK FUNDS
    if balance.cash is None or float(balance.cash) < cost:
        return {
            "message": "Insufficient funds"
        }

    # DEDUCT CASH
    balance.cash -= cost

    # CHECK HOLDING
    holding = db.query(Holding).filter(
        Holding.username == username,
        Holding.symbol == symbol
    ).first()

    if holding:

        holding.quantity += quantity

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
        "message":
        f"Bought {quantity} shares of {symbol}"
    }


# SELL STOCK
@router.post("/sell")
def sell_stock(data: dict):

    db = SessionLocal()

    username = data["username"]
    symbol = data["symbol"]
    quantity = int(data["quantity"])
    price = float(data["price"])

    holding = db.query(Holding).filter(
        Holding.username == username,
        Holding.symbol == symbol
    ).first()

    if not holding:

        return {
            "message":
            "No shares owned"
        }

    if holding.quantity < quantity:

        return {
            "message":
            "Not enough shares"
        }

    # UPDATE HOLDING
    holding.quantity -= quantity

    if holding.quantity == 0:
        db.delete(holding)

    # UPDATE BALANCE
    balance = db.query(Balance).filter(
        Balance.username == username
    ).first()

    if balance:

        balance.cash += (
            quantity * price
        )

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
        "message":
        f"Sold {quantity} shares of {symbol}"
    }

