const express = require('express');
const my_param = require('./signature.js');
const app = express();

// 获取抖音 _signature 参数
app.get('/', function (req, res) {
    const uid = req.query['uid'];
    const tac = req.query['tac'];
    console.log(uid);
    console.log(tac);
    const sign = my_param.get_sign(uid, tac);

    if (sign) {
        const data = {
            "code": 200,
            "data": sign
        };
        const result = JSON.stringify(data);
        res.send(result);
    }else {
        const data = {
            "code": 400,
            "data": "_signature生成失败"
        };
        const result = JSON.stringify(data);
        res.send(result);
    }
});


app.listen(3000, () => {
    console.log('开启服务， 端口3000')
});
