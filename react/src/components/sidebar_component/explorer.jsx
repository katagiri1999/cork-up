import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import userStore from "../../store/user_store";
import { useState } from 'react';

function Explorer() {
  const { id_token, tree } = userStore();
  const [currentDir, setCurrentDir] = useState(null);

  const handleItemClick = (_, itemId) => {
    if (itemId.endsWith('.md')) {
      var dirName = itemId.substring(0, itemId.lastIndexOf('/'));
      console.log('File clicked:', dirName);
    } else {
      var dirName = itemId;
      console.log('Directory clicked:', dirName);
    }
    setCurrentDir(dirName);
  };

  const onClickNewFolder = () => {
    console.log('New Folder clicked:', currentDir);
  };

  const onClickNewFile = () => {
    console.log('New File clicked:', currentDir);
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
            items={tree}
            onItemClick={handleItemClick}
            slots={{
              expandIcon: FolderIcon,
              collapseIcon: FolderOpenIcon,
              endIcon: ArticleOutlinedIcon,
            }}
          />
        </Box>

        <Box sx={{
          m: 3
        }}>
          <Button onClick={onClickNewFolder}>
            <CreateNewFolderIcon />
          </Button>
          <Button onClick={onClickNewFile}>
            <NoteAddOutlinedIcon />
          </Button>
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