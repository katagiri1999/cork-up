import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { Alert, Container, Button, DialogContent } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

import userStore from '../../store/user_store.jsx';
import utils from "../../utils/utils.js";
import Loading from '../loading.jsx';

function TreeUpdate(props) {
  const { id_token, tree, setTree } = userStore();
  const [isLoading, setLoading] = useState(false);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [isInvalidId, setIsInvalidId] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState("");
  const [newContentName, setNewContentName] = useState("");

  useEffect(() => {
    setCurrentNodeId(props.currentNodeId);
  }, [props.currentNodeId]);

  const onClickPostModal = () => {
    setNewContentName("");
    setPostModalOpen(true);
  };

  const onClickDelModal = () => {
    setDelModalOpen(true);
  };

  const closeModal = () => {
    setNewContentName("");
    setIsInvalidId(false);
    setPostModalOpen(false);
    setDelModalOpen(false);
  };

  const clickCreateNewContent = async () => {
    var isValid = utils.is_valid_new_node(tree, currentNodeId, newContentName);
    if (!isValid) {
      setIsInvalidId(true);
      return;
    }

    const insert_node = { parent_id: currentNodeId, label: newContentName };
    const new_tree = utils.update_tree(tree, insert_node);

    setLoading(true);
    closeModal();

    var res = utils.requests(
      `${import.meta.env.VITE_API_HOST}/${import.meta.env.VITE_API_VER}/trees`,
      "PUT",
      { authorization: `Bearer ${id_token}` },
      { tree: new_tree }
    );
    res = await res;

    setTree(res.body.tree);
    setLoading(false);
  };

  const clickDeleteContent = async () => {
    setLoading(true);
    closeModal();

    var new_tree = utils.delete_tree_node(tree, currentNodeId);

    var res = utils.requests(
      `${import.meta.env.VITE_API_HOST}/${import.meta.env.VITE_API_VER}/trees`,
      "PUT",
      { authorization: `Bearer ${id_token}` },
      { tree: new_tree }
    );
    res = await res;

    setTree(res.body.tree);
    setLoading(false);
  };

  return (
    <>
      <Loading loading={isLoading} />

      <Container sx={{
        m: 3,
        display: "flex"
      }}>

        <Button onClick={onClickPostModal} disabled={props.currentNodeId === ""}>
          <NoteAddOutlinedIcon />
        </Button>

        <Button onClick={onClickDelModal} disabled={props.currentNodeId === "" || props.currentNodeId === '/Folder'} sx={{ color: "red" }}>
          <DeleteOutlineOutlinedIcon />
        </Button>

      </Container>

      <Dialog onClose={closeModal} open={postModalOpen}>
        <DialogTitle>
          新しいコンテンツを作成
        </DialogTitle>

        <Container
          component="form"
          sx={{ '& > :not(style)': { m: 2, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="フォルダ名"
            variant="outlined"
            disabled
            value={`${currentNodeId}/`}
          />
          <TextField
            id="outlined-basic"
            label="新しいコンテンツ名"
            variant="outlined"
            value={newContentName}
            onChange={(e) => setNewContentName(e.target.value)}
          />
        </Container>

        {isInvalidId &&
          <Alert severity="error" sx={{ mx: 3 }}>
            空欄または既存のコンテンツ名と重複しています。
          </Alert>
        }

        <DialogActions>
          <Button autoFocus onClick={clickCreateNewContent}>OK</Button>
        </DialogActions>

      </Dialog>

      <Dialog onClose={closeModal} open={delModalOpen}>
        <DialogTitle>
          コンテンツを削除
        </DialogTitle>

        <DialogContent>
          そのコンテンツとすべての子コンテンツが削除されます。
          削除しますか？
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={clickDeleteContent} sx={{ color: "red" }}>OK</Button>
        </DialogActions>

      </Dialog>
    </>
  );
};

export default TreeUpdate;