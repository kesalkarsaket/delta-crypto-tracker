class WebSocketService {
  private ws: WebSocket | null = null;

  // 👇 global listeners
  private listeners: Set<(data: any) => void> = new Set();

  connect() {
    if (this.ws) return this.ws;

    this.ws = new WebSocket("ws://localhost:8080");

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data); // parse only once

      // dispatch to all listeners
      this.listeners.forEach((cb) => cb(data));
    };

    return this.ws;
  }

  send(message: any) {
    if (!this.ws) return;

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      this.ws.addEventListener(
        "open",
        () => {
          this.ws?.send(JSON.stringify(message));
        },
        { once: true }
      );
    }
  }

  subscribe(channel: string, symbols: string[]) {
    this.send({
      type: "subscribe",
      payload: {
        channels: [{ name: channel, symbols }]
      }
    });
  }

  unsubscribe(channel: string, symbols?: string[]) {
    this.send({
      type: "unsubscribe",
      payload: {
        channels: [{ name: channel, symbols }]
      }
    });
  }

  //hooks register here
  addListener(cb: (data: any) => void) {
    this.listeners.add(cb);
  }

  removeListener(cb: (data: any) => void) {
    this.listeners.delete(cb);
  }

  getSocket() {
    return this.ws;
  }
}

export const wsService = new WebSocketService();