from backend.routes.auth import router as auth_router
from fastapi import FastAPI
from fastapi.middleware.cors import (
    CORSMiddleware
)

from backend.routes.stocks import (
    router as stock_router
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


@app.get("/")
def root():

    return {

        "message":
            "AI Trading API Live 🚀"
    }


@app.get("/health")
def health():

    return {

        "status":
            "healthy"
    }


# STOCK ROUTES
app.include_router(stock_router)