# -*- coding: utf-8 -*-
import base64
from Crypto.Cipher import AES


# 需要安装 pip install pycrypto
# 安装报错，执行pip install -i https://pypi.douban.com/simple/ pycryptodome
# 全称：高级加密标准（英语：Advanced Encryption Standard），属于对称加密算法。


def add_to_16(value):
    """
    需要补位，str不是16的倍数那就补足为16的倍数
    :param value:
    :return:
    """
    while len(value) % 16 != 0:
        value += '\0'
    return str.encode(value)  # 返回bytes


def aes_encrypt(secret_key, data):
    """
    aes加密
    :param secret_key: 秘钥，密钥长度必须恰好为8字节。
    :param data: 待加密字符串
    :return:
    """
    aes = AES.new(add_to_16(secret_key), AES.MODE_ECB)  # 初始化加密器
    encrypt_aes = aes.encrypt(add_to_16(data))  # 先进行aes加密
    encrypted_text = str(base64.encodebytes(encrypt_aes), encoding='utf-8')  # 执行加密并转码返回bytes
    return encrypted_text


def aes_decrypt(secret_key, data):
    """
    aes解密
    :param secret_key: 秘钥，密钥长度必须恰好为8字节。
    :param data: 待解密字符串
    :return:
    """
    aes = AES.new(add_to_16(secret_key), AES.MODE_ECB)  # 初始化加密器
    base64_decrypted = base64.decodebytes(data.encode(encoding='utf-8'))  # 优先逆向解密base64成bytes
    decrypted_text = str(aes.decrypt(base64_decrypted), encoding='utf-8').replace('\0', '')  # 执行解密密并转码返回str
    return decrypted_text


if __name__ == '__main__':
    data_str = "hello world"
    key_str = '12345678'  # 密钥长度必须恰好为8字节。
    secret_str = aes_encrypt(key_str, data_str)
    print(secret_str)  # FZFE1E7Qb8kb2in06YLwEQ==
    clear_str = aes_decrypt(key_str, secret_str)
    print(clear_str)  # hello world
