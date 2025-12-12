from chalicelib import func_nodes

from .conftest import logger

POST_NODE_ID = "test_id_12345"


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


class TestSuccessPost:
    def test_func_nodes_post1(self, id_token):
        params = {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {id_token}"
            },
            "body": {
                "node_id": f"{POST_NODE_ID}",
                "text": f"#{POST_NODE_ID}",
            },
            "query_params": {},
        }
        response = func_nodes.main(params)
        logger(response)
        assert response["status_code"] == 200
        assert type(response["body"]["node"]) is dict


class TestSuccessDelete:
    def test_func_nodes_delete1(self, id_token):
        params = {
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "authorization": f"Bearer {id_token}"
            },
            "body": {},
            "query_params": {
                "node_id": f"{POST_NODE_ID}",
            },
        }
        response = func_nodes.main(params)
        logger(response)
        assert response["status_code"] == 200
        assert type(response["body"]["node"]) is dict
