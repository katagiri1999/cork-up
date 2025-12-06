import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
  Box,
  Typography,
} from "@mui/material";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import screen_store from "../../store/screen_store";
import userStore from "../../store/user_store";
import { useEffect } from 'react';
import * as utils from "../../utils.js";
import Loading from '../loading.jsx';

function Explorer() {
  const { id_token, tree, setTree } = userStore();
  const { isLoading, setLoading } = screen_store();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      var res = await utils.requests(
        `${utils.API_HOST}/${utils.API_VER}/trees`,
        "GET",
        { Authorization: `Bearer ${id_token}` },
        {}
      );
      setTree(res.tree);
      setLoading(false);
    };

    if (id_token && !tree) {
      fetchData();
    };
  }, []);

  const handleItemClick = (_, itemId) => {
    if (itemId.endsWith('.md')) {
      console.log('click file:', itemId);
    } else {
      console.log('click folder:', itemId);
    }
  };

  if (id_token) {
    return (
      <>
        <Loading loading={isLoading} />

        <Typography variant="h5" sx={{ my: 2 }}>
          Explorer
        </Typography>

        <Box
          sx={{
            m: 5,
            textAlign: 'left',
          }}>
          <RichTreeView
            items={tree}
            onItemClick={handleItemClick}
            slots={{
              expandIcon: FolderIcon,
              collapseIcon: FolderOpenIcon,
              endIcon: ArticleOutlinedIcon,
            }}
          />
        </Box>
      </>
    );

  } else {
    return (
      <></>
    );
  }
};

export default Explorer;