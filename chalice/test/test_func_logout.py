from chalicelib import func_logout

from .conftest import logger


def test_func_logout1(id_token):
    params = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {id_token}"
        },
        "body": {},
        "query_params": {},
    }
    response = func_logout.main(params)
    logger(response)
    assert response["status_code"] == 200

    body: dict = response["body"]
    assert body.get("result") == "success"


def test_func_logout2():
    params = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": ""
        },
        "body": {},
        "query_params": {},
    }
    response = func_logout.main(params)
    logger(response)
    assert response["status_code"] == 400

def test_func_logout2():
    params = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": {},
        "query_params": {},
    }
    response = func_logout.main(params)
    logger(response)
    assert response["status_code"] == 400
