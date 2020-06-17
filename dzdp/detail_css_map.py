# -*- coding: utf-8 -*-

import re
import requests
from lxml import etree

from settings import review_url, detail_headers


class DetailCssMap(object):
    """
    大众点评,详情页面信息爬虫
    css字体映射(svg)
    """
    def __init__(self, shop_id):
        self.shop_id = shop_id
        self.review_html = ""
        self.css_html = ""
        self.address_svg_url = ""
        self.phone_svg_url = ""
        self.review_svg_url = ""
        self.font_size = 14
        self.headers = detail_headers

    def get_review_html(self):
        """初步获取点评页面的HTML"""
        url = review_url.format(self.shop_id)
        response = requests.get(url=url, headers=self.headers)
        self.review_html = response.text

    def get_svg_urls(self):
        """获取全部svg的url"""
        re_info = re.search(r'href="//s3plus(.*?)"', self.review_html)
        if re_info:
            css_url = "http://s3plus" + re_info.group(1)
            response = requests.get(url=css_url, headers=self.headers)
            self.css_html = response.text

            # 获取商家地址使用的svg的url
            re_info1 = re.search(r'bb\[class.*?url\((.*?)\);', self.css_html)
            self.address_svg_url = "http:" + re_info1.group(1)

            # 获取商家电话号码使用的svg的url
            re_info2 = re.search(r'cc\[class.*?url\((.*?)\);', self.css_html)
            self.phone_svg_url = "http:" + re_info2.group(1)

            # 获取评论使用的svg的url
            re_info3 = re.search(r'svgmtsi\[class.*?url\((.*?)\);', self.css_html)
            self.review_svg_url = "http:" + re_info3.group(1)

            print(self.address_svg_url, self.phone_svg_url, self.review_svg_url)

    def refresh_html(self, reg, res_sub, font_list, method, review_index=None):
        """获取反反爬后的字体，并且替换原网页里的内容"""
        re_info = re.findall(r'{}'.format(reg), self.review_html)

        for info in re_info:
            res = '{}{{background:-(.*?).0px -(.*?).0px;}}'.format(info)
            re1 = re.search(r'{}'.format(res), self.css_html)
            _x = int(re1.group(1))
            _y = int(re1.group(2))
            # print(_x, _y)
            font = method(font_list, _x, _y, review_index)

            # 替换点评页面的字体反爬内容
            reg_sub = res_sub.format(info)
            self.review_html = re.sub(reg_sub, font, self.review_html)

    def get_font_dict(self, url, reg, flag=None):
        """获取字体字典列表"""
        response = requests.get(url=url, headers=self.headers)
        re_infos = re.findall(r'{}'.format(reg), response.text)
        font_list = list()
        for info in re_infos:
            font_dict = dict()
            # 评论页的svg处理
            if flag:
                font_dict["{}".format(info[0])] = [int(info[1])]
                font_list.append(font_dict)
            else:
                font_dict["{}".format(info[0])] = [font for font in info[1]]
                font_list.append(font_dict)
        return font_list

    def class_to_font(self, font_list, x, y, review_index):
        """
        css属性匹配对应字体
        1、找到第一个key大于y的字体列表
        2、根据x除以字体宽度大小作为索引，找到对应字体
        """
        key = x // self.font_size
        font = list()
        index = list()
        # 如果review_index存在，则是评论的处理
        if review_index:
            for index_dict in review_index:
                for k, v in index_dict.items():
                    if int(v[0]) >= y:
                        index.append(int(k))
                        break
            font = list()
            for font_dict in font_list:
                for k, v in font_dict.items():
                    if int(k) == index[0]:
                        font.append(v[key])
                        break
            return font[0]
        # 地址和电话字体处理
        else:
            for font_dict in font_list:
                for k, v in font_dict.items():
                    if int(k) >= y and key < len(v):
                        font.append(v[int(key)])
                        break
            return font[0]

    def get_font_maps(self):
        """获取字体映射字典"""
        # 地址
        add_reg = '<text.*?y="(.*?)">(.*?)<'
        addr_font_list = self.get_font_dict(self.address_svg_url, add_reg)
        print("addr_font_list", addr_font_list)

        reg = '<bb class="(.*?)"></bb>'
        reg_sub = '<bb class="{}"></bb>'
        self.refresh_html(reg, reg_sub, addr_font_list, method=self.class_to_font)

        # 电话
        phone_reg = '<text.*?y="(.*?)">(.*?)<'
        phone_font_list = self.get_font_dict(self.phone_svg_url, phone_reg)
        print("phone_font_list", phone_font_list)

        reg = '<cc class="(.*?)"></cc>'
        reg_sub = '<cc class="{}"></cc>'
        self.refresh_html(reg, reg_sub, phone_font_list, method=self.class_to_font)

        # 评论
        review_reg = '<textPath.*?href="#(.*?)".*?>(.*?)<'
        review_font_list = self.get_font_dict(self.review_svg_url, review_reg)
        print("review_font_list", review_font_list)

        review_reg = '<path id="(.*?)" d="M0 (.*?) H600"/>'
        review_font_index = self.get_font_dict(self.review_svg_url, review_reg, flag=True)
        print("review_font_index", review_font_index)

        reg = '<svgmtsi class="(.*?)"></svgmtsi>'
        reg_sub = '<svgmtsi class="{}"></svgmtsi>'
        self.refresh_html(reg, reg_sub, review_font_list, method=self.class_to_font, review_index=review_font_index)

    def parse_data(self):
        """解析替换后的html，获取地址，电话，评论信息"""
        item = dict()
        html = etree.HTML(self.review_html)
        address_info = html.xpath("//div[@class='address-info']/text()")[0].strip()
        phone_info = html.xpath("//div[@class='phone-info']/text()")[0].strip()
        review_infos = html.xpath("//div[@class='review-truncated-words']/text()")
        review_info = [info.strip() for info in review_infos]
        item["address_info"] = address_info
        item["phone_info"] = phone_info
        item["review_info"] = review_info
        return item

    def run(self):
        """主函数"""
        self.get_review_html()
        self.get_svg_urls()
        self.get_font_maps()
        result = self.parse_data()
        return result


if __name__ == '__main__':
    _shop_id = "FU8Gnkledt9y1i4z"
    test = DetailCssMap(shop_id=_shop_id)
    print(test.run())
