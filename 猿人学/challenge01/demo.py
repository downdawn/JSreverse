# -*- coding: utf-8 -*-

import requests
import base64
import time
import hashlib


class Challenge01(object):
    def __init__(self):
        self.base_url = "http://www.python-spider.com/challenge/api/json?page={}&count=14"

    @staticmethod
    def get_token():
        a = "9622"

        timestamp = str(round(time.time()))

        token = hashlib.md5(base64.b64encode((a + timestamp).encode())).hexdigest()
        print(token)
        return token

    def get_data(self, page, token):
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
            "Cookie": "sessionid=sftg8mkverpdyonwk0oqfg8a02wlbmpq",
            "safe": token,
            "timestamp": str(round(time.time())),
        }
        url = self.base_url.format(page)
        response = requests.get(url=url, headers=headers).json()
        count = 0
        if response["static"] == "202":
            for info in response["infos"]:
                if "招" in info["message"]:
                    count += 1
        else:
            print(response)

        print("count", count)
        return count

    def run(self):

        total_count = 0
        for i in range(1, 86):
            token = self.get_token()
            count = self.get_data(page=i, token=token)
            total_count += count

        print("total_count", total_count)


if __name__ == '__main__':
    test = Challenge01()
    test.run()
