# -*- coding: utf-8 -*-

import pymongo

from settings import mongo_uri, mongo_db, mongo_table


class MongoDbManager(object):
    def __init__(self):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db
        self.mongo_table = mongo_table
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def save(self, item):
        self.db[self.mongo_table].update({'url': item['url']}, dict(item), True)  # 过滤更新
        print("save data succeed：", item["title"])

    def close(self):
        self.client.close()


if __name__ == '__main__':
    test = MongoDbManager()
