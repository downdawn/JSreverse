# -*- coding: utf-8 -*-

import requests


class Challenge06(object):
    def __init__(self):
        self.base_url = "http://www.python-spider.com/api/challenge6"
        self.session = requests.session()

    def get_data(self, page):

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
            "Cookie": "sessionid=f74g8tbgnejqapv52pbxz6r2bnjj482w; sign=1614736305~YWlkaW5nX3dpbjM5LjE1NS*",
        }
        data = {"page": page}

        response = self.session.post(url=self.base_url, data=data, headers=headers, timeout=3)

        if response.json()["status"] == "1":
            data = response.json()["data"]
            values = [int(value["value"]) for value in data]
            print(page, values, sum(values))
            return sum(values)

    def run(self):
        total_values = 0
        for i in range(1, 101):
            values = self.get_data(i)
            print("values", values)
            total_values += values

        print("total_values", total_values)


if __name__ == '__main__':
    test = Challenge06()
    test.run()
