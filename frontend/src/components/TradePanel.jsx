import React, {
  useState
} from "react";

export default function TradePanel({

  symbol,

  currentPrice

}) {

  const [balance, setBalance] =
    useState(10000);

  const [shares, setShares] =
    useState("");

  const [portfolio, setPortfolio] =
    useState([]);

  function buyStock() {

    const qty = Number(shares);

    const cost =
      qty * currentPrice;

    if (

      qty <= 0 ||

      cost > balance

    ) {

      alert(
        "Invalid trade"
      );

      return;
    }

    setBalance(
      balance - cost
    );

    setPortfolio([

      ...portfolio,

      {

        symbol,

        shares: qty,

        price: currentPrice
      }
    ]);

    setShares("");
  }

  return (

    <div
      style={{
        background: "#111827",

        padding: "20px",

        borderRadius: "20px",

        marginTop: "30px"
      }}
    >

      <h2>
        Paper Trading 💰
      </h2>

      <h3>
        Balance:
        {" "}
        ${balance.toFixed(2)}
      </h3>

      <input

        type="number"

        placeholder="Shares"

        value={shares}

        onChange={(e) =>
          setShares(
            e.target.value
          )
        }

        style={{
          padding: "10px",

          marginTop: "10px",

          width: "100%",

          borderRadius: "10px",

          border: "none"
        }}
      />

      <button

        onClick={buyStock}

        style={{
          marginTop: "15px",

          background: "#22c55e",

          color: "white",

          padding:
            "12px 20px",

          border: "none",

          borderRadius: "10px",

          cursor: "pointer",

          width: "100%"
        }}
      >

        Buy {symbol}

      </button>

      <div
        style={{
          marginTop: "20px"
        }}
      >

        {portfolio.map(

          (trade, index) => (

            <div
              key={index}

              style={{
                background: "#1e293b",

                padding: "10px",

                borderRadius: "10px",

                marginBottom: "10px"
              }}
            >

              {trade.symbol}
              {" — "}
              {trade.shares}
              {" shares @ $"}
              {trade.price.toFixed(2)}

            </div>
          )
        )}

      </div>

    </div>
  );
}