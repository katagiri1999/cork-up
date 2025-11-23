export const API_VER = import.meta.env.VITE__API_VER;
export const API_HOST = import.meta.env.VITE_API_HOST;

export async function requests(url, method, headers = {}, params = {}) {
    if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    console.log("request");
    console.log({ url: url, method: method, headers: headers, params: params });

    if (method == "GET" || method == "DELETE") {
        var detail = {
            method: method,
            headers: headers,
        };
        url = `${url}?${new URLSearchParams(params)}`;

    } else {
        detail = {
            method: method,
            headers: headers,
            body: JSON.stringify(params),
        };
    }

    var res = await fetch(url, detail);
    var body = await res.json();
    body.status = res.status;

    console.log(`response: ${res.status}`);
    console.log(body);
    return body;
};
