
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = "var a;";
//转换为ast树
let ast = parser.parse(jscode);

const visitor = {
    // https://babeljs.io/docs/en/babel-types
    // var a; 将其转变为 var a = 1+2;
    "VariableDeclarator"(path) {
        const {init} = path.node;
        const node = {
            type: "BinaryExpression",
            operator: "+",
            left: {
                type: "NumericLiteral",
                value: 1
            },
            right: {
                type: "NumericLiteral",
                value: 2
            },
        };
        // 逻辑或，如果init为True，返回init，否则返回后面的
        init || path.set("init", node);
    }
}

//some function code

//调用插件，遍历处理源代码
traverse(ast,visitor);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
console.log(code)
