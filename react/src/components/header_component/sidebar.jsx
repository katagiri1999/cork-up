import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import Explorer from './explorer';
import Links from './links';

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
          <ArrowForwardIosSharpIcon
            sx={{ fontSize: 30 }}
          />
        </Tooltip>
      </IconButton>

      <Drawer
        open={drawewrOpen}
        onClose={(_, reason) => {
          if (reason === 'backdropClick') {
            setDrawerOpen(false);
          }
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
        }}
      >

        <Box sx={{ textAlign: 'center' }}>

          <Explorer />

          <Divider />

          <Links />

        </Box>
      </Drawer >
    </>
  );
}

export default Sidebar;