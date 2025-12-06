import {
  Box,
  Container,
} from "@mui/material";
import { useEffect } from 'react';

import Header from "../components/header.jsx";
import Loading from "../components/loading.jsx";
import screenStore from "../store/screen_store.jsx";
import userStore from "../store/user_store.jsx";
import * as utils from "../utils.js";

function Main() {
  const { id_token, setTree } = userStore();
  const { isLoading, setLoading } = screenStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      var res = await utils.requests(
        `${utils.API_HOST}/${utils.API_VER}/trees`,
        "GET",
        { Authorization: `Bearer ${id_token}` },
        {}
      );
      setTree(res.tree);
      setLoading(false);
    };

    if (id_token) {
      fetchData();
    };
  }, []);

  return (
    <>
      <title>Main</title>
      <Header />
      <Loading loading={isLoading} />

      <Container maxWidth="xs">
        <Box
          sx={{ marginTop: 5 }}
        >

        </Box>
      </Container>
    </>
  );
};

export default Main;