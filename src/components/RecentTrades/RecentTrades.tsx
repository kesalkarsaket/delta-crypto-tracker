import {
  Paper,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import TradeRow from "./TradeRow";
import { useTrades } from "../../hooks/useTrades";

interface Props {
  symbols: string[];
}

export default function RecentTrades({ symbols }: Props) {
  const trades = useTrades(symbols);

  return (
    <Paper
      sx={{
        width:"98%",
        height: 680,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 1,
          py: 0.5,
          fontWeight: "bold",
          fontSize: 13,
        }}
      >
        <span>Price</span>
        <span>Size</span>
        <span>Side</span>
        <span>Time</span>
      </Box>

      <Divider />

      {/* Scrollable trades */}
      <Box
        sx={{
          overflowY: "auto",
          flex: 1,
        }}
      >
        {trades.map((trade) => (
          <TradeRow key={`${trade.timestamp}-${trade.price}-${trade.size}`} trade={trade} />
        ))}
      </Box>
    </Paper>
  );
}