import {
  Box,
  Container,
  Typography,
} from "@mui/material";

import Header from "../components/header.jsx";

function Information() {
  return (
    <>
      <title>Information</title>
      <Header />
      <Container maxWidth="xs">
        <Box
          sx={{ marginTop: 5 }}
        >
          <Typography variant="h4" align="center">
            Information
          </Typography>
        </Box>

      </Container>
    </>
  );
};

export default Information;