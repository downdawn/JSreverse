# -*- coding: utf-8 -*-

import re
from lxml import etree

import requests
from fontTools.ttLib import TTFont

from settings import list_headers, file_path


class ListWoffEncryption(object):
    """
    大众点评，列表页信息爬虫
    woff字体加密
    """
    def __init__(self, food_url):
        self.food_url = food_url
        self.list_html = ""
        self.xml_path = file_path + '/font.xml'
        self.headers = list_headers

    def get_list_html(self):
        """初步获取列表页面的HTML"""
        response = requests.get(url=self.food_url, headers=self.headers)
        self.list_html = response.text
        # print(self.list_html)

    def get_woff_url(self):
        """获取woff字体的url"""
        re_info = re.search(r'href="//s3plus(.*?)"', self.list_html)
        if re_info:
            woff_url = "http://s3plus" + re_info.group(1)
            response = requests.get(url=woff_url)
            # print(response.text)

            # 获取商家点评woff的url
            re_info1 = re.search(r'font-family.*?shopNum.*?format.*?url\("(.*?)"\)', response.text)

            shop_woff_url = "http:" + re_info1.group(1)
            print(shop_woff_url)

            filename = shop_woff_url.split('/')[-1]
            filepath = file_path + filename

            return shop_woff_url, filepath

    @staticmethod
    def save_woff_xml(xml_path, shop_woff_url, filepath):
        """保存woff到本地,转化成xml文件"""
        response = requests.get(url=shop_woff_url)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)

        # 转化成xml文件
        font = TTFont(filepath)  # 打开文件
        font.saveXML(xml_path)  # 转换成 xml 文件并保存

    def get_shop_num(self, name_id_list):
        """获取被加密的字体"""
        re_info = re.findall(r'<svgmtsi class="shopNum">&#(.*?);<', self.list_html, re.S)
        shop_list = list()  # 页面被加密的字符串列表
        for info in re_info:
            for name in name_id_list:
                for k, v in name.items():
                    if k == info:
                        shop_list.append(v)

                        # 替换列表页面的字体反爬内容
                        sub_old = '<svgmtsi class="shopNum">&#{};<'.format(info)
                        sub_new = '<svgmtsi class="shopNum">{}<'.format(v)

                        self.list_html = re.sub(sub_old, sub_new, self.list_html)
        print(shop_list)

    def class_name_id(self):
        """class和name，name和id的字典列表关系"""
        # self.xml_path = './woff_file/font.xml'
        with open(self.xml_path, 'r') as f:
            data = f.read()
            # class和name
            re_info = re.search(r'<cmap_format_4 platformID="0".*?>(.*?)</cmap_format_4>', data, re.S)
            re_info1 = re.findall(r'<map code="0(.*?)" name="(.*?)"/>', re_info.group(1))
            name_list = list()
            for info in re_info1:
                name_dict = dict()
                name_dict[info[0]] = info[1]
                name_list.append(name_dict)
            print('name_list', name_list)

            # name和id
            re_info2 = re.findall(r'<GlyphID id="(.*?)" name="(.*?)"/>', data, re.S)
            id_list = list()
            for info in re_info2:
                id_dict = dict()
                id_dict[info[1]] = str(int(info[0]) - 1)[-1]
                id_list.append(id_dict)
            print('id_list', id_list)

        name_id_list = list()
        for name in name_list:
            name_id_dict = dict()
            for k, v in name.items():
                for _id in id_list:
                    for k2, v2 in _id.items():
                        if v == k2:
                            name_id_dict[k] = v2
                            name_id_list.append(name_id_dict)
        print(name_id_list)
        return name_id_list

    def parse_data(self):
        """解析替换后的html，获取店铺名称， 点评数， 平均价格，评价得分列表"""
        html = etree.HTML(self.list_html)
        txt_info = html.xpath("//div[@class='txt']")
        result = list()
        for txt in txt_info:
            item = dict()
            item["title"] = txt.xpath(".//div[@class='tit']/a/@title")
            item["review_num"] = ''.join(txt.xpath(".//a[@class='review-num']//b//text()"))
            item["mean_price"] = ''.join(txt.xpath(".//a[@class='mean-price']//b//text()")).replace('￥', '')
            _comment = txt.xpath(".//span[@class='comment-list']/span")
            item["comment_list"] = list()
            for comment in _comment:
                item["comment_list"].append(''.join(comment.xpath("./b//text()")))
            result.append(item)
        # print(result)
        return result

    def run(self):
        self.get_list_html()
        shop_woff_url, filepath = self.get_woff_url()
        self.save_woff_xml(self.xml_path, shop_woff_url, filepath)
        name_id_list = self.class_name_id()
        self.get_shop_num(name_id_list)
        result = self.parse_data()
        return result


if __name__ == '__main__':
    _food_url = "http://www.dianping.com/xiamen/ch10/g112"
    test = ListWoffEncryption(food_url=_food_url)
    print(test.run())
