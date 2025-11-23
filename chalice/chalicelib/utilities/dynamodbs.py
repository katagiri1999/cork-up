import boto3
from mypy_boto3_dynamodb import DynamoDBServiceResource

from chalicelib import config


def get_user_info(email: str) -> dict:
    try:
        dynamodb: DynamoDBServiceResource = boto3.resource("dynamodb")
        table = dynamodb.Table(config.USER_TABLE_NAME)

        response = table.get_item(
            Key={"email": email}
        )

        return response.get("Item", {})

    except Exception as e:
        raise e
