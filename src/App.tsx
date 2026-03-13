import './App.css'
import CoinsTable from "./screens/CoinsTable";
import { useWebSocket } from "./hooks/useWebSocket";
import ConnectionStatus from "./components/ConnectionStatus";
import { useEffect } from 'react';
import { wsService } from './api/websocket';
import WebsocketCheck from './components/WebsocketCheck';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoinsDetail from './screens/CoinsDetail';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import Header from './components/Header';
function App() {
    const darkTheme = createTheme({
      palette: {
        mode: "dark",
        primary: { main: "#fff" }
      }
    });
  const status = useWebSocket();
  useEffect(() => {
    wsService.connect();
  }, []);
  return (
      <BrowserRouter>
        <Box sx={{
          backgroundColor: "#14161a",
          color:"white",
          minHeight:"100vh",
          width:"100%"
        }}>
          <Header />
        <ThemeProvider theme ={darkTheme} >
        <Routes>
          <Route path='/' element={<CoinsTable/>} />
          <Route path='/:symbol' element={<CoinsDetail/>}/>
        </Routes>
        </ThemeProvider>
          </Box>
      </BrowserRouter>
  )
}

export default App
