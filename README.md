# JSreverse

记录一些js逆向和爬虫以及其他，侵删

已包含以下内容：

 - CrawlerLab爬虫攻防靶场
 - 今日头条
 - 大众点评
 - 抖音
 - 毛毛租房
 - 漫画柜
 - 烯牛数据
 - 空中网
 - 西瓜视频
 - 优酷

## 其他

 - IM即时通讯
 - AST
 - RPC
 - sekiro
 - Ajax hook
 - 模拟登录淘宝

## 相关文章

[抖音APP数据爬虫——个人粉丝视频](https://www.downdawn.com/blog/detail/26/)


[大众点评数据信息获取——字体反爬](https://www.downdawn.com/blog/detail/33/)


[js逆向实战之AES加密](https://www.downdawn.com/blog/detail/35/)


[RPC实现伪个性化推荐方案](https://www.downdawn.com/blog/detail/36/)

## 大部分解密基本使用

### 1、环境

node(安装相关库：express等)

python3

###  2、文件说明
jm.js是js的解密文件

server.js是node express运行的接口服务器，提供解密参数接口调用获取

demo.py是python运行的测试文件，请求解密接口以及数据接口，返回数据

###  3、运行

node server.js(服务器上可以使用pm2管理运行)

python demo.py

