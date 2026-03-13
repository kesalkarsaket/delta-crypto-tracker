import { useEffect, useRef, useState } from "react";
import { wsService } from "../api/websocket";

type Level = [number, number];

export function useOrderBook(symbol: string) {
  const bidsRef = useRef<Level[]>([]);
  const asksRef = useRef<Level[]>([]);
  const lastUpdate = useRef(0); // throttle tracker

  const [book, setBook] = useState({
    bids: [] as Level[],
    asks: [] as Level[],
  });

  useEffect(() => {
    wsService.subscribe("l2_orderbook", [symbol]);

    const handleMessage = (data: any) => {
      if (data.type !== "l2_orderbook") return;
      if (data.symbol !== symbol) return;

      bidsRef.current = data.bids;
      asksRef.current = data.asks;

      // THROTTLE (max ~20 renders/sec)
      if (Date.now() - lastUpdate.current < 200) return;
      lastUpdate.current = Date.now();

      setBook({
        bids: bidsRef.current.slice(0, 10),
        asks: asksRef.current.slice(0, 10),
      });
    };

    wsService.addListener(handleMessage);

    return () => {
      wsService.removeListener(handleMessage);
      wsService.unsubscribe("l2_orderbook", [symbol]);
    };
  }, [symbol]);

  return book;
}