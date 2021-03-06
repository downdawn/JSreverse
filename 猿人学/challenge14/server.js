const express = require('express');
const my_param = require('./jm');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/get_param', function (req, res) {
    ts = req.query['ts'];
    num = req.query['num'];
    console.log(ts)
    let result = my_param.get_param(ts, num);
    console.log(result);
    res.send(result);
});


app.listen(3000, () => {
    console.log('开启服务， 端口3000')
});

