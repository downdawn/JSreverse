# -*- coding: utf-8 -*-
import re
import json
import time
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from 抖音.settings import *


class HandleVideo(object):
    def __init__(self, share_ids):
        self.pc_headers = pc_headers
        self.phone_headers = phone_headers
        self.share_id = share_ids

    def get_params(self):  # 获取dytk和tac参数
        # share_id = '88445518961'
        share_url = 'https://www.iesdouyin.com/share/user/{}'.format(self.share_id)

        response = requests.get(url=share_url, headers=self.pc_headers)
        # print(response.text)

        dytk_search = re.compile("dytk: '(.*?)'")
        tac_search = re.compile("<script>tac=(.*?)</script>")

        dytk = re.search(dytk_search, response.text).group(1)
        tac = "var tac=" + re.search(tac_search, response.text).group(1) + ";"

        print(dytk)
        print(tac)
        return dytk, tac

    def get_signature(self, tac):  # 拼接js构建HTML，获取signature参数
        with open(r'html_head', 'r') as f1:
            f1_read = f1.read()

        with open(r'html_foot', 'r') as f2:
            f2_read = f2.read().replace('&&&', self.share_id)

        with open(r'result.html', 'w') as f3:
            f3.write(f1_read + '\n' + tac + '\n' + f2_read)

        # 方式一：请求分享页，取得返回结果
        signature = input('输入秘钥：')

        # # 方式二：使用webdriver获取本地HTML渲染的signature结果，有bug
        # # 建议把结果推到自己的服务器上，get获取
        # chrome_options = Options()
        # chrome_options.add_argument('--start-maximized')
        # # 打开开发者模式, 隐藏驱动
        # chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])
        #
        # driver = webdriver.Chrome(options=chrome_options)
        # result_url = r'file://G:\project\抖音\result.html'
        # driver.get(url=result_url)
        # time.sleep(2)
        # signature = driver.title
        # # print(driver.page_source)
        # print('signature', signature)
        # driver.quit()

        # # 方式三
        # response = requests.get(url='http://127.0.0.1:7000/')
        # signature = response.text
        # print(signature)
        return signature

    def parse_xhr(self, signature, dytk):  # 获取异步数据

        xhr_url = f"https://www.iesdouyin.com/web/api/v2/aweme/post/?user_id={self.share_id}&sec_uid=&count=21" \
                  f"&max_cursor=0&aid=1128&_signature={signature}&dytk={dytk}"
        print(xhr_url)
        while True:
            response = requests.get(url=xhr_url, headers=self.pc_headers)
            # print(json.loads(response.text))
            if not json.loads(response.text)["aweme_list"]:  # 获取结果列表为空，再次获取，不稳定
                time.sleep(1)
                print('获取失败')
                continue
            else:
                for item in json.loads(response.text)["aweme_list"]:
                    video_url = item['video']['play_addr']['url_list'][0]
                    aweme_id = item['aweme_id']
                    print(video_url)
                    # self.save_video(video_url, aweme_id)
                break

    def save_video(self, video_url, aweme_id):  # 保存视频到本地
        # headers要改为手机的headers
        response = requests.get(url=video_url, headers=self.phone_headers)
        with open(r'./videos/{}.mp4'.format(aweme_id), 'wb') as f:  # 文件名可以用md5加密处理
            f.write(response.content)

    def main(self):
        dytk, tac = self.get_params()
        signature = self.get_signature(tac=tac)
        self.parse_xhr(signature, dytk)


if __name__ == '__main__':
    share_id = '88445518961'  # 分享id
    test = HandleVideo(share_id)
    test.main()
