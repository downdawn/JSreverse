
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = 'var a = 123,b = "123";';

//转换为ast树
let ast = parser.parse(jscode);

const visitor = {
    // var a = 123,b = "123";
    // 转为
    // var a = 123;
    "VariableDeclarator"(path) {
        let init = path.get('init');
        if (init.isStringLiteral()){
            path.remove();
        }

    }
}


//调用插件，遍历处理源代码
traverse(ast,visitor);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
console.log(code)
