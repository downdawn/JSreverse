# -*- coding: utf-8 -*-

import requests
import time


class Match01(object):
    def __init__(self):
        self.base_url = "http://match.yuanrenxue.com/api/match/16"
        self.jm_url = "http://127.0.0.1:3000/get_param"

    def get_param(self):
        ts = str(int(time.time())) + "000"
        params = {"ts": ts}

        response = requests.get(url=self.jm_url, params=params)
        param = response.text

        # ts = "1614840785000"
        # param = "ybsCzbQQDA7QFtf9aa8c393651ce4b98c9b2b6361336e02ebKZydnmNN"

        print(param, ts)
        return param, ts

    def get_data(self, page, param, ts):
        headers = {
            "User-Agent": "yuanrenxue.project",
            "Cookie": "sessionid=7dlghsdspluvl6iii7b0953dlv1ha293",
        }
        params = {
            "page": page,
            "m": param,
            "t": ts
        }
        response = requests.get(url=self.base_url, params=params, headers=headers)
        print(response.text)
        if response.json()["status"] == "1":
            data = response.json()["data"]
            values = [int(i["value"]) for i in data]
            print(values)
            return values

    def run(self):
        total_value = []
        for i in range(1, 6):
            param, ts = self.get_param()
            value = self.get_data(page=i, param=param, ts=ts)
            total_value += value

        result = sum(total_value)
        print(result)


if __name__ == '__main__':
    test = Match01()
    test.run()
