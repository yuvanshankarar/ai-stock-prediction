
import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function App() {

  // API URL
  const API_URL =
    import.meta.env.VITE_API_URL;

  // STATES
 

  const [selectedStock, setSelectedStock] =
    useState("AAPL");

  const [stockData, setStockData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [quantity, setQuantity] =
    useState(1);

  const [portfolio, setPortfolio] =
    useState([]);

  const [transactions, setTransactions] =
    useState([]);

  const [balance, setBalance] = useState(0);

  // FETCH STOCK
  const fetchStock = async (symbol) => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${API_URL}/stock/${symbol}`
      );

      setStockData(
        response.data
      );

    } catch (error) {

      console.error(
        "Stock fetch error:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // FETCH PORTFOLIO
  const fetchPortfolio = async () => {

    try {

      const username =
        localStorage.getItem(
          "username"
        );

      const response =
        await axios.get(
          `${API_URL}/portfolio/${username}`
        );

      setPortfolio(

        Array.isArray(
          response.data
        )
          ? response.data
          : []
      );

    } catch (error) {

      console.error(error);

      setPortfolio([]);
    }
  };

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {

    try {

      const username =
        localStorage.getItem(
          "username"
        );

      const response =
        await axios.get(
          `${API_URL}/transactions/${username}`
        );

      setTransactions(

        Array.isArray(
          response.data
        )
          ? response.data
          : []
      );

    } catch (error) {

      console.error(error);

      setTransactions([]);
    }
  };
  //FETCH BALANCE
  const fetchBalance = async () => {

  try {

    const username =
      localStorage.getItem("username");

    const response = await axios.get(
      `${API_URL}/balance/${username}`
    );

    setBalance(
      response.data.cash
    );

  } catch (error) {

    console.error(
      "Balance fetch error:",
      error
    );
  }
};

  // BUY STOCK
  const buyStock = async () => {

    try {

      const username =
        localStorage.getItem(
          "username"
        );

      const response =
        await axios.post(
          `${API_URL}/buy`,
          {

            username,

            symbol:
              selectedStock,

            quantity,

            price:
              stockData.price
          }
        );

      alert(
        response.data.message
      );

      fetchPortfolio();

      fetchTransactions();

      fetchBalance();

    } catch (error) {

      console.error(error);

      alert("Buy failed");
    }
  };

  // SELL STOCK
  const sellStock = async () => {

    try {

      const username =
        localStorage.getItem(
          "username"
        );

      const response =
        await axios.post(
          `${API_URL}/sell`,
          {

            username,

            symbol:
              selectedStock,

            quantity,

            price:
              stockData.price
          }
        );

      alert(
        response.data.message
      );

      fetchPortfolio();

      fetchTransactions();
      
      fetchBalance();

    } catch (error) {

      console.error(error);

      alert("Sell failed");
    }
  };

  // LOAD DATA
  useEffect(() => {

    fetchStock(
      selectedStock
    );

    fetchPortfolio();

    fetchTransactions();

    fetchBalance();

  }, [selectedStock]);

  return (

    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        padding: "20px",
        color: "white"
      }}
    >

      <h1>
        AI Trading Dashboard 🚀
      </h1>

      <div
  style={{
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px"
  }}
>
  <h2>
    Cash Balance: $
    {balance?.toFixed(2)}
  </h2>
</div>

      {/* STOCK BUTTONS */}

      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <button
          onClick={() =>
            setSelectedStock("AAPL")
          }
        >
          AAPL
        </button>

        <button
          onClick={() =>
            setSelectedStock("TSLA")
          }
          style={{
            marginLeft: "10px"
          }}
        >
          TSLA
        </button>

        <button
          onClick={() =>
            setSelectedStock("MSFT")
          }
          style={{
            marginLeft: "10px"
          }}
        >
          MSFT
        </button>

      </div>

      {/* LOADING */}

      {loading && (
        <h2>
          Loading...
        </h2>
      )}

      {/* STOCK DATA */}

      {!loading && stockData && (

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
            Price:
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
                marginRight: "10px"
              }}
            />

            <button
              onClick={buyStock}
            >
              Buy
            </button>

            <button
              onClick={sellStock}
              style={{
                marginLeft: "10px"
              }}
            >
              Sell
            </button>

          </div>

          {/* HOLDINGS */}

          <div
            style={{
              marginTop: "40px"
            }}
          >

            <h2>
              Holdings
            </h2>

            {portfolio?.map(
              (item, index) => (

                <div key={index}>

                  <p>
                    {item.symbol}
                    {" "}
                    —
                    {" "}
                    Qty:
                    {" "}
                    {item.quantity}
                  </p>

                </div>
              )
            )}

          </div>

          {/* TRANSACTIONS */}

          <div
            style={{
              marginTop: "40px"
            }}
          >

            <h2>
              Transactions
            </h2>

            {transactions?.map(
              (item, index) => (

                <div key={index}>

                  <p>
                    {item.type}
                    {" "}
                    —
                    {" "}
                    {item.symbol}
                    {" "}
                    —
                    {" "}
                    Qty:
                    {" "}
                    {item.quantity}
                  </p>

                </div>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
}

