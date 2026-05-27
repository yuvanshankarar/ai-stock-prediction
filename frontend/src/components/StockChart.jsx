import React, {
  useEffect,
  useRef
} from "react";

import {
  createChart
} from "lightweight-charts";

export default function StockChart({
  data,
  liveCandle
}) {

  const chartContainerRef =
    useRef(null);

  const candleSeriesRef =
    useRef(null);

  const chartRef =
    useRef(null);

  // INITIAL CHART
  useEffect(() => {

    if (!chartContainerRef.current)
      return;

    const chart = createChart(
      chartContainerRef.current,
      {
        width:
          chartContainerRef.current
            .clientWidth,

        height: 500,

        layout: {

          background: {
            color: "#111827"
          },

          textColor: "#FFFFFF"
        },

        grid: {

          vertLines: {
            color: "#1f2937"
          },

          horzLines: {
            color: "#1f2937"
          }
        }
      }
    );

    chartRef.current = chart;

    const candleSeries =
      chart.addCandlestickSeries();

    candleSeriesRef.current =
      candleSeries;

    if (data && data.length > 0) {

      const formattedData =
        data.map((item) => ({

          time:
            item.date.split(" ")[0],

          open: item.open,

          high: item.high,

          low: item.low,

          close: item.close
        }));

      candleSeries.setData(
        formattedData
      );
    }

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };

  }, [data]);

  // LIVE CANDLE UPDATE
  useEffect(() => {

    if (
      !liveCandle ||
      !candleSeriesRef.current
    ) return;

    candleSeriesRef.current.update({

      time:
        liveCandle.time.split(" ")[0],

      open: liveCandle.open,

      high: liveCandle.high,

      low: liveCandle.low,

      close: liveCandle.close
    });

  }, [liveCandle]);

  return (

    <div
      ref={chartContainerRef}
      style={{
        width: "100%",
        height: "500px"
      }}
    />
  );
}