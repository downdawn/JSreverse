# -*- coding: utf-8 -*-
import base64
from Crypto.Cipher import AES


# 需要安装 pip install pycrypto
# 安装报错，执行pip install -i https://pypi.douban.com/simple/ pycryptodome
# 全称：高级加密标准（英语：Advanced Encryption Standard），属于对称加密算法。


class AesCrypto(object):
    """
    AES加解密简单封装
    暂时支持mode为'ecb'和'cbc'
    默认ecb不需要指定iv，如果是cbc需要指定iv
    """
    def __init__(self, mode=None, iv=None):
        self.pad_size = 16
        self._mode = mode
        self.mode = self.get_mode()
        self.iv = iv

    def get_mode(self):
        if self._mode is None or self._mode == "ecb":
            return AES.MODE_ECB
        elif self._mode == "cbc":
            return AES.MODE_CBC
        else:
            raise Exception("暂时只支持'ecb'和'cbc'选项")

    def pad(self, s):
        """补位"""
        s = s + (self.pad_size - len(s) % self.pad_size) * chr(self.pad_size - len(s) % self.pad_size)
        return s

    @staticmethod
    def un_pad(s):
        """反补位"""
        s = s[:-ord(s[len(s) - 1:])]
        return s

    def aes_encrypt(self, key, data):
        """
        AES加密
        :param key: 密钥
        :param data:被加密字符串（明文）
        :return:密文
        """
        key = key.encode('utf8')
        data = self.pad(data)  # 字符串补位
        iv = self.iv.encode('utf8') if self.iv else None

        cipher = AES.new(key, self.mode, iv) if iv else AES.new(key, self.mode)
        # 加密后得到的是bytes类型的数据，使用Base64进行编码,返回byte字符串
        result = cipher.encrypt(data.encode())
        encodestrs = base64.b64encode(result)
        enctext = encodestrs.decode('utf8')
        return enctext

    def aes_decrypt(self, key, data):
        """
        AES解密
        :param key: 密钥
        :param data: 加密后的数据（密文）
        :return:明文
        """
        key = key.encode('utf8')
        data = base64.b64decode(data)
        iv = self.iv.encode('utf8') if self.iv else None

        cipher = AES.new(key, self.mode, iv) if iv else AES.new(key, self.mode)
        # 去补位
        text_decrypted = self.un_pad(cipher.decrypt(data))
        text_decrypted = text_decrypted.decode('utf8')
        return text_decrypted


if __name__ == '__main__':
    key_str = '37fd7f3f77d7ceae'
    data_str = '{"o00o0o00o0o0o0":"eval0514undefined"}'
    iv_str = '37fd7f3f77d7ceae'

    # 默认ecb模式
    aes = AesCrypto()
    print('ecb模式')
    ecdata = aes.aes_encrypt(key_str, data_str)
    print(ecdata)
    dedata = aes.aes_decrypt(key_str, ecdata)
    print(dedata)

    # 指定cbc模式
    aes = AesCrypto(mode='cbc', iv=iv_str)
    print('cbc模式')
    ecdata = aes.aes_encrypt(key_str, data_str)
    print(ecdata)
    dedata = aes.aes_decrypt(key_str, ecdata)
    print(dedata)

# 5TJ55UCcR4KL4fSUXtWAf6VB/8lHNDm4+23sWcaIchbmrRCrUcO9jWD1qtX1a9pm
