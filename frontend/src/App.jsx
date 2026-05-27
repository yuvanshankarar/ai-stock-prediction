import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import StockChart from "./components/StockChart";
import Portfolio from "./components/Portfolio";
import NewsPanel from "./components/NewsPanel";
import WatchlistSidebar from "./components/WatchlistSidebar";
import TradePanel from "./components/TradePanel";

export default function App() {

  // SELECTED STOCK
  const [selectedStock, setSelectedStock] =
    useState("AAPL");

  // STOCK DATA
  const [stockData, setStockData] =
    useState(null);

  // LIVE PRICE
  const [livePrice, setLivePrice] =
    useState(null);

  // LIVE CANDLE
  const [liveCandle, setLiveCandle] =
    useState(null);

  // LOADING
  const [loading, setLoading] =
    useState(false);

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

  // LOAD STOCK
  useEffect(() => {

    fetchStock(selectedStock);

  }, [selectedStock]);

  // WEBSOCKET
  useEffect(() => {

    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/${selectedStock}`
    );

    ws.onopen = () => {

      console.log(
        "WebSocket Connected"
      );
    };

    ws.onmessage = (event) => {

      const data =
        JSON.parse(event.data);

      console.log("LIVE:", data);

      if (!data.error) {

        setLivePrice(data.close);

        setLiveCandle(data);
      }
    };

    ws.onerror = (error) => {

      console.error(
        "WebSocket Error:",
        error
      );
    };

    ws.onclose = () => {

      console.log(
        "WebSocket Closed"
      );
    };

    return () => {

      ws.close();
    };

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

      {/* MAIN CONTENT */}

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

            {/* INFO CARDS */}

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
                title="Live Price"

                value={
                  livePrice !== null
                    ? `$${livePrice.toFixed(2)}`
                    : "Loading..."
                }

                color="#22c55e"
              />

              <Card
                title="Predicted Price"

                value={
                  stockData.predicted_price
                    ? `$${stockData.predicted_price.toFixed(2)}`
                    : "N/A"
                }
              />

              <Card
                title="RSI"

                value={
                  stockData.rsi.toFixed(2)
                }
              />

              <Card
                title="Signal"

                value={
                  stockData.signal
                }

                color={
                  stockData.signal === "BUY"
                    ? "#22c55e"
                    : stockData.signal === "SELL"
                    ? "#ef4444"
                    : "#facc15"
                }
              />

            </div>

            {/* AI RECOMMENDATION */}

            {stockData.recommendation && (

              <div
                style={{
                  background: "#111827",

                  padding: "20px",

                  borderRadius: "20px",

                  marginBottom: "30px"
                }}
              >

                <h1>
                  AI Recommendation 🧠
                </h1>

                <h2
                  style={{
                    color:

                      stockData.recommendation
                        .recommendation
                        .includes("BUY")

                        ? "#22c55e"

                        : stockData.recommendation
                            .recommendation
                            .includes("SELL")

                        ? "#ef4444"

                        : "#facc15"
                  }}
                >

                  {
                    stockData.recommendation
                      .recommendation
                  }

                </h2>

                <h3>
                  Confidence:
                  {" "}
                  {
                    stockData.recommendation
                      .confidence
                  }
                  %
                </h3>

                <div
                  style={{
                    marginTop: "20px"
                  }}
                >

                  {stockData.recommendation
                    .reasons
                    .map((reason, index) => (

                      <p key={index}>
                        • {reason}
                      </p>
                    ))}

                </div>

              </div>
            )}
             
             {/* RISK ANALYSIS */}

{stockData.risk_analysis && (

  <div
    style={{
      background: "#111827",

      padding: "20px",

      borderRadius: "20px",

      marginBottom: "30px"
    }}
  >

    <h1>
      Risk Analysis 📊
    </h1>

    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",

        gap: "20px",

        marginTop: "20px"
      }}
    >

      <Card
        title="Risk Level"

        value={
          stockData.risk_analysis.risk
        }

        color={
          stockData.risk_analysis
            .risk === "LOW"

            ? "#22c55e"

            : stockData.risk_analysis
                .risk === "MEDIUM"

            ? "#facc15"

            : "#ef4444"
        }
      />

      <Card
        title="Volatility"

        value={
          `${stockData.risk_analysis.volatility}%`
        }
      />

      <Card
        title="Sharpe Ratio"

        value={
          stockData.risk_analysis.sharpe_ratio
        }
      />

      <Card
        title="Daily Return"

        value={
          `${stockData.risk_analysis.daily_return}%`
        }
      />

    </div>

  </div>
)}

            {/* CHART */}

            <div
              style={{
                background: "#111827",

                padding: "20px",

                borderRadius: "20px",

                marginBottom: "30px"
              }}
            >

              <h2
                style={{
                  marginBottom: "20px"
                }}
              >
                {stockData.symbol}
                {" "}
                Live Candlestick Chart
              </h2>

              <StockChart

                data={
                  stockData.chart_data
                }

                liveCandle={
                  liveCandle
                }
              />

            </div>

            {/* PAPER TRADING */}

             <TradePanel

               symbol={selectedStock}

               currentPrice={
                livePrice ||
                 stockData.latest_close
             } 
             />

            {/* PORTFOLIO */}

            <Portfolio />

            {/* NEWS */}

            <NewsPanel
              symbol={selectedStock}
            />

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