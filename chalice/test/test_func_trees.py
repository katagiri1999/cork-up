import uuid

from chalicelib import func_trees

from .conftest import logger


class TestSuccessGET:
    def test_func_trees_get1(self, id_token):
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


class TestFailGet:
    def test_func_trees_get1(self):
        params = {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
            },
            "body": {},
            "query_params": {},
        }
        response = func_trees.main(params)
        logger(response)
        assert response["status_code"] == 401


    def test_func_trees_get2(self):
        params = {
            "method": "GET",
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


    def test_func_trees_get3(self, nonuser_id_token):
        params = {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {nonuser_id_token}"
            },
            "body": {},
            "query_params": {},
        }
        response = func_trees.main(params)
        logger(response)
        assert response["status_code"] == 404


    def test_func_trees_get4(self, invalid_id_token):
        params = {
            "method": "GET",
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


class TestSuccessPut:
    def test_func_trees_put1(self, id_token):
        uuid_1 = str(uuid.uuid4())
        uuid_2 = str(uuid.uuid4())

        params = {
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {id_token}"
            },
            "body": {
                "tree": {
                    "id": '/Folder',
                    "label": 'Folder',
                    "children": [
                        {"id": f'/Folder/{uuid_1}', "label": f'{uuid_1}'},
                        {
                            "id": '/Folder/work',
                            "label": 'work',
                            "children": [
                                {"id": f'/Folder/work/{uuid_2}',
                                "label": f'{uuid_2}'},
                            ]
                        }
                    ]
                }
            },
            "query_params": {},
        }
        response = func_trees.main(params)
        logger(response)
        assert response["status_code"] == 200
        assert response["body"].get("tree") == params["body"]["tree"]


    def test_func_trees_put2(self, id_token):
        params = {
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {id_token}"
            },
            "body": {
                "tree":  {
                    "id": '/Folder',
                    "label": 'Folder',
                    "children": [
                        {"id": '/Folder/page1', "label": 'page1'},
                        {"id": '/Folder/page2', "label": 'page2'},
                        {
                            "id": '/Folder/work',
                            "label": 'work',
                            "children": [
                                {"id": '/Folder/work/page1',
                                "label": 'page1'},
                                {"id": '/Folder/work/page2',
                                "label": 'page2'},
                            ]
                        },
                        {
                            "id": '/Folder/art',
                            "label": 'art',
                            "children": [
                                {"id": '/Folder/art/page1', "label": 'page1'},
                                {"id": '/Folder/art/page2', "label": 'page2'},
                            ]
                        }
                    ]
                }
            },
            "query_params": {},
        }
        response = func_trees.main(params)
        logger(response)
        assert response["status_code"] == 200
        assert response["body"].get("tree") == params["body"]["tree"]


class TestFailPut:
    def test_func_trees_put1(self):
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


    def test_func_trees_put2(self):
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


    def test_func_trees_put3(self, invalid_id_token):
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


    def test_func_trees_put4(self, id_token):
        params = {
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {id_token}"
            },
            "body": {
                "tree":  {}
            },
            "query_params": {},
        }
        response = func_trees.main(params)
        logger(response)
        assert response["status_code"] == 400


    def test_func_trees_put5(self):
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


    def test_func_trees_put6(self, nonuser_id_token):
        params = {
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {nonuser_id_token}"
            },
            "body": {
                "tree":  {
                    "id": '/Folder',
                    "label": 'Folder',
                    "children": [{"id": '/Folder/page1', "label": 'page1'}]
                }
            },
            "query_params": {},
        }
        response = func_trees.main(params)
        logger(response)
        assert response["status_code"] == 404
