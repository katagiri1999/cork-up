import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
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

import screenStore from '../store/screen_store.jsx';

function Header() {
  const { isOpenProfile, setOpenProfile } = screenStore();

  const handleClickOpen = () => {
    setOpenProfile(true);
  };

  const handleClose = () => {
    setOpenProfile(false);
  };

  const logOutClick = () => {
    console.log("click logout");
  };

  const [drawewrOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
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
            onClick={handleClickOpen}
            sx={{
              position: "absolute",
              right: 10,
            }}>
            <AccountCircle sx={{ fontSize: 30 }} />
          </IconButton>

          <Dialog
            open={isOpenProfile}
            onClose={handleClose}
          >
            <DialogTitle>
              ログアウトしますか？
            </DialogTitle>
            <DialogActions>
              <Button onClick={logOutClick}>はい</Button>
            </DialogActions>
          </Dialog>

        </Toolbar>
      </AppBar>
      <Drawer
        open={drawewrOpen}
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

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;