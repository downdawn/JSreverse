const express = require('express');
const my_param = require('./jm');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/get_sign', function (req, res) {
    data = req.query["data"];
    console.log("data", data);
    let result = my_param.get_sign(data);
    console.log(result);
    res.send(result);
});

app.post('/get_data', function (req, res) {
    data = req.body["data"];
    url = req.body["url"]
    // console.log("data", data);
    let result = my_param.get_data(data, url);
    console.log(result);
    res.send(result);
});


app.listen(3000, () => {
    console.log('开启服务， 端口3000')
});

