# -*- coding: utf-8 -*-

import hashlib


def encode_sha1(data, encode_method="utf-8"):
    """
    sha1加密
    :param data: 待加密字符串
    :param encode_method: 编码方法，默认utf-8
    :return: 40长度字符串
    """
    bytes_data = data.encode(encode_method)
    m = hashlib.sha1()
    m.update(bytes_data)
    return m.hexdigest()


if __name__ == '__main__':
    data_str = "hello world"
    en_data = encode_sha1(data_str)
    print(en_data)  # 2aae6c35c94fcfb415dbe95f408b9ce91ee846ed

# # 实例化对象
# m = hashlib.sha1()
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
# print(hashlib.sha1(data_url).hexdigest())
