# -*- coding: utf-8 -*-

import re
import requests

session = requests.Session()
headers = {
    "User-Agent": "yuanrenxue.project",
}

url = "http://match.yuanrenxue.com/match/13"
r = session.get(url)
reg = re.compile("'([a-zA-Z0-9=|_])'")
results = reg.findall(r.text)
cookie = ''.join(results)
key, value = cookie.split('=')
session.cookies.set(key, value)
sum = 0

for i in range(1, 6):
    api_url = f"http://match.yuanrenxue.com/api/match/13?page={i}"
    r = session.get(api_url, headers=headers)
    data = r.json()
    values = data["data"]
    for value in values:
        print(value)
        sum += value["value"]

print(sum)
