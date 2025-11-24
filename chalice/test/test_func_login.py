from chalicelib import func_login

from .conftest import logger


def test_func_login1():
    params = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": {
            "email": "test@gmail.com",
            "password": "test"
        },
        "query_params": {},
    }
    response = func_login.main(params)
    logger(response)
    assert response["status_code"] == 200

    body: dict = response["body"]
    assert body.get("id_token") != None
    assert body.get("email") != None


def test_func_login2():
    params = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": {
            "email": "",
            "password": ""
        },
        "query_params": {},
    }
    response = func_login.main(params)
    logger(response)
    assert response["status_code"] == 400


def test_func_login3():
    params = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": {
            "email": "test@gmail.com",
            "password": "invalid_password"
        },
        "query_params": {},
    }
    response = func_login.main(params)
    logger(response)
    assert response["status_code"] == 401

def test_func_login4():
    params = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": {
            "email": "hogehoge@gmail.com",
            "password": "hogehoge"
        },
        "query_params": {},
    }
    response = func_login.main(params)
    logger(response)
    assert response["status_code"] == 401
