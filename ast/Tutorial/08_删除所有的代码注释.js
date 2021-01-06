
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = 'var a = 123; //this is single line comment\n' +
    '\n' +
    '\n' +
    '\n' +
    '/*\n' +
    '\n' +
    'This is a  multiline comments;\n' +
    '\n' +
    'test\n' +
    '\n' +
    'test\n' +
    '\n' +
    'test\n' +
    '\n' +
    '*/\n' +
    '\n' +
    'var b = 456;';

//转换为ast树
let ast = parser.parse(jscode);

//生成新的js code，并保存到文件中输出
// comments，控制代码注释
let {code} = generator(ast,opts={comments:false})
console.log(code)
