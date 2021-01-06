# -*- coding: utf-8 -*-

def flat(data):
    """
    对列表进行三三排列组合
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    result = [(1, 2, 3), (1, 2, 4), (1, 2, 5),......., (6, 7, 8), (6, 7, 9), (6, 8, 9), (7, 8, 9)]
    """
    result = []
    for i in range(len(data)):
        b = data[i + 1:]
        if len(b) >= 2:
            # print("-" * 50)
            # print(data[i], b)
            for j in range(len(b)):
                c = b[j + 1:]
                if len(c):
                    # print(data[i], b[j], c)
                    for k in c:
                        # print(data[i], b[j], k)
                        result.append([data[i], b[j], k])
    print(result)
    return result


def flat2(data):
    """
    对长度为3的复合列表，再次展开排列组合
    data = [[11, 12, 13], [21, 22], [3]]
    result = [(11, 21, 3), (11, 22, 3), (12, 21, 3), (12, 22, 3), (13, 21, 3), (13, 22, 3)]
    """

    a = data[0]
    b = data[1]
    c = data[2]

    result = []
    for i in a:
        for j in b:
            for k in c:
                # print(i, j, k)
                result.append((i, j, k))

    # result = ','.join(str(i) for i in result)
    # print(result)
    return result


def group(data):
    # 获取全部分组的key
    keys = []
    for k in data.keys():
        if k[0] not in keys:
            keys.append(k[0])
    # print(keys)

    # 遍历数据，首字符相同的分到同一组
    result = []
    for i in keys:
        tmp = []
        for k, v in data.items():
            if k[0] == i:
                tmp.append(v)
        # tmp = ','.join(tmp)
        result.append(tmp)
    # print(result)
    return result


if __name__ == '__main__':
    # text1 = {
    #     "11": "compact size",
    #     "12": "compact structure",
    #     "13": "small size",
    #     "2": "low fuel consumption",
    #     "31": "strong power",
    #     "32": "high performance",
    #     "41": "low maintenance",
    #     "42": "low failure rate",
    #     "43": "easy to maintain",
    #     "44": "easy servicing",
    #     "45": "easy access to service and spare parts",
    #     "5": "light weight",
    #     "6": "low noise",
    #     "7": "long service life",
    #     "8": "wide power range",
    #     "9": "advanced design"
    # }
    # data1 = group(text1)
    data1 = [[11, 12], [21, 22], [3], [4]]
    _data = flat(data1)
    print(len(_data))
    data = []
    for i in _data:
        # print(i)
        tmp = flat2(i)
        for j in tmp:
            data.append(j)

    print(data)
    print(len(data))
