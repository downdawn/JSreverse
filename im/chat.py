# -*- coding: utf-8 -*-
import time

from server import sio


@sio.on('connect')
def on_connect(sid, environ):
    """
    与客户端建立好连接后被执行
    """
    print('sid={}'.format(sid))
    print('environ={}'.format(environ))

    msg_data = {
        'msg': 'hello',
        'timestamp': round(time.time() * 1000)
    }

    sio.emit('message', msg_data, room=sid)


@sio.on('message')
def on_message(sid, data):
    """
    接收message事件消息时执行
    """
    print('sid={} data={}'.format(sid, data))
    msg_data = {
        'msg': 'I have received your msg: {}'.format(data),
        'timestamp': round(time.time() * 1000)
    }
    sio.send(msg_data, room=sid)
    # sio.emit('message', msg_data, room=sid)
