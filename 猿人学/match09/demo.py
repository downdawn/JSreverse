# -*- coding: utf-8 -*-

import requests
import re
import os


def main():
    with open('0901.js', 'r', encoding='utf-8') as f:
        script1 = f.read()
    url = 'http://match.yuanrenxue.com/match/9'
    response = requests.get(url)
    sessionid = re.findall('(?<=sessionid=).+?(?=;)', response.headers['Set-Cookie'])[0]
    script2 = re.findall('(?<=<script type="application/javascript">).+?(?=</script>)', response.text)[0].replace(
        "global", '')
    with open('0902.js', 'w', encoding='utf-8') as f:
        f.write(script1 + '\n')
        f.write(script2 + '\n')
        f.write('console.log(document.cookie);')
        f.write('process.exit();')
    nodejs = os.popen('node 0902')
    cookie = nodejs.read().replace('\n', '').replace('; path=/', '')
    nodejs.close()
    nums = 0
    sums = 0
    for page in range(1, 6):
        url = 'http://match.yuanrenxue.com/api/match/9?page=' + str(page)
        headers = {
            'cookie': 'sessionid=' + sessionid + '; ' + cookie,
            'User-Agent': 'yuanrenxue.project'
        }
        response = requests.get(url, headers=headers).json()
        for each in response['data']:
            nums += 1
            sums += each['value']

    print(nums)
    print(sums)
    print(sums // nums)
    # 店铺数：50
    # 总评论数：245000
    # 平均评论数：4900


if __name__ == '__main__':
    main()
