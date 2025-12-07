import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
  Box,
  Typography,
} from "@mui/material";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useState, useEffect } from 'react';

import userStore from "../../store/user_store";

import TreeUpdate from './tree_update';

function Explorer() {
  const { id_token, tree, setTree } = userStore();
  const [currentDirId, setCurrentDirId] = useState("");

  useEffect(() => {
    setTree(tree);
  }, [tree]);

  const handleItemClick = (_, itemId) => {
    setCurrentDirId(itemId);
  };

  if (id_token && tree) {
    return (
      <>
        <Typography variant="h5" sx={{ my: 2 }}>
          Explorer
        </Typography>

        <Box
          sx={{
            m: 5,
            textAlign: 'left',
          }}>
          <RichTreeView
            items={[tree]}
            onItemClick={handleItemClick}
            slots={{
              expandIcon: FolderIcon,
              collapseIcon: FolderOpenIcon,
              endIcon: ArticleOutlinedIcon,
            }}
          />
          <TreeUpdate currentDirId={currentDirId} />
        </Box>
      </>
    );
  }
};

export default Explorer;