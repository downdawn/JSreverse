# -*- coding: utf-8 -*-


from selenium import webdriver
import time

browser = webdriver.Chrome()
browser.get('https://xueqiu.com/S/SH113520')
# 打开页面，注入相关js
browser.execute_script(open('hook.js', encoding='utf8').read())
time.sleep(50)

browser.close()
