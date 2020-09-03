var express = require("express")
var sdk = require("./my_encrypt.js")
var bodyParser = require('body-parser')

var api = express()

api.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false
}));

api.get('/get_token', function(req, res){
    var token = sdk.my_token()
    res.send(token)
});

//获取参数n
api.post('/encrypt_n', function(req, res){
    var token = req.body.token;
    var n = sdk.encrypt_n(token)
    res.send(n)
});

//获取参数o
api.post('/encrypt_o', function(req, res){
    var gt = req.body.gt;
    var challenge = req.body.challenge;
    var token = req.body.token;
    var o = sdk.encrypt_o(gt, challenge, token)
    res.send(o)
});

//获取参数 w = o + n
api.post('/encrypt', function(req, res){
    var gt = req.body.gt;
    var challenge = req.body.challenge;
    var token = req.body.token;
    var w = sdk.my_encrypt(gt, challenge, token)
    res.send(w)
});

api.get("/", function (req, res) {
    res.send("Wellcom, this is my crackjs script, geetest.")
})

var server = api.listen(8090, function () {

})

console.log("server start listen on: http://127.0.0.1:8090");


