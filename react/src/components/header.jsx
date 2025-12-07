import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Profile from './header_component/profile.jsx';
import Sidebar from './header_component/sidebar.jsx';

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