import { useEffect, useState } from "react";
import CoinsTable from "../screens/CoinsTable";
import { Box, Typography } from "@mui/material";
import MiniPriceChart from "./historicalChart/MiniPriceChart";


function WebsocketCheck() {
const [prices, setPrices] = useState<Record<string, string>>({});
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket");

    ws.send(
        JSON.stringify({
          type: "subscribe",
          payload: {
            channels: [
              {
                name: "v2/ticker",
                symbols: ["BTCUSD"]
              }
            ]
          }
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("incoming", data);

      // ignore subscription ack
      if (!data.symbol) return;

      setPrices((prev) => ({
        ...prev,
        [data.symbol]: data.last_price
      }));
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    return () => ws.close();
  }, []);

  console.log("prices", prices);

  return (
    <div>
      {/* <CoinsTable/> */}
      <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        BTCUSD
      </Typography>

      {/* <MiniPriceChart symbol={"BTCUSD"} /> */}
    </Box>
{Object.keys(prices).map((symbol) => (
  <div key={symbol}>
    {symbol} : ${prices[symbol]}
  </div>
))}
    </div>
  );
}

export default WebsocketCheck;