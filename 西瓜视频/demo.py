# -*- coding: utf-8 -*-

import requests

jm_js = "http://127.0.0.1:3000/"
params = requests.get(url=jm_js).text
print('_signature', params)

querystring = {"_signature": params, "channelId": "94349543909", "count": "12",
               "request_from": "701", "queryCount": "1", "maxTime": "0"}

url = "https://www.ixigua.com/api/feedv2/feedById"

payload = ""

headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
    "Referer": "https://www.ixigua.com/"
}

response = requests.request("GET", url, data=payload, headers=headers, params=querystring)

print(response.text)
