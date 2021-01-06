#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import functools
import io

import numpy as np
import requests
from PIL import Image

session = requests.session()


def captcha():
    url = "https://bulletin.cebpubservice.com/captcha/captcha/captchaImage"
    r = session.post(url).json()
    # {
    #      滑块图片
    #     "smallImgName": "small_source_16_b3e3e393c77e35a4.png",
    #      带缺口的背景图
    #     "bigImgName": "big_source_16_b3e3e393c77e35a4.png",
    #      不带缺口的背景图
    #     "sourceImgName": "24.png",
    #     本次验证的id
    #     "dataToken": "08ef78ac101248b5b1cd6918916519c9",
    #      滑块的垂直位置
    #     "location_y": "16"
    # }
    print(f"获取图片： {r}")

    # 下载带缺口的背景图
    url = "https://bulletin.cebpubservice.com/captcha/captcha/image/" + r["bigImgName"]
    image_1 = Image.open(io.BytesIO(session.get(url).content))
    # 下载不带缺口的背景图
    image_2 = download_background_raw(r["sourceImgName"])
    top = int(r["location_y"])

    # for debug
    image_1.save("./captcha-01.png")
    image_2.save("./captcha-02.png")

    answer = diff(image_1, image_2, top)
    url = "https://bulletin.cebpubservice.com/captcha/captcha/checkCaptcha"
    data = {
        "dataToken": r["dataToken"],
        "point": answer
    }
    print(f"提交data = {data}")
    r = session.post(url, data)
    print(r.status_code)
    print(r.text)


def diff(image_1, image_2, top):
    """
    将两张图片转为像素矩阵，从左往右比较第一个不同的像素点的位置
    :param image_1:
    :param image_2:
    :param top:
    :return:
    """
    image_matrix_1 = np.asarray(image_1)
    image_matrix_2 = np.asarray(image_2)
    for x in range(0, len(image_matrix_1[0])):
        for y in range(top, top + 20):
            p1 = image_matrix_1[y, x]
            p2 = image_matrix_2[y, x]
            if (p1 != p2).any():
                return x - 10
    return -1


@functools.lru_cache(maxsize=25)
def download_background_raw(index_with_extension):
    """
    当实际生产环境中要跑很多次的时候，背景图可以用缓存避免重复下载？就怕访问日志里被发现了...
    :param index_with_extension:
    :return:
    """
    url = f"https://bulletin.cebpubservice.com/captcha/captcha/image/" + index_with_extension
    return Image.open(io.BytesIO(session.get(url).content))


if __name__ == "__main__":
    captcha()
