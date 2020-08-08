# -*- coding: utf-8 -*-

# 抖音无水印视频解析

import re

import requests

url = "https://v.douyin.com/J6LkjFM/"

headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
}


response = requests.get(url=url, headers=headers, allow_redirects=False)

location = response.headers.get("location")
print(response.status_code)
print(location)

v_id = re.search(r'video/(.*?)/', location).group(1)
print(v_id)


xhr_url = "https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids={}".format(v_id)

response2 = requests.get(url=xhr_url, headers=headers)
print(response2.status_code)
data = response2.json()
print(type(data), data)

v_url = data['item_list'][0]['video']['play_addr']['url_list'][0]
print(v_url)

v_id = re.search(r'video_id=(.*?)&', v_url).group(1)
print(v_id)

wsy_url = "https://aweme-hl.snssdk.com/aweme/v1/play/?video_id={}".format(v_id)

sj_headers = {
    "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"
}
response3 = requests.get(url=wsy_url, headers=sj_headers, allow_redirects=False)

print(response3.status_code)
print(response3.headers.get('location'))
