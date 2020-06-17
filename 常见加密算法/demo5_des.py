# -*- coding: utf-8 -*-

import binascii
from pyDes import des, CBC, PAD_PKCS5


# 需要安装 pip install pyDes
# 全称：数据加密标准（ Data Encryption Standard ），属于对称加密算法。
# DES是一个分组加密算法，典型的DES以64位为分组对数据加密，加密和解密用的是同一个算法。
# 它的密钥长度是56位（因为每个第8 位都用作奇偶校验），密钥可以是任意的56位的数，而且可以任意时候改变。
# 常用的对称加密算法有：
# 算法 密钥长度 工作模式 填充模式
# DES 56/64 ECB/CBC/PCBC/CTR/... NoPadding/PKCS5Padding/...
# AES 128/192/256 ECB/CBC/PCBC/CTR/... NoPadding/PKCS5Padding/PKCS7Padding/...
# 密钥长度直接决定加密强度，而工作模式和填充模式可以看成是对称加密算法的参数和格式选择

def des_encrypt(secret_key, data):
    """
    des加密
    :param secret_key: 秘钥，密钥长度必须恰好为8字节。
    :param data: 待加密字符串
    :return: 密文
    """
    iv = secret_key  # 初始值（偏移量）
    k = des(secret_key, CBC, iv, pad=None, padmode=PAD_PKCS5)  # 默认CBC工作模式
    en = k.encrypt(data, padmode=PAD_PKCS5)
    return binascii.b2a_hex(en)


def des_decrypt(secret_key, data):
    """
    des解密
    :param secret_key: 秘钥，密钥长度必须恰好为8字节。
    :param data: 待解密字符串
    :return: 明文
    """
    iv = secret_key
    k = des(secret_key, CBC, iv, pad=None, padmode=PAD_PKCS5)
    de = k.decrypt(binascii.a2b_hex(data), padmode=PAD_PKCS5)
    return de


if __name__ == '__main__':
    data_str = "hello world"
    key_str = '12345678'  # 密钥长度必须恰好为8字节。
    secret_str = des_encrypt(key_str, data_str)
    print(secret_str)  # b'0b2a92e81fb49ce1a43266aacaea7b81'
    clear_str = des_decrypt(key_str, secret_str)
    print(clear_str)  # b'hello world'
