# -*- coding: utf-8 -*-

import socketio

# 创建Socket.IO服务，使用协程
# cors_allowed_origins解决本地跨域问题
sio = socketio.Server(cors_allowed_origins='*', async_mode='eventlet')

# 准备打包成WSGI应用
app = socketio.Middleware(sio)
