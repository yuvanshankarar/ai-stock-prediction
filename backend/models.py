from sqlalchemy import Column, Integer, String, Float
from backend.database import Base


# USERS TABLE
class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True)

    password = Column(String)


# HOLDINGS TABLE
class Holding(Base):

    __tablename__ = "holdings"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String)

    symbol = Column(String)

    quantity = Column(Integer)

    average_price = Column(Float)


# TRANSACTIONS TABLE
class Transaction(Base):

    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String)

    symbol = Column(String)

    quantity = Column(Integer)

    price = Column(Float)

    type = Column(String)


# BALANCES TABLE
class Balance(Base):

    __tablename__ = "balances"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True)

    cash = Column(Float, default=100000)

# WATCHLIST TABLE
class Watchlist(Base):

    __tablename__ = "watchlists"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, index=True)

    symbol = Column(String)



