import httpx,re,execjs,json


s = httpx.Client()
s.headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
        'referer':'https://www.leisu.com/'
    }
def aaa(url):

    ttt = s.get(url).text
    # 获取变量 动态的
    rt = re.findall('base/config-(.*?).js', ttt)[0]
    rt_js = s.get(f'https://static.leisu.com/public/js/base/config-{rt}.js')
    bl = re.findall('var (.*?)=\[', rt_js.text)[0]
    # 获取 roott第二个参数
    val = re.findall('STATIC_CONFIG\[' + bl + '\[13]]=(.*?),', rt_js.text)[0]
    # 获取变量文件
    rrr = re.findall('season/match-(.*?)\.js',ttt)[0]
    s.headers['referer'] = url
    get_js = s.get(f'https://www.leisu.com/data/zuqiu/season/match-{rrr}.js')
    data = re.findall('.*="(.*?)";.*',get_js.text)[0]

    res = execjs.compile("""
    let atob = require('G:\\\\workspace\\\\JSreverse\\\\ast\\\\node_modules\\\\atob')
    let {inflate} = require('G:\\\\workspace\\\\JSreverse\\\\ast\\\\node_modules\\\\pako')
    let roott = function(x, _) {
            for (var t = '', e = 0; e < x["length"]; e++) {
                var i = x["charCodeAt"](e)
                  , n = i;
                i >= 65 && i <= 90 && (n = (i - 65 - 1 * _ + 26) % 26 + 65),
                i >= 97 && i <= 122 && (n = (i - 97 - 1 * _ + 26) % 26 + 97),
                t += String["fromCharCode"](n)
            }
            return t
        }

    let pushmsg = function(x) {
            var _ = atob(x)
              , t = _['split']("")["map"](function(x) {
                return x["charCodeAt"](0)
            })
              , e = new Uint8Array(t)
              , i = inflate(e);
            return _ = function(x) {
                for (var _ = [], t = 0; t < x["length"]; t += 32768)
                    _["push"](String["fromCharCode"]["apply"](null, x["subarray"](t, t + 32768)));
                return _["join"]('')
            }(new Uint16Array(i)),
            unescape(_)
        }
    function decry(data,d2){
        return pushmsg(roott(data,d2))
    }


    """).call('decry',data,val)
    all_data = json.loads(res)['stages']
    print(all_data)


if __name__ == '__main__':
    aaa('https://www.leisu.com/data/zuqiu/comp-45')
