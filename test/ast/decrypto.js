// 安装 npm install @babel/core

const parser = require("@babel/parser");  // 将JS源码转换成语法树
const traverse = require("@babel/traverse").default;  // 遍历AST
const t = require("@babel/types");  // 操作节点
const generator = require("@babel/generator").default;  // 将语法树转换为源代码
const fs = require('fs');  // 操作文件

// 读取源代码
var jscode = fs.readFileSync("./base64.js", {
    encoding: "utf-8"
});

// 源代码里的解密函数
var _0x2075 = ['wrw3EMKc', 'BBdBHWk=', 'wplgd8O5dHbDtFfDucK9CsOS', 'f8KvAcKewoDClg==', 'XcKowo9uOyfChw==', 'XcKowpRzOzDCgMKuw5vCtH8=', 'HmQkw5vDt8OIBDbCpMKdw6Aaw7HDmcKb', 'wpxzdMO4', 'R8KHF1k1w5A=', 'w4LDgcOowrjDhg==', 'w6RKw6PCmVDDpw==', 'w6DDgsKrCsK5wqAwKsOMTkPDilwgB241RVBIw6rCvwpWw5fCo8OSw59pBcK7UlrCucOZHy7DgsO5wpx5J8K5wqbCtMOMwqvCsiUFw5s4JGfDmwQPw7Fawq3CgXlkJyE=', 'VcObYsOHKcKpwpI=', 'KkZfcE52w77ChsKgUQ==', 'CmQsw57DvA==', 'YV7CscOYZg==', 'w5jDt8OUwr46w5c6LsKEPsO0', 'F8OUMQhRw78Q', 'YMKzeTvCpMKzHcKKGSjCj2dJwq3Cj3/ChsKSFVpMw4sZwrg9H8OLw4/DqUlhYlpaa8KYJsO5AcK2wqnCmGhEwqkbdMKKLsO/wpBFMcKlC8OvKUkXZ8KpBsOxw4XDk8K5w4Y6w7VZO8K/wojCqcO2wqQow5Z+w6dew7I3TMObw6Ykw7I=', 'Mk8Bw6QawqU=', 'wo5zw4vCkxvDuSBqwoENw7rCrF3DksKewoPDqMKHNSzCgcK2fcKxPMKbGcKwCW5GZWRpw6fDmgHCjXrCnXE3w4zDqlt3w64lw7JiworDi8Knw5YoW1LDlUbDpkEtGQPDnw==', 'w6lvdMKW', 'w7JFdsOhwrBqwrlMYcKVJRjCuMKQwpLDtMONwprCsMORw4BtRV0oeEQPCgAmMgx2'];
(function (_0xf486e7, _0x2075d7) {
    var _0x5c3a18 = function (_0x5b65b1) {
        while (--_0x5b65b1) {
            _0xf486e7['push'](_0xf486e7['shift']());
        }
    };
    _0x5c3a18(++_0x2075d7);
}(_0x2075, 0xa4));
var _0x5c3a = function (_0xf486e7, _0x2075d7) {
    _0xf486e7 = _0xf486e7 - 0x0;
    var _0x5c3a18 = _0x2075[_0xf486e7];
    if (_0x5c3a['vEVEZj'] === undefined) {
        (function () {
            var _0x2e1ca4;
            try {
                var _0x28e173 = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');');
                _0x2e1ca4 = _0x28e173();
            } catch (_0x16acc9) {
                _0x2e1ca4 = window;
            }
            var _0x16f958 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x2e1ca4['atob'] || (_0x2e1ca4['atob'] = function (_0x5a7812) {
                    var _0x3c7e74 = String(_0x5a7812)['replace'](/=+$/, '');
                    var _0x5e030c = '';
                    for (var _0x4eaee2 = 0x0, _0x5954ef, _0x29200e, _0x5a128b = 0x0; _0x29200e = _0x3c7e74['charAt'](_0x5a128b++); ~_0x29200e && (_0x5954ef = _0x4eaee2 % 0x4 ? _0x5954ef * 0x40 + _0x29200e : _0x29200e,
                    _0x4eaee2++ % 0x4) ? _0x5e030c += String['fromCharCode'](0xff & _0x5954ef >> (-0x2 * _0x4eaee2 & 0x6)) : 0x0) {
                        _0x29200e = _0x16f958['indexOf'](_0x29200e);
                    }
                    return _0x5e030c;
                }
            );
        }());
        var _0x3acf89 = function (_0x593a19, _0xfee22e) {
            var _0x1b5349 = [], _0x4ddb21 = 0x0, _0x28ed27, _0x4b4996 = '', _0xbdd0c6 = '';
            _0x593a19 = atob(_0x593a19);
            for (var _0x1d6343 = 0x0, _0x3f947e = _0x593a19['length']; _0x1d6343 < _0x3f947e; _0x1d6343++) {
                _0xbdd0c6 += '%' + ('00' + _0x593a19['charCodeAt'](_0x1d6343)['toString'](0x10))['slice'](-0x2);
            }
            _0x593a19 = decodeURIComponent(_0xbdd0c6);
            var _0x1a120c;
            for (_0x1a120c = 0x0; _0x1a120c < 0x100; _0x1a120c++) {
                _0x1b5349[_0x1a120c] = _0x1a120c;
            }
            for (_0x1a120c = 0x0; _0x1a120c < 0x100; _0x1a120c++) {
                _0x4ddb21 = (_0x4ddb21 + _0x1b5349[_0x1a120c] + _0xfee22e['charCodeAt'](_0x1a120c % _0xfee22e['length'])) % 0x100;
                _0x28ed27 = _0x1b5349[_0x1a120c];
                _0x1b5349[_0x1a120c] = _0x1b5349[_0x4ddb21];
                _0x1b5349[_0x4ddb21] = _0x28ed27;
            }
            _0x1a120c = 0x0;
            _0x4ddb21 = 0x0;
            for (var _0x585b7f = 0x0; _0x585b7f < _0x593a19['length']; _0x585b7f++) {
                _0x1a120c = (_0x1a120c + 0x1) % 0x100;
                _0x4ddb21 = (_0x4ddb21 + _0x1b5349[_0x1a120c]) % 0x100;
                _0x28ed27 = _0x1b5349[_0x1a120c];
                _0x1b5349[_0x1a120c] = _0x1b5349[_0x4ddb21];
                _0x1b5349[_0x4ddb21] = _0x28ed27;
                _0x4b4996 += String['fromCharCode'](_0x593a19['charCodeAt'](_0x585b7f) ^ _0x1b5349[(_0x1b5349[_0x1a120c] + _0x1b5349[_0x4ddb21]) % 0x100]);
            }
            return _0x4b4996;
        };
        _0x5c3a['HKkhxp'] = _0x3acf89;
        _0x5c3a['eabUGz'] = {};
        _0x5c3a['vEVEZj'] = !![];
    }
    var _0x5b65b1 = _0x5c3a['eabUGz'][_0xf486e7];
    if (_0x5b65b1 === undefined) {
        if (_0x5c3a['vszZjY'] === undefined) {
            _0x5c3a['vszZjY'] = !![];
        }
        _0x5c3a18 = _0x5c3a['HKkhxp'](_0x5c3a18, _0x2075d7);
        _0x5c3a['eabUGz'][_0xf486e7] = _0x5c3a18;
    } else {
        _0x5c3a18 = _0x5b65b1;
    }
    return _0x5c3a18;
};


// ast里观察_0x5c3a、遍历所有的CallExpression节点
function traverse_all_callexpress(ast) {
    // 遍历节点，当遇到下列类型的时候会调用函数
    traverse(ast, {
        CallExpression: {
            enter: [replace_function_to_string]
        },
    })
}

// 替换源代码里的_0x5c3a调用
function replace_function_to_string(path) {//对节点进行处理
    const node = path.node;
    //判断节点类型及函数名，不是则返回
    if (!t.isIdentifier(node.callee, {name: "_0x5c3a"})) return;
    //取实参值
    let first_arg = node.arguments[0].value;
    let second_arg = node.arguments[1].value;
    //调用本地的_0x5c3a函数
    let value = _0x5c3a(first_arg, second_arg);
    //打印看结果
    console.log(node.callee.name, first_arg, second_arg, value);
    //替换节点，因为计算出来的都是字符串，因此不用做判断
    path.replaceWith(t.StringLiteral(value));
}


let ast = parser.parse(jscode);

traverse_all_callexpress(ast);

let {code} = generator(ast);

fs.writeFile('decode_code1.js', code, (err) => {
});
