from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.stocks import router as stocks_router
from backend.routes.auth import router as auth_router

from backend.database import engine
from backend.models import Base
from backend.routes.trading import router as trading_router


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