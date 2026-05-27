import yfinance as yf
import numpy as np

from tensorflow.keras.models import (
    load_model
)

from sklearn.preprocessing import (
    MinMaxScaler
)


def predict_price(symbol):

    try:

        # LOAD MODEL INSIDE FUNCTION
        model = load_model(
            "backend/models/stock_model.h5"
        )

        # DOWNLOAD STOCK DATA
        df = yf.download(

            symbol,

            period="6mo",

            interval="1d",

            progress=False
        )

        # CLOSE PRICES
        close_prices = (
            df["Close"]
            .values
            .reshape(-1, 1)
        )

        # SCALE DATA
        scaler = MinMaxScaler()

        scaled_data = scaler.fit_transform(
            close_prices
        )

        # LAST 60 DAYS
        last_60 = scaled_data[-60:]

        X_test = np.array([last_60])

        X_test = np.reshape(

            X_test,

            (
                X_test.shape[0],

                X_test.shape[1],

                1
            )
        )

        # PREDICT
        predicted_price = model.predict(

            X_test,

            verbose=0
        )

        # INVERSE SCALE
        predicted_price = (
            scaler.inverse_transform(
                predicted_price
            )
        )

        return float(
            predicted_price[0][0]
        )

    except Exception as e:

        print(
            "Prediction Error:",
            e
        )

        return 0