export const SYMBOLS = ["BTCUSD", "ETHUSD", "SOLUSD", "XRPUSD", "DOGEUSD", "PAXGUSD"];
export const formatTurnover = (value?: number | string) => {
  if (!value) return "0.00";

  const num = Number(value);

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + "B";
  }

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + "M";
  }

  return num.toString();
};
//mapping
export const cryptoCurrSymbols = {
  BTCUSD: "Bitcoin",
  ETHUSD: "Ethereum",
  SOLUSD: "Solana",
  XRPUSD: "Ripple",
  DOGEUSD: "Dogecoin",
  PAXGUSD: "Pax Gold",
};
