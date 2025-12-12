import boto3
from mypy_boto3_dynamodb import DynamoDBServiceResource

from chalicelib import config


def get_user(email: str) -> dict:
    try:
        dynamodb: DynamoDBServiceResource = boto3.resource("dynamodb")
        table = dynamodb.Table(config.USER_TABLE_NAME)

        response = table.get_item(
            Key={"email": email}
        )

        return response.get("Item", {})

    except Exception as e:
        raise e


def get_tree(email: str) -> dict:
    try:
        dynamodb: DynamoDBServiceResource = boto3.resource("dynamodb")
        table = dynamodb.Table(config.TREE_TABLE_NAME)

        response = table.get_item(
            Key={"email": email}
        )

        return response.get("Item", {})

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
