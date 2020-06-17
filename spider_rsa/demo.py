# -*- coding: utf-8 -*-

import re
import json
import requests
from lxml import etree

url = "http://js-crack-course-14-2.crawler-lab.com/"
jm_url = "http://127.0.0.1:3000/"

headers = {
    "Cookie": "__cfduid=dda7b434c6e527d308ed6e91f713a5d7d1592181533; crawlerlab_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTIyMDcwNjMsImlkIjoxNTQwLCJuYW1lIjoiMTg3NTk4OTE2MzEifQ.rTwDqFcHwbJN5CEjXDUhJKsz01V73xtKzwhp4f0YygI",

    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
}

response = requests.get(url=url, headers=headers)
response.encoding = "utf8"
html = response.text
# print(html)
# print(response.apparent_encoding)


data = requests.get(url=jm_url).text
data = json.loads(data)
print(data)
# hs_kw55_configCP

items = re.findall(r'<span class="hs_kw(.*?)_configCP"></span>', response.text, re.S)
for item in items:
    re_str = data[item]
    print(re_str)
    html = html.replace(r'<span class="hs_kw{}_configCP"></span>'.format(item), re_str)

# print(html)

e_html = etree.HTML(html)
infos = e_html.xpath("//table[@id='param-table']//tr//td/div/text()")
print(infos)
# for info in infos:
#     print(info)

result = ''.join(infos)
print(result)
print(len(result))
