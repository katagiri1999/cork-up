import { Avatar, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import userStore from '../../store/user_store.jsx';
import * as utils from "../../utils.js";
import Loading from '../loading.jsx';

function Profile() {
  const navigate = useNavigate();

  const { email, id_token } = userStore();
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [isLoading, setLoading] = useState(false);

  var initialName = email.charAt(0).toUpperCase();

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

    userStore.getState().reset();
    navigate("/");
  };

  if (id_token && email) {
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

          <Tooltip title={`${email} でログイン中`}>
            <Avatar>{initialName}</Avatar>
          </Tooltip>

        </IconButton>

        <Dialog
          open={isOpenProfile}
          onClose={handleClose}
        >

          <DialogTitle>
            <b>{email}</b> からログアウトしますか？
          </DialogTitle>

          <DialogActions>
            <Button onClick={logOutClick}>はい</Button>
          </DialogActions>

        </Dialog>
      </>
    );
  };
}

export default Profile;