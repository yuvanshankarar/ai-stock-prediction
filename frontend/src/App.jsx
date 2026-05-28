import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import WatchlistSidebar
from "./components/WatchlistSidebar";


export default function App() {

  const [selectedStock, setSelectedStock] =
    useState("AAPL");

  const [stockData, setStockData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const API =
    import.meta.env.VITE_API_URL;


  async function fetchStock(symbol) {

    try {

      setLoading(true);

      const response =
        await axios.get(
          `${API}/stock/${symbol}`
        );

      setStockData(
        response.data
      );

    } catch (error) {

      console.error(
        "API Error:",
        error
      );

    } finally {

      setLoading(false);
    }
  }


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

      <WatchlistSidebar

        selectedStock={
          selectedStock
        }

        setSelectedStock={
          setSelectedStock
        }
      />

      <div
        style={{
          flex: 1,
          padding: "20px"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          AI Trading Dashboard 🚀
        </h1>

        <button

          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            window.location.href =
              "/login";
          }}

          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >

          Logout

        </button>

        {loading && (

          <h2
            style={{
              textAlign: "center"
            }}
          >
            Loading...
          </h2>
        )}

        {!loading && stockData && (

          <div>

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

            </div>

          </div>
        )}

      </div>

    </div>
  );
}


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