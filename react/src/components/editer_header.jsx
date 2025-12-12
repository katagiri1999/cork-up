import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

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
  )
}

export default EditerHeader;