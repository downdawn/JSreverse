# -*- coding: utf-8 -*-

import requests


class Challenge07(object):
    def __init__(self):
        self.base_url = "http://www.python-spider.com/api/challenge7"
        self.first_url = "http://www.python-spider.com/cityjson"
        self.session = requests.session()

    def get_cookie(self):
        headers = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cookie': 'sessionid=f74g8tbgnejqapv52pbxz6r2bnjj482w',
            'Host': 'www.python-spider.com',
            'Origin': 'http://www.python-spider.com',
            'Referer': 'http://www.python-spider.com/challenge/7',
            'User-Agent': 'yuanrenxue.project',
        }
        # 保证请求头的顺序不被打乱
        self.session.headers = headers
        response = self.session.post(url=self.first_url)
        # print(response.cookies)

    def get_data(self, page):

        data = {"page": page}
        response = self.session.post(url=self.base_url, data=data)
        # print(response.text)

        if response.json()["status"] == "1":
            data = response.json()["data"]
            values = [int(i["value"]) for i in data]
            print(page, values)
            return values

    def run(self):
        total_value = []
        for i in range(1, 101):
            self.get_cookie()
            value = self.get_data(page=i)
            total_value += value

        result = sum(total_value)
        print(result)


if __name__ == '__main__':
    test = Challenge07()
    test.run()
