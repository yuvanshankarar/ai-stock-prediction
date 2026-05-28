import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import WatchlistSidebar from "./components/WatchlistSidebar";

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

      const username =
        localStorage.getItem("username");

      await axios.post(
        `${API}/buy`,
        {
          username,
          symbol: selectedStock,
          quantity
        }
      );

      alert("Stock Purchased 🚀");

    } catch (error) {

      console.error(error);

      alert("Buy failed");
    }
  }

  // SELL STOCK
  async function sellStock() {

    try {

      const username =
        localStorage.getItem("username");

      await axios.post(
        `${API}/sell`,
        {
          username,
          symbol: selectedStock,
          quantity
        }
      );

      alert("Stock Sold 🚀");

    } catch (error) {

      console.error(error);

      alert("Sell failed");
    }
  }

  // LOGOUT
  function logout() {

    localStorage.removeItem(
      "username"
    );

    window.location.href =
      "/login";
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

        {/* HEADER */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            marginBottom: "30px"
          }}
        >

          <button

            onClick={logout}

            style={{
              background: "#ef4444",

              border: "none",

              padding: "12px 20px",

              borderRadius: "10px",

              color: "white",

              cursor: "pointer"
            }}
          >
            Logout
          </button>

          <h1>
            AI Trading Dashboard 🚀
          </h1>

          <div />
        </div>

        {/* LOADING */}

        {loading && (

          <h2>
            Loading...
          </h2>
        )}

        {/* STOCK DATA */}

        {!loading && stockData && (

          <div>

            {/* INFO CARDS */}

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",

                gap: "20px",

                marginBottom: "40px"
              }}
            >

              <Card
                title="Current Price"

                value={`$${stockData.price?.toFixed(2)}`}
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
              />

            </div>

            {/* STOCK DETAILS */}

            <div
              style={{
                background: "#111827",

                padding: "30px",

                borderRadius: "20px"
              }}
            >

              <h1>
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
                    setQuantity(
                      e.target.value
                    )
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
  value
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

      <h1>
        {value}
      </h1>

    </div>
  );
}
