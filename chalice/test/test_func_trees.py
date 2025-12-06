from chalicelib import func_trees
import uuid
from .conftest import logger


def test_func_trees_get_1(id_token):
    params = {
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": f"Bearer {id_token}"
        },
        "body": {},
        "query_params": {},
    }
    response = func_trees.main(params)
    logger(response)
    assert response["status_code"] == 200
    assert response["body"].get("tree") is not None


def test_func_trees_put_1(id_token):
    uuid_1 = str(uuid.uuid4())
    uuid_2 = str(uuid.uuid4())

    params = {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "authorization": f"Bearer {id_token}"
        },
        "body": {
            "tree": [
                {
                    "id": '/main',
                    "label": 'main',
                    "children": [
                        {"id": f'/main/{uuid_1}.md', "label": f'{uuid_1}.md'},
                        {
                            "id": '/main/work',
                            "label": 'work',
                            "children": [
                                {"id": f'/main/work/{uuid_2}.md',
                                    "label": f'{uuid_2}.md'},
                            ]
                        }
                    ]
                }
            ]
        },
        "query_params": {},
    }
    response = func_trees.main(params)
    logger(response)
    assert response["status_code"] == 200
    assert response["body"].get("tree") == params["body"]["tree"]


def test_func_trees_put_2(id_token):
    params = {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "authorization": f"Bearer {id_token}"
        },
        "body": {
            "tree": [
                {
                    "id": '/main',
                    "label": 'main',
                    "children": [
                        {"id": '/main/page1.md', "label": 'page1.md'},
                        {"id": '/main/page2.md', "label": 'page2.md'},
                        {
                            "id": '/main/work',
                            "label": 'work',
                            "children": [
                                {"id": '/main/work/page1.md', "label": 'page1.md'},
                                {"id": '/main/work/page2.md', "label": 'page2.md'},
                            ]
                        },
                        {
                            "id": '/main/art',
                            "label": 'art',
                            "children": [
                                {"id": '/main/art/page1.md', "label": 'page1.md'},
                                {"id": '/main/art/page2.md', "label": 'page2.md'},
                            ]
                        }
                    ]
                },
                {
                    "id": '/sub',
                    "label": 'sub',
                    "children": [
                        {"id": '/sub/page1.md', "label": 'page1.md'},
                        {"id": '/sub/page2.md', "label": 'page2.md'}
                    ]
                }
            ]
        },
        "query_params": {},
    }
    response = func_trees.main(params)
    logger(response)
    assert response["status_code"] == 200
    assert response["body"].get("tree") == params["body"]["tree"]


def test_func_trees_put_3():
    params = {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
        },
        "body": {},
        "query_params": {},
    }
    response = func_trees.main(params)
    logger(response)
    assert response["status_code"] == 401


def test_func_trees_put_4():
    params = {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "authorization": ""
        },
        "body": {},
        "query_params": {},
    }
    response = func_trees.main(params)
    logger(response)
    assert response["status_code"] == 401


def test_func_trees_put_5(invalid_id_token):
    params = {
        "method": "PUT",
        "headers": {
            "content-type": "application/json",
            "authorization": f"Bearer {invalid_id_token}"
        },
        "body": {},
        "query_params": {},
    }
    response = func_trees.main(params)
    logger(response)
    assert response["status_code"] == 401
