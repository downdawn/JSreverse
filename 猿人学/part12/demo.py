# -*- coding: utf-8 -*-

import base64
import requests


def btoa(src_str):
    return base64.b64encode(src_str.encode()).decode()


headers = {
    "Cookie": "sessionid=uf9wxr7flt7mfflfbdpd5k944d3r8bx5",
    "User-Agent": "yuanrenxue.project",
}

sum = 0

for i in range(1, 6):
    src_str = f"yuanrenxue{i}"
    params = {
        "page": i,
        "m": btoa(src_str),
    }
    api_url = "http://match.yuanrenxue.com/api/match/12"

    r = requests.get(api_url, params=params, headers=headers)
    data = r.json()
    values = data["data"]
    for value in values:
        print(value)
        sum += value["value"]

print(sum)
