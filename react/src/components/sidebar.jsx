import LaunchIcon from '@mui/icons-material/Launch';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Sidebar() {
  const [drawewrOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        size='large'
        sx={{ mr: 2 }}
      >
        <Tooltip title="Menu">
          <MenuIcon sx={{ fontSize: 30 }} />
        </Tooltip>
      </IconButton>

      <Drawer
        open={drawewrOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
        }}
      >

        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            Menu
          </Typography>

          <Divider />

          <List>
            <ListItem disablePadding>
              <Button
                component={Link}
                to="/information"
                target="_blank"
                sx={{ width: "100%", mt: 3 }}
              >
                Information
                <LaunchIcon sx={{ ml: 1, fontSize: 15 }} />
              </Button>
            </ListItem>
            <ListItem disablePadding>
              <Button
                component={Link}
                to="https://github.com/katagiri1999/cork-up"
                target="_blank"
                sx={{ width: "100%", mt: 3 }}
              >
                Github
                <LaunchIcon sx={{ ml: 1, fontSize: 15 }} />
              </Button>
            </ListItem>
          </List>

        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;