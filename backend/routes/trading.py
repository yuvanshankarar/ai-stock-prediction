from fastapi import APIRouter

router = APIRouter()


# BUY STOCK
@router.post("/buy")
def buy_stock(data: dict):

    username = data["username"]

    symbol = data["symbol"]

    quantity = int(data["quantity"])

    return {
        "message": f"Bought {quantity} shares of {symbol}"
    }


# SELL STOCK
@router.post("/sell")
def sell_stock(data: dict):

    username = data["username"]

    symbol = data["symbol"]

    quantity = int(data["quantity"])

    return {
        "message": f"Sold {quantity} shares of {symbol}"
    }