from chalicelib.utilities import dynamodbs, utils


def main(params: dict) -> dict:
    try:
        headers: dict = params["headers"]
        id_token: str = headers.get("authorization")

        decoded = utils.verify_id_token(id_token)
        params.update({"email": decoded["email"]})

        method: str = params["method"]
        if method == "GET":
            res = get(params)
        elif method == "PUT":
            res = put(params)

        return utils.response_handler(body=res, status_code=200)

    except Exception as e:
        return utils.error_handler(e)


def get(params) -> dict:
    try:
        email: str = params.get("email")
        if not email:
            raise Exception({
                "status_code": 400,
                "exception": "Bad Request",
                "error_code": "func_trees.missing_parameters",
            })

        tree_info = dynamodbs.get_tree_info(email=email)
        if not tree_info:
            raise Exception({
                "status_code": 404,
                "exception": "Not Found",
                "error_code": "func_trees.not_found",
            })

        tree_info["tree"] = sort_tree(tree_info["tree"])

        res = {
            "email": tree_info["email"],
            "tree": tree_info["tree"],
        }

        return res

    except Exception as e:
        raise e


def put(params) -> dict:
    try:
        email: str = params.get("email")
        body: dict = params.get("body")
        tree: dict = body.get("tree")

        if not email or not tree:
            raise Exception({
                "status_code": 400,
                "exception": "Bad Request",
                "error_code": "func_trees.missing_parameters",
            })

        tree = sort_tree(tree)

        dynamodbs.update_tree_info(email=email, tree=tree)
        tree_info = dynamodbs.get_tree_info(email=email)

        res = {
            "email": tree_info["email"],
            "tree": tree_info["tree"],
        }

        return res

    except Exception as e:
        raise e


def sort_tree(trees: list) -> list:
    """
    Sort tree by id: directories (id not ending with .md) come first, then files.
    """
    if not isinstance(trees, list) or len(trees) == 0:
        return trees

    def sort_key(node) -> tuple[bool, str]:
        node_id: str = node["id"]
        is_file = ".md" in node_id 
        # directories first (is_file False -> 0), then files (is_file True -> 1)
        return (is_file, node_id or "")

    trees.sort(key=sort_key)

    for node in trees:
        if isinstance(node.get("children"), list):
            node["children"] = sort_tree(node["children"])

    return trees
