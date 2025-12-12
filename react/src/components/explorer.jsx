import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import userStore from "../store/user_store.jsx";
import utils from "../utils/utils.js";

import TreeUpdate from './tree_update.jsx';

function Explorer() {
  const navigate = useNavigate();
  const { id_token, tree, setTree } = userStore();

  const url_id = utils.get_url_id();

  const [currentNodeId, setCurrentNodeId] = useState(url_id || "");
  const [expandedItems, setExpandedItems] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    setCurrentNodeId(url_id || "");
  }, [url_id]);

  useEffect(() => {
    if (!hasInitialized && tree && url_id) {
      const parents = utils.get_parent_ids(url_id);
      if (parents) {
        var latest_expanded_items = [...new Set([...expandedItems, ...parents])];
        setExpandedItems(latest_expanded_items);
      }
      setHasInitialized(true);
    }
  }, [tree, url_id, hasInitialized]);

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
            selectedItems={[currentNodeId]}
            expandedItems={expandedItems}
            onExpandedItemsChange={(_, ids) => setExpandedItems(ids)}
            slots={{
              expandIcon: FolderIcon,
              collapseIcon: FolderOpenIcon,
              endIcon: ArticleOutlinedIcon,
            }}
          />
          <TreeUpdate currentNodeId={currentNodeId} />
        </Box>
      </>
    );
  }
};

export default Explorer;