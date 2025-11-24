import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";

import Loading from '../components/loading.jsx';
import screenStore from '../store/screen_store.jsx';
import userStore from '../store/user_store.jsx';
import * as utils from "../utils.js";

function Profile() {
  const navigate = useNavigate();

  const { email, id_token, setIdToken } = userStore();
  const { isLoading, setLoading, isOpenProfile, setOpenProfile } = screenStore();

  const handleClickOpen = () => {
    setOpenProfile(true);
  };

  const handleClose = () => {
    setOpenProfile(false);
  };

  const logOutClick = async () => {
    setOpenProfile(false);

    setLoading(true);
    await utils.requests(
      `${utils.API_HOST}/${utils.API_VER}/logout`,
      "POST",
      { "Authorization": `Bearer ${id_token}` },
      {}
    );
    setLoading(false);

    setIdToken("");
    navigate("/");
  };

  if (id_token) {
    return (
      <>
        <Loading loading={isLoading} />

        <IconButton
          color="inherit"
          onClick={handleClickOpen}
          sx={{
            position: "absolute",
            right: 10,
          }}>

          <Tooltip title={email}>
            <AccountCircle sx={{ fontSize: 30 }} />
          </Tooltip>

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
  } else {
    return (
      <></>
    );
  };
}

export default Profile;