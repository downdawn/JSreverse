# -*- coding: utf-8 -*-

from flask import Flask, render_template, send_file


app = Flask(__name__)


@app.route('/')
def index():
    return send_file('result.html')


if __name__ == '__main__':
    app.run(port=7000, debug=True)
