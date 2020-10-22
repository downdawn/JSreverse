# -*- coding: utf-8 -*-
import json

import requests
from urllib.parse import urlparse

# f = "api.eol.cn/gkcx/api/?" \
#     "admissions=" \
#     "&central=" \
#     "&department=" \
#     "&dual_class=" \
#     "&f211=" \
#     "&f985=" \
#     "&is_dual_class=" \
#     "&keyword=" \
#     "&local_batch_id=" \
#     "&local_province_id=35" \
#     "&local_type_id=" \
#     "&page=1" \
#     "&province_id=" \
#     "&school_type=" \
#     "&size=20" \
#     "&type=" \
#     "&uri=apidata/api/gk/score/special" \
#     "&year=2019"

url = "https://api.eol.cn/gkcx/api/"

request_payload = {
    "admissions": "",
    "central": "",
    "department": "",
    "dual_class": "",
    "f211": "",
    "f985": "",
    "is_dual_class": "",
    "keyword": "",
    "local_batch_id": "",
    "local_province_id": "35",
    "local_type_id": "",
    "page": 1,  # 页码
    "province_id": "",
    "school_type": "",
    "size": 20,
    "type": "",
    "uri": "apidata/api/gk/score/special",
    "year": "2019"
}


jm_url = "http://127.0.0.1:3000/"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
                  " Chrome/83.0.4103.97 Safari/537.36"
}


def get_params():
    """构造请求参数"""
    words = []
    for k, v in request_payload.items():
        _ = str(k) + "=" + str(v)
        words.append(_)
    # print(words)
    data = "&".join(words)
    # print(data)

    url_data = urlparse(url)

    params = url_data.netloc + url_data.path + "?" + data
    print(params)

    return params


def get_sign(param):
    """获取sign参数"""
    params = {"data": param}
    url = jm_url + "get_sign"
    sign = requests.get(url=url, params=params).text
    print("sign", sign)
    return sign


def get_response(sign):
    """获取xhr返回的数据"""
    request_payload["signsafe"] = sign
    response = requests.post(url=url, headers=headers, data=json.dumps(request_payload), params=request_payload)
    data = response.json()
    # print(data)
    data = data["data"]["text"]
    print(data)
    return data


def get_decrypt_data(data):
    """获取解密后的数据"""
    params = {"data": data, "url": request_payload["uri"]}
    url = jm_url + "get_data"
    result = requests.post(url=url, data=params).text
    print(result)


if __name__ == '__main__':
    param = get_params()
    sign = get_sign(param)
    response = get_response(sign)
    get_decrypt_data(response)
