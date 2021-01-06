# -*- coding: utf-8 -*-

import requests
from lxml import etree

from mongodb_manager import MongoDbManager
from settings import get_cookie_url, activate_cookie_url, search_url, ua


class ZwSpider(object):
    """
    中国知网爬虫
    """

    def __init__(self, search_word, pages=1):
        self.search_word = search_word
        self.pages = pages
        self.get_cookie_url = get_cookie_url
        self.activate_cookie_url = activate_cookie_url
        self.search_url = search_url
        self.ua = ua
        self.session = requests.session()
        self.db = MongoDbManager()

    def get_cookie(self):
        """获取cookie"""
        print("Get cookie...")
        url = "https://kns.cnki.net/kns/brief/default_result.aspx"
        headers = {
            'Host': 'kns.cnki.net',
            'User-Agent': self.ua
        }

        response = requests.request("GET", url, headers=headers)
        cookies = requests.utils.dict_from_cookiejar(response.cookies)
        cookie = "ASP.NET_SessionId={}; SID_kns={}".format(cookies["ASP.NET_SessionId"], cookies["SID_kns"])
        print(cookie)
        return cookie

    def activate_cookie(self, cookie):
        """激活cookie"""
        print("Activate cookie...")
        payload = {
            'action': '',
            'ua': '1.11',
            'isinEn': '1',
            'PageName': 'ASP.brief_default_result_aspx',
            'DbPrefix': 'SCDB',
            'DbCatalog': '中国学术文献网络出版总库',
            'ConfigFile': 'SCDBINDEX.xml',
            'db_opt': 'CJFQ,CDFD,CMFD,CPFD,IPFD,CCND,CCJD',
            'txt_1_sel': 'SU$%=|',
            'txt_1_value1': self.search_word,
            'txt_1_special1': '%',
            'his': '0',
            'parentdb': 'SCDB',
            '__': 'Wed Nov 04 2020 10:49:20 GMT+0800 (中国标准时间)'
        }

        headers = {
            'Cookie': cookie,
            'Referer': 'https://kns.cnki.net/kns/brief/default_result.aspx',
            'User-Agent': self.ua
        }

        response = requests.request("POST", self.activate_cookie_url, headers=headers, data=payload)

        print(response.text)
        if "dbCatalog" in response.text:
            print("Cookie activation successful")
            return response.text

    def search(self, page, cookie):
        """搜索请求"""
        print("crawler page：", page)
        print("Cookie used by crawlers：", cookie)

        # params = {
        #     "pagename": "ASP.brief_default_result_aspx",
        #     "isinEn": "1",
        #     "dbPrefix": "SCDB",
        #     "dbCatalog": "中国学术文献网络出版总库",
        #     "ConfigFile": "SCDBINDEX.xml",
        #     "research": "off",
        #     "t": "1604453881218",
        #     "keyValue": "传感器",
        #     "S": "1",
        #     "sorttype": ""
        # }

        params = {
            "curpage": "{}".format(page),
            "RecordsPerPage": "20",
            "QueryID": "3",
            "ID": "",
            "turnpage": "1",
            "tpagemode": "L",
            "dbPrefix": "SCDB",
            "Fields": "",
            "DisplayMode": "listmode",
            "PageName": "ASP.brief_default_result_aspx",
            "isinEn": "1",
            "": ""
        }

        headers = {
            'Cookie': cookie,
            'User-Agent': self.ua,
        }

        response = self.session.request("GET", self.search_url, headers=headers, params=params)
        print(response.status_code)
        print(response.url)
        if response.status_code == 200:
            data = self.parse_data(response.text)
            return data

    def parse_data(self, text):
        """解析列表页数据"""
        data = etree.HTML(text)
        tr_list = data.xpath("//table[@class='GridTableContent']//tr")[1:]
        data = []
        for tr in tr_list:
            item = {}

            href = tr.xpath(".//a[@class='fz14']/@href")
            if href:
                url = "https://kns.cnki.net" + href[0]
                # print(url)
                item["url"] = url

            title = tr.xpath(".//a[@class='fz14']//text()")
            item["title"] = ''.join(title)

            author = tr.xpath(".//td[@class='author_flag']//text()")
            author = [i.strip() for i in author]
            item["author"] = ''.join(author)

            origin = tr.xpath(".//td[@class='author_flag']/following-sibling::td[1]//text()")
            origin = [i.strip() for i in origin]
            item["origin"] = ''.join(origin)

            published_time = tr.xpath(".//td[@class='author_flag']/following-sibling::td[2]//text()")
            published_time = [i.strip() for i in published_time]
            item["published_time"] = ''.join(published_time)

            database = tr.xpath(".//td[@class='author_flag']/following-sibling::td[3]//text()")
            database = [i.strip() for i in database]
            item["database"] = ''.join(database)

            data.append(item)
        print(len(data), data)
        return data

    def get_real_url(self, url, cookie, referer):
        """获取跳转后的真实详情页url"""
        print("Get real url")
        headers = {
            'Cookie': cookie,
            'User-Agent': self.ua,
            "Referer": referer
        }
        response = requests.request("GET", url=url, headers=headers, allow_redirects=False)
        # print(response.status_code)
        # print(type(response.headers), response.headers)
        location = response.headers["Location"]
        # print(location)
        real_url = "https://kns.cnki.net" + location
        # print(real_url)
        return real_url

    def parse_detail(self, data, cookie, referer):
        """解析详情页，并且保存到数据库"""
        for item in data:
            url = item["url"]
            real_url = self.get_real_url(url, cookie, referer)

            headers = {
                'Cookie': cookie,
                'User-Agent': self.ua,
            }
            response = requests.request("GET", url=real_url, headers=headers)
            # print(response.text)

            data = etree.HTML(response.text)

            summary = data.xpath("//span[@id='ChDivSummary']/text()")
            item["summary"] = ''.join(summary)

            key = data.xpath("//span[@class='rowtit']/following-sibling::p/preceding-sibling::span/text()")
            _values = data.xpath("//span[@class='rowtit']/following-sibling::p")
            values = []
            for _value in _values:
                value = _value.xpath(".//text()")
                value = [i.strip() for i in value]
                if value:
                    values.append(value[0])

            # print(len(key), key)
            # print(len(values), values)
            _item = dict(zip(key, values))
            # print(_item)

            for k, v in _item.items():
                if "关键词" in k:
                    item["keyword"] = v

                if "基金资助" in k:
                    item["funding"] = v

                if "DOI" in k:
                    item["doi"] = v

                if "专辑" in k:
                    item["album"] = v

                if "专题" in k:
                    item["special"] = v

                if "分类号" in k:
                    item["class_number"] = v
            print(item)

            self.db.save(item)

    def run(self):
        """主函数"""
        cookie = self.get_cookie()
        referer = self.activate_cookie(cookie)
        if referer:
            # 设置页数
            for page in range(self.pages):
                data = self.search(page + 1, cookie)
                self.parse_detail(data, cookie, referer)


if __name__ == '__main__':
    word = "传感器"
    page = 2
    test = ZwSpider(search_word=word, pages=page)
    test.run()
