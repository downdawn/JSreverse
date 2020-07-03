# -*- coding: utf-8 -*-

import eventlet

# 所有耗时的io操作，打上协程补丁
eventlet.monkey_patch()

import eventlet.wsgi

from server import app


# 导入写好的相关事件
import chat

# socket io 服务器运行的地址
SERVER_ADDRESS = ('', 8000)

# 启动socket io 服务器
sock = eventlet.listen(SERVER_ADDRESS)
# 使用WSGI服务器托管运行
eventlet.wsgi.server(sock, app)
