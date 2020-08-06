# -*- coding: utf-8 -*-


from selenium import webdriver
import time

browser = webdriver.Chrome()
browser.get('https://dynamic2.scrape.center/')
# 打开页面，注入相关js(ajax_hook和hook_proxy用来监听hook Ajax请求，axios用来发送hook后的数据)
browser.execute_script(open('hook.js', encoding='utf8').read())
time.sleep(20)

browser.close()
