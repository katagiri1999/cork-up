import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import userStore from '../store/user_store.jsx';
import Header from "../components/header.jsx";

function Menu() {
  const { id_token } = userStore();

  return (
    <>
      <title>メニュー</title>
      <Header />
      <Container maxWidth="xs">
        <Box
          sx={{ marginTop: 5 }}
        >
          <Typography component="h1" variant="h4">
            メニュー
          </Typography>

        </Box>
      </Container>
    </>
  );
};

export default Menu;