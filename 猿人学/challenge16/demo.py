# -*- coding: utf-8 -*-
import time

import requests


class Challenge16(object):
    def __init__(self):
        self.base_url = "http://www.python-spider.com/api/challenge16"
        self.jm_url = "http://127.0.0.1:3000/get_param"
        self.session = requests.session()
        self.headers = {
            "Cookie": "sessionid=jfxv4sotvxtcpf65d97p7azh5gzx71oi",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
        }

    def get_safe(self):
        ts = str(int(time.time()))
        params = {"ts": ts}
        response = requests.get(url=self.jm_url, params=params)
        param = response.text
        print(param)
        return param

    def get_data(self, safe, page):
        self.headers["safe"] = safe
        data = {"page": page}
        response = self.session.post(url=self.base_url, data=data, headers=self.headers, verify=False)
        # print(response.text)

        if response.json()["status"] == "1":
            data = response.json()["data"]
            values = [int(i["value"]) for i in data]
            print(page, values)
            return values

    def run(self):
        total_value = []
        for i in range(1, 101):
            safe = self.get_safe()
            value = self.get_data(safe=safe, page=i)
            total_value += value

        result = sum(total_value)
        print(result)


if __name__ == '__main__':
    test = Challenge16()
    test.run()

# 4883828
