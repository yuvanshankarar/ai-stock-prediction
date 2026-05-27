import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function WatchlistSidebar({

  selectedStock,
  setSelectedStock

}) {

  const [watchlist, setWatchlist] =
    useState([]);

  const [newStock, setNewStock] =
    useState("");

  const API =
    import.meta.env.VITE_API_URL;

  // LOAD WATCHLIST
  async function fetchWatchlist() {

    try {

      const res = await axios.get(
        `${API}/watchlist`
      );

      setWatchlist(
        res.data.watchlist
      );

    } catch (err) {

      console.error(err);
    }
  }

  // ADD STOCK
  async function addStock() {

    if (!newStock) return;

    try {

      await axios.post(
        `${API}/watchlist/add?symbol=${newStock}`
      );

      setNewStock("");

      fetchWatchlist();

    } catch (err) {

      console.error(err);
    }
  }

  // REMOVE STOCK
  async function removeStock(symbol) {

    try {

      await axios.delete(
        `${API}/watchlist/remove/${symbol}`
      );

      fetchWatchlist();

    } catch (err) {

      console.error(err);
    }
  }

  useEffect(() => {

    fetchWatchlist();

  }, []);

  return (

    <div
      style={{
        width: "250px",

        background: "#111827",

        padding: "20px",

        borderRadius: "20px",

        height: "100vh",

        overflowY: "auto"
      }}
    >

      <h2>
        Watchlist ⭐
      </h2>

      {/* ADD STOCK */}

      <div
        style={{
          display: "flex",

          gap: "10px",

          marginBottom: "20px"
        }}
      >

        <input

          value={newStock}

          onChange={(e) =>
            setNewStock(
              e.target.value
            )
          }

          placeholder="AAPL"

          style={{
            flex: 1,

            padding: "10px",

            borderRadius: "10px",

            border: "none"
          }}
        />

        <button

          onClick={addStock}

          style={{
            background: "#22c55e",

            border: "none",

            color: "white",

            padding: "10px",

            borderRadius: "10px",

            cursor: "pointer"
          }}
        >
          Add
        </button>

      </div>

      {/* WATCHLIST */}

      <div
        style={{
          display: "grid",

          gap: "10px"
        }}
      >

        {watchlist.map((stock) => (

          <div

            key={stock}

            style={{
              background:
                selectedStock === stock
                  ? "#22c55e"
                  : "#1e293b",

              padding: "15px",

              borderRadius: "15px",

              display: "flex",

              justifyContent:
                "space-between",

              alignItems: "center",

              cursor: "pointer"
            }}

            onClick={() =>
              setSelectedStock(stock)
            }
          >

            <span>
              {stock}
            </span>

            <button

              onClick={(e) => {

                e.stopPropagation();

                removeStock(stock);
              }}

              style={{
                background: "#ef4444",

                border: "none",

                color: "white",

                borderRadius: "8px",

                padding: "5px",

                cursor: "pointer"
              }}
            >
              X
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}