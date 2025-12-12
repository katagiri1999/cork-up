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
        elif method == "POST":
            res = post(params)
        # elif method == "PUT":
        #     res = put(params)
        # elif method == "DELETE":
        #     res = delete(params)
        return utils.response_handler(body=res, status_code=200)

    except Exception as e:
        return utils.error_handler(e)


def get(params) -> dict:
    try:
        email: str = params["email"]
        query_params: dict = params["query_params"]

        items = dynamodbs.get_nodes(email)

        return {
            "nodes": items
        }

    except Exception as e:
        raise e


def post(params) -> dict:
    try:
        email: str = params["email"]

    except Exception as e:
        raise e

