# Crypto Price Tracker App (React+Typescript+Material UI design system)
Crypto Price Tracker App for displaying all crypto currencies, orderbook, recent trades, mini hostorical charts

## Setup
1. npm install
2. npm start

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
    
**Brief Description of the Approach**

The application is designed as a real-time cryptocurrency market dashboard that consumes high-frequency data streams from WebSocket APIs and historical REST endpoints. The architecture follows a modular and hook-based design to keep data logic separate from UI components.

A single shared WebSocket connection is established and reused across the application to avoid multiple network connections. Custom React hooks such as useTicker, useOrderBook, useTrades, and useCandlestick manage the lifecycle of individual subscriptions. These hooks handle subscribing on component mount, unsubscribing on unmount, and reconnecting gracefully if the WebSocket connection drops.

The UI is structured into reusable components such as the order book, recent trades list, and candlestick charts. The product list page subscribes only to ticker updates, while the product detail page dynamically subscribes to additional streams including order book data, trades, and candlestick updates.

To efficiently handle high-frequency data updates, the application applies performance optimizations such as throttling, batching, memoization, and requestAnimationFrame-based rendering to minimize unnecessary React re-renders and ensure smooth UI updates.

Historical candlestick data is fetched through the REST API and rendered using a lightweight charting library, while real-time data updates are layered on top through WebSocket streams. Favorites are persisted using localStorage so that user preferences remain available across page refreshes.

Overall, the approach focuses on efficient real-time data handling, clean separation of concerns, and scalable UI architecture for streaming market data applications.

**What I Would Improve If I Had More Time**

If given more time, several improvements could further enhance the application:

1. Virtualization for Large Data Lists
Components such as recent trades and order book updates could benefit from list virtualization (e.g., using react-window) to improve performance when rendering large datasets. -

2. Advanced WebSocket Resilience
The WebSocket layer could be enhanced with exponential backoff reconnection strategies, heartbeat/ping mechanisms, and automatic resubscription handling to make the data layer more robust. - (due to time constrainst)

3. State Management Optimization
For larger-scale applications, introducing a centralized state management solution such as Zustand or Redux Toolkit could simplify managing shared real-time data across multiple components.

4. Resolution and Syncing could be fixed between data from historical API and websocket stream (due to time constrainst)
5.  Improved Ui when there is no data
Adding proper UI Fallback when there is no data or show last traded value (close value in case of ltp) -  (due to time constrainst)

6. Unit and Integration Testing
Additional test coverage using Jest and React Testing Library would ensure critical components such as hooks, WebSocket handlers, and UI components behave correctly under real-time updates. - (due to time constrainst)

7. Enhanced UI/UX Features
Additional user-friendly features could be added, such as price alerts, customizable watchlists, advanced chart indicators, and improved mobile interactions. - (due to time constrainst)


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

GET v2/history/candles
