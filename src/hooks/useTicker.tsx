// import { useEffect, useState } from "react";
// import { wsService } from "../api/websocket";

// export function useTicker(symbols: string[]) {
//   const [prices, setPrices] = useState<Record<string, any>>({});
//   useEffect(() => {
//     wsService.subscribe("v2/ticker", symbols);

//     const handleMessage = (data: any) => {
//       if (!data.symbol) return;

//       setPrices((prev) => ({
//         ...prev,
//         [data.symbol]: data,
//       }));
//     };

//     wsService.addListener(handleMessage);

//     return () => {
//       wsService.removeListener(handleMessage);
//       wsService.unsubscribe("v2/ticker", symbols);
//     };
//   }, [symbols.join(",")]);

//   return prices;
// }

import { useEffect, useRef, useState } from "react";
import { wsService } from "../api/websocket";

export function useTicker(symbols: string[]) {
  const [prices, setPrices] = useState<Record<string, any>>({});

  const bufferRef = useRef<Record<string, any>>({});
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    wsService.subscribe("v2/ticker", symbols);

    const handleMessage = (data: any) => {
      if (!data.symbol) return;

      // store updates in buffer
      bufferRef.current[data.symbol] = data;

      // schedule UI update
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(() => {
          setPrices((prev) => ({
            ...prev,
            ...bufferRef.current
          }));

          bufferRef.current = {};
          frameRef.current = null;
        });
      }
    };

    wsService.addListener(handleMessage);

    return () => {
      wsService.removeListener(handleMessage);
      wsService.unsubscribe("v2/ticker", symbols);

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [symbols.join(",")]);

  return prices;
}

