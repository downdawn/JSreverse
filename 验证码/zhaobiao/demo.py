# -*- coding: utf-8 -*-

def pixel_is_equal(image1, image2, x, y):
    """
          判断两张图片的像素是否相等,不想等即为缺口位置
          :param image1:
          :param image2:
          :param x:  x坐标
          :param y: y 坐标
          :return:
          """
    # 取两个图片的像素点
    pixel1 = image1.load()[x, y]
    pixel2 = image2.load()[x, y]
    threshold = 60  # 像素色差
    if abs(pixel1[0] - pixel2[0]) < threshold and abs(pixel1[1] - pixel2[1]) < threshold and abs(
            pixel1[2] - pixel2[2]) < threshold:
        return True
    else:
        return False


img1 = "https://bulletin.cebpubservice.com/captcha/captcha/image/24.png"
img2 = "https://bulletin.cebpubservice.com/captcha/captcha/image/big_source_12_9dcb88e013764959.png"

