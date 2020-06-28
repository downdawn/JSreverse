# -*- coding: utf-8 -*-
import re

import execjs

code = open(r'./code.js', 'r').read()
js_code = open(r'./jscode.js', 'r').read()

reg = re.compile(r"_0x5c3a\([\s\S]{12,14}'\)")
results = reg.findall(code)  # code是整个混淆代码，此处查找全部调用
ctx = execjs.compile(js_code)  # jscode 是 大数组 + 移位函数 + 解密函数
for result in results:
    value = ctx.eval(result)  # 计算解密后的字串
    print(result, value)
    code = code.replace(result, "'" + value + "'")  # 替换

with open(r'./result.js', 'w') as f:
    f.write(code)
