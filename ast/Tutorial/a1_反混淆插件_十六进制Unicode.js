
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = `
var _0x1201 = ['\x6c\x6f\x67', '\x48\x65\x6c\x6c\x6f\x20\x57\x6f\x72\x6c\x64\x21'];
(function(_0x2b91f5, _0x120157) {
    var _0x2e36e7 = function(_0x40e9dc) {
        while (--_0x40e9dc) {
            _0x2b91f5['\x70\x75\x73\x68'](_0x2b91f5['\x73\x68\x69\x66\x74']());
        }
    };
    _0x2e36e7(++_0x120157);
}(_0x1201, 0xa3));
var _0x2e36 = function(_0x2b91f5, _0x120157) {
    _0x2b91f5 = _0x2b91f5 - 0x0;
    var _0x2e36e7 = _0x1201[_0x2b91f5];
    return _0x2e36e7;
};
function hi() {
    var _0x379bb0 = _0x2e36;
    console[_0x379bb0('\x30\x78\x31')](_0x379bb0('\x30\x78\x30'));
}
hi();
`;

//转换为ast树
let ast = parser.parse(jscode);

const transform_literal = {
  NumericLiteral({node}) {
    if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
      node.extra = undefined;
    }
  },
  StringLiteral({node})
  {
    if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
      node.extra = undefined;
    }
  },
}

//some function code

//调用插件，遍历处理源代码
traverse(ast,transform_literal);

//生成新的js code，并保存到文件中输出
// minimal, 处理中文Unicode
let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});
console.log(code)
