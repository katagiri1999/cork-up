import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import userStore from '../store/user_store.jsx';
import utils from '../utils/utils.js';

function Breadcrumb() {
  const { tree } = userStore();
  const [parentNodes, setParentNodes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const url_node_id = utils.get_url_node_id();

    if (tree && url_node_id) {
      const parents = utils.get_parent_node_ids(url_node_id) || [];

      const nodes = [
        ...parents.map((id) => utils.get_node(tree, id)).filter(Boolean),
        utils.get_node(tree, url_node_id)
      ].filter(Boolean);

      setParentNodes(nodes);
    }
  }, [tree, location]);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {parentNodes.map((node, index) => (
        <Link
          key={node.id}
          underline="hover"
          color={index === parentNodes.length - 1 ? "text.primary" : "inherit"}
          href={`/main?node_id=${node.id}`}
          aria-current={index === parentNodes.length - 1 ? "page" : undefined}
        >
          {node.label || node.id}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default Breadcrumb;