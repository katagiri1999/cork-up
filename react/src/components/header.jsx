import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";


function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Button
            component={Link}
            to="/Information"
            sx={{ width: "100%", mt: 3 }}
          >
            Information
          </Button>
        </ListItem>
        <ListItem disablePadding>
          <Button
            component={Link}
            to="https://github.com/katagiri1999/cork-up"
            sx={{ width: "100%", mt: 3 }}
          >
            Github
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar position="static" sx={{ mb: 7 }}>
        <Toolbar style={{ display: "flex" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            size='large'
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <Typography
            variant="h6"
          >
            Cork-Up
          </Typography>

          <IconButton
            color="inherit"
            sx={{
              position: "absolute",
              right: 10,
            }}>
            <AccountCircle sx={{ fontSize: 30 }} />
          </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;