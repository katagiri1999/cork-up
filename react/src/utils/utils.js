export default {
    requests,
    update_tree,
    delete_tree_node,
    is_valid_new_node,
    find_parent_ids,
};

async function requests(url, method, headers = {}, params = {}) {
    if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    console.group("API Request");
    console.log(`[${method}]: ${url}`);
    console.log({ url: url, method: method, headers: headers, params: params });

    if (method == "GET" || method == "DELETE") {
        var detail = {
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

function update_tree(tree, insert_node) {
    const { parent_id, label } = insert_node;

    // 新しいノードは children を持たない → ファイル
    // children を持たせたい場合は呼び出し側で空配列を渡す
    const new_node = {
        id: `${parent_id}/${label}`,
        label,
        // デフォルトではファイル扱い（childrenなし）
        // フォルダを作りたい場合は insert_node に children: [] を渡す
        children: insert_node.children ?? undefined,
    };

    function recursive_insert(node) {
        if (node.id === parent_id) {
            node.children ??= []; // children がなければ初期化
            node.children.push(new_node);
            return true;
        }

        if (node.children) {
            for (const child of node.children) {
                if (recursive_insert(child)) return true;
            }
        }
        return false;
    }

    recursive_insert(tree);
    return tree;
}

function delete_tree_node(tree, target_id) {
    function recursive_delete(node, parent) {
        if (node.id === target_id) {
            if (parent && parent.children) {
                parent.children = parent.children.filter(child => child.id !== target_id);
            }
            return true;
        }
        if (node.children) {
            for (const child of node.children) {
                if (recursive_delete(child, node)) return true;
            }
        }
        return false;
    }

    recursive_delete(tree, null);
    return tree;
}

function is_valid_new_node(tree, parent_id, label) {
    // check if id null or empty
    if (!label) {
        return false;
    }

    // check if id exists in tree
    const id = `${parent_id}/${label}`;
    let isUnique = true;

    function recursive_check(node) {
        if (node.id === id) {
            isUnique = false;
            return;
        }
        if (node.children) {
            for (const child of node.children) {
                recursive_check(child);
                if (!isUnique) {
                    return;
                }
            }
        }
    }

    recursive_check(tree);
    return isUnique;
}

function find_parent_ids(tree, target_id, path = []) {
    if (tree.id === target_id) return path;

    if (tree.children) {
        for (const child of tree.children) {
            const result = find_parent_ids(child, target_id, [...path, tree.id]);
            if (result) return result;
        }
    }

    return null;
}