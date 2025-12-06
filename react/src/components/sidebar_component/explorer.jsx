import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
  Box,
  Typography,
} from "@mui/material";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

import userStore from "../../store/user_store";

function Explorer() {
  const { id_token } = userStore();

  const tree = [
    {
      id: '/main',
      label: 'main',
      children: [
        { id: '/main/main-community.md', label: 'hogehoge1.md' },
        { id: '/main/main-pro.md', label: 'hogehoge2.md' },
        { id: '/main/main-premium.md', label: 'hogehoge3.md' },
      ],
    },
    {
      id: '/work',
      label: 'work',
      children: [
        { id: '/work/community.md', label: 'community.md' },
        { id: '/work/pro.md', label: 'pro.md' },
        {
          id: '/work/sub', label: 'sub', children:
            [
              { id: '/work/sub/hogehoge.md', label: 'hogehoge.md' }
            ]
        },
      ],
    },
  ];

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