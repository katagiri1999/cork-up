import { Container } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import Header from "../components/header.jsx";
import Loading from "../components/loading.jsx";
import MarkdownEditor from "../components/markdowneditor.jsx";
import userStore from "../store/user_store.jsx";
import utils from "../utils/utils.js";

function Main() {
  const { id_token, tree, setTree } = userStore();
  const [isLoading, setLoading] = useState(false);
  const [parentNodes, setParentNodes] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const url_id = params.get("id");

    if (tree && url_id) {
      const parents = utils.get_parent_ids(url_id) || [];

      const nodes = [
        ...parents.map((id) => utils.get_node(tree, id)).filter(Boolean),
        utils.get_node(tree, url_id)
      ].filter(Boolean);

      setParentNodes(nodes);
    }
  }, [tree, location]);

  // ツリー取得
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

      <Container sx={{ mt: 2 }}>

        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          {parentNodes.map((node, index) => (
            <Link
              key={node.id}
              underline="hover"
              color={index === parentNodes.length - 1 ? "text.primary" : "inherit"}
              href={`/main?id=${node.id}`}
              aria-current={index === parentNodes.length - 1 ? "page" : undefined}
            >
              {node.label || node.id}
            </Link>
          ))}
        </Breadcrumbs>

        <MarkdownEditor />

      </Container>
    </>
  );
};

export default Main;