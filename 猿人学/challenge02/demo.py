# -*- coding: utf-8 -*-

import requests
import base64
import time
import hashlib


class Challenge02(object):
    def __init__(self):
        self.base_url = "http://www.python-spider.com/challenge/api/json?page={}&count=14"

    def get_sign(self, timestamp):
        a = "aiding_win"
        c = timestamp
        t = round(int(c) / 1000)
        print(c, t)

        token = base64.b64encode((a + str(c)).encode()).decode()
        md = hashlib.md5(base64.b64encode((a + str(t)).encode())).hexdigest()
        sign = str(t) + "~" + token + "|" + md
        print(sign)
        return sign

    def run(self):
        self.get_sign(timestamp="1587102734000")


if __name__ == '__main__':
    test = Challenge02()
    test.run()
