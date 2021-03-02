# -*- coding: utf-8 -*-

import requests

PROXY_USERNAME = "admin"
PROXY_PASSWORD = "downdawn"


class Challenge03(object):
    def __init__(self):
        self.base_url = "http://www.python-spider.com/api/challenge4"

    @staticmethod
    def get_proxy():
        proxies = ""
        return proxies

    def get_data(self, page):
        values = 0
        while values == 0:

            proxies = self.get_proxy()

            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
                "Cookie": "Hm_lvt_337e99a01a907a08d00bed4a1a52e35d=1614306156,1614326443,1614569187; sessionid=4c6mzpfh00oe6ie2t0um8oag3img1773; Hm_lpvt_337e99a01a907a08d00bed4a1a52e35d=1614570075",
            }
            data = {"page": page}
            try:
                response = requests.post(url=self.base_url, data=data, headers=headers, proxies=proxies, timeout=3)
                if response.json()["status"] == "1":
                    data = response.json()["data"]
                    values = sum([int(value["value"]) for value in data])
                    print(page, values)
                else:
                    print(response.text)
            except Exception as e:
                print(e)

        return values

    def run(self):
        total_values = 0
        for i in range(1, 101):
            values = self.get_data(i)
            print("values", values)
            total_values += values

        print("total_values", total_values)


if __name__ == '__main__':
    test = Challenge03()
    test.run()
