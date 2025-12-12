import json

from chalice import Chalice
from chalice.app import Request, Response
from chalicelib import func_login, func_logout, func_nodes, func_trees

app = Chalice(app_name='cork-up-api')
app.log.setLevel("INFO")


@app.route("/login", methods=["POST"], content_types=["application/json"], cors=True)
def login_api_handler():
    params = http_request_handler(app.current_request)
    res = func_login.main(params)
    return http_response_handler(res)


@app.route("/logout", methods=["POST"], content_types=["application/json"], cors=True)
def logout_api_handler():
    params = http_request_handler(app.current_request)
    res = func_logout.main(params)
    return http_response_handler(res)


@app.route("/trees", methods=["GET", "PUT"], content_types=["application/json"], cors=True)
def trees_api_handler():
    params = http_request_handler(app.current_request)
    res = func_trees.main(params)
    return http_response_handler(res)


@app.route("/nodes", methods=["GET", "POST", "PUT", "DELETE"], content_types=["application/json"], cors=True)
def trees_api_handler():
    params = http_request_handler(app.current_request)
    res = func_nodes.main(params)
    return http_response_handler(res)


def http_request_handler(params: Request) -> dict:
    try:
        r_params = {
            "method": params.method.upper(),
            "path": params.path,
            "headers": dict(params.headers),
            "query_params": dict(params.query_params) if params.query_params else {},
            "body": dict(params.json_body) if params.raw_body else {},
        }
        app.log.info(f"request: {json.dumps(r_params)}")
        return r_params

    except Exception as e:
        raise e


def http_response_handler(params: dict) -> Response:
    try:
        app.log.info(f"response: {json.dumps(params)}")
        res = Response(
            body=params["body"],
            headers=params["headers"],
            status_code=params["status_code"]
        )
        return res

    except Exception as e:
        raise e
