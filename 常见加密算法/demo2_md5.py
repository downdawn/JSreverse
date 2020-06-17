# -*- coding: utf-8 -*-

import hashlib


def encode_md5(data, encode_method="utf-8"):
    """
    md5加密
    :param data: 待加密字符串
    :param encode_method: 编码方法，默认utf-8
    :return: 128位，32长度字符串
    """
    bytes_data = data.encode(encode_method)
    m = hashlib.md5()
    m.update(bytes_data)
    return m.hexdigest()


if __name__ == '__main__':
    data_str = "hello world"
    en_data = encode_md5(data_str)
    print(en_data)  # 5eb63bbbe01eeed093cb22bb8f5acdc3

# # 实例化对象
# m = hashlib.md5()
#
# # 先将字符串转换成二进制数据
# data = "https://www.baidu.com/"
# data_url = data.encode("utf-8")
#
# m.update(data_url)
#
# en_url = m.hexdigest()
# print(en_url)
#
# # 或者写成这样一行
# print(hashlib.md5(data_url).hexdigest())
