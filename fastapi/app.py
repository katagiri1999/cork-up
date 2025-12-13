from mangum import Mangum

from fastapi import FastAPI, Request
from lib import func_nodes, func_trees

app = FastAPI()
handler = Mangum(app)


@app.api_route("/trees", methods=["GET", "PUT"])
async def handle_trees(request: Request):
    params = await handle_request(request)
    return func_trees(params)


@app.api_route("/nodes", methods=["GET", "POST", "DELETE"])
async def handle_nodes(request: Request):
    params = await handle_request(request)
    return func_nodes(params)


async def handle_request(request: Request) -> dict:
    try:
        body = await request.json()
    except Exception:
        body = {}

    params = {
        "path": request.url.path,
        "method": request.method.upper(),
        "headers": dict(request.headers),
        "query_params": dict(request.query_params),
        "body": body,
    }

    return params
