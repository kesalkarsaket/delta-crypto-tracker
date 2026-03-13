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


**perfomance improvements**
Performance Optimizations

-This application processes high-frequency real-time market data streams including ticker updates, trades, order book updates, and candlestick data via WebSockets. To ensure smooth UI rendering and efficient resource usage, several performance optimizations were implemented. 
- A single shared WebSocket connection is used across the application to avoid multiple connections and reduce network overhead, while different components subscribe to the required streams through reusable hooks. 
- To prevent excessive UI re-renders caused by rapid incoming updates, throttling and batching techniques are applied so that multiple incoming messages are processed together before updating the React state. Rendering updates are synchronized with the browser’s rendering cycle using requestAnimationFrame, which ensures smoother visual updates and avoids layout thrashing during high-frequency data streams. 
- Additionally, memoization techniques such as React.memo, useMemo, and useCallback are used to prevent unnecessary component re-renders, particularly for frequently updating components like price tickers and tables. 
- For efficient data handling, incremental updates are applied instead of replacing entire datasets—for example, updating only changed ticker prices or appending new trades rather than reloading the entire trade list. 
- Historical candlestick data is preprocessed and sorted by timestamp before rendering to ensure correct chart behavior and avoid repeated sorting during re-renders. Heavy UI components such as charts, order books, and trade lists are loaded only when needed to improve initial page load performance. 
- Finally, user preferences like favorite coins are stored in localStorage so that the UI can be restored instantly on refresh without additional processing. These optimizations collectively ensure the application can handle high-frequency financial data streams efficiently while maintaining smooth UI performance and minimal resource consumption.
