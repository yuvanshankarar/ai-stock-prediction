import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function TradePanel({

  symbol,
  currentPrice

}) {

  const API =
    import.meta.env.VITE_API_URL;

  const [shares, setShares] =
    useState(1);

  const [tradeData, setTradeData] =
    useState(null);

  // FETCH TRADES
  async function fetchTrades() {

    try {

      const res = await axios.get(
        `${API}/trades`
      );

      setTradeData(res.data);

    } catch (err) {

      console.error(err);
    }
  }

  // PLACE TRADE
  async function placeTrade(action) {

    try {

      await axios.post(

        `${API}/trade`,

        null,

        {
          params: {

            symbol,

            action,

            shares,

            price: currentPrice
          }
        }
      );

      fetchTrades();

    } catch (err) {

      console.error(err);
    }
  }

  useEffect(() => {

    fetchTrades();

  }, []);

  return (

    <div
      style={{
        marginTop: "30px",

        background: "#111827",

        padding: "20px",

        borderRadius: "20px"
      }}
    >

      <h1>
        Paper Trading 💹
      </h1>

      {/* BALANCE */}

      {tradeData && (

        <div
          style={{
            marginBottom: "20px"
          }}
        >

          <h2>
            Balance:
            {" "}
            $
            {tradeData.current_balance}
          </h2>

        </div>
      )}

      {/* TRADE CONTROLS */}

      <div
        style={{
          display: "flex",

          gap: "10px",

          alignItems: "center",

          marginBottom: "20px"
        }}
      >

        <input

          type="number"

          value={shares}

          onChange={(e) =>
            setShares(
              Number(e.target.value)
            )
          }

          min="1"

          style={{
            padding: "10px",

            borderRadius: "10px",

            border: "none",

            width: "120px"
          }}
        />

        <button

          onClick={() =>
            placeTrade("BUY")
          }

          style={{
            background: "#22c55e",

            color: "white",

            border: "none",

            padding: "10px 20px",

            borderRadius: "10px",

            cursor: "pointer"
          }}
        >
          BUY
        </button>

        <button

          onClick={() =>
            placeTrade("SELL")
          }

          style={{
            background: "#ef4444",

            color: "white",

            border: "none",

            padding: "10px 20px",

            borderRadius: "10px",

            cursor: "pointer"
          }}
        >
          SELL
        </button>

      </div>

      {/* TRADE HISTORY */}

      {tradeData && (

        <div>

          <h2>
            Trade History
          </h2>

          <table
            style={{
              width: "100%",

              borderCollapse:
                "collapse"
            }}
          >

            <thead>

              <tr>

                <th>Symbol</th>

                <th>Action</th>

                <th>Shares</th>

                <th>Price</th>

                <th>Value</th>

              </tr>

            </thead>

            <tbody>

              {tradeData.trades.map(
                (trade, index) => (

                  <tr
                    key={index}
                  >

                    <td>
                      {trade.symbol}
                    </td>

                    <td
                      style={{
                        color:
                          trade.action ===
                          "BUY"

                            ? "#22c55e"

                            : "#ef4444"
                      }}
                    >
                      {trade.action}
                    </td>

                    <td>
                      {trade.shares}
                    </td>

                    <td>
                      ${trade.price}
                    </td>

                    <td>
                      ${trade.value}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}