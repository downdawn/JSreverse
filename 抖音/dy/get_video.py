# -*- coding: utf-8 -*-

import requests
from flask import Flask, make_response

from dy.settings import phone_headers

app = Flask(__name__)


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


@app.route('/')
def index():
    v_url = "https://aweme.snssdk.com/aweme/v1/play/?video_id=v0200f040000bp3lv8s9hq5o106ijbt0&line=0&ratio=54" \
            "0p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&is_support_h265=0&source=PackSourceEnum_PUBLISH"
    a_id = "6793503760141405453"
    video = SaveVideo(v_url, a_id)
    data = video.save_video()

    # 返回响应内容
    resp = make_response(data)
    # 设置内容类型
    resp.headers['Content-Type'] = 'audio/mp4'
    return resp


if __name__ == '__main__':
    app.run(debug=True)
