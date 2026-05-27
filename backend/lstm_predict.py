import yfinance as yf
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM

def predict_stock(symbol):

    df = yf.download(symbol, period="2y", progress=False)

    if df is None or df.empty or "Close" not in df.columns:
        return None  # ❗ prevent crash

    data = np.array(df["Close"]).reshape(-1, 1)

    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data)

    x_train, y_train = [], []

    for i in range(60, len(scaled_data)):
        x_train.append(scaled_data[i-60:i, 0])
        y_train.append(scaled_data[i, 0])

    if len(x_train) == 0:
        return None

    x_train = np.array(x_train)
    y_train = np.array(y_train)

    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    model = Sequential([
        LSTM(50, return_sequences=True, input_shape=(x_train.shape[1], 1)),
        LSTM(50),
        Dense(25),
        Dense(1)
    ])

    model.compile(optimizer="adam", loss="mean_squared_error")

    model.fit(x_train, y_train, batch_size=32, epochs=3, verbose=0)  # reduced epochs

    last_60 = scaled_data[-60:]
    X_test = np.array([last_60])
    X_test = np.reshape(X_test, (1, 60, 1))

    predicted = model.predict(X_test, verbose=0)

    return round(float(scaler.inverse_transform(predicted)[0][0]), 2)