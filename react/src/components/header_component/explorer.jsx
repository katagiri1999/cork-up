import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Box, Typography } from "@mui/material";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import userStore from "../../store/user_store.jsx";

import TreeUpdate from './tree_update.jsx';

function Explorer() {
  const navigate = useNavigate();
  const { id_token, tree, setTree } = userStore();
  const [currentNodeId, setCurrentNodeId] = useState("");

  useEffect(() => {
    setTree(tree);
  }, [tree]);

  const handleItemClick = (_, itemId) => {
    setCurrentNodeId(itemId);

    navigate(`/main?id=${itemId}`);
  };

  if (id_token && tree) {
    return (
      <>
        <Typography variant="h5" sx={{ my: 2 }}>
          Explorer
        </Typography>

        <Box>
          <RichTreeView
            items={[tree]}
            onItemClick={handleItemClick}
            slots={{
              expandIcon: FolderIcon,
              collapseIcon: FolderOpenIcon,
              endIcon: ArticleOutlinedIcon,
            }}
            defaultExpandedItems={['/Folder']}
          />
          <TreeUpdate currentNodeId={currentNodeId} />
        </Box>
      </>
    );
  }
};

export default Explorer;