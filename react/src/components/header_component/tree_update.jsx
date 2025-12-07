import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import {
  Alert,
  Box,
  Button,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

import userStore from '../../store/user_store.jsx';
import * as utils from '../../utils.js';
import Loading from '../loading.jsx';

function TreeUpdate(props) {
  const { id_token, tree, setTree } = userStore();
  const [isLoading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [isInvalidId, setIsInvalidId] = useState(false);
  const [parentDirId, setParentDirId] = useState("");
  const [newContentName, setNewContentName] = useState("");

  useEffect(() => {
    setParentDirId(props.currentDirId);
  }, [props.currentDirId]);

  const onClickNewContentModal = () => {
    setNewContentName("");
    setModalOpen(true);
  };

  const modalClose = () => {
    setNewContentName("");
    setIsInvalidId(false);
    setModalOpen(false);
  };

  const clickCreateNewContent = async () => {
    var isValid = utils.is_valid_new_node(tree, parentDirId, newContentName);
    if (!isValid) {
      setIsInvalidId(true);
      return;
    }

    const insert_node = { parent_id: parentDirId, label: newContentName };
    const new_tree = utils.update_tree(tree, insert_node);

    console.log('Updated tree:', new_tree);

    setLoading(true);
    setModalOpen(false);

    const res = await utils.requests(
      `${utils.API_HOST}/${utils.API_VER}/trees`,
      "PUT",
      { authorization: `Bearer ${id_token}` },
      { tree: new_tree }
    );
    setTree(res.body.tree);
    setLoading(false);
  };

  return (
    <>
      <Loading loading={isLoading} />

      <Box sx={{
        m: 3
      }}>

        <Button onClick={() => onClickNewContentModal()} disabled={props.currentDirId === ""}>
          <NoteAddOutlinedIcon />
        </Button>

        <Button disabled={props.currentDirId === "" || props.currentDirId === '/Folder'} sx={{ color: "red" }}>
          <DeleteOutlineOutlinedIcon />
        </Button>

      </Box>

      <Dialog onClose={modalClose} open={modalOpen}>
        <DialogTitle>
          Create New Content
        </DialogTitle>

        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 3, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Parent Folder Name"
            variant="outlined"
            disabled
            value={`${parentDirId}/`}
          />
          <TextField
            id="outlined-basic"
            label="New Content Name"
            variant="outlined"
            value={newContentName}
            onChange={(e) => setNewContentName(e.target.value)}
          />
        </Box>

        {isInvalidId &&
          <Alert severity="error" sx={{ mx: 3 }}>
            A content name must not be empty and must not have the same name already exists in this folder.
          </Alert>
        }

        <DialogActions>
          <Button autoFocus onClick={clickCreateNewContent}>OK</Button>
        </DialogActions>

      </Dialog>
    </>
  );
};

export default TreeUpdate;