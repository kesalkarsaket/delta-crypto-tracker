# Crypto Price Tracker App (React+Typescript+Material UI design system)
Crypto Price Tracker App for displaying all crypto currencies, orderbook, recent trades, mini hostorical charts

## Setup
npm install
npm start

## Project Structure


src/
├── App.css                     # App level CSS, Material UI config
├── App.tsx                     # Routing defined here
├── main.tsx                    # Entry point of the app

├── api/
│   ├── candles.tsx             # Candle API + helpers
│   ├── runtimeconfig.tsx       # Runtime config
│   └── websocket.tsx           # WebSocket connection handler

├── components/
│   ├── historicalCharts/
│   │   ├── CandleStickChart.tsx            # CandleStick chart component
│   │   └── MiniPriceChart.tsx     
│   │
│   ├── orderbook/
│   │   ├── OrderBook.tsx            # Orderbook
│   │   ├── OrderBookUtils.ts
│   │   └── OrderRow.tsx
│   │
│   └── RecentTrades/
│       ├── RecentTrades.js            # Recent trades component
│       └── TradeRow.js
    ── Connectionstatus.tsx
    ── Header.tsx
    
├── hooks/
│   ├── useCandleStick.tsx    #hooks where subscription/unsubscription are handled
│   ├── useTrades.tsx
│   ├── useTicker.tsx
│   ├── useOrderBook.tsx
│   └── useWebsocket.tsx

├── screens/
│   ├── CoinRow.tsx       
│   ├── CoinsDetails.tsx
│   └── CoinsTable.tsx

├── storage/
│   └── favorites.tsx

└── Utils/
    └── Utils.tsx
    
## Features Added
-1. **Product List View** — Displayed the predefined list of symbols available from the server. For each symbol, subscribe to the ticker channel and show live data: symbol, last price, and 24h change. Include a way to search or filter products by name/symbol.
2. **Product Detail View** — When a user selects a product, showing a detailed view with:
    - **Ticker data** — Mark price, last traded price, 24h volume, 24h high/low, funding rate (from the ticker channel)
    - **Orderbook** — Subscribed to the orderbook channel and render a live orderbook visualization. Shown at least the top 10 bid/ask levels with price, quantity, and a visual depth bar (showing cumulative size). The orderbook should update in real time without layout jank or flicker.
    - **Recent Trades** — Subscribed to the trades channel and display the last 20–30 trades in a scrolling list with price, size, side (buy/sell), and timestamp. New trades should appear at the top with a brief highlight/animation.
3. **Favorites** — Allowed users to mark products as favorites and view them in a separate list. Favorites should persist across page refreshes (localStorage is fine).
4. **WebSocket Lifecycle** — The detail view will have multiple concurrent subscriptions (ticker, orderbook, trades). Manage all of them cleanly: subscribe on mount, unsubscribe on unmount, handle reconnection gracefully. No memory leaks on navigation between products.
5. **Mini price chart** using historical/candlestick data if available from the server added 
6. **Responsive design** / mobile-friendly layout added
7. API used for historical chart

Historical OHLC Candles/Sparklines
GET historical ohlc candles

Code samples

curl -X GET https://api.india.delta.exchange/v2/history/candles?resolution=5m&symbol=BTCUSD&start=1685618835&end=1722511635 \
  -H 'Accept: application/json'

GET /history/candles

It returns historical Open-High-Low-Close(ohlc) candles data of the symbol as per input values for resolution, start time and end time. Also, it can return only upto 2000 candles maximum in a response.

Parameters
Parameter	In	Type	Required	Description
resolution	query	string	true	ohlc candle time frames like 1m, 5m, 1h
symbol	query	string	true	To get funding history pass symbol as FUNDING:${symbol}, mark price MARK:${symbol} and OI data OI:${symbol} for e.g. - FUNDING:BTCUSD, MARK:C-BTC-66400-010824, OI:ETHUSD
start	query	integer	true	Start time: unix timestamp in seconds
end	query	integer	true	End time: unix timestamp in seconds
Enumerated Values
