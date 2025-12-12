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
    const parts = target_id
        .split("/")
        .filter(part => part && part !== "Folder");

    let current = tree;
    for (const part of parts) {
        if (!Array.isArray(current.children)) return null;

        const next = current.children.find(child => child.label === part);
        if (!next) return null;

        current = next;
    }

    return current;
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
    const parts = insert_node.id.split("/").filter(Boolean);
    const parentParts = parts.slice(0, -1);
    const parent_id = "/" + parentParts.join("/");

    const parent = get_node(tree, parent_id);
    parent.children ??= [];
    parent.children.push(insert_node);

    return tree;
};

function delete_tree_node(tree, target_id) {
    const parts = target_id.split("/").filter(Boolean);
    const parentParts = parts.slice(0, -1);
    const parent_id = "/" + parentParts.join("/");

    const parent = get_node(tree, parent_id);
    parent.children = parent.children.filter(child => child.id !== target_id);
    return tree;
};

function is_valid_new_node(tree, insert_node) {
    if (!insert_node.id || !insert_node.label) return false;

    const parts = insert_node.id.split("/").filter(Boolean);

    const parentParts = parts.slice(0, -1);
    const parent_id = "/" + parentParts.join("/");

    const parent = get_node(tree, parent_id);
    if (!parent) return false;

    const siblings = parent.children ?? [];
    return !siblings.some(child => child.label === insert_node.label);
};