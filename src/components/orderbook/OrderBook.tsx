import { Box } from "@mui/material";
import OrderRow from "./OrderRow";
import { cumulative } from "./OrderBookUtils";

type Level = [number, number];

interface Props {
  bids: Level[];
  asks: Level[];
}

export default function OrderBook({ bids, asks }: Props) {
  const bidLevels = cumulative(bids.slice(0, 10));
  const askLevels = cumulative(asks.slice(0, 10));
  console.log("bidLevel", bidLevels);
  console.log("askLevel", askLevels);

  const maxTotal = Math.max(
    ...bidLevels.map((e) => e.total),
    ...askLevels.map((e) => e.total)
  );

  const bestBid = bids?.[0]?.[0];
  const bestAsk = asks?.[0]?.[0];
  const spread = bestAsk - bestBid;

  return (
    <Box width={"90%"} fontFamily="monospace">
      {/* Header */}
      <Box display="flex" px={1} pb={0.5} color="#999" fontSize={12}>
        <Box width="33%">PRICE</Box>
        <Box width="33%" textAlign="right">SIZE</Box>
        <Box width="33%" textAlign="right">TOTAL</Box>
      </Box>

      {/* Asks */}
      {[...askLevels].reverse().map((row, i) => (
        <OrderRow key={`ask-${i}`} {...row} maxTotal={maxTotal} type="ask" />
      ))}

      {/* Spread */}
      <Box
        textAlign="center"
        py={1}
        fontSize={13}
        color="#999"
        borderTop="1px solid #eee"
        borderBottom="1px solid #eee"
      >
        Spread: ${spread?.toFixed(2)}
      </Box>

      {/* Bids */}
      {bidLevels.map((row, i) => (
        <OrderRow key={`bid-${i}`} {...row} maxTotal={maxTotal} type="bid" />
      ))}
    </Box>
  );
}