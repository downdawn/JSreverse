# -*- coding: utf-8 -*-

import re
import requests


class Match13(object):
    def __init__(self):
        self.base_url = "http://match.yuanrenxue.com/match/13"
        self.api_url = "http://match.yuanrenxue.com/api/match/13"
        self.session = requests.session()
        self.headers = {
            'User-Agent': 'yuanrenxue.project',
        }

    def get_cookie(self):
        self.session.cookies.set("sessionid", "uf9wxr7flt7mfflfbdpd5k944d3r8bx5")
        response = self.session.get(url=self.base_url, headers=self.headers)
        reg = re.compile("'([a-zA-Z0-9=|_])'")
        results = reg.findall(response.text)
        cookie = ''.join(results)
        key, value = cookie.split('=')
        print(key, value)
        self.session.cookies.set(key, value)

    def get_data(self, page):
        params = {"page": page}
        response = self.session.get(url=self.api_url, params=params, headers=self.headers)
        print(response.text)

        if response.json()["status"] == "1":
            data = response.json()["data"]
            values = [int(i["value"]) for i in data]
            print(values)
            return values

    def run(self):
        total_value = []
        self.get_cookie()
        for i in range(1, 6):
            value = self.get_data(page=i)
            total_value += value

        result = sum(total_value)
        print(result)


if __name__ == '__main__':
    test = Match13()
    test.run()
