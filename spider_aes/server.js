const express = require('express');
const my_param = require('./jm');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/my_encrypt', function (req, res) {
    data = req.body['data'];
    console.log(data);
    let result = my_param.my_encrypt(data);
    // console.log(data);
    res.send(result);
});

app.post("/my_decrypt",function(req,res){
    data = req.body["data"];
    // console.log(data);
    let result = my_param.my_decrypt(data);
    // console.log(result);
    res.send(result);
});


app.listen(3000, () => {
    console.log('开启服务， 端口3000')
});

