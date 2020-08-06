# -*- coding: utf-8 -*-

from browsermobproxy import Server
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# 启动代理
server = Server('./browsermob-proxy-2.1.4/bin/browsermob-proxy')
server.start()
proxy = server.create_proxy()
print('proxy', proxy.proxy)

# 启动浏览器
chrome_options = Options()
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--proxy-server={0}'.format(proxy.proxy))
driver = webdriver.Chrome(options=chrome_options)

# 监听结果
base_url = 'https://dynamic2.scrape.center/'
proxy.new_har(options={
    'captureContent': True,
    'captureHeaders': True
})
driver.get(base_url)
time.sleep(3)

# 读取结果
result = proxy.har
for entry in result['log']['entries']:
    print(entry['request']['url'])
    print(entry['response']['content'])
