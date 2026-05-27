from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from backend.database import Base


class Portfolio(Base):

    __tablename__ = "portfolio"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    symbol = Column(String)

    shares = Column(Float)

    buy_price = Column(Float)