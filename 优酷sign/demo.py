# -*- coding: utf-8 -*-

import requests

jm_url = "http://127.0.0.1:3000/get_sign"

s = requests.session()

s.headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
                  " Chrome/83.0.4103.97 Safari/537.36"
}

# 第一次请求，data为{}，获取sign
params = {
    "data": "{}",
}

response = s.get(url=jm_url, params=params).json()
print(response)

# 根据sign，获取token
get_token_url = "https://acs.youku.com/h5/mtop.youku.yklive.yk.usercenter.userinfo/1.0/"

querystring = {
    "jsv": "2.5.0",
    "appKey": "24679788",
    "t": response["t"],
    "sign": response["sign"],
    "api": "mtop.youku.yklive.yk.usercenter.userInfo",
    "v": "1.0",
    "ecode": "1",
    "type": "jsonp",
    "secType": "2",
    "dataType": "jsonp",
    "callback": "mtopjsonp1",
    "data": "{}"
}

response2 = s.get(url=get_token_url, params=querystring)
# print(response2.cookies)

token = response2.cookies['_m_h5_tk'][:-14]
print(token)

# 根据获取到的token，获取真正的sign
params2 = {
    "data": '{"liveId":8091521}',
    "token": token
}

response3 = s.get(url=jm_url, params=params2).json()
print(response3)

# 测试请求数据
test_url = "https://acs.youku.com/h5/mtop.youku.sports.ykb.data.matchdata.getbyliveid/1.0/"

querystring2 = {
    "jsv": "2.5.0",
    "appKey": "24679788",
    "t": response3["t"],
    "sign": response3["sign"],
    "api": "mtop.youku.sports.ykb.data.matchdata.getbyliveid",
    "v": "1.0",
    "type": "jsonp",
    "dataType": "jsonp",
    "callback": "mtopjsonp3",
    "data": '{"liveId":8091521}'
}

response4 = s.get(url=test_url, params=querystring2)
print(response4.text)
