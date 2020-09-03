var express = require("express")
var sdk = require("./sdk")
var sdk2 = require("./fingerprint2")
var encrypt_trace = require("./mouse_trace")
var bodyParser = require("body-parser")


var api = express()

api.use(
    bodyParser.urlencoded(
        {
            parameterLimit: 50000,
            limit: "50mb",
            extended: false
        }
    )
)


api.get("/ramdom_str", function (req, res) {
    var ramdom_str = sdk.get_ramdom_str(7);
    res.send(ramdom_str);
})


api.get("/get_uuid", function (req, res) {
    var uuid = sdk.uuid(32);
    res.send(uuid);
})


api.get("/get_cb", function (req, res) {
    var cb = sdk.get_cb();
    res.send(cb);
})

api.get("/get_fp", function (req, res) {
    var fp = sdk.get_fp();
    res.send(fp);
})


api.get("/get_fp2", function (req, res) {
    var fp = sdk.get_fp2();
    res.send(fp);
})


api.get("/get_fp3", function (req, res) {
    var fp = sdk2.get_fp3();
    res.send(fp);
})

api.get("/get_callback", function (req, res) {
    var call_back = sdk2.get_callback();
    res.send(call_back);
})


api.get("/get_mycallback", function (req, res) {
    var cb_str = Math.random().toString(36).slice(2, 9);
    res.send(cb_str);
})


api.get("/get_uuid", function (req, res) {
    var uuid = sdk.get_uuid();
    res.send(uuid);
})


api.post("/get_trace_data", function (req, res) {
    var token = req.body.token;
    var trace_list = JSON.parse(req.body.trace_list);
    var position_left = req.body.position_left;
    var result = encrypt_trace.encrypt_trace(trace_list, token, position_left);
    result = JSON.stringify(result);
    res.send(result)
})


var port = 8088;
var server = api.listen(port, function () {

})

console.log("server start listen on: http://127.0.0.1:"+port);



