from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.portfolio import router as portfolio_router
from backend.models.user import User
from backend.database import engine
from backend.database import Base
from backend.routes.auth import router as auth_router
from backend.models.watchlist import Watchlist
from backend.models.trade import Trade

from backend.routes.paper_trading import (
    router as trading_router
)

from backend.routes.news import (
    router as news_router
)

from backend.routes.watchlist import (
    router as watchlist_router
)

# CREATE TABLES
Base.metadata.create_all(bind=engine)

# Import routes
from backend.routes.stocks import router as stock_router
#from backend.routes.ws import router as ws_router

# Create app
app = FastAPI(
    title="AI Trading API",
    version="2.0.0",
    description="Real-Time AI Trading Platform"
)

# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def root():

    return {
        "message": "AI Trading API 🚀",
        "status": "running"
    }

# Register REST API routes
app.include_router(
    stock_router,
    tags=["Stocks"]
)

# Register WebSocket routes
#app.include_router( ws_router,tags=["WebSockets"])

# register portfolio routes
app.include_router(portfolio_router)

app.include_router(auth_router)

app.include_router(news_router)

app.include_router(watchlist_router)

app.include_router(trading_router)

Base.metadata.create_all(bind=engine)