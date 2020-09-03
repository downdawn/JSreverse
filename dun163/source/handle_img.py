#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time     : 2020/8/8 10:11
# @Author   : qizai
# @File     : handle_img.py
# @Software : PyCharm
"""
cv.adaptiveThreshold(src, thresh, maxval, type, dst=None)
    src: 源图像，要是灰度图像
    thresh: 阈值，用于对像素值进行分类
    maxval: 分配给超过阈值的像素值的最大值
    type: 指定阈值类型；下面会列出具体类型
    dst: 目标图像

OpenCV提供了不同类型的阈值：
    cv.THRESH_BINARY            dst(x,y) = maxval, if src(x,y)>thresh; else：dst(x,y) = 0            二值化阈值处理。大于127的像素点会被处理为255，其余处理为0
    cv.THRESH_BINARY_INV        dst(x,y) = 0, if src(x,y)>thresh;      else：dst(x,y) = maxval       反二值化阈值处理。灰度值大于127的像素点处理为0，其余为255
    cv.THRESH_TRUNC             dst(x,y) = threshold, if src(x,y)>thresh; else：dst(x,y) = src(x,y)  截断阈值化处理。大于127的像素点处理为127，其余保持不变
    cv.THRESH_TOZERO            dst(x,y) = src(x,y), if src(x,y)>thresh; else：dst(x,y) = 0          低阈值零处理。大于127的像素点保持不变，其余处理为0
    cv.THRESH_TOZERO_INV        dst(x,y) = 0, if src(x,y)>thresh; else：dst(x,y) = src(x,y)          超阈值零处理。大于127的像素点处理为0，其余保持不变
    cv.ADAPTIVE_THRESH_MEAN_C:  阈值是邻近区域的平均值减去常数C  参考：https://www.cnblogs.com/GaloisY/p/11037350.html

"""


import os
import math
import random
import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt
import copy


def show(name):
    cv.imshow('Show', name)
    cv.waitKey(0)
    cv.destroyAllWindows()


class HandleSliderImg(object):

    def __init__(self, bg_path, small_img_path):
        self.img_big = cv.imread(bg_path, 0)  # 第二个参数是以什么模式读取图片
        self.img_small = cv.imread(small_img_path, 0)
        cv.imwrite("../statics/demo_img/img_big.png", self.img_big)
        cv.imwrite("../statics/demo_img/img_small.png", self.img_small)
        self.img_big = cv.imread("../statics/demo_img/img_big.png")
        self.img_small = cv.imread("../statics/demo_img/img_small.png")
        self.img_big_gray = cv.cvtColor(self.img_big, cv.COLOR_BGR2GRAY)
        self.handle_small_img()

    def handle_small_img(self):
        """对滑块进行下一步处理，去除空白"""
        img_gray = cv.cvtColor(self.img_small, cv.COLOR_BGR2GRAY)

        # 初始化目标小图滑块的左上角、右下角坐标
        (left_up_y, left_up_x), (right_down_y, right_down_x) = (0, 0), (0, 0)
        flag_y_start = False
        for index_y, one_row in enumerate(img_gray):
            if sum(one_row) == 0:
                # 获取图片最下边的坐标 y
                if flag_y_start:
                    right_down_y = index_y + 1
                    break
                continue

            # 获取图片最上边的坐标 y
            if not flag_y_start:
                left_up_y = index_y - 1
                # 同时标记已经出现了y
                flag_y_start = True

            flag_x_start = False
            for index_x, one_column in enumerate(one_row):

                if one_column == 0:
                    # 获取图片最右边的坐标 x
                    if flag_x_start and index_x > right_down_x:
                        right_down_x = index_x - 1
                    continue
                else:
                    # 获取图片最左边的坐标 x
                    if index_x < left_up_x or left_up_x == 0:
                        left_up_x = index_x - 1
                        flag_x_start = True

        self.target_img = img_gray[left_up_y:right_down_y, left_up_x:right_down_x]
        cv.imwrite("../statics/demo_img/target.png", self.target_img)
        self.target_img = cv.imread("../statics/demo_img/target.png")
        return self.target_img

    def img_to_binarization(self, image):
        """对滑块进行二值化处理"""
        kernel = np.ones((8, 8), np.uint8)  # 去滑块的前景噪声内核
        gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
        width, heigth = gray.shape
        for h in range(heigth):
            for w in range(width):
                if gray[w, h] == 0:
                    gray[w, h] = 96
        binary = cv.inRange(gray, 96, 96)
        res = cv.morphologyEx(binary, cv.MORPH_OPEN, kernel)  # 开运算去除白色噪点
        return res

    # 模板匹配(用于寻找缺口有点误差)
    def template_match(self):
        tpl = self.img_to_binarization(self.target_img)  # 误差来源就在于滑块的背景图为白色
        blurred = cv.GaussianBlur(self.img_big, (3, 3), 0)  # 目标图高斯滤波
        gray = cv.cvtColor(blurred, cv.COLOR_BGR2GRAY)
        ret, target = cv.threshold(gray, 127, 255, cv.THRESH_BINARY)  # 目标图二值化
        method = cv.TM_CCOEFF_NORMED
        width, height = tpl.shape[:2]
        result = cv.matchTemplate(target, tpl, method)

        # 寻找矩阵(一维数组当作向量,用Mat定义) 中最小值和最大值的位置
        min_val, max_val, min_loc, max_loc = cv.minMaxLoc(result)
        left_up = max_loc
        right_down = (left_up[0] + height, left_up[1] + width)

        # 绘制矩形边框，将匹配区域标注出来
        # self.img_big：目标图像
        # left_up：矩形的左上角位置
        # right_down：矩形的右下角位置
        # (0,0,255)：矩形边框颜色
        # 1：矩形边框大小
        cv.rectangle(self.img_big, left_up, right_down, (7, 249, 151), 1)
        cv.imwrite("../statics/demo_img/result.png", self.img_big)
        # show(self.img_big)
        return (left_up, right_down)

    def main(self):
        return self.template_match()

    pass


