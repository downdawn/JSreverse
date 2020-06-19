const express = require('express');
const my_param = require('./jm');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/get_sig/', function (req, res) {
    let data = my_param.get_sig();
    console.log(data);
    res.send(data);
});

app.post("/get_data",function(req,res){
    data = req.body["data"];
    // console.log(data);
    let result = my_param.get_data(data);
    // console.log(result);
    res.send(result);
});


app.listen(3000, () => {
    console.log('开启服务， 端口3000')
});

