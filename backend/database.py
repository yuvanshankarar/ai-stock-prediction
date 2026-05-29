import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# DATABASE URL
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./trading.db"
)

# ENGINE
if DATABASE_URL.startswith("sqlite"):

    engine = create_engine(

        DATABASE_URL,

        connect_args={
            "check_same_thread": False
        }
    )

else:

    engine = create_engine(
        DATABASE_URL
    )

# SESSION
SessionLocal = sessionmaker(

    autocommit=False,

    autoflush=False,

    bind=engine
)

# BASE
Base = declarative_base()

