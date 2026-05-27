import numpy as np
import yfinance as yf

from sklearn.preprocessing import MinMaxScaler

from tensorflow.keras.models import load_model

# LOAD MODEL
model = load_model(
    "backend/models/stock_model.h5",
    compile=False   # ✅ FIX
)


def predict_price(symbol):

    try:

        # DOWNLOAD DATA
        df = yf.download(
            symbol,
            period="1y",
            interval="1d",
            progress=False
        )

        if df is None or df.empty:
            return None

        # CLOSE PRICE
        data = df["Close"].values.reshape(-1, 1)

        # SCALE
        scaler = MinMaxScaler()

        scaled = scaler.fit_transform(data)

        # LAST 60 DAYS
        last_60 = scaled[-60:]

        X_test = np.array([last_60])

        X_test = X_test.reshape(
            1,
            60,
            1
        )

        # PREDICT
        prediction = model.predict(
            X_test,
            verbose=0
        )

        # INVERSE SCALE
        predicted_price = scaler.inverse_transform(
            prediction
        )

        return float(
            predicted_price[0][0]
        )

    except Exception as e:

        print(
            "Prediction Error:",
            e
        )

        return None