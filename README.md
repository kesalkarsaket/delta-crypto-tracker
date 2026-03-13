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
