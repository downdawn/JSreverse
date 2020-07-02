# -*- coding: utf-8 -*-

import reco_pb2
import reco_pb2_grpc
import grpc
from concurrent.futures import ThreadPoolExecutor
import time


# rpc接口定义中服务对应成Python的类
class UserRecommendService(reco_pb2_grpc.UserRecommendServicer):

    # 在接口定义的同名方法中补全，被调用时应该执行的逻辑
    def user_recommend(self, request, context):
        # request是调用的请求数据对象
        user_id = request.user_id
        channel_id = request.channel_id
        article_num = request.article_num
        time_stamp = request.time_stamp

        response = reco_pb2.ArticleResponse()

        # 手动构造推荐结果，后续对接真实推荐代码
        response.exposure = 'exposure param'
        response.time_stamp = round(time.time() * 1000)
        recommends = []
        for i in range(article_num):
            article = reco_pb2.Article()
            article.track.click = 'click param {}'.format(i + 1)
            article.track.collect = 'collect param {}'.format(i + 1)
            article.track.share = 'share param {}'.format(i + 1)
            article.track.read = 'read param {}'.format(i + 1)
            article.article_id = i + 1
            recommends.append(article)
        response.recommends.extend(recommends)

        # 最终要返回一个调用结果
        return response


def serve():
    """
    rpc服务端启动方法
    """
    # 创建一个rpc服务器
    server = grpc.server(ThreadPoolExecutor(max_workers=10))

    # 向服务器中添加被调用的服务方法
    reco_pb2_grpc.add_UserRecommendServicer_to_server(UserRecommendService(), server)

    # 微服务器绑定ip地址和端口
    server.add_insecure_port('127.0.0.1:8888')

    # 启动rpc服务
    server.start()

    # start()不会阻塞，此处需要加上循环睡眠 防止程序退出
    while True:
        time.sleep(10)


if __name__ == '__main__':
    serve()
