# -*- coding: utf-8 -*-

import grpc
import reco_pb2
import reco_pb2_grpc
import time


def feed_articles(stub):
    # 构建rpc调用的调用参数
    user_request = reco_pb2.UserRequest()
    user_request.user_id = '1'
    user_request.channel_id = 1
    user_request.article_num = 10
    user_request.time_stamp = round(time.time() * 1000)

    # 通过stub进行方法调用，并接收调用返回值
    ret = stub.user_recommend(user_request)
    print('ret={}'.format(ret))


def run():
    """
    rpc客户端调用的方法
    """
    # 使用with语句连接rpc服务器
    with grpc.insecure_channel('127.0.0.1:8888') as channel:
        # 创建调用rpc远端服务的辅助对象stub
        stub = reco_pb2_grpc.UserRecommendStub(channel)
        # 通过stub进行rpc调用
        feed_articles(stub)


if __name__ == '__main__':
    run()
