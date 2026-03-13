import { useState } from "react";
import { useCandlestick } from "../../hooks/useCandleStick";
import CandlestickChart from "./CandlestickChart";
import type { CandlestickData } from "lightweight-charts";

import {
  Box,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";

interface Props {
  symbol: string;
}

const INTERVALS = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"];

export default function MiniPriceChart({ symbol }: Props) {
  const [interval, setInterval] = useState<string>("1m");

  const candles = useCandlestick(symbol, interval) as CandlestickData[];

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newInterval: string | null
  ) => {
    if (newInterval !== null) {
      setInterval(newInterval);
    }
  };

  return (
    <Box>

      {/* Timeframe Selector */}
      <ToggleButtonGroup
        value={interval}
        exclusive
        onChange={handleChange}
        size="small"
        sx={{
          mb: 2,
          backgroundColor: "#1e1e1e",
          borderRadius: "8px",

          "& .MuiToggleButton-root": {
            color: "#aaa",
            border: "none",
            px: 2,
            fontWeight: 600
          },

          "& .Mui-selected": {
            color: "#fff",
            backgroundColor: "#333"
          }
        }}
      >
        {INTERVALS.map((tf) => (
          <ToggleButton key={tf} value={tf}>
            {tf}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Chart */}
      <CandlestickChart data={candles} />

    </Box>
  );
}