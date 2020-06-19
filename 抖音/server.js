const express = require('express');
const my_param = require('./jm.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());


app.get('/', function (req, res) {
    params = req.query['uid'];
    console.log(params);
    let data = my_param.get_sign(params);
    console.log(data);
    res.send(data);
});


app.listen(3000, () => {
    console.log('开启服务， 端口3000')
});
