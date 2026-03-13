// import { useEffect, useState } from "react";
// import { wsService } from "../api/websocket";

// export interface Trade {
//   price: string;
//   size: number;
//   buyer_role: string;
//   seller_role: string;
//   timestamp: number;
//   product_id: number;
//   symbol: string;
// }

// export function useTrades(symbols: string[]) {
//   const [trades, setTrades] = useState<Trade[]>([]);

//   useEffect(() => {
//     wsService.subscribe("all_trades", symbols);

//     const handleMessage = (data: any) => {
//       if (data.type !== "all_trades") return;
//       if (!symbols.includes(data.symbol)) return;

//       const trade: Trade = data;

//       setTrades((prev) => {
//         const updated = [trade, ...prev];
//         return updated.slice(0, 30);
//       });
//     };

//     wsService.addListener(handleMessage);

//     return () => {
//       wsService.removeListener(handleMessage);
//       wsService.unsubscribe("all_trades", symbols);
//     };
//   }, [symbols.join(",")]);

//   return trades;
// }

import { useEffect, useState, useRef } from "react";
import { wsService } from "../api/websocket";

export interface Trade {
  price: string;
  size: number;
  buyer_role: string;
  seller_role: string;
  timestamp: number;
  product_id: number;
  symbol: string;
}

export function useTrades(symbols: string[]) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const lastUpdate = useRef(0); // ⬅ throttle tracker

  useEffect(() => {
    wsService.subscribe("all_trades", symbols);

    const handleMessage = (data: any) => {
      if (data.type !== "all_trades") return;
      if (!symbols.includes(data.symbol)) return;

      // ✅ THROTTLE HERE
      if (Date.now() - lastUpdate.current < 200) return;
      lastUpdate.current = Date.now();

      const trade: Trade = data;

      setTrades((prev) => {
        const updated = [trade, ...prev];
        return updated.slice(0, 30);
      });
    };

    wsService.addListener(handleMessage);

    return () => {
      wsService.removeListener(handleMessage);
      wsService.unsubscribe("all_trades", symbols);
    };
  }, [symbols.join(",")]);

  return trades;
}