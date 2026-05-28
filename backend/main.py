from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.stocks import router as stocks_router
from backend.routes.auth import router as auth_router


app = FastAPI()


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