import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

import screenStore from '../store/screen_store.jsx';

function Profile() {
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

  return (
    <>
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
    </>
  );
}

export default Profile;