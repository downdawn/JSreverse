
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = 'function test()\n' +
    '\n' +
    '{\n' +
    '\n' +
    '    var a = 123;\n' +
    '\n' +
    '    c = a + b;\n' +
    '\n' +
    '    crack();\n' +
    '\n' +
    '}';

//转换为ast树
let ast = parser.parse(jscode);

const visitor = {
    // 删除crack();
    "BlockStatement"(path) {
        let body = path.node.body;
        body.pop();
    }
}


//调用插件，遍历处理源代码
traverse(ast,visitor);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
console.log(code)
