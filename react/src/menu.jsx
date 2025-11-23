import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";

function Menu() {
  return (
    <Container maxWidth="xs">
      <title>メニュー</title>
      <Box
        sx={{ marginTop: 5 }}
      >
        <Typography component="h1" variant="h4">
          メニュー
        </Typography>

      </Box>
    </Container>
  );
};

export default Menu;