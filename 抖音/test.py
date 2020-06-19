# -*- coding: utf-8 -*-
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--start-maximized')
# 打开开发者模式, 隐藏驱动
chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])

driver = webdriver.Chrome(options=chrome_options)
# result_url = r'file://G:\project\抖音\result.html'
result_url = "https://www.iesdouyin.com/share/user/88445518961"
driver.get(url=result_url)
time.sleep(20)
# signature = driver.title
# print(driver.page_source)
# print('signature', signature)
# # time.sleep(10)
# driver.quit()
# driver.close()
#
# # EU.KUhATTyz2ODJU1I71CxFPyk
# # EU.KUhATTyx6sD6r1I71CxFPzk


# import asyncio
# from pyppeteer import launch
#
# width, height = 1366, 768
#
#
# async def main():
#     browser = await launch(headless=False,
#                            args=[f'--window-size={width},{height}', '--disable-infobars'])
#     page = await browser.newPage()
#     await page.setViewport({'width': width, 'height': height})
#     await page.goto(r'file://F:\Workspace\works\app_code\抖音\result.html')
#     await page.evaluate(
#         '''() =>{ Object.defineProperties(navigator,{ webdriver:{ get: () => false } }) }''')
#     await asyncio.sleep(1)
#     print(await page.content())
#     await asyncio.sleep(100)
#
# asyncio.get_event_loop().run_until_complete(main())


# import requests
#
# response = requests.get(url='http://127.0.0.1:7000/')
# signature = response.text
# print(signature)
