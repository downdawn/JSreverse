# -*- coding: utf-8 -*-
import json
import re
import base64
import time
import requests
from urllib import parse


url = "https://login.sina.com.cn/sso/prelogin.php"

count = "18759891631"  # 账号

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
}

now_time = int(round(time.time() * 1000))

# 账号进行字符串编码，然后base64编码
count = parse.quote(count)
print(count)
bytes_data = count.encode('utf-8')
su = base64.b64encode(bytes_data).decode()
print(su)

param = {
    "entry": "weibo",
    "callback": "sinaSSOController.preloginCallBack",
    "su": su,
    "rsakt": "mod",
    "checkpin": "1",
    "client": "ssologin.js(v1.4.19)",
    "_": now_time
}

response = requests.get(url=url, headers=headers, params=param)
html = response.text
print(html)

re_data = re.search(r'preloginCallBack\((.*?)\)', html).group(1)
re_json = json.loads(re_data)
print(re_json)

# 获取解密的su参数

pwd = "x5880zh"
jm_url = "http://127.0.0.1:3000/?pwd={}".format(pwd)

sp = requests.get(url=jm_url).text
print(sp)


login_url = "https://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.19)"

data = {
    "entry": "weibo",
    "gateway": "1",
    "from": "",
    "savestate": "7",
    "qrcode_flag": "false",
    "useticket": "1",
    "pagerefer": "",
    "vsnf": "1",
    "su": su,
    "service": "miniblog",
    "servertime": re_json["servertime"],
    "nonce": re_json["nonce"],
    "pwencode": "rsa2",
    "rsakv": re_json["rsakv"],
    "sp": sp,
    "sr": "1920*1080",
    "encoding": "UTF-8",
    "prelt": "32",
    "url": "https://www.weibo.com/ajaxlogin.php?framelogin=1&callback=parent.sinaSSOController.feedBackUrlCallBack",
    "returntype": "META",
}

response2 = requests.post(url=login_url, headers=headers, data=data)
response2.encoding = "GBK"
print(response2.status_code)
print(response2.text)
print(response2.cookies)
