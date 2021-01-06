
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = 'var a = 123;\n' +
    '\n' +
    ';\n' +
    '\n' +
    'var b = 456;';

//转换为ast树
let ast = parser.parse(jscode);

const visitor = {
    // 删除多余空语句
    "EmptyStatement"(path) {
        path.remove();
    }
}


//调用插件，遍历处理源代码
traverse(ast,visitor);

//生成新的js code，并保存到文件中输出
// retainLines，是否删除多余空行，默认false
let {code} = generator(ast,opts={retainLines:false});
console.log(code)
