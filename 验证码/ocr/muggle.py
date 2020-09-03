# -*- coding: utf-8 -*-

import time

# 1. 导入包
import muggle_ocr

"""
使用预置模型，预置模型包含了[ModelType.OCR, ModelType.Captcha] 两种
其中 ModelType.OCR 用于识别普通印刷文本, ModelType.Captcha 用于识别4-6位简单英数验证码

"""

# 打开印刷文本图片
with open(r"test1.png", "rb") as f:
    ocr_bytes = f.read()

# 打开验证码图片
with open(r"test2.jpg", "rb") as f:
    captcha_bytes = f.read()

# 2. 初始化；model_type 可选: [ModelType.OCR, ModelType.Captcha]
sdk = muggle_ocr.SDK(model_type=muggle_ocr.ModelType.OCR)

# ModelType.Captcha 可识别光学印刷文本
for i in range(5):
    st = time.time()
    # 3. 调用预测函数
    text = sdk.predict(image_bytes=ocr_bytes)
    print(text, time.time() - st)

# ModelType.Captcha 可识别4-6位验证码
sdk = muggle_ocr.SDK(model_type=muggle_ocr.ModelType.Captcha)
for i in range(5):
    st = time.time()
    # 3. 调用预测函数
    text = sdk.predict(image_bytes=captcha_bytes)
    print(text, time.time() - st)

"""
使用自定义模型
支持基于 https://github.com/kerlomz/captcha_trainer 框架训练的模型
训练完成后，进入导出编译模型的[out]路径下, 把[graph]路径下的pb模型和[model]下的yaml配置文件放到同一路径下。
将 conf_path 参数指定为 yaml配置文件 的绝对或项目相对路径即可，其他步骤一致，如下示例：
"""
# with open(r"test3.jpg", "rb") as f:
#     b = f.read()
# sdk = muggle_ocr.SDK(conf_path="./ocr.yaml")
# text = sdk.predict(image_bytes=b)
