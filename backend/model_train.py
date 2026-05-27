import yfinance as yf
import numpy as np

from sklearn.preprocessing import MinMaxScaler

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM
from tensorflow.keras.layers import Dense

# DOWNLOAD DATA
df = yf.download(
    "AAPL",
    period="5y",
    interval="1d",
    progress=False
)

# USE CLOSE PRICE
data = df["Close"].values.reshape(-1, 1)

# SCALE
scaler = MinMaxScaler()

scaled_data = scaler.fit_transform(data)

# CREATE DATASET
X = []
y = []

for i in range(60, len(scaled_data)):

    X.append(
        scaled_data[i-60:i, 0]
    )

    y.append(
        scaled_data[i, 0]
    )

X = np.array(X)
y = np.array(y)

# RESHAPE
X = X.reshape(
    X.shape[0],
    X.shape[1],
    1
)

# BUILD MODEL
model = Sequential()

model.add(
    LSTM(
        50,
        return_sequences=True,
        input_shape=(60, 1)
    )
)

model.add(
    LSTM(50)
)

model.add(
    Dense(25)
)

model.add(
    Dense(1)
)

# COMPILE
model.compile(
    optimizer="adam",
    loss="mse"
)

# TRAIN
model.fit(
    X,
    y,
    epochs=5,
    batch_size=32
)

# SAVE MODEL
model.save(
    "backend/models/stock_model.h5"
)

print("MODEL SAVED ✅")
