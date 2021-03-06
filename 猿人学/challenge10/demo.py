# -*- coding: utf-8 -*-

import requests


class Challenge10(object):
    def __init__(self):
        self.base_url = "http://www.python-spider.com/api/challenge10"
        self.session = requests.session()

    def get_data(self, page):
        headers = {
            'Proxy-Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://www.python-spider.com',
            'Referer': 'http://www.python-spider.com/challenge/10',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        }
        # 保证请求头的顺序不被打乱
        self.session.headers = headers
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
            value = self.get_data(page=i)
            total_value += value

        result = sum(total_value)
        print(result)


if __name__ == '__main__':
    test = Challenge10()
    test.run()
