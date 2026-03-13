import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import type { Trade } from "../../hooks/useTrades";

interface Props {
  trade: Trade;
}

const flash = keyframes`
  from { background-color: rgba(255,255,0,0.3); }
  to { background-color: transparent; }
`;

export default function TradeRow({ trade }: Props) {
  const isBuy = trade.buyer_role === "taker";

  const time = new Date(trade.timestamp).toLocaleTimeString();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 1,
        py: 0.7,
        animation: `${flash} 0.8s ease`,
      }}
    >
      <Typography
        sx={{
          color: isBuy ? "success.main" : "error.main",
          width: 80,
        }}
      >
        {trade.price}
      </Typography>

      <Typography sx={{ width: 60 }}>{trade.size}</Typography>

      <Typography
        sx={{
          width: 80,
          color: isBuy ? "success.main" : "error.main",
          fontWeight: 600
        }}
      >
        {isBuy ? "BUY" : "SELL"}
      </Typography>

      <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
        {time}
      </Typography>
    </Box>
  );
}