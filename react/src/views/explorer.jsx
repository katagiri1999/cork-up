import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import Header from "../components/header.jsx";

function Menu() {

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

        </Box>
      </Container>
    </>
  );
};

export default Menu;