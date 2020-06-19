import requests
import execjs
import re

with open('jm.js', 'r') as f:
    get_sign_js = f.read()

ctx = execjs.compile(get_sign_js)

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
}
r = requests.get('https://www.iesdouyin.com/share/user/88445518961', headers=headers)
uid = re.search('uid: "([^"]+)"', r.text).group(1)
dytk = re.search("dytk: '([^']+)'", r.text).group(1)
print(uid)
sign = ctx.call('get_sign', uid)
print(sign)

# url = 'https://www.iesdouyin.com/web/api/v2/aweme/post/?' \
#       'user_id={}&sec_uid=&count=21&max_cursor=0&aid=1128&_signature={}&dytk={}'
#
# print(url.format(uid, sign, dytk))
# r = requests.get(url.format(uid, sign, dytk), headers=headers)
# print(r.text)
