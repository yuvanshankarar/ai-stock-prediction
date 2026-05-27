import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function Portfolio() {

  const [portfolio, setPortfolio] =
    useState(null);

  const API =
    import.meta.env.VITE_API_URL;

  useEffect(() => {

    async function fetchPortfolio() {

      try {

        const res = await axios.get(
          `${API}/portfolio`
        );

        setPortfolio(res.data);

      } catch (err) {

        console.error(err);
      }
    }

    fetchPortfolio();

  }, []);

  if (!portfolio) {

    return <h2>Loading Portfolio...</h2>;
  }

  return (

    <div
      style={{
        marginTop: "40px"
      }}
    >

      <h1>
        Portfolio 💰
      </h1>

      <h2>
        Total Value:
        {" "}
        ${portfolio.total_value}
      </h2>

      <h2
        style={{
          color:
            portfolio.total_profit >= 0
              ? "#22c55e"
              : "#ef4444"
        }}
      >
        Total Profit:
        {" "}
        ${portfolio.total_profit}
      </h2>

      <div
        style={{
          display: "grid",
          gap: "20px"
        }}
      >

        {portfolio.portfolio.map(
          (stock, index) => (

            <div
              key={index}

              style={{
                background: "#1e293b",

                padding: "20px",

                borderRadius: "20px"
              }}
            >

              <h2>
                {stock.symbol}
              </h2>

              <p>
                Shares:
                {" "}
                {stock.shares}
              </p>

              <p>
                Buy Price:
                {" "}
                ${stock.buy_price}
              </p>

              <p>
                Current Price:
                {" "}
                ${stock.current_price}
              </p>

              <p>
                Current Value:
                {" "}
                ${stock.current_value}
              </p>

              <h3
                style={{
                  color:
                    stock.profit >= 0
                      ? "#22c55e"
                      : "#ef4444"
                }}
              >
                Profit:
                {" "}
                ${stock.profit}
              </h3>

            </div>
          )
        )}

      </div>

    </div>
  );
}