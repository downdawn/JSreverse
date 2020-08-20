const express = require('express');
const my_param = require('./jm');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/get_sign', function (req, res) {
    data = req.query['data'];
    token = req.query['token'];
    console.log("data", data);
    console.log("token", token);
    let result = my_param.get_sign(token, data);
    console.log(result);
    res.send(result);
});


app.listen(3000, () => {
    console.log('开启服务， 端口3000')
});

