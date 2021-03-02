# -*- coding: utf-8 -*-

import requests
import time


class Match02(object):
    def __init__(self):
        self.base_url = "http://match.yuanrenxue.com/api/match/2"
        self.jm_url = "http://127.0.0.1:3000/get_param"

    def get_param(self):
        ts = str(int(time.time())) + "000"
        params = {"ts": ts}

        response = requests.get(url=self.jm_url, params=params)
        param = response.text
        print(param)
        return param

    def get_data(self, page, param):

        cookies = {
            "sessionid": "27z6tcd1rkj609blbbus8zbgqfjf0n14",
            "m": param
        }
        headers = {
            "User-Agent": "yuanrenxue.project",
        }
        params = {
            "page": page,
        }
        response = requests.get(url=self.base_url, params=params, cookies=cookies, headers=headers).json()

        if response["status"] == "1":
            data = response["data"]
            values = [int(i["value"]) for i in data]
            print(values)
            return values

    def run(self):

        total_value = []
        for i in range(1, 6):
            param = self.get_param()
            value = self.get_data(page=i, param=param)
            total_value += value

        result = sum(total_value)
        print(result)


if __name__ == '__main__':
    test = Match02()
    test.run()
