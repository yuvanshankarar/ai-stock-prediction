from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from backend.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True
    )

    password = Column(String)

    balance = Column(
        Float,
        default=10000
    )

    holdings = relationship(
        "Holding",
        back_populates="owner"
    )

    trades = relationship(
        "Trade",
        back_populates="owner"
    )


class Holding(Base):

    __tablename__ = "holdings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    symbol = Column(String)

    quantity = Column(Float)

    average_price = Column(Float)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    owner = relationship(
        "User",
        back_populates="holdings"
    )


class Trade(Base):

    __tablename__ = "trades"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    symbol = Column(String)

    action = Column(String)

    quantity = Column(Float)

    price = Column(Float)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    owner = relationship(
        "User",
        back_populates="trades"
    )