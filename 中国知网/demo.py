# -*- coding: utf-8 -*-

import requests

s = requests.session()

# 1、获取cookie

url = "https://kns.cnki.net/kns/brief/default_result.aspx"

payload = {}
headers = {
    'Host': 'kns.cnki.net',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
}

response = s.request("GET", url, headers=headers, data=payload)

# print(response.text)
print(response.cookies)
cookies = requests.utils.dict_from_cookiejar(response.cookies)
print(cookies)

cookie = "ASP.NET_SessionId={}; SID_kns={}".format(cookies["ASP.NET_SessionId"], cookies["SID_kns"])

print(cookie)

# 2、激活

url = "https://kns.cnki.net/kns/request/SearchHandler.ashx"

payload = {'action': '',
           'ua': '1.11',
           'isinEn': '1',
           'PageName': 'ASP.brief_default_result_aspx',
           'DbPrefix': 'SCDB',
           'DbCatalog': '中国学术文献网络出版总库',
           'ConfigFile': 'SCDBINDEX.xml',
           'db_opt': 'CJFQ,CDFD,CMFD,CPFD,IPFD,CCND,CCJD',
           'txt_1_sel': 'SU$%=|',
           'txt_1_value1': '传感器',
           'txt_1_special1': '%',
           'his': '0',
           'parentdb': 'SCDB',
           '__': 'Tue Nov 03 2020 17:32:39 GMT+0800 (中国标准时间)'}

headers = {
    # 'Accept': '*/*',
    # 'Accept-Encoding': 'gzip, deflate, br',
    # 'Accept-Language': 'zh-CN,zh;q=0.9',
    # 'Cache-Control': 'no-cache',
    # 'Connection': 'keep-alive',
    # 'Content-Length': '492',
    # 'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': cookie,
    # 'Host': 'kns.cnki.net',
    # 'Origin': 'https://kns.cnki.net',
    # 'Pragma': 'no-cache',
    'Referer': 'https://kns.cnki.net/kns/brief/default_result.aspx',
    # 'Sec-Fetch-Dest': 'empty',
    # 'Sec-Fetch-Mode': 'cors',
    # 'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

# 3、请求搜索

url = "https://kns.cnki.net/kns/brief/brief.aspx?pagename=ASP.brief_default_result_aspx&isinEn=1&dbPrefix=SCDB&dbCatalog=%e4%b8%ad%e5%9b%bd%e5%ad%a6%e6%9c%af%e6%96%87%e7%8c%ae%e7%bd%91%e7%bb%9c%e5%87%ba%e7%89%88%e6%80%bb%e5%ba%93&ConfigFile=SCDBINDEX.xml&research=off&t=1604395244453&keyValue=%E4%BC%A0%E6%84%9F%E5%99%A8&S=1&sorttype="

payload = {}
headers = {

    # 'Cookie': 'ASP.NET_SessionId=3h5h5umhqt3cqe5gcbpcmxac; SID_kns=025123117',
    'Cookie': cookie,
    # 'Host': 'kns.cnki.net',
    # 'Referer': 'https://kns.cnki.net/kns/brief/default_result.aspx',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
