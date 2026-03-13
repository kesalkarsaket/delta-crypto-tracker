import { Box, Typography } from "@mui/material";

interface Props {
  price: number;
  size: number;
  total: number;
  maxTotal: number;
  type: "bid" | "ask";
}

export default function OrderRow({
  price,
  size,
  total,
  maxTotal,
  type,
}: Props) {

  const percent = (total / maxTotal) * 100;

  const isAsk = type === "ask";

  const priceColor = isAsk ? "error.main" : "success.main";

  const bg = isAsk
    ? "rgba(239,83,80,0.18)"
    : "rgba(38,166,154,0.18)";

  return (
    <Box
      position="relative"
      display="flex"
      px={1}
      height={24}
      alignItems="center"
      fontFamily="monospace"
      fontSize={13}
      overflow="hidden"
    >
      {/* Depth Bar */}
      <Box
        position="absolute"
        top={0}
        bottom={0}
        width={`${percent}%`}
        bgcolor={bg}
        left={isAsk ? 0 : "auto"}
        right={!isAsk ? 0 : "auto"}
        sx={{
          transition: "width 120ms linear",
        }}
      />

      <Typography width="33%" color={priceColor}>
        {Number(price).toFixed(2)}
      </Typography>

      {/* Size */}
      <Typography width="33%" textAlign="right">
        {Number(size).toFixed(3)}
      </Typography>

      {/* Total */}
      <Typography width="33%" textAlign="right">
        {Number(total).toFixed(3)}
      </Typography>
    </Box>
  );
}
