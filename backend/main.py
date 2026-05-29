from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.stocks import router as stocks_router
from backend.routes.auth import router as auth_router

from backend.database import engine
from backend.models import Base
from backend.routes.trading import router as trading_router

from backend.routes.portfolio import router as portfolio_router

from sqlalchemy import Column, Integer, String, Float
from backend.database import Base

class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, index=True)

    symbol = Column(String)

    quantity = Column(Integer)

    average_price = Column(Float)


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, index=True)

    type = Column(String)

    symbol = Column(String)

    quantity = Column(Integer)

    price = Column(Float)


class Balance(Base):
    __tablename__ = "balances"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True)

    cash = Column(Float, default=100000)




app = FastAPI()

Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ROOT
@app.get("/")
def root():

    return {
        "message": "AI Trading Backend Running"
    }


# HEALTH
@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


# ROUTES
app.include_router(stocks_router)

app.include_router(auth_router)

app.include_router(trading_router)

app.include_router(portfolio_router)