import { useEffect, useState } from "react";
import { wsService } from "../api/websocket";

export function useWebSocket() {
  const [status, setStatus] = useState("CONNECTING");

  useEffect(() => {
    const ws = wsService.connect();

    // check existing state first
    if (ws.readyState === WebSocket.OPEN) {
      setStatus("CONNECTED");
    } else if (ws.readyState === WebSocket.CONNECTING) {
      setStatus("CONNECTING");
    }

    const handleOpen = () => setStatus("CONNECTED");
    const handleError = () => setStatus("ERROR");
    const handleClose = () => {
      setStatus("DISCONNECTED");

      setTimeout(() => {
        wsService.connect();
      }, 3000);
    };

    ws.addEventListener("open", handleOpen);
    ws.addEventListener("error", handleError);
    ws.addEventListener("close", handleClose);

    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("error", handleError);
      ws.removeEventListener("close", handleClose);
    };
  }, []);

  return status;
}

