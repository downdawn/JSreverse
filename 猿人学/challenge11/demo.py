# -*- coding: utf-8 -*-

import requests
import execjs
from lxml import etree


class Challenge11(object):
    def __init__(self):
        self.base_url = "http://www.python-spider.com/challenge/11"
        self.session = requests.session()
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
        }
        self.cookie = {
            "sessionid": "f74g8tbgnejqapv52pbxz6r2bnjj482w"
        }

    def get_cookie(self):
        response = self.session.get(self.base_url, headers=self.headers, cookies=self.cookie)
        response_js = response.text[8:-9]
        response_js = response_js.replace('eval', 'JSCode = ')

        global_var = """
            var document = {
                'cookie': '',
                'createElement': createElement,
                'attachEvent':attachEvent
            };
            function setTimeout(a,b) {
    
            }
            function attachEvent() { }
            function createElement(a) {
                return {
                    'firstChild': {'href': 'http://www.python-spider.com/challenge/11'}
                }
            }
        """

        end_js = """
        function get_cookie() {
            eval(JSCode);
            _N();
            console.log('document -->>', document.cookie)
            __jsl_clearance = document.cookie.split(';')[0].split('=')[1]
    
            return __jsl_clearance
            }
        """

        str_js = global_var + response_js + end_js

        js = execjs.compile(str_js)  # 加载 JS 代码
        result = js.call("get_cookie")
        print(result)

        return result

    def get_data(self, cookie):
        self.cookie["__jsl_clearance"] = cookie
        response = self.session.get(url=self.base_url, cookies=self.cookie, headers=self.headers)
        # print(response.text)
        html = etree.HTML(response.text)
        values = html.xpath("//td/text()")

        values = [int(value.strip()) for value in values]
        print(values)
        print(sum(values))

    def run(self):
        cookie = self.get_cookie()
        self.get_data(cookie)


if __name__ == '__main__':
    test = Challenge11()
    test.run()
