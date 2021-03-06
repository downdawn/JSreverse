const CryptoJS = require('crypto-js');

function get_param(t, num){
    let k = 'wdf2ff*TG@*(F4)*YH)g430HWR(*)' + 'wse';

    let m = CryptoJS.enc.Utf8.parse(k);

    let a = function(word){
            var srcs = CryptoJS.enc.Utf8.parse(word);
            var encrypted = CryptoJS.AES.encrypt(srcs, m, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
            };

    let s = a(parseInt(t) + '|' + parseInt(num));
    // a = s;
    // console.log(s)
    return s
}

console.log(get_param(1615001854, 2))
// zWTYHZfOqjsZ0Ot3b3VeOw==

module.exports = {
    "get_param": get_param
};


