import { Container } from "@mui/material";
import { useEffect, useState } from 'react';

import Header from "../components/header.jsx";
import Loading from "../components/loading.jsx";
import MarkdownEditor from "../components/markdowneditor.jsx";
import userStore from "../store/user_store.jsx";
import utils from "../utils/utils.js";

function Main() {
  const { id_token, setTree } = userStore();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      var res = utils.requests(
        `${import.meta.env.VITE_API_HOST}/${import.meta.env.VITE_API_VER}/trees`,
        "GET",
        { Authorization: `Bearer ${id_token}` },
        {}
      );
      res = await res;

      setTree(res.body.tree);
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

      <Container>

        <MarkdownEditor></MarkdownEditor>

      </Container>
    </>
  );
};

export default Main;