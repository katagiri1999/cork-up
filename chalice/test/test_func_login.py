from chalicelib import func_login

from .conftest import logger


def test_func_login1():
    params = {
        "body": {
            "email": "test@gmail.com",
            "password": "test"
        }
    }
    response = func_login.main(params)
    logger(response)
    assert response["status_code"] == 200

    body: dict = response["body"]
    assert body.get("id_token") != None


def test_func_login2():
    params = {
        "body": {
            "email": "",
            "password": ""
        }
    }
    response = func_login.main(params)
    logger(response)
    assert response["status_code"] == 400


def test_func_login3():
    params = {
        "body": {
            "email": "test@gmail.com",
            "password": "invalid_password"
        }
    }
    response = func_login.main(params)
    logger(response)
    assert response["status_code"] == 401
