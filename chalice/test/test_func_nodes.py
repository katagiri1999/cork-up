from chalicelib import func_nodes

from .conftest import logger


def test_func_nodes_get_1(id_token):
    params = {
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": f"Bearer {id_token}"
        },
        "body": {},
        "query_params": {},
    }
    response = func_nodes.main(params)
    logger(response)
    assert response["status_code"] == 200
