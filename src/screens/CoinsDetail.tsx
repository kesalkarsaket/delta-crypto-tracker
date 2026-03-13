import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Divider,
  Button
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useTicker } from "../hooks/useTicker";
import { useNavigate, useParams } from "react-router-dom";
import OrderBook from "../components/orderbook/OrderBook";
import RecentTrades from "../components/RecentTrades/RecentTrades";
import { useOrderBook } from "../hooks/useOrderBook";
import MiniPriceChart from "../components/historicalChart/MiniPriceChart";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { formatTurnover } from "../Utils/Utils";
import { useRef } from "react";

type StatProps = {
  label: string;
  value: string;
};

export default function CoinsDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const prices = useTicker(symbol ? [symbol] : []);
  const navigate = useNavigate();
  console.log("prices", prices);

  if (!symbol) return null;

  const ticker = prices[symbol];

  const lastTickerRef = useRef<any>(null);

  if (ticker) lastTickerRef.current = ticker;

  const lastTicker = lastTickerRef.current;

  const t = ticker ?? lastTicker;

  const { bids, asks } = useOrderBook(symbol);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        background: "#14161a",
        minHeight: "100vh",

        /* fix header overlap */
        pt: { xs: 10, md: 12 },

        pb: { xs: 4, md: 8 },
        px: 2
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1500 }}>
        {/* HEADER */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            mb: 3,
            background: "#1e222d",
            borderRadius: 2
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
          >
            <Box display="flex" gap={2} alignItems="center">
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/")}
                sx={{
                  borderColor: "#444",
                  color: "white",
                  textTransform: "none"
                }}
              >
                Back
              </Button>

              <Box>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ fontSize: { xs: 20, md: 26 } }}
                >
                  {symbol}
                </Typography>
              </Box>
            </Box>

            <IconButton>
              <StarIcon sx={{ color: "#FFA000" }} />
            </IconButton>
          </Box>

          {/* PRICE */}
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
          >
            <Typography
              sx={{
                fontSize: { xs: 28, md: 40 },
                fontWeight: 700
              }}
            >
              ${t?.close ?? "0.00"}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 18, md: 22 },
                color:
                  Number(t?.ltp_change_24h) > 0
                    ? "success.main"
                    : Number(t?.ltp_change_24h) < 0
                      ? "error.main"
                      : "inherit",
                fontWeight: 600
              }}
            >
              {t?.ltp_change_24h
                ? `${Number(t.ltp_change_24h) > 0 ? "+" : ""}${Number(
                  t.ltp_change_24h
                ).toFixed(2)}%`
                : "0.00"}
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: "#2e3440" }} />

          {/* STATS */}
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(2,1fr)",
              sm: "repeat(3,1fr)",
              md: "repeat(5,1fr)"
            }}
            gap={3}
          >
            <Stat
              label="MARK PRICE"
              value={t?.mark_price ? Number(t.mark_price).toFixed(2) : "0.00"}
            />

            <Stat
              label="24H HIGH"
              value={t?.high ? Number(t.high).toFixed(2) : "0.00"}
            />

            <Stat
              label="24H LOW"
              value={t?.low ? Number(t.low).toFixed(2) : "0.00"}
            />

            <Stat
              label="24H VOLUME"
              value={formatTurnover(t?.turnover)}
            />

            <Stat
              label="FUNDING RATE"
              value={t?.funding_rate ? `${Number(t.funding_rate).toFixed(2)}%` : "0.00"}
            />
          </Box>
        </Paper>

        {/* ORDERBOOK + TRADES */}
        <Grid container spacing={3} sx={{ mb: 3 }}>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              sx={{
                p: 2,
                background: "#1e222d",
                borderRadius: 2,
                height: { xs: 400, md: 700 },
                overflow: "hidden"
              }}
            >
              <Typography variant="h6" mb={2} fontWeight={600}>
                Order Book
              </Typography>

              <OrderBook asks={asks} bids={bids} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              sx={{
                p: 2,
                background: "#1e222d",
                borderRadius: 2,
                height: { xs: 400, md: 700 },
                overflow: "hidden"
              }}
            >
              <Typography variant="h6" mb={2} fontWeight={600}>
                Recent Trades
              </Typography>

              <RecentTrades symbols={[symbol]} />
            </Paper>
          </Grid>

        </Grid>

        {/* CHART */}
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            px: { xs: 2, md: 10 },
            background: "#1e222d",
            borderRadius: 2
          }}
        >
          <Typography variant="h6" mb={2} fontWeight={600}>
            Mini Price Chart
          </Typography>

          <MiniPriceChart symbol={symbol} />
        </Paper>

      </Box>
    </Box>
  );
}

function Stat({ label, value }: StatProps) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          color: "#9e9e9e",
          fontWeight: 600,
          letterSpacing: 1
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: 16, md: 20 }
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