class HandleSliderImg2(object):

    def __init__(self, bg_path, small_img_path):
        self.bg_path = bg_path
        self.small_img_path = small_img_path

    def main(self):
        target = cv.imread(self.small_img_path, 0)
        template = cv.imread(self.bg_path, 0)
        width, height = target.shape[::-1]
        temp = "../statics/demo_img/img_small2.png"
        targ = "../statics/demo_img/img_big2.png"
        cv.imwrite(temp, template)
        cv.imwrite(targ, target)
        target = cv.imread(targ)
        target = cv.cvtColor(target, cv.COLOR_BGR2GRAY)
        target = abs(255 - target)
        cv.imwrite(targ, target)
        target = cv.imread(targ)
        template = cv.imread(temp)
        result = cv.matchTemplate(target, template, cv.TM_CCOEFF_NORMED)
        y, x = np.unravel_index(result.argmax(), result.shape)
        # 展示圈出来的区域
        left_up = (x, y)
        right_down = (left_up[0] + width, left_up[1] + height)
        cv.rectangle(template, left_up, right_down, (7, 249, 151), 2)
        cv.imwrite("../statics/demo_img/result2.png", template)
        # show(template)
        return (left_up, right_down)

    pass


class HandleSliderImg3(object):
    def __init__(self, target, template):
        self.target = target
        self.template = template

    def main(self):
        target = self.target
        template = self.template
        left_x = 0
        img_rgb = cv.imread(target)
        img_gray = cv.cvtColor(img_rgb, cv.COLOR_BGR2GRAY)
        template = cv.imread(template, 0)
        run = 1
        w, h = template.shape[::-1]
        print(w, h)
        res = cv.matchTemplate(img_gray, template, cv.TM_CCOEFF_NORMED)
        run = 1

        # 使用二分法查找阈值的精确值
        L = 0
        R = 1
        while run < 20:
            run += 1
            threshold = (R + L) / 2
            if threshold < 0:
                return [[-1]]
            loc = np.where(res >= threshold)
            if len(loc[1]) > 1:
                L += (R - L) / 2
            elif len(loc[1]) == 1:
                left_x = loc[1][0] + 1
                print('目标区域起点x坐标为：%d' % left_x)
                break
            elif len(loc[1]) < 1:
                R -= (R - L) / 2
        cv.rectangle(img_rgb, (left_x, 0), (left_x+10, 100), (7, 249, 151), 2)
        cv.imwrite("../statics/demo_img/result3.png", img_rgb)
        return [[left_x]]


class HandleSliderImg4(object):

    def __init__(self, bg_path, small_img_path):
        self.big_path = bg_path
        self.small_img_path = small_img_path
        self.img_big = cv.imread(bg_path)  # 第二个参数是以什么模式读取图片
        self.img_small = cv.imread(small_img_path)
        self.handle_small_img(copy.deepcopy(self.img_small))

    def handle_small_img(self, img_small):
        """对滑块进行下一步处理，去除空白"""
        img_gray = cv.cvtColor(img_small, cv.COLOR_BGR2GRAY)

        # 初始化目标小图滑块的左上角、右下角坐标
        (left_up_y, left_up_x), (right_down_y, right_down_x) = (0, 0), (0, 0)
        flag_y_start = False
        for index_y, one_row in enumerate(img_gray):
            if sum(one_row) == 0:
                # 获取图片最下边的坐标 y
                if flag_y_start:
                    right_down_y = index_y + 1
                    break
                continue

            # 获取图片最上边的坐标 y
            if not flag_y_start:
                left_up_y = index_y - 1
                # 同时标记已经出现了y
                flag_y_start = True

            flag_x_start = False
            for index_x, one_column in enumerate(one_row):

                if one_column == 0:
                    # 获取图片最右边的坐标 x
                    if flag_x_start and index_x > right_down_x:
                        right_down_x = index_x - 1
                    continue
                else:
                    # 获取图片最左边的坐标 x
                    if index_x < left_up_x or left_up_x == 0:
                        left_up_x = index_x - 1
                        flag_x_start = True

        cv.imwrite("../statics/demo_img/target.png", self.img_small[left_up_y:right_down_y, left_up_x:right_down_x])

    # 模板匹配(用于寻找缺口有点误差)
    def template_match(self):
        method = cv.TM_CCOEFF_NORMED
        img_big = cv.imread(self.big_path, cv.IMREAD_GRAYSCALE)  # cv.COLOR_BGR2GRAY  cv.IMREAD_GRAYSCALE
        img_target = cv.imread("../statics/demo_img/target.png", cv.IMREAD_GRAYSCALE)

        width, height = img_target.shape[:2]

        _, thresh1 = cv.threshold(img_big, 127, 255, cv.THRESH_BINARY)
        _, thresh2 = cv.threshold(img_big, 127, 255, cv.THRESH_BINARY_INV)
        # 灰度渐变
        _, thresh3 = cv.threshold(img_big, 127, 255, cv.THRESH_TRUNC)
        thresh4 = cv.adaptiveThreshold(img_big, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 5, 0)

        _1, thresh11 = cv.threshold(img_target, 127, 255, cv.THRESH_BINARY)
        _1, thresh21 = cv.threshold(img_target, 127, 255, cv.THRESH_BINARY_INV)
        # 灰度渐变。第二个参数是阈值，用于对像素值进行分类。第三个参数是分配给超过阈值的像素值的最大值
        _1, thresh31 = cv.threshold(img_target, 127, 255, cv.THRESH_TRUNC)
        thresh41 = cv.adaptiveThreshold(img_target, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 5, 0)

        result = cv.matchTemplate(thresh41, thresh4, method)

        # 寻找矩阵(一维数组当作向量,用Mat定义) 中最小值和最大值的位置
        min_val, max_val, min_loc, max_loc = cv.minMaxLoc(result)
        left_up = max_loc
        left_up = list(left_up)
        left_up[0] += 2
        left_up = tuple(left_up)
        right_down = (left_up[0] + height, left_up[1] + width)

        # 标注原图
        cv.rectangle(self.img_big, left_up, right_down, (0, 0, 255), 2)
        # show(self.img_big)
        cv.imwrite(self.big_path.replace(".jpg", "_res.jpg"), self.img_big)
        return [left_up, right_down]

    def main(self):
        return self.template_match()


if __name__ == "__main__":
    bg_path = "bg.jpg"
    target_path = "front.png"
    # handle_img = HandleSliderImg(bg_path, target_path)
    # result = handle_img.main()
    # print(result)
    #
    # handle_img2 = HandleSliderImg2(bg_path, target_path)
    # result2 = handle_img2.main()
    # print(result2)
    #
    # result3 = HandleSliderImg3(bg_path, target_path).main()

    # trace_list = get_trace_list(219)
    # print(len(trace_list), trace_list)

    handle_img4 = HandleSliderImg4(bg_path, target_path)
    result4 = handle_img4.main()
    print(result4)

    pass

    """其他参数说明"""
    # 绘制矩形边框，将匹配区域标注出来
    # self.img_big：目标图像
    # left_up：矩形的左上角位置
    # right_down：矩形的右下角位置
    # (0,0,255)：矩形边框颜色
    # 1：矩形边框大小

    # 标注处理后的图
    # cv.rectangle(thresh4, left_up, right_down, (0, 0, 255), 2)

