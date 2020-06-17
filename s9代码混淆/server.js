const express = require('express');
const my_param = require('./param5');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());


app.get('/', function (req, res) {
    let data = my_param.getparam();
    console.log(data);
    res.send(data);
});


app.listen(3000, () => {
    console.log('开启服务， 端口3000')
});

