import boto3
from boto3.dynamodb.conditions import Key
from mypy_boto3_dynamodb import DynamoDBServiceResource

from chalicelib import config


def get_user(email: str) -> dict:
    try:
        dynamodb: DynamoDBServiceResource = boto3.resource("dynamodb")
        table = dynamodb.Table(config.USER_TABLE_NAME)

        response = table.get_item(
            Key={"email": email}
        )

        return response.get("Item")

    except Exception as e:
        raise e


def get_tree(email: str) -> dict:
    try:
        dynamodb: DynamoDBServiceResource = boto3.resource("dynamodb")
        table = dynamodb.Table(config.TREE_TABLE_NAME)

        response = table.get_item(
            Key={"email": email}
        )

        return response.get("Item")

    except Exception as e:
        raise e


def update_tree(email: str, tree: dict) -> dict:
    try:
        dynamodb: DynamoDBServiceResource = boto3.resource("dynamodb")
        table = dynamodb.Table(config.TREE_TABLE_NAME)

        table.put_item(
            Item={
                "email": email,
                "tree": tree,
            }
        )

    except Exception as e:
        raise e


def get_node(email: str, node_id) -> dict:
    try:
        dynamodb: DynamoDBServiceResource = boto3.resource("dynamodb")
        table = dynamodb.Table(config.NODES_TABLE_NAME)

        response = table.get_item(
            Key={
                "email": email,
                "id": node_id,
            }
        )

        return response.get("Item")

    except Exception as e:
        raise e


def get_nodes(email: str) -> dict:
    try:
        dynamodb: DynamoDBServiceResource = boto3.resource("dynamodb")
        table = dynamodb.Table(config.NODES_TABLE_NAME)

        response = table.query(
            KeyConditionExpression=Key("email").eq(email)
        )

        items = response.get("Items", [])

        return items

    except Exception as e:
        raise e


def post_node(email: str, node_id: str, text: str) -> dict:
    try:
        dynamodb: DynamoDBServiceResource = boto3.resource("dynamodb")
        table = dynamodb.Table(config.NODES_TABLE_NAME)

        table.put_item(
            Item={
                "email": email,
                "id": node_id,
                "text": text,
            }
        )

    except Exception as e:
        raise e


def delete_node(email: str, node_id: str) -> dict:
    try:
        dynamodb: DynamoDBServiceResource = boto3.resource("dynamodb")
        table = dynamodb.Table(config.NODES_TABLE_NAME)

        table.delete_item(
            Key={
                "email": email,
                "id": node_id,
            }
        )

    except Exception as e:
        raise e
