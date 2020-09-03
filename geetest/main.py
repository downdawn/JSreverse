# -*- coding: utf-8 -*-

import time
import json
import logging
import requests


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class GeeTest(object):

    def __init__(self):
        self.headers = {
            # 'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
            'accept': 'application/json, text/plain, */*',
            'referer': 'https://www.geetest.com/Sensebot',
            'authority': 'www.geetest.com',
            # 'cookie': 'Hm_lvt_25b04a5e7a64668b9b88e2711fb5f0c4=1593413399; sajssdk_2015_cross_new_user=1; 461cca3146ff093d059dee9439aa6b26=4f7a470a-9670-42f4-b68f-9e9f229ab945; Hm_lpvt_25b04a5e7a64668b9b88e2711fb5f0c4=1593414290; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22172fed6f32c475-0764af862c7b8e-3a65420e-2073600-172fed6f32d88a%22%2C%22%24device_id%22%3A%22172fed6f32c475-0764af862c7b8e-3a65420e-2073600-172fed6f32d88a%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_landing_page%22%3A%22https%3A%2F%2Fwww.geetest.com%2FSensebot%22%7D%7D'
        }

        self.sess = requests.Session()

    def get_gt_challenge(self):
        url = "https://captcha1.scrape.center/api/init?t={}"
        resp = self.sess.get(url.format(int(time.time()*1000)), headers=self.headers)
        print(resp.url)
        logger.debug(resp.text)
        try:
            resp_json = resp.json()
            self.gt = resp_json.get("gt", "")
            self.challenge = resp_json.get("challenge", "")
        except Exception as e:
            self.gt = ""
            self.challenge = ""
            logger.critical("[GET gt/challenge failed, the resp is not a json.] resp content:{}".format(resp.text))
        print("gt_challenge  gt: {}  challenge: {}".format(self.gt, self.challenge))

    def get_token(self):
        token = self.sess.get("http://127.0.0.1:8090/get_token")
        print("token: {}".format(token.text))
        return token.text

    def get_type(self):
        self.headers["host"] = "api.geetest.com"
        url = "https://api.geetest.com/gettype.php?gt={}&callback=geetest_{}"
        res = self.sess.get(url.format(self.gt, int(time.time()*1000)), headers=self.headers)
        print("get_type: {}".format(res.text))

    def get_n(self, token):
        my_n = self.sess.post("http://127.0.0.1:8090/encrypt_n", data={"token": token})
        my_n = my_n.text
        return my_n

    def get_o(self, token):
        my_o = self.sess.post("http://127.0.0.1:8090/encrypt_o", data={"token": token, "gt": self.gt, "challenge": self.challenge})
        my_o = my_o.text
        return my_o

    def get_w(self, token):
        my_w = self.sess.post("http://127.0.0.1:8090/encrypt", data={"token": token, "gt": self.gt, "challenge": self.challenge})
        my_w = my_w.text
        print("self.my_w: {}".format(my_w))
        return my_w

    def get_php1(self, my_w):
        url = "https://api.geetest.com/get.php?gt={}&challenge={}&lang=zh-cn&pt=0&client_type=web&w={}&callback=geetest_{}"
        res = self.sess.get(url=url.format(self.gt, self.challenge, my_w, int(time.time()*1000), headers=self.headers))
        print("get_php: post w: {}".format(res.text))

    def ajax_php(self, my_enc):
        url = "https://api.geetest.com/ajax.php?gt={}&challenge={}&lang=zh-cn&pt=0&client_type=web&w={}&callback=geetest_{}"
        # res = self.sess.get(url=url.format(self.gt, self.challenge, self.my_w, int(time.time() * 1000), headers=self.headers))
        res = self.sess.get(url=url.format(self.gt, self.challenge, my_enc, int(time.time() * 1000), headers=self.headers))
        print("ajax_php: post w: {}".format(res.text))

    def get_php2(self):
        # url = "https://api.geetest.com/get.php?is_next=true&type={}&gt={}&challenge={}&lang=zh-cn&https=true&protocol=https%3A%2F%2F&offline=false&product=float&api_server=api.geetest.com&isPC=true&width=100%25&callback=geetest_{}"
        url = "https://api.geetest.com/get.php?is_next=true&type=slide3&gt={}&challenge={}&lang=zh-cn&https=true&protocol=https%3A%2F%2F&offline=false&product=embed&api_server=api.geetest.com&isPC=true&width=100%25&callback=geetest_{}"
        res = self.sess.get(url=url.format(self.gt, self.challenge, int(time.time() * 1000), headers=self.headers))
        print("get_php2: post w: {}".format(res.text))

    def ajax_php2(self, my_enc):
        url = "https://api.geetest.com/ajax.php?gt={}&challenge={}&lang=zh-cn&pt=0&client_type=web&w={}&callback=geetest_{}"
        """轨迹"""

    pass


if __name__ == '__main__':
    begin = GeeTest()

    begin.get_gt_challenge()
    begin.get_type()

    token = begin.get_token()
    begin.get_w(token)

    my_o = begin.get_o(token)
    my_n = begin.get_n(token)
    my_w = my_o+my_n  # my_w = begin.get_w(token1) w 参数也可以一次性生成，但是不太好，因为后面使用到了o参数
    begin.get_php1(my_w)
    begin.ajax_php(my_o)  # 这个 w 参数是前面的第一步生成的 o 参数
    begin.get_php2()

    pass