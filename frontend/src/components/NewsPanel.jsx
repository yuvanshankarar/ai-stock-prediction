import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function NewsPanel({
  symbol
}) {

  const [news, setNews] =
    useState([]);

  const API =
    import.meta.env.VITE_API_URL;

  useEffect(() => {

    async function fetchNews() {

      try {

        const res = await axios.get(
          `${API}/news/${symbol}`
        );

        setNews(
          res.data.news
        );

      } catch (err) {

        console.error(
          "News Error:",
          err
        );
      }
    }

    fetchNews();

  }, [symbol]);

  return (

    <div
      style={{
        marginTop: "40px"
      }}
    >

      <h1>
        AI News Sentiment 📰
      </h1>

      <div
        style={{
          display: "grid",

          gap: "20px"
        }}
      >

        {news.map(
          (item, index) => (

            <div
              key={index}

              style={{
                background: "#1e293b",

                padding: "20px",

                borderRadius: "20px"
              }}
            >

              <h3>
                {item.title}
              </h3>

              <h2
                style={{
                  color:
                    item.sentiment ===
                    "POSITIVE"
                      ? "#22c55e"
                      : "#ef4444"
                }}
              >
                {item.sentiment}
              </h2>

              <p>
                Confidence:
                {" "}
                {item.score}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}