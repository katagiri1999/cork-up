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
      label: '/main',
      children: [
        { id: '/main-community.md', label: '/hogehoge1.md' },
        { id: '/main-pro.md', label: '/hogehoge2.md' },
        { id: '/main-premium.md', label: '/hogehoge3.md' },
      ],
    },
    {
      id: '/sub',
      label: '/sub',
      children: [
        { id: '/sub-community.md', label: '/hogehoge4.md' },
        { id: '/sub-pro.md', label: '/hogehoge5.md' },
        {
          id: '/sub-hogehoge', label: '/sub-hogehoge', children:
            [
              { id: '/sub-hogehoge.md', label: '/sub-hogehoge.md' }
            ]
        },
      ],
    },
  ];

  if (id_token) {
    return (
      <>
        <Typography variant="h5" sx={{ my: 2 }}>
          Explorer
        </Typography>

        <Box sx={{ m: 5 }}>
          <RichTreeView items={tree} />
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