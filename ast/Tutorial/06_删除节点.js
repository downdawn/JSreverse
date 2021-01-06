
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = 'var a = "\x31\x32\x33\x34\x35\x36";';

//转换为ast树
let ast = parser.parse(jscode);

const visitor = {
    // var a = "\x31\x32\x33\x34\x35\x36";
    // 转为
    // var a = "123456";
    "StringLiteral"(path) {
        delete path.node.extra;

    }
}


//调用插件，遍历处理源代码
traverse(ast,visitor);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
console.log(code)
