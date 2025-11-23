import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import Store from '../store/store.jsx';
import Header from "../components/header.jsx";

function Menu() {
  const { id_token } = Store();

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