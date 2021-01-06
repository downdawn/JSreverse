
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = "var a = 123;";
//转换为ast树
let ast = parser.parse(jscode);

const visitor = {
    VariableDeclarator(path)
    {
        // 如何获取当前节点所对应的源代码
        const node = path.node;
        // console.log(node);
        let {code} = generator(node);
        console.log(code);

        // 获取子节点
        const value = node.init.value;
        console.log(value);

        // 节点赋值
        path.node.init.value = 456;

        // 删除节点
        // delete path.node.init;

        // 当做JSON
        console.log(JSON.stringify(node));

    },

}

//some function code

//调用插件，遍历处理源代码
traverse(ast,visitor);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
console.log('new code:', code)
