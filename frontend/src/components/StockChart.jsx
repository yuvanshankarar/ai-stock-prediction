import React from "react";

import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid

} from "recharts";

export default function StockChart({
  data
}) {

  if (!data || data.length === 0) {

    return (

      <div
        style={{
          color: "white"
        }}
      >
        No chart data available
      </div>
    );
  }

  return (

    <div
      style={{
        width: "100%",

        height: "400px"
      }}
    >

      <ResponsiveContainer>

        <LineChart
          data={data}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="date"

            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"

            domain={["auto", "auto"]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",

              border:
                "1px solid #334155",

              borderRadius: "10px",

              color: "white"
            }}
          />

          <Line

            type="monotone"

            dataKey="close"

            stroke="#22c55e"

            strokeWidth={3}

            dot={false}

            activeDot={{
              r: 6
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}