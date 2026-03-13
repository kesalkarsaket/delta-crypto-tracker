import { IconButton, TableCell, TableRow } from "@mui/material";
import React, { useRef } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { formatTurnover } from "../Utils/Utils";

type CoinRowProps = {
  symbol: string;
  ticker: any;
  isFavorite: boolean;
  toggleFavorite: (symbol: string) => void;
  navigate: (path: string) => void;
};

export const CoinRow = React.memo(
  ({ symbol, ticker, isFavorite, toggleFavorite, navigate }: CoinRowProps) => {

    const lastTickerRef = useRef<any>(null);

    if (ticker) {
      lastTickerRef.current = ticker;
    }

    const lastTicker = lastTickerRef.current;

    const price = ticker?.close ?? lastTicker?.close ?? "0.00";
    const change = ticker?.ltp_change_24h ?? lastTicker?.ltp_change_24h ?? "0.00";
    const turnover = ticker?.turnover ?? lastTicker?.turnover;

    return (
      <TableRow
        hover
        onClick={() => navigate(`/${symbol}`)}
        sx={{ cursor: "pointer" }}
      >

        <TableCell
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(symbol);
          }}
        >
          <IconButton>
            {isFavorite ? (
              <StarIcon sx={{ color: "gold" }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        </TableCell>

        <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
          {symbol}
        </TableCell>

        <TableCell align="right" sx={{ fontWeight: 700 }}>
          ${price}
        </TableCell>

        <TableCell
          align="right"
          sx={{
            fontWeight: 700,
            color:
              Number(change) > 0
                ? "success.main"
                : Number(change) < 0
                ? "error.main"
                : "inherit"
          }}
        >
          {change !== "0.00" ? `${change}%` : "0.00"}
        </TableCell>

        <TableCell align="right">
          {turnover ? formatTurnover(turnover) : "0.00"}
        </TableCell>

      </TableRow>
    );
  }
);
