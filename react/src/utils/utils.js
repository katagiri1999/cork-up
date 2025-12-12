export default {
    requests,
    get_url_id,
    get_node,
    get_parent_ids,
    update_tree,
    delete_tree_node,
    is_valid_new_node,
};

async function requests(url, method, headers = {}, params = {}) {
    if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    console.group("API Request");
    console.log(`[${method}]: ${url}`);
    console.log({ url: url, method: method, headers: headers, params: params });

    var detail = null;
    if (method == "GET" || method == "DELETE") {
        detail = {
            method: method,
            headers: headers,
        };
        url = `${url}?${new URLSearchParams(params)}`;

    } else {
        detail = {
            method: method,
            headers: headers,
            body: JSON.stringify(params),
        };
    }

    var res = await fetch(url, detail);
    res = {
        status: res.status,
        headers: res.headers,
        body: await res.json(),
    };

    console.log(res);
    console.groupEnd();
    return res;
};

function get_url_id() {
    const params = new URLSearchParams(location.search);
    const url_id = params.get("id");
    return url_id;
}

function get_node(tree, target_id) {
    if (!tree) return null;
    if (tree.id === target_id) return tree;

    for (const child of tree.children ?? []) {
        const result = get_node(child, target_id);
        if (result) return result;
    }

    return null;
};

function get_parent_ids(target_id) {
    if (!target_id) return [];

    const parts = target_id.split("/").filter(Boolean); // 空文字を除外
    if (parts.length <= 1) return [];

    const parentIds = [];
    for (let i = 1; i < parts.length; i++) {
        parentIds.push("/" + parts.slice(0, i).join("/"));
    }

    return parentIds;
};

function update_tree(tree, insert_node) {
    const { parent_id, label, children } = insert_node;
    const new_node = {
        id: `${parent_id}/${label}`,
        label,
        children: children ?? undefined,
    };

    function insert(node) {
        if (node.id === parent_id) {
            node.children ??= [];
            node.children.push(new_node);
            return true;
        }

        return (node.children ?? []).some(insert);
    }

    insert(tree);
    return tree;
};

function delete_tree_node(tree, target_id) {
    function remove(node, parent) {
        if (node.id === target_id) {
            parent.children = parent.children.filter(child => child.id !== target_id);
            return true;
        }

        return (node.children ?? []).some(child => remove(child, node));
    }

    remove(tree, null);
    return tree;
};

function is_valid_new_node(tree, parent_id, label) {
    if (!label) return false;

    const parent = get_node(tree, parent_id);
    if (!parent) return false;

    const target_id = `${parent_id}/${label}`;
    const siblings = parent.children ?? [];

    return !siblings.some(child => child.id === target_id);
};