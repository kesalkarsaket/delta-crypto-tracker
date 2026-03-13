import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  type CandlestickData
} from "lightweight-charts";
import { Box } from "@mui/material";

interface Props {
  data: CandlestickData[];
}

export default function CandlestickChart({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<any>(null);
  

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: 800,
      autoSize:true,
      height: 500,
      layout: {
        background: { color: "#121212" },
        textColor: "#DDD"
      },
      grid: {
        vertLines: { color: "#1e1e1e" },
        horzLines: { color: "#1e1e1e" }
      },
        timeScale: {
    timeVisible: true,
    secondsVisible: false,
    rightBarStaysOnScroll: true,
    borderColor: "#2B2B43",
  },
    });

    // ✅ v5 API
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350"
    });

    seriesRef.current = candleSeries;
      // ✅ keep chart focused on latest candle
    chart.timeScale().scrollToRealTime();

    return () => chart.remove();
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData(data);
  }, [data]);

  return <Box ref={chartRef} sx={{ width: "100%" }} />;
}
