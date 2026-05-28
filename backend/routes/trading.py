
from fastapi import APIRouter

router = APIRouter()

# TEMP MEMORY STORAGE
portfolio_data = {}

transaction_data = {}

# BUY STOCK
@router.post("/buy")
def buy_stock(data: dict):

    username = data["username"]

    symbol = data["symbol"]

    quantity = int(data["quantity"])

    price = float(data["price"])

    # CREATE USER PORTFOLIO
    if username not in portfolio_data:

        portfolio_data[username] = []

    # ADD HOLDING
    portfolio_data[username].append({

        "symbol": symbol,

        "quantity": quantity,

        "average_price": price
    })

    # CREATE TRANSACTION LIST
    if username not in transaction_data:

        transaction_data[username] = []

    # SAVE TRANSACTION
    transaction_data[username].append({

        "type": "BUY",

        "symbol": symbol,

        "quantity": quantity,

        "price": price
    })

    return {

        "message":
        f"Bought {quantity} shares of {symbol}"
    }

# SELL STOCK
@router.post("/sell")
def sell_stock(data: dict):

    username = data["username"]

    symbol = data["symbol"]

    quantity = int(data["quantity"])

    price = float(data["price"])

    # SAVE TRANSACTION
    if username not in transaction_data:

        transaction_data[username] = []

    transaction_data[username].append({

        "type": "SELL",

        "symbol": symbol,

        "quantity": quantity,

        "price": price
    })

    return {

        "message":
        f"Sold {quantity} shares of {symbol}"
    }

# GET PORTFOLIO
@router.get("/portfolio/{username}")
def get_portfolio(username: str):

    return portfolio_data.get(
        username,
        []
    )

# GET TRANSACTIONS
@router.get("/transactions/{username}")
def get_transactions(username: str):

    return transaction_data.get(
        username,
        []
     )