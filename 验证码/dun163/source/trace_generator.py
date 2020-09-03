#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time     : 2020/8/8 10:11
# @Author   : qizai
# @File     : temp.py
# @Software : PyCharm

import math
import random
import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt

# 真实轨迹，拿来参考的
array = [[4, 0, 279], [4, 0, 287], [5, 0, 319], [6, 0, 335], [7, 0, 344], [8, 0, 351], [8, 0, 360], [9, 0, 365],
         [11, 0, 374], [12, 1, 382], [13, 1, 390], [16, 1, 398], [17, 1, 405], [18, 1, 414], [20, 1, 421], [20, 1, 430],
         [21, 1, 437], [23, 1, 446], [24, 1, 461], [25, 1, 469], [27, 1, 476], [28, 1, 483], [30, 1, 499], [32, 1, 508],
         [32, 1, 515], [34, 1, 531], [35, 1, 533], [36, 1, 539], [38, 1, 547], [39, 1, 555], [40, 1, 564], [42, 1, 571],
         [44, 1, 580], [45, 1, 587], [46, 1, 594], [48, 1, 601], [51, 1, 610], [52, 1, 617], [53, 1, 626], [54, 1, 635],
         [56, 1, 641], [58, 0, 649], [60, 0, 658], [62, 0, 665], [65, 0, 674], [66, 0, 682], [68, 0, 690], [70, 0, 698],
         [71, 0, 705], [72, 0, 712], [74, 0, 719], [75, -1, 731], [76, -1, 735], [77, -1, 744], [79, -1, 751],
         [80, -1, 760], [81, -1, 775], [83, -1, 783], [84, -1, 792], [84, -1, 799], [85, -1, 808], [86, -1, 815],
         [88, -1, 824], [88, -2, 830], [90, -2, 837], [92, -2, 846], [92, -2, 853], [94, -2, 862], [96, -2, 869],
         [96, -2, 878], [98, -2, 885], [99, -2, 894], [100, -2, 901], [102, -3, 910], [103, -3, 917], [104, -3, 926],
         [106, -4, 933], [107, -4, 940], [108, -4, 948], [108, -4, 955], [110, -4, 965], [111, -4, 971], [112, -4, 980],
         [113, -5, 987], [114, -5, 996], [115, -5, 1003], [116, -5, 1012], [116, -5, 1019], [117, -5, 1028],
         [118, -5, 1039], [119, -5, 1057], [120, -5, 1065], [120, -5, 1074], [122, -6, 1082], [124, -6, 1090],
         [124, -6, 1098], [127, -6, 1108], [128, -7, 1114], [128, -7, 1121], [130, -7, 1130], [131, -7, 1137],
         [132, -7, 1153], [132, -7, 1162], [134, -8, 1169], [136, -8, 1176], [136, -8, 1183], [138, -8, 1192],
         [140, -8, 1199], [141, -8, 1208], [143, -8, 1215], [144, -8, 1224], [145, -9, 1232], [147, -9, 1240],
         [149, -9, 1248], [150, -9, 1255], [152, -9, 1264], [152, -10, 1271], [154, -10, 1280], [156, -10, 1287],
         [156, -10, 1294], [157, -10, 1301], [158, -10, 1310], [159, -10, 1317], [160, -10, 1326], [160, -10, 1382]]


def get_trace_list(distance):
    """根据距离随机生成轨迹"""
    tract_list = []
    diff_time = random.randint(280, 382)
    for x in range(4, distance + 1):

        if x < distance//10+1 or x < distance // 10 * 5 + 1:
            y = 0
        elif x < distance//10*2+1 or x < distance // 10 * 4 + 1:
            y = -1
        elif x < distance // 10 * 3 + 1:
            y = -2
        elif x < distance // 10 * 6 + 1:
            y = 1
        elif x < distance // 10 * 7 + 1:
            y = 2
        elif x < distance // 10 * 8 + 1:
            y = 3
        elif x < distance // 10 * 9 + 1:
            y = 4
        else:
            y = 5

        # 本次x,随机生成几个一样的 [x, y, 递增的随机时间差]
        count = random.randint(1, 5 if y>=4 else 4)
        for _ in range(count):
            tract_list.append([x, y, diff_time])
            if y <= 2:
                diff_time += random.randint(5, 6)
            elif y <= 4:
                diff_time += random.randint(5, 8)
            elif y == 5:
                diff_time += random.randint(10, 33)
    return tract_list


def show(name):
    cv.imshow('Show', name)
    cv.waitKey(0)
    cv.destroyAllWindows()


class HandleSliderImg(object):

    def __init__(self, bg_path, small_img_path):
        self.img_big = cv.imread(bg_path, 0)  # 第二个参数是以什么模式读取图片
        self.img_small = cv.imread(small_img_path, 0)
        cv.imwrite("img_big.png", self.img_big)
        cv.imwrite("img_small.png", self.img_small)
        self.img_big = cv.imread("img_big.png")
        self.img_small = cv.imread("img_small.png")
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
        cv.imwrite("target.png", self.target_img)
        self.target_img = cv.imread("target.png")
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
        cv.imwrite("result.png", self.img_big)
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
        temp = "img_small2.png"
        targ = "img_big2.png"
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
        cv.imwrite("result2.png", template)
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
        cv.imwrite("result3.png", img_rgb)
        return [[left_x]]


class HandleSliderImg4(object):

    def __init__(self, bg_path, small_img_path):
        self.img_big = cv.imread(bg_path)  # 第二个参数是以什么模式读取图片
        self.img_small = cv.imread(small_img_path)
        self.img_big_path = bg_path
        self.img_small_path = small_img_path

    # 模板匹配(用于寻找缺口有点误差)
    def template_match(self):
        method = cv.TM_CCOEFF_NORMED
        width, height = self.img_small.shape[:2]

        img = cv.imread(self.img_big_path, cv.IMREAD_GRAYSCALE)
        _, thresh1 = cv.threshold(img, 127, 255, cv.THRESH_BINARY)
        _, thresh2 = cv.threshold(img, 127, 255, cv.THRESH_BINARY_INV)
        # 灰度渐变
        _, thresh3 = cv.threshold(img, 127, 255, cv.THRESH_TRUNC)
        thresh4 = cv.adaptiveThreshold(img, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 5, 0)

        img1 = cv.imread(self.img_small_path, cv.IMREAD_GRAYSCALE)
        _1, thresh11 = cv.threshold(img1, 127, 255, cv.THRESH_BINARY)
        _1, thresh21 = cv.threshold(img1, 127, 255, cv.THRESH_BINARY_INV)
        # 灰度渐变
        _1, thresh31 = cv.threshold(img1, 127, 255, cv.THRESH_TRUNC)
        thresh41 = cv.adaptiveThreshold(img1, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 5, 0)

        result = cv.matchTemplate(thresh41, thresh4, method)

        # 寻找矩阵(一维数组当作向量,用Mat定义) 中最小值和最大值的位置
        min_val, max_val, min_loc, max_loc = cv.minMaxLoc(result)
        left_up = max_loc
        left_up = list(left_up)
        left_up[0] += 2
        left_up = tuple(left_up)
        print("left_up: ", left_up)
        right_down = (left_up[0] + height, left_up[1] + width)

        # 绘制矩形边框，将匹配区域标注出来
        # self.img_big：目标图像
        # left_up：矩形的左上角位置
        # right_down：矩形的右下角位置
        # (0,0,255)：矩形边框颜色
        # 1：矩形边框大小
        cv.rectangle(thresh4, left_up, right_down, (0,0,255), 1)
        cv.imwrite("result.png", thresh4)
        show(thresh4)
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
