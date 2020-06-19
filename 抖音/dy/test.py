# -*- coding: utf-8 -*-
import codecs
from urllib.parse import urlencode

import re
import requests

share_url = 'https://www.iesdouyin.com/share/user/88445518961'

pc_headers = {
    "pragma": "no-cache",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "_ga=GA1.2.241771287.1589438681; _gid=GA1.2.1535797353.1589438681",
    "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
}

response = requests.get(url=share_url, headers=pc_headers)
print(response.status_code)
# print(response.text)

tac_search = re.compile("<script>tac='(.*?)'</script>")

tac = re.search(tac_search, response.text).group(1)
print(tac)

new_tac = codecs.getdecoder("unicode_escape")(tac.encode())[0]
print(new_tac)

params = {
    "uid": "88445518961",
    # "tac": 'i)6a7fi56y2s!i#5bos"0y\u02a1g,&qnfme|ms g,)gk}ejo{\x7fcms!g,&Iebli\x7fms"l!,)~oih\x7fgyucmk"t (\x80,.jjvx|vDgyg}knbl"d"inkfl"v,.jjvx|vDgyg}knbmxl!,)~oih\x7fgyucgr&Objectn vuq%valuevfq(writable[#c}) %{s#t ,4KJarz}hrjxl@EWCOQDRB,3LKfs{}wsnqB{iAMWBP@,;DCj{}DSKUAWyTK[C[XrHZ^RFZ[[,7HGn\x7fyxowiES}PGWOW\\vL^BN,5JI`}{~iuk{m\x7fRAQMURxNG,3LKsnsjpl~nB{iAMWBP@,2MLpg\x7fa}kEnrjl~PQGG,5JI`}{~iuk{m\x7fTLTVDVWMM,1NMwf|`rjF\x7fm}qk~TD,4KJert|tripAjNVPBTUCC,4KJpo|ksmyoAjNVPBTUCC[+s#,)Vyn`h`fe|,,olbcCt~vz|cz,6ID}u\x7fuuhs@ieg|v@EHZMOY[#s$l$*%s%l%u&k4s&l$l&ms\'l l\'mk"t j\x06l#*%s%l%u&k?s&l#l&ms\'l ,(lfi~ah`{ml\'mk"t j\ufffbl ,(lfi~ah`{m*%s%l%u&kls&l&vr%matchxgr&RegExp$*\\$[a-z]dc_$ n"[!cvk:}l ,(lfi~ah`{ml&m,&efkaoTmk"t j\uffcef z[ cb|1d<,%Dscafgd"in,8[xtm}nLzNEGQMKAdGG^NTY\x1ckgd"inb<b|1d<g,&TboLr{m,(\x02)!jx-2n&vr$testxg,%@tug{mn ,%vrfkbm[!cb|'
    "tac": new_tac
}

url = "http://127.0.0.1:3000"

data = requests.get(url=url, params=urlencode(params))
print(data.url)
print(data.text)

# headers = {
#     "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36"
# }
# url = "https://www.iesdouyin.com/web/api/v2/aweme/post/?user_id=88445518961&sec_uid=&count=21&max_cursor=0&aid=1128&_signature=e7LcbRAYJRKf.V4ZiabvHXuy3H&dytk=7450aa3aef3feced81c810744bd2b79f"
# print(requests.get(url=url, headers=headers).text)

