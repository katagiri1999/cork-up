import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';


import Header from "../components/header.jsx";

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
      <title>Explorer</title>
      <Header />
      <Container maxWidth="xs">
        <Box
          sx={{ marginTop: 5 }}
        >
          <Typography variant="h4" align="center">
            Explorer
          </Typography>

          <Box sx={{ minHeight: 352, minWidth: 250 }}>
            <RichTreeView items={tree} />
          </Box>

        </Box>
      </Container>
    </>
  );
};

export default Explorer;