from fastapi import APIRouter, WebSocket

import asyncio
import yfinance as yf
import pandas as pd

router = APIRouter()


@router.websocket("/ws/{symbol}")
async def websocket_endpoint(
    websocket: WebSocket,
    symbol: str
):

    await websocket.accept()

    print(f"WebSocket Connected: {symbol}")

    try:

        while True:

            # DOWNLOAD LIVE DATA
            df = yf.download(
                symbol,
                period="1d",
                interval="1m",
                progress=False
            )

            # SAFETY CHECK
            if df is None or df.empty:

                await asyncio.sleep(5)
                continue

            # FIX MULTIINDEX
            if isinstance(df.columns, pd.MultiIndex):

                df.columns = (
                    df.columns
                    .get_level_values(0)
                )

            # GET LATEST ROW
            latest = df.iloc[-1]

            # LIVE CANDLE DATA
            candle = {

                "time": str(df.index[-1])[:19],

                "open": float(latest["Open"]),

                "high": float(latest["High"]),

                "low": float(latest["Low"]),

                "close": float(latest["Close"]),

                "volume": float(latest["Volume"])
            }

            # SEND TO FRONTEND
            await websocket.send_json(
                candle
            )

            print("LIVE:", candle)

            # WAIT 5 SECONDS
            await asyncio.sleep(5)

    except Exception as e:

        print("WebSocket Error:", e)

    finally:

        print("WebSocket Disconnected")