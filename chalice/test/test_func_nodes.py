from chalicelib import func_nodes

from .conftest import logger


class TestSuccessGET:
    def test_func_nodes_get1(self, id_token):
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
        assert type(response["body"]["nodes"]) is list


    def test_func_nodes_get2(self, id_token):
        params = {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {id_token}"
            },
            "body": {},
            "query_params": {"node_id": "/Folder"},
        }
        response = func_nodes.main(params)
        logger(response)
        assert response["status_code"] == 200
        assert type(response["body"]["node"]) is dict


class TestFailGet:
    def test_func_node_get1(self):
        params = {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
            },
            "body": {},
            "query_params": {},
        }
        response = func_nodes.main(params)
        logger(response)
        assert response["status_code"] == 401


    def test_func_node_get2(self):
        params = {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "authorization": ""
            },
            "body": {},
            "query_params": {},
        }
        response = func_nodes.main(params)
        logger(response)
        assert response["status_code"] == 401


    def test_func_node_get3(self, invalid_id_token):
        params = {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {invalid_id_token}"
            },
            "body": {},
            "query_params": {},
        }
        response = func_nodes.main(params)
        logger(response)
        assert response["status_code"] == 401


    def test_func_node_get4(self, nonuser_id_token):
        params = {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {nonuser_id_token}"
            },
            "body": {},
            "query_params": {},
        }
        response = func_nodes.main(params)
        logger(response)
        assert response["status_code"] == 404


    def test_func_node_get5(self, nonuser_id_token):
        params = {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {nonuser_id_token}"
            },
            "body": {},
            "query_params": {
                "node_id": "hogehogehogehoge"
            },
        }
        response = func_nodes.main(params)
        logger(response)
        assert response["status_code"] == 404
