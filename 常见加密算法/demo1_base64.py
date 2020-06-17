# -*- coding: utf-8 -*-

import base64


def encode_base64(data, encode_method="utf-8"):
    """
    base64加密
    :param data: 待加密字符串
    :param encode_method: 编码方法，默认utf-8
    :return:
    """
    bytes_data = data.encode(encode_method)
    result = base64.b64encode(bytes_data).decode()
    return result


def decode_base64(data):
    """
    base64解密
    :param data: 待解密字符串
    :return:
    """
    result = base64.b64decode(data).decode()
    return result


if __name__ == '__main__':
    data_str = "hello world"
    en_data = encode_base64(data_str)
    print(en_data)  # aGVsbG8gd29ybGQ=
    print(decode_base64(en_data))  # hello world
