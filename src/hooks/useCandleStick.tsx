// import { useEffect, useRef, useState } from "react";
// import { wsService } from "../api/websocket";
// import type { UTCTimestamp } from "lightweight-charts";

// export interface Candle {
//   time: UTCTimestamp;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
// }

// export function useCandlestick(symbol: string, resolution: string) {
//   const [candles, setCandles] = useState<Candle[]>([]);
//   const lastUpdate = useRef(0); // throttle tracker

//   useEffect(() => {
//     const channel = `candlestick_${resolution}`;

//     setCandles([]);

//     wsService.subscribe(channel, [symbol]);

//     const handleMessage = (data: any) => {
//       if (data.type !== channel) return;
//       if (data.symbol !== symbol) return;

//       // ✅ throttle updates (~20 renders/sec)
//       if (Date.now() - lastUpdate.current < 100) return;
//       lastUpdate.current = Date.now();

//       const candle: Candle = {
//         time: Math.floor(data.candle_start_time / 1_000_000) as UTCTimestamp,
//         open: Number(data.open),
//         high: Number(data.high),
//         low: Number(data.low),
//         close: Number(data.close),
//       };

//       setCandles((prev) => {
//         const last = prev[prev.length - 1];

//         if (last && last.time === candle.time) {
//           const updated = [...prev];
//           updated[updated.length - 1] = candle;
//           return updated;
//         }

//         return [...prev, candle].slice(-100);
//       });
//     };

//     wsService.addListener(handleMessage);

//     return () => {
//       wsService.removeListener(handleMessage);
//       wsService.unsubscribe(channel, [symbol]);
//     };
//   }, [symbol, resolution]);

//   return candles;
// }

import { useEffect, useRef, useState } from "react";
import { wsService } from "../api/websocket";
import { fetchCandles } from "../api/candles";
import type { UTCTimestamp } from "lightweight-charts";

export interface Candle {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}

export function useCandlestick(symbol: string, resolution: string) {
  const [candles, setCandles] = useState<Candle[]>([]);
  const lastUpdate = useRef(0);

  useEffect(() => {
    const channel = `candlestick_${resolution}`;

    // async function loadHistory() {
    //   const history = await fetchCandles(symbol, resolution);

    //   const formatted: Candle[] = history.map((c: any) => ({
    //     time: c.time as UTCTimestamp,
    //     open: Number(c.open),
    //     high: Number(c.high),
    //     low: Number(c.low),
    //     close: Number(c.close),
    //   }));

    //   setCandles(formatted);
    // }
async function loadHistory() {
  const history = await fetchCandles(symbol, resolution);

  const formatted: Candle[] = history
    .map((c: any) => ({
      time: Number(c.time) as UTCTimestamp,
      open: Number(c.open),
      high: Number(c.high),
      low: Number(c.low),
      close: Number(c.close),
    }))
    .sort((a: Candle, b: Candle) => a.time - b.time); // ✅ typed

  setCandles(formatted);
    console.log("History candle time:", history[history.length - 1].time);

}

    loadHistory();

    wsService.subscribe(channel, [symbol]);

    const handleMessage = (data: any) => {
      if (data.type !== channel) return;
      if (data.symbol !== symbol) return;

      if (Date.now() - lastUpdate.current < 100) return;
      lastUpdate.current = Date.now();
      console.log("WS candle time:", data.candle_start_time);

        // ✅ resolution to seconds
  const resolutionSeconds: Record<string, number> = {
    "1m": 60,
    "5m": 300,
    "15m": 900,
    "30m": 1800,
    "1h": 3600,
    "4h": 14400,
    "1d": 86400,
    "1w": 604800,
  };

  // WS time (microseconds → seconds)
  const rawTime = Math.floor(data.candle_start_time / 1_000_000);

  // ✅ align candle to interval bucket
  const candleTime =
    Math.floor(rawTime / resolutionSeconds[resolution]) *
    resolutionSeconds[resolution];

      const candle: Candle = {
        time: candleTime as UTCTimestamp,
        open: Number(data.open),
        high: Number(data.high),
        low: Number(data.low),
        close: Number(data.close),
      };

      setCandles((prev) => {
        const last = prev[prev.length - 1];

        if (last && last.time === candle.time) {
          const updated = [...prev];
          updated[updated.length - 1] = candle;
          return updated;
        }

        return [...prev, candle].slice(-200);
      });
    };

    wsService.addListener(handleMessage);
    

    return () => {
      wsService.removeListener(handleMessage);
      wsService.unsubscribe(channel, [symbol]);
    };
  }, [symbol, resolution]);

  return candles;
}