# -*- coding: utf-8 -*-

# 淘宝模拟登录

# 1、修改webdriver特有标识
# 打开chromedriver.exe，搜索"$cdc_"，把后面的字符修改成任意的字符，长度保持一致

from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

options = webdriver.ChromeOptions()
options.add_argument('disable-infobars')
options.add_experimental_option('excludeSwitches', ['enable-automation'])
driver = webdriver.Chrome(options=options)

driver.get("https://login.taobao.com/member/login.jhtml?spm=a21bo.2017.754894437.1.5af911d9q07jcU&"
           "f=top&redirectURL=https%3A%2F%2Fwww.taobao.com%2F")

# 2. 修改window.navigator.webdriver属性值
script = "Object.defineProperty(navigator,'webdriver',{get: ()=> false,});"
driver.execute_script(script)

# driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
#     "source": """
#         Object.defineProperty(navigator, 'webdriver', {
#           get: () => undefined
#         })
#       """})

usernameInput = driver.find_element_by_xpath("//input[@id='fm-login-id']")
passwordInput = driver.find_element_by_xpath("//input[@id='fm-login-password']")
loginBtn = driver.find_element_by_xpath("//button[@tabindex='3']")
slideBtn = driver.find_element_by_xpath("//span[contains(@class,'btn_slide')]")

# 输入账号
usernameInput.send_keys("邮箱/昵称/手机号码")
time.sleep(1)

# 输入密码
passwordInput.send_keys("密码")

time.sleep(5)

# 检查是否出现了滑动验证码
try:
    slider = driver.find_element_by_xpath("//span[contains(@class, 'btn_slide')]")
    if slider.is_displayed():
        ActionChains(driver).click_and_hold(on_element=slider).perform()
        ActionChains(driver).move_by_offset(xoffset=258, yoffset=0).perform()
        ActionChains(driver).pause(0.5).release().perform()
except Exception as e:
    print(e)
# 点击登录按钮
button = WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.CLASS_NAME, 'password-login')))
button.click()

time.sleep(2)
print(driver.get_cookies())
