# -*- coding: utf-8 -*-
import re

from selenium import webdriver
from selenium.webdriver import DesiredCapabilities
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

start_time = time.time()

options = webdriver.ChromeOptions()
options.add_argument('disable-infobars')
options.add_experimental_option('excludeSwitches', ['enable-automation'])

# capa = DesiredCapabilities.CHROME
# capa["pageLoadStrategy"] = "none"  # 懒加载模式，不等待页面加载完毕
# driver = webdriver.Chrome(options=options, desired_capabilities=capa)
# desired_capabilities = DesiredCapabilities.CHROME
# desired_capabilities["pageLoadStrategy"] = "none"

driver = webdriver.Chrome(options=options)
wait = WebDriverWait(driver, 3)

driver.get(url="https://www.hardwork.shop/products/handheld-fruit-juicer")

# button = driver.find_element_by_xpath("//button[contains(@class,'J-BuyNowBtn')]").click()
button = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(@class,'J-BuyNowBtn')]")))
button.click()
time.sleep(1)

driver.switch_to.frame(driver.find_element_by_xpath("//iframe[contains(@class,'zoid-visible')]"))
paypal = wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'paypal-button-label-container')))
paypal.click()

current_handle = driver.current_window_handle
print('当前窗口', current_handle)

handles = driver.window_handles
print("全部窗口", handles)

# 获取支付窗口
paypal_handle = None
for handle in handles:
    if handle != current_handle:
        paypal_handle = handle

print('switch to ', paypal_handle)
driver.switch_to.window(paypal_handle)

wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'cancelUrl ')))
print(driver.page_source)
print(driver.current_url)

name = re.search(r'id="cancelLink.*?>(.*?)<', driver.page_source).group(1)
print(name)

driver.quit()

print('耗时：', time.time() - start_time)
