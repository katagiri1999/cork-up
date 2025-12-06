import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Profile from './profile.jsx';
import Sidebar from './sidebar.jsx';

function Header() {

  return (
    <Box>
      <AppBar position="static" sx={{ mb: 7 }}>
        <Toolbar style={{ display: "flex" }}>

          <Sidebar />

          <Typography
            variant="h6"
          >
            Cork-Up
          </Typography>

          <Profile />

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;