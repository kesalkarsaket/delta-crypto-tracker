export async function fetchCandles(symbol: string, resolution: string) {
  const end = Math.floor(Date.now() / 1000);
  const start = end - 60 * 60 * 24; // last 24h

  const res = await fetch(
    `https://api.india.delta.exchange/v2/history/candles?resolution=${resolution}&symbol=${symbol}&start=${start}&end=${end}`
  );

  const json = await res.json();

  return json.result;
}