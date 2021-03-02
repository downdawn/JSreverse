# -*- coding: utf-8 -*-

import requests
import time
import numpy as np


class Match01(object):
    def __init__(self):
        self.base_url = "http://match.yuanrenxue.com/api/match/1"
        self.jm_url = "http://127.0.0.1:3000/get_param"

    def get_param(self):
        ts = str(int(time.time())) + "000"
        params = {"ts": ts}

        response = requests.get(url=self.jm_url, params=params)
        param = response.text
        print(param)
        return param

    def get_data(self, page, param):
        headers = {
            "User-Agent": "yuanrenxue.project",
            "Cookie": "Hm_lvt_0362c7a08a9a04ccf3a8463c590e1e2f=1614307321; qpfccr=true; Hm_lvt_c99546cf032aaa5a679230de9a95c7db=1614329505,1614568433,1614569240; no-alert2=true; tk=3426883241855233739; sessionid=27z6tcd1rkj609blbbus8zbgqfjf0n14; Hm_lvt_9bcbda9cbf86757998a2339a0437208e=1614568473,1614578375; Hm_lpvt_9bcbda9cbf86757998a2339a0437208e=1614578375; Hm_lpvt_c99546cf032aaa5a679230de9a95c7db=1614581413",
        }
        params = {
            "page": page,
            "m": param,
        }
        response = requests.get(url=self.base_url, params=params, headers=headers).json()
        if response["status"] == "1":
            data = response["data"]
            values = [i["value"] for i in data]
            print(values)
            return values

    def run(self):
        total_value = []
        for i in range(1, 6):
            param = self.get_param()
            value = self.get_data(page=i, param=param)
            total_value.append(value)

        result = np.mean(total_value)
        print(result)


if __name__ == '__main__':
    test = Match01()
    test.run()
