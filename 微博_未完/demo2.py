# -*- coding: utf-8 -*-
import requests

url = "https://weibo.com/u/1777828927/home?wvr=5&lf=reg"

headers = {
    # "Host": "weibo.com",
    # "Referer": "https://weibo.com/",
    # "Sec-Fetch-Dest": "document",
    # "Sec-Fetch-Mode": "navigate",
    # "Sec-Fetch-Site": "same-origin",
    # "Sec-Fetch-User": "?1",
    # "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
    "Cookie": "SINAGLOBAL=804134653041.7992.1591170634632; login_sid_t=3d5a0b75e21affd3eb86c13902530494; cross_origin_proto=SSL; YF-V5-G0=7a7738669dbd9095bf06898e71d6256d; _s_tentry=-; Apache=9037773609917.807.1592471410210; ULV=1592471410214:2:2:1:9037773609917.807.1592471410210:1591170634643; Ugrow-G0=1ac418838b431e81ff2d99457147068c; webim_unReadCount=%7B%22time%22%3A1592529769762%2C%22dm_pub_total%22%3A0%2C%22chat_group_client%22%3A0%2C%22chat_group_notice%22%3A0%2C%22allcountNum%22%3A18%2C%22msgbox%22%3A0%7D; WBStorage=42212210b087ca50|undefined; UOR=www.baidu.com,s.weibo.com,login.sina.com.cn; wb_view_log=1920*10801; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9Wh.pnwPnH9hpZr-E0u2Wkxk5JpX5K2hUgL.Fo2NS0MReon4eoM2dJLoIpBLxKqL1KeLBKqpeoeXeo-RP0-c1Btt; ALF=1624065813; SSOLoginState=1592529814; SCF=AqLUQiouTMDojUicpcLE_JEXmXu7x35w6Q7BH7bYrMLOWmMudkgMFVO5AHswi9Dzp3R4C6wd3VwG9-lHm2gp8iA.; SUB=_2A25z6GPJDeRhGedJ7FUZ8ibFyTuIHXVQnNIBrDV8PUNbmtANLWjMkW9NUaqtfokOLF_W4P1GZGfCcMFB7V7Unj2g; SUHB=0M2EJC4oeEmXWq; un=18759891631",
}

response = requests.get(url=url, headers=headers)
# response.encoding = "gb2312"
print(response.status_code)
print(response.text)
