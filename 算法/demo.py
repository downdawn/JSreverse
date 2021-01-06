# -*- coding: utf-8 -*-
import json

from utils import *

text1 = {
    "11": "compact size",
    "12": "compact structure",
    "13": "small size",
    "2": "low fuel consumption",
    "31": "strong power",
    "32": "high performance",
    "41": "low maintenance",
    "42": "low failure rate",
    "43": "easy to maintain",
    "44": "easy servicing",
    "45": "easy access to service and spare parts",
    "5": "light weight",
    "6": "low noise",
    "7": "long service life",
    "8": "wide power range",
    "9": "advanced design"
}

text2 = {
    "a": "wide application",
    "b": "dynamic strength",
    "c": "transient response",
    "d": "economic efficiency",
    "e": "great reliability",
    "f1": "stable operation",
    "f2": "dependable performance",
    "g": "high efficiency",
}


def parse(text):
    data1 = group(text)
    # data1 = [[1], [2], [3], [4], [5], [6], [71, 72], [8], [9]]
    _data = flat(data1)
    data = []
    for i in _data:
        # print(i)
        # data.append(flat2(i))
        tmp = flat2(i)
        for j in tmp:
            data.append(j)

    # print(data)
    # print(len(data))
    return data


result1 = parse(text1)
result2 = parse(text2)

data = []
for i in result1:
    for j in result2:
        # item = {"first": str(i[0]), "second": str(j[0])}
        # data.append(item)
        _i = ','.join(list(i))
        _j = ','.join(list(j))
        # result = _i + "|" + _j
        result = [_i, _j]
        data.append(result)

data = json.dumps(data)
# with open(r'data.json', 'w') as f:
#     f.write(data)

print("11111111111111111111")
print(data)
print(len(data))
print(type(data))
