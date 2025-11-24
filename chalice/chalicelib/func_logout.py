from chalicelib.utilities import utils


def main(params: dict) -> dict:
    try:
        headers: dict = params["headers"]
        id_token: str = headers.get("Authorization")

        if id_token:
            id_token = id_token.replace("Bearer ", "")

        if not id_token:
            raise Exception({
                "status_code": 400,
                "exception": "Bad Request",
                "error_code": "func_logout.missing_parameters",
            })

        res = {
            "result": "success"
        }

        return utils.response_handler(body=res, status_code=200)

    except Exception as e:
        return utils.error_handler(e)
