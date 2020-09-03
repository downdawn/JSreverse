var CryptoJS=require('./node_modules/crypto-js');
var text = {"o00o0o00o0o0o0":"eval0514undefined"};
var key = "37fd7f3f77d7ceae";

function aes_encrypt(key, text) {
    var _text = JSON.stringify(text);
    var _key = CryptoJS.enc.Utf8.parse(key);
    var result = CryptoJS.AES.encrypt(_text, _key, {
        mode: CryptoJS.mode.ECB,  //解密的模式必须和加密的模式相同，包括填充类型也需要相同。
        padding: CryptoJS.pad.Pkcs7
    });
    // console.log(result);
    return result.ciphertext.toString();
}

var data = aes_encrypt(key, text);
console.log(data);

// e53279e5409c47828be1f4945ed5807fa541ffc9473439b8fb6dec59c6887216e6ad10ab51c3bd8d60f5aad5f56bda66

const data2 = Buffer.from(data, 'hex').toString('base64');
console.log(data2);

// 5TJ55UCcR4KL4fSUXtWAf6VB/8lHNDm4+23sWcaIchbmrRCrUcO9jWD1qtX1a9pm
