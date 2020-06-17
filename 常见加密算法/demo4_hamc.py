# -*- coding: utf-8 -*-

import hmac
import hashlib


def encode_hmac(data, key, encode_method="utf-8"):
    """
    hmac加密
    :param key: 密钥key
    :param data: 待加密字符串
    :param encode_method: 编码方法，默认utf-8
    :return: 32长度字符串
    """
    key = key.encode(encode_method)
    bytes_data = data.encode(encode_method)
    # 第一个参数是密钥key，第二个参数是待加密的字符串，第三个参数是hash函数
    m = hmac.new(key, bytes_data, hashlib.md5)
    return m.hexdigest()


if __name__ == '__main__':
    data_str = "hello world"
    key_str = 'key'
    en_data = encode_hmac(data_str, key_str)
    print(en_data)  # ae92cf51adf91130130aefc2b39a7595


# # 先将字符串转换成二进制数据
# key = 'key'.encode("utf-8")
# data = "https://www.baidu.com/"
# bytes_data = data.encode("utf-8")
#
# # 加密
# # 实例化对象, 第一个参数是密钥key，第二个参数是待加密的字符串，第三个参数是hash函数
# m = hmac.new(key, bytes_data, hashlib.md5)
#
# print(m.digest())
# print(m.hexdigest())
