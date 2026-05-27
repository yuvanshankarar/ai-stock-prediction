from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from backend.database import Base


class Trade(Base):

    __tablename__ = "trades"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    symbol = Column(String)

    action = Column(String)

    shares = Column(Float)

    price = Column(Float)