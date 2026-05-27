from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from backend.database import SessionLocal

from backend.models.watchlist import (
    Watchlist
)

router = APIRouter()


# DATABASE
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ADD STOCK
@router.post("/watchlist/add")
def add_stock(

    symbol: str,

    db: Session = Depends(get_db)
):

    symbol = symbol.upper()

    existing = db.query(
        Watchlist
    ).filter(
        Watchlist.symbol == symbol
    ).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Already in watchlist"
        )

    stock = Watchlist(
        symbol=symbol
    )

    db.add(stock)

    db.commit()

    db.refresh(stock)

    return {
        "message": "Added to watchlist"
    }


# GET WATCHLIST
@router.get("/watchlist")
def get_watchlist(

    db: Session = Depends(get_db)
):

    stocks = db.query(
        Watchlist
    ).all()

    return {
        "watchlist": [
            stock.symbol
            for stock in stocks
        ]
    }


# REMOVE STOCK
@router.delete("/watchlist/remove/{symbol}")
def remove_stock(

    symbol: str,

    db: Session = Depends(get_db)
):

    stock = db.query(
        Watchlist
    ).filter(
        Watchlist.symbol == symbol.upper()
    ).first()

    if not stock:

        raise HTTPException(
            status_code=404,
            detail="Stock not found"
        )

    db.delete(stock)

    db.commit()

    return {
        "message": "Removed from watchlist"
    }
