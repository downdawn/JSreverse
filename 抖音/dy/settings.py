# -*- coding: utf-8 -*-
#
pc_headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36"
}

# 获取无水印视频需手机端ua
phone_headers = {
    "user-agent": "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko)"
                  " Chrome/80.0.3987.122 Mobile Safari/537.36",
}

# nodejs获取signature参数接口
get_sig_url = "http://127.0.0.1:3000"

# 请求视频接口
xhr_url = "https://www.amemv.com/web/api/v2/aweme/post/"

# 分享页
share_url = 'https://www.amemv.com/share/user/{}'

# 请求视频接口参数
video_params = {
    # 用户 id
    'user_id': '',
    # 加密 uid，本接口下默认为空
    'sec_uid': '',
    # 请求数量，固定值不变，
    'count': 21,
    # 本次请求视频最大值，可从上一次请求的 response 中获取，初始为 0
    'max_cursor': 0,
    # appid 固定不变
    'aid': 1128,
    # 加密签名
    '_signature': '',
    # 用户 token
    'dytk': ''
}
