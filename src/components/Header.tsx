import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ color: "gold", position: "fixed", backgroundColor: "#222222", fontWeight: "bold", cursor: "pointer" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crypto price Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}