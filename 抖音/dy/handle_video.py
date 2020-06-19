# -*- coding: utf-8 -*-
import codecs
import re
import json
from urllib.parse import urlencode

import requests
from dy.settings import pc_headers, phone_headers, get_sig_url, xhr_url, video_params


class HandleVideo(object):
    """获取抖音视频数据"""

    def __init__(self, share_ids, max_cursor=0):
        self.share_id = share_ids
        self.max_cursor = max_cursor  # 下一页请求参数

    def get_params(self):
        """获取dytk和tac参数"""
        # share_id = '88445518961'
        share_url = 'https://www.iesdouyin.com/share/user/{}'.format(self.share_id)

        try:
            response = requests.get(url=share_url, headers=pc_headers)
            dytk_search = re.compile("dytk: '(.*?)'")
            tac_search = re.compile("<script>tac='(.*?)'</script>")

            dytk = re.search(dytk_search, response.text).group(1)
            tac = re.search(tac_search, response.text).group(1)

            return dytk, tac

        except Exception as e:
            raise Exception("获取dytk和tac参数异常", e)

    def get_signature(self, tac):
        """拼接js构建HTML，获取signature参数"""
        # 恢复 tac 字符串中转义字符转义功能
        new_tac = codecs.getdecoder("unicode_escape")(tac.encode())[0]
        params = {
            "uid": str(self.share_id),
            "tac": new_tac
        }
        try:
            response = json.loads(requests.get(url=get_sig_url, params=urlencode(params)).text)
            if response and response["code"] == 200:
                signature = response["data"]
                print(signature)
                return signature
        except Exception as e:
            raise Exception("获取signature参数异常", e)

    def parse_xhr(self, signature, dytk):
        """获取异步数据"""
        video_params["user_id"] = self.share_id
        video_params["max_cursor"] = self.max_cursor
        video_params["_signature"] = signature
        video_params["dytk"] = dytk

        try:
            response = requests.get(url=xhr_url, params=video_params, headers=pc_headers)
        except Exception as e:
            raise Exception("请求视频接口异常", e)

        if response:
            data = json.loads(response.text)
            items = dict()
            items["has_more"] = data["has_more"]  # 判断是否还有下一页数据
            items["max_cursor"] = data["max_cursor"]  # 下一页请求参数

            items["video_list"] = list()
            for info in data["aweme_list"]:
                videos = dict()
                videos["aweme_id"] = info['aweme_id']
                videos["desc"] = info['desc']
                videos["video_url"] = info['video']['play_addr']['url_list'][0]
                videos["dynamic_cover"] = info['video']['dynamic_cover']["url_list"][0]
                items["video_list"].append(videos)
            print(json.dumps(items))
            return items

    def main(self):
        try:
            dytk, tac = self.get_params()
            signature = self.get_signature(tac=tac)
            result = self.parse_xhr(signature, dytk)
            result["code"] = 200
            return result
        except Exception as e:
            result = {
                "code": 400,
                "errmsg": e
            }
            return result


class SaveVideo(object):
    """保存无水印视频"""

    def __init__(self, video_url, aweme_id):
        self.video_url = video_url
        self.aweme_id = aweme_id

    def save_video(self):
        """保存视频到本地"""
        # headers要改为手机的headers
        response = requests.get(url=self.video_url, headers=phone_headers)
        return response.content
        # with open(r'./videos/{}.mp4'.format(self.aweme_id), 'wb') as f:  # 文件名可以用md5加密处理
        #     f.write(response.content)


if __name__ == '__main__':

    # 测试获取视频列表数据
    share_id = '88445518961'  # 分享id
    test = HandleVideo(share_id)
    print(test.main())

    # # 测试获取无水印视频
    # v_url = "https://aweme.snssdk.com/aweme/v1/play/?video_id=v0200f040000bp3lv8s9hq5o106ijbt0&line=0&ratio=54" \
    #         "0p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&is_support_h265=0&source=PackSourceEnum_PUBLISH"
    # a_id = "6793503760141405453"
    # video = SaveVideo(v_url, a_id)
    # print(video.save_video())
