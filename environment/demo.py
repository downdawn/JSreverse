
import json
import requests

url = 'http://127.0.0.1:3000/'

data = {
    "city1": "北京",
    "city2": "上海",
    "city3": "杭州",
    "endTime": "2020-04-17 15:34:43",
    "startTime": "2020-04-16 12:00:00",
    "type": "HOUR"
}
res = requests.post(url=url, json=data)
print(res.status_code)
print(res.text)


# data = {
#     "param": "VAn1yHFAwh9OyizSIUiAmuy0XCTcDdTGkh5XJiNb3YdnczoPWG5/nmBJNHETGz1tQN+Eal6PhGlz0GdR9DA2fQ+QN7UBR/447YGLc/ccYe/ct8/dJ9YQbJCO6ZKpnDivl5CAHLzGfO2Z9CzhvDDqF4wtU2P3zuP814sYAJ4dhJmvnfP3qkrZJmmyvp6QC0/WixuvyFdGeorqhqrZ91la5WK1Qs6sc0CS75UV6J/5xKa0okoU6jtlbnTMwnJmKP/LBiJepQYvRNLayrN6bAwo3+nGe1Oic+ACOVlhbJ99GTjoIhQlIZfPpIhX1whst8W+udLz3Enpkd8dNbUvzClvA7WWtquYLsHhiYVKoC4htB4="
#
# }
#
#
# res = requests.post(url=url, json=data)
# print(res.status_code)
# print(res.text)
