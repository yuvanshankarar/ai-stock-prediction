import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import WatchlistSidebar
from "./components/WatchlistSidebar";

export default function App() {

  // SELECTED STOCK
  const [selectedStock, setSelectedStock] =
    useState("AAPL");

  // STOCK DATA
  const [stockData, setStockData] =
    useState(null);

  // LOADING
  const [loading, setLoading] =
    useState(false);

  // QUANTITY
  const [quantity, setQuantity] =
    useState(1);

  // USERNAME
  const username =
    localStorage.getItem("username");

  // API URL
  const API =
    import.meta.env.VITE_API_URL;

  // FETCH STOCK
  async function fetchStock(symbol) {

    try {

      setLoading(true);

      const response = await axios.get(
        `${API}/stock/${symbol}`
      );

      setStockData(response.data);

    } catch (error) {

      console.error(
        "API Error:",
        error
      );

    } finally {

      setLoading(false);
    }
  }

  // BUY STOCK
  async function buyStock() {

    try {

      await axios.post(

        `${API}/buy`,

        null,

        {
          params: {

            username,

            symbol: selectedStock,

            quantity,

            price: stockData.price
          }
        }
      );

      alert(
        "Stock Purchased 🚀"
      );

    } catch (error) {

      console.error(error);

      alert("Buy failed");
    }
  }

  // SELL STOCK
  async function sellStock() {

    try {

      await axios.post(

        `${API}/sell`,

        null,

        {
          params: {

            username,

            symbol: selectedStock,

            quantity,

            price: stockData.price
          }
        }
      );

      alert(
        "Stock Sold 🚀"
      );

    } catch (error) {

      console.error(error);

      alert("Sell failed");
    }
  }

  // LOAD STOCK
  useEffect(() => {

    fetchStock(selectedStock);

  }, [selectedStock]);

  return (

    <div
      style={{
        display: "flex",

        background: "#0f172a",

        minHeight: "100vh",

        color: "white"
      }}
    >

      {/* SIDEBAR */}

      <WatchlistSidebar

        selectedStock={
          selectedStock
        }

        setSelectedStock={
          setSelectedStock
        }
      />

      {/* MAIN */}

      <div
        style={{
          flex: 1,

          padding: "20px"
        }}
      >

        {/* TITLE */}

        <h1
          style={{
            textAlign: "center",

            marginBottom: "30px"
          }}
        >
          AI Trading Dashboard 🚀
        </h1>

        {/* LOADING */}

        {loading && (

          <h2
            style={{
              textAlign: "center"
            }}
          >
            Loading...
          </h2>
        )}

        {/* STOCK DATA */}

        {!loading && stockData && (

          <div>

            {/* CARDS */}

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",

                gap: "20px",

                marginBottom: "30px"
              }}
            >

              <Card
                title="Current Price"

                value={`$${stockData.price?.toFixed(2)}`}

                color="#22c55e"
              />

              <Card
                title="Day High"

                value={`$${stockData.day_high?.toFixed(2)}`}
              />

              <Card
                title="Day Low"

                value={`$${stockData.day_low?.toFixed(2)}`}
              />

              <Card
                title="Volume"

                value={
                  stockData.volume?.toLocaleString()
                }

                color="#38bdf8"
              />

            </div>

            {/* DETAILS */}

            <div
              style={{
                background: "#111827",

                padding: "30px",

                borderRadius: "20px"
              }}
            >

              <h1
                style={{
                  marginBottom: "20px"
                }}
              >
                {stockData.symbol}
              </h1>

              <h2>
                Current Price:
                {" "}
                ${stockData.price?.toFixed(2)}
              </h2>

              <h3>
                Day High:
                {" "}
                ${stockData.day_high?.toFixed(2)}
              </h3>

              <h3>
                Day Low:
                {" "}
                ${stockData.day_low?.toFixed(2)}
              </h3>

              <h3>
                Volume:
                {" "}
                {stockData.volume?.toLocaleString()}
              </h3>

              {/* BUY SELL */}

              <div
                style={{
                  marginTop: "30px"
                }}
              >

                <input

                  type="number"

                  value={quantity}

                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }

                  style={{
                    padding: "10px",

                    borderRadius: "10px",

                    marginRight: "10px"
                  }}
                />

                <button

                  onClick={buyStock}

                  style={{
                    padding: "12px 20px",

                    background: "#22c55e",

                    border: "none",

                    borderRadius: "10px",

                    color: "white",

                    marginRight: "10px",

                    cursor: "pointer"
                  }}
                >
                  Buy
                </button>

                <button

                  onClick={sellStock}

                  style={{
                    padding: "12px 20px",

                    background: "#ef4444",

                    border: "none",

                    borderRadius: "10px",

                    color: "white",

                    cursor: "pointer"
                  }}
                >
                  Sell
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

// CARD COMPONENT

function Card({

  title,

  value,

  color

}) {

  return (

    <div
      style={{
        background: "#1e293b",

        padding: "20px",

        borderRadius: "20px",

        textAlign: "center"
      }}
    >

      <h3
        style={{
          color: "#94a3b8"
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: color || "white"
        }}
      >
        {value}
      </h1>

    </div>
  );
}
