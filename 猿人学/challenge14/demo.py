# -*- coding: utf-8 -*-
import time

import requests


class Challenge16(object):
    def __init__(self):
        self.base_url = "http://www.python-spider.com/api/challenge14"
        self.jm_url = "http://127.0.0.1:3000/get_param"
        self.session = requests.session()
        self.headers = {
            "Cookie": "sessionid=2mwneeds1ho297sda6ff22w2vsdyg8g2",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
        }

    def get_uc(self, num):
        ts = str(int(time.time()))
        params = {"ts": ts, "num": num}
        response = requests.get(url=self.jm_url, params=params)
        param = response.text
        print(ts, param)
        return param

    def get_data(self, uc, page):
        data = {"page": page, "uc": uc}
        self.session.headers = self.headers
        response = self.session.post(url=self.base_url, data=data, verify=False)
        # print(response.text)

        if response.json()["status"] == "1":
            data = response.json()["data"]
            values = [int(i["value"]) for i in data]
            print(page, values)
            return values

    def run(self):
        total_value = []
        for i in range(1, 101):
            uc = self.get_uc(num=i)
            value = self.get_data(uc=uc, page=i)
            total_value += value

        result = sum(total_value)
        print(result)


if __name__ == '__main__':
    test = Challenge16()
    test.run()

# 5175137
