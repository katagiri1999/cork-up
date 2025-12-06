import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import Header from "../components/header.jsx";

function Main() {

  return (
    <>
      <title>Main</title>
      <Header />
      <Container maxWidth="xs">
        <Box
          sx={{ marginTop: 5 }}
        >
          <Typography variant="h4" align="center">
            Main
          </Typography>

        </Box>
      </Container>
    </>
  );
};

export default Main;