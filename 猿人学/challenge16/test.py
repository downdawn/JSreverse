import requests

cookies = {
    'Hm_lvt_337e99a01a907a08d00bed4a1a52e35d': '1614569187,1614591213,1614736150,1614739079',
    'no-alert': 'true',
    '__jsl_clearance': '1614742141.660^|0^|clD4VpfqhdaLBWywKWy^%^2FZyfi6d_0c0971234a7d9e426b0598ed17e843c03D',
    'sessionid': 'jfxv4sotvxtcpf65d97p7azh5gzx71oi',
    'Hm_lpvt_337e99a01a907a08d00bed4a1a52e35d': '1614908121',
}

headers = {
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
    'safe': 'MTYxNDkxMTk5MQ==^|AAAABQAAAAAAAAAGAAAACAAAAAAAAAAEAAAACAAAAAAAAAAAAAAAAQAAAAYAAAAAAAAABAAAAAkAAAACAAAABwAAAAAAAAACAAAACQAAAAkAAAAJAAAABAAAAAkAAAABAAAAAQAAAAAAAAAHAAAABQAAAAkAAAACAAAAAAAAAAAAAAAIAAAAAQAAAAEAAAABAAAAAAAAAAkAAAAHAAAABQoGIkEjH1Dk0vkf2a7rmNqIPnrnE',
    'Origin': 'http://www.python-spider.com',
    'Referer': 'http://www.python-spider.com/challenge/16',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
}

data = {
  'page': '3'
}

response = requests.post('http://www.python-spider.com/api/challenge16', headers=headers, cookies=cookies, data=data, verify=False)
print(response.text)
