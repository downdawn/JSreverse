# -*- coding: utf-8 -*-

import json
import requests


def get_params():
    """从node调用扣好的js"""
    url = "http://127.0.0.1:3000/"

    response = requests.get(url=url)
    params = json.loads(response.text)
    # print(params)
    return params


def get_detail(params):
    """获取页面信息，计算平均值"""
    url = "http://js-crack-course-9-1.crawler-lab.com/detail/7773"

    param = {
        "key": params.get('key'),
        "time": params.get('time'),
        "sign": params.get('sign'),
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
        "Cookie": " __cfduid=d9e0dfbb9820e1db6677d04a64911d1c51584093133; crawlerlab_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODY1OTAxNzAsImlkIjoxNTQwLCJuYW1lIjoiMTg3NTk4OTE2MzEifQ.cICnpnFV92TPgUqcwE2XQLYA75My-JK0hyZny68Rznw"
    }
    response = requests.get(url=url, params=param, headers=headers)
    # print(response.status_code)
    # print(response.text)
    items = json.loads(response.text)
    data = items["data"]
    print(data)


# 运行 node jm.js
_params = get_params()
get_detail(_params)
