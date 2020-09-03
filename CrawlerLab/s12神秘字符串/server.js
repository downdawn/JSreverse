const express = require('express');
const my_param = require('./jm');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// app.get('/', function (req, res) {
//     let data = my_param.getparam();
//     console.log(data);
//     res.send(data);
// });

app.post("/",function(req,res){
    data = req.body["data"];
    console.log(data);
    let result = my_param.getparam(data);
    console.log(result);
    res.send(result);
});


app.listen(3000, () => {
    console.log('开启服务， 端口3000')
});

