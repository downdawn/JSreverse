# -*- coding: utf-8 -*-

# 抖音无水印视频解析
import json
import re

import requests

# url = "https://v.douyin.com/J6LkjFM/"
#
# headers = {
#     "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
# }
#
# response = requests.get(url=url, headers=headers, allow_redirects=False)
#
# location = response.headers.get("location")
# print(response.status_code)
# print(location)
#
# v_id = re.search(r'video/(.*?)/', location).group(1)
# print(v_id)
#
# xhr_url = "https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids={}".format(v_id)
#
# response2 = requests.get(url=xhr_url, headers=headers)
# print(response2.status_code)
# data = response2.json()
# print(type(data), data)
#
# v_url = data['item_list'][0]['video']['play_addr']['url_list'][0]
# print(v_url)
#
# v_id = re.search(r'video_id=(.*?)&', v_url).group(1)
# print(v_id)
#
# wsy_url = "https://aweme-hl.snssdk.com/aweme/v1/play/?video_id={}".format(v_id)
#
# sj_headers = {
#     "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"
# }
# response3 = requests.get(url=wsy_url, headers=sj_headers, allow_redirects=False)
#
# print(response3.status_code)
# print(response3.headers.get('location'))


headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
}

sj_headers = {
    "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"
}


class ParseVideo(object):
    """
    根据分享链接，解析抖音无水印视频
    """

    def __init__(self, url):
        self.url = url
        self.xhr_url = "https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids={}"
        self.wsy_url = "https://aweme-hl.snssdk.com/aweme/v1/play/?video_id={}"
        self.headers = headers
        self.sj_headers = sj_headers

    def get_url_id(self):
        """
        获取跳转后的id
        """
        response = requests.get(url=self.url, headers=self.headers, allow_redirects=False)

        location = response.headers.get("location")

        url_id = re.search(r'video/(.*?)/', location).group(1)
        print(url_id)

        return url_id

    def get_video_id(self, v_id):
        """
        获取video_id
        """
        url = self.xhr_url.format(v_id)

        response = requests.get(url=url, headers=self.headers)
        data = response.json()
        print(json.dumps(data))
        # v_url = data['item_list'][0]['video']['play_addr']['url_list'][0]
        # video_id = re.search(r'video_id=(.*?)&', v_url).group(1)

        video_id = data['item_list'][0]['video']['vid']
        dynamic_cover = data['item_list'][0]['video']['dynamic_cover']["url_list"][0]

        print(video_id)

        return video_id

    def get_real_url(self, v_id):
        """获取无水印url"""
        url = self.wsy_url.format(v_id)

        response = requests.get(url=url, headers=self.sj_headers, allow_redirects=False)

        real_url = response.headers.get('location')
        print(real_url)
        return real_url

    def run(self):
        url_id = self.get_url_id()
        video_id = self.get_video_id(url_id)
        self.get_real_url(video_id)


if __name__ == '__main__':
    share_url = "https://v.douyin.com/J6LkjFM/"
    test = ParseVideo(url=share_url)
    test.run()
