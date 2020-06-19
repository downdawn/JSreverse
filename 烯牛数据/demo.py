# -*- coding: utf-8 -*-
import json
import re
import base64
import time
import requests
from urllib import parse

jm_url = "http://127.0.0.1:3000/get_sig/"

jm_data = requests.get(url=jm_url).text
jm_data = json.loads(jm_data)
print(jm_data)

data_url = "https://www.xiniudata.com/api2/service/x_service/person_company4_list/list_companies4_list_by_codes"

data = {
    "payload": jm_data["payload"],
    "sig": jm_data["sigs"],
    "v": 1
}

headers = {
    "accept": "application/json",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9",
    "content-length": "433",
    "content-type": "application/json",
    "origin": "https://www.xiniudata.com",
    "referer": "https://www.xiniudata.com/project/lib",
    "cookie": "btoken=T6XUE5U4L9917PW5Y19N7ZF8HWDPE7E1; Hm_lvt_42317524c1662a500d12d3784dbea0f8=1592536110; _ga=GA1.2.899218715.1592536110; _gid=GA1.2.20158213.1592536110; export_notice=true; Hm_lpvt_42317524c1662a500d12d3784dbea0f8=1592547073",
    "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
}

response = requests.post(url=data_url, data=json.dumps(data), headers=headers)
print(response.status_code)
print(response.text)

# 解密数据

url = "http://127.0.0.1:3000/get_data/"

_data = {
    "data": json.loads(response.text)["d"]
}

response2 = requests.post(url=url, data=_data)
print(response2.text)

