# -*- coding: utf-8 -*-

import requests

session = requests.Session()
headers = {
    "Accept-Language": "zh-CN,zh;q=0.9",
    'Referer': 'http://match.yuanrenxue.com/match/3',
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
}
cookie_url = "http://match.yuanrenxue.com/logo"
for page in range(1, 6):
    r = session.post(cookie_url, headers=headers)
    api_url = f"http://match.yuanrenxue.com/api/match/3?page={page}"
    response = session.get(api_url, headers=headers)
    print(response.text)
