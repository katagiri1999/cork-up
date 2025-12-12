import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

function EditerHeader() {
  return (
    <>
      <Box sx={{ mb: 1 }}>
        <IconButton sx={{ ml: 1 }}>
          <SaveOutlinedIcon />
        </IconButton>
        <IconButton sx={{ ml: 1 }}>
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default EditerHeader;