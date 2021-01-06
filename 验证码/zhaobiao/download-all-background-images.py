#!/usr/bin/env python3
# encoding: utf-8
"""

图不错，现在归我了...

@author: CC11001100
"""
import requests

if __name__ == "__main__":
    index = 0
    while True:
        url = f"https://bulletin.cebpubservice.com/captcha/captcha/image/{index}.png"
        image_bytes = requests.get(url).content
        if not image_bytes:
            break
        file_path = f"./images/{index}.png"
        with open(file_path, "wb") as f:
            f.write(image_bytes)
        print(file_path)
        index += 1
