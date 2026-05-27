from datetime import datetime
from datetime import timedelta

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from jose import jwt

from passlib.context import CryptContext

from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models.user import User

router = APIRouter()

SECRET_KEY = "SUPER_SECRET_KEY"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# DATABASE
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# HASH PASSWORD
def hash_password(password):

    return pwd_context.hash(password)


# VERIFY PASSWORD
def verify_password(
    plain_password,
    hashed_password
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# CREATE JWT TOKEN
def create_access_token(data):

    to_encode = data.copy()

    expire = (
        datetime.utcnow()
        + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# SIGNUP
@router.post("/signup")
def signup(

    username: str,
    password: str,

    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.username == username
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    user = User(

        username=username,

        hashed_password=hash_password(password)
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return {
        "message": "User created successfully"
    }


# LOGIN
@router.post("/login")
def login(

    username: str,
    password: str,

    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid username"
        )

    if not verify_password(
        password,
        user.hashed_password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    access_token = create_access_token({

        "sub": user.username
    })

    return {

        "access_token": access_token,

        "token_type": "bearer"
    }