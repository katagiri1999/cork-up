from chalicelib.utilities import dynamodbs, utils


def main(params: dict) -> dict:
    try:
        body: dict = params["body"]
        email: str = body.get("email")
        pw: str = body.get("password")

        if not email or not pw:
            raise Exception({
                "status_code": 400,
                "exception": "Bad Request",
                "error_code": "missing_parameters",
            })

        user_info = dynamodbs.get_user_info(email=email)
        if user_info.get("password") != pw:
            raise Exception({
                "status_code": 401,
                "exception": "Unauthorized",
                "error_code": "invalid_credentials",
            })

        id_token = utils.generate_jwt(email)

        res = {
            "email": email,
            "id_token": id_token,
        }

        return utils.response_handler(body=res, status_code=200)

    except Exception as e:
        return utils.error_handler(e)
