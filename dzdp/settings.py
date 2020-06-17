# -*- coding: utf-8 -*-

review_url = "http://www.dianping.com/shop/{}/review_all"

detail_headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
                  " Chrome/81.0.4044.138 Safari/537.36",
}

list_headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
                  " Chrome/81.0.4044.138 Safari/537.36",
    "Referer": "http://www.dianping.com/xiamen/ch10"  # TODO 不要写死，设置cookie
}

file_path = "./woff_file/"
