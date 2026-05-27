import yfinance as yf
import numpy as np


def calculate_risk_metrics(symbol):

    try:

        # DOWNLOAD DATA
        df = yf.download(
            symbol,
            period="1y",
            interval="1d",
            progress=False
        )

        # DAILY RETURNS
        df["Returns"] = (
            df["Close"]
            .pct_change()
        )

        returns = (
            df["Returns"]
            .dropna()
        )

        # VOLATILITY
        volatility = (
            returns.std() * 100
        )

        # AVG RETURN
        avg_return = (
            returns.mean() * 100
        )

        # SHARPE RATIO
        sharpe_ratio = (
            avg_return / volatility
            if volatility != 0
            else 0
        )

        # RISK SCORE
        if volatility < 1:

            risk = "LOW"

        elif volatility < 2.5:

            risk = "MEDIUM"

        else:

            risk = "HIGH"

        return {

            "volatility":
                round(
                    float(volatility),
                    2
                ),

            "daily_return":
                round(
                    float(avg_return),
                    2
                ),

            "sharpe_ratio":
                round(
                    float(sharpe_ratio),
                    2
                ),

            "risk":
                risk
        }

    except Exception as e:

        print(
            "Risk Analysis Error:",
            e
        )

        return None