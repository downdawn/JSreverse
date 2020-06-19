# -*- coding: utf-8 -*-

import time
import requests

# url = "https://www.maomaozu.com/index/index.json"
# url = "https://www.maomaozu.com/index/hotlist.json"
url = "https://www.maomaozu.com/index/build.json"
jm_url = "http://127.0.0.1:3000/"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
                  " Chrome/83.0.4103.97 Safari/537.36"
}


def get_payload(pages=1):
    """获取post的请求参数"""
    now_time = int(round(time.time() * 1000))

    data = {
        "data": {"Type": 0, "page": pages, "expire": now_time}
    }
    print(data)

    # 获取加密请求参数
    _payload = requests.post(url=jm_url + 'my_encrypt', json=data).text
    print(_payload)
    return _payload


def get_html(data):
    """请求页面，返回加密的数据"""
    response = requests.post(url=url, headers=headers, data=data)
    _encrypt_data = response.text
    print(_encrypt_data)
    return _encrypt_data


def get_decrypt_html(en_data):
    """获取解密数据"""
    data = {
        "data": en_data
    }
    response = requests.post(url=jm_url + 'my_decrypt', data=data)
    html = response.text
    print(html)


if __name__ == '__main__':
    page = 2
    payload = get_payload(pages=page)
    encrypt_data = get_html(payload)
    get_decrypt_html(encrypt_data)
