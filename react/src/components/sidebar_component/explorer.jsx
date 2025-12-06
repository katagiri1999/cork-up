import {
  Box,
  Typography,
} from "@mui/material";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

function Explorer() {
  const tree = [
    {
      id: 'main',
      label: 'main',
      children: [
        { id: 'main-community', label: 'hogehoge1' },
        { id: 'main-pro', label: 'hogehoge2' },
        { id: 'main-premium', label: 'hogehoge3' },
      ],
    },
    {
      id: 'sub',
      label: 'sub',
      children: [
        { id: 'sub-community', label: 'hogehoge4' },
        { id: 'sub-pro', label: 'hogehoge5' },
        {
          id: 'sub-premium', label: 'hogehoge6', children:
            [
              { id: 'sub-premium-pro', label: 'hogehoge7' }
            ]
        },
      ],
    },
  ];

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
};

export default Explorer;