# -*- coding: utf-8 -*-
import json
import requests

url = "http://js-crack-course-12-2.crawler-lab.com/list"

headers = {
    "Cookie": "__cfduid=dda7b434c6e527d308ed6e91f713a5d7d1592181533; crawlerlab_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTIxODUxNTgsImlkIjoxNTQwLCJuYW1lIjoiMTg3NTk4OTE2MzEifQ.9QYJPSBrYvdBSZkwkgva1g1ZREOBnPj5AEDEWh128Uk",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
}

response = requests.get(url=url, headers=headers)
print(response.text)

info = json.loads(response.text)["data"]
print(info)

url2 = "http://127.0.0.1:3000"

data = {
    "data": info
}

response2 = requests.post(url=url2, data=data)
print(response2.text)
print(response2.status_code)
