# -*- coding: utf-8 -*-

import requests


class Match03(object):
    def __init__(self):
        self.base_url = "http://match.yuanrenxue.com/api/match/3"
        self.logo_url = "http://match.yuanrenxue.com/logo"
        self.session = requests.session()

    def get_cookie(self):
        headers = {
            'Host': 'match.yuanrenxue.com',
            'Connection': 'keep-alive',
            'Content-Length': '0',
            'User-Agent': 'yuanrenxue.project',
            'Accept': '*/*',
            'Origin': 'http://match.yuanrenxue.com',
            'Referer': 'http://match.yuanrenxue.com/match/3',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        }
        # 保证请求头的顺序不被打乱
        self.session.headers = headers
        response = self.session.post(url=self.logo_url)
        print(response.cookies)

    def get_data(self, page):

        params = {"page": page}
        response = self.session.get(url=self.base_url, params=params)
        print(response.text)

        if response.json()["status"] == "1":
            data = response.json()["data"]
            values = [int(i["value"]) for i in data]
            print(values)
            return values

    def run(self):
        total_value = []
        for i in range(1, 6):
            self.get_cookie()
            value = self.get_data(page=i)
            total_value += value

        result = max(total_value, key=total_value.count)
        print(result)


if __name__ == '__main__':
    test = Match03()
    test.run()
