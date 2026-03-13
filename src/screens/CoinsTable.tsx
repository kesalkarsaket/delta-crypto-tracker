import { useCallback, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTicker } from "../hooks/useTicker";
import { useNavigate } from "react-router-dom";
import { SYMBOLS } from "../Utils/Utils";

import {
  Box,
  Typography,
  TextField,
  Tabs,
  Tab
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CoinRow } from "./CoinRow";
import ConnectionStatus from "../components/ConnectionStatus";
import { useWebSocket } from "../hooks/useWebSocket";
import { getFavorites, saveFavorites } from "../storage/favourites";

export default function CoinsTable() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#fff" }
    }
  });

  const prices = useTicker(SYMBOLS);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());

  const toggleFavorite = useCallback((symbol: string) => {
    const updated = favorites.includes(symbol)
      ? favorites.filter((f) => f !== symbol)
      : [...favorites, symbol];

    setFavorites(updated);
    saveFavorites(updated);
  }, [favorites]);

  const handleTabChange = (_: any, newValue: number) => {
    setTab(newValue);
  };

  const coins =
    tab === 0 ? SYMBOLS : SYMBOLS.filter((s) => favorites.includes(s));

  const filtered = coins.filter((symbol) =>
    symbol.toLowerCase().includes(search.toLowerCase())
  );
  const status = useWebSocket();


  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: { xs: 4, md: 8 },
          pt: 2,
          pb: 8
        }}
      >

        <Box
          sx={{
            width: "100%",
            maxWidth: 1000,
            px: { xs: 2, sm: 3 }
          }}
        >
          <br />
          <ConnectionStatus status={status} />
          <br />

          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            mb={2}
          >
            <Typography variant="h4" fontWeight={700}>
              Cryptocurrency Market
            </Typography>

            {/* <UpdateFrequencyControl /> */}
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>
            Markets
          </Typography>

          <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="All" />
            <Tab label="⭐ Favorites" />
          </Tabs>

          <TextField
            fullWidth
            label="Search Cryptocurrency"
            variant="outlined"
            placeholder="Search by name or symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#1e222d"
              }
            }}
          />

          {/* Table */}
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              overflowX: "auto"
            }}
          >
            <Table sx={{ minWidth: 700 }}>

              <TableHead
                sx={{
                  backgroundColor: "gold",
                  "& .MuiTableCell-root": {
                    color: "black",
                    fontWeight: 700,
                    whiteSpace: "nowrap"
                  }
                }}
              >
                <TableRow>
                  <TableCell width={60}></TableCell>
                  <TableCell>SYMBOL</TableCell>
                  <TableCell align="right">LAST PRICE</TableCell>
                  <TableCell align="right">24H CHANGE</TableCell>
                  <TableCell align="right">VOLUME</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.length > 0 ? (
                  filtered.map((symbol) => {
                    const ticker = prices[symbol];

                    return (
                      <CoinRow
                        key={symbol}
                        symbol={symbol}
                        ticker={ticker}
                        isFavorite={favorites.includes(symbol)}
                        toggleFavorite={toggleFavorite}
                        navigate={navigate}
                      />
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </TableContainer>

        </Box>
      </Box>
    </ThemeProvider>
  );
}
