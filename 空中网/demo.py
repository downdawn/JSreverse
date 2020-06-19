# -*- coding: utf-8 -*-
import json
import re
import base64
import time
import requests
from urllib import parse

url = "https://sso.kongzhong.com/ajaxLogin?j=j&jsonp=j&service=https://passport.kongzhong.com/&_={}"

headers = {
    "Host": "sso.kongzhong.com",
    "Referer": "https://passport.kongzhong.com/login",
    # Sec-Fetch-Dest: script
    # Sec-Fetch-Mode: no-cors
    # Sec-Fetch-Site: same-site
    # "Cookie": "KSPSSIONID=FF608A0A5321401188A933F9529A9A81; SSO-KGZQRT=48A4A4A1A324C4F3428F86E20005DBFB; SESSION_COOKIE=180; Hm_lvt_1287c2225a527abe3386233dd9316f99=1592531102; Hm_lpvt_1287c2225a527abe3386233dd9316f99=1592531102; SSO-KGZLT=c4eca30a-bee5-48c9-b351-1ac65054fdd5; SSO-KGZIT=e431a2df-23dc-478f-9a65-4e7d08b2f996",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
}

now_time = int(round(time.time() * 1000))

url = url.format(now_time)
print(url)

response = requests.get(url=url, headers=headers)
print(response.status_code)
print(response.text)


re_data = re.search(r'jsonpCallbackKongZ\((.*?)\)', response.text).group(1)
re_json = json.loads(re_data)
print(re_json)


# 获取加密的密码
jm_url = "http://127.0.0.1:3000/"

pwd = 123456

param = {
    "pwd": pwd,
    "dc": re_json["dc"]
}

password = requests.get(url=jm_url, params=param).text
print(password)

# login_url = "https://sso.kongzhong.com/ajaxLogin"
#
# param2 = {
#     "j": "j",
#     "type": "1",
#     "service": "https://passport.kongzhong.com/",
#     "username": "18711111111",
#     "password": password,
#     "vcode": "",
#     "toSave": "0",
#     "_": int(round(time.time() * 1000))
# }
now_time = int(round(time.time() * 1000))
login_url = "https://sso.kongzhong.com/ajaxLogin?j=j&&type=1&service=https://passport.kongzhong.com/&username=18711111111&password={}&vcode=&toSave=0&_={}".format(password, now_time)

headers = {
    "Host": "sso.kongzhong.com",
    "Referer": "https://passport.kongzhong.com/login",
    # Sec-Fetch-Dest: script
    # Sec-Fetch-Mode: no-cors
    # Sec-Fetch-Site: same-site
    "Cookie": "SESSION_COOKIE=180; SSO-KGZQRT=C3CA59B99D9C15F0FD40975990D6279A; Hm_lvt_1287c2225a527abe3386233dd9316f99=1592531102; Hm_lpvt_1287c2225a527abe3386233dd9316f99=1592534616; SSO-KGZLT=86ab4440-2499-4ff7-bf6f-1f0f20b8878f",

    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
}

response3 = requests.get(url=login_url, headers=headers)
print(response3.url)
print(response3.status_code)
print(response3.text)
