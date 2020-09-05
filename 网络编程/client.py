# -*- coding: utf-8 -*-

import socket

# 创建一个客户端的socket对象
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 设置服务端的ip地址
host = '127.0.0.1'
# 设置端口
port = 9092
# 连接服务端
client.connect((host, port))

# while循环是为了保证能持续进行对话
while True:
    # 输入发送的消息
    sendmsg = input("请输入:")
    # 如果客户端输入的是q，则停止对话并且退出程序
    if sendmsg == 'q':
        break

    sendmsg = sendmsg
    # 发送数据，以二进制的形式发送数据，所以需要进行编码
    client.send(sendmsg.encode("utf-8"))
    msg = client.recv(1024)
    # 接收服务端返回的数据，需要解码
    print(msg.decode("utf-8"))

# 关闭客户端
client.close()
