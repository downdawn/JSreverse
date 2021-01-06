
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = 'var a = 123;';

//转换为ast树
let ast = parser.parse(jscode);

const visitor = {
    // var a = 123;
    // 转
    // var a = 123,b=456;
    "VariableDeclarator"(path) {
        let {id} = path.node;
        if (id.name == 'a'){
            let new_id = types.Identifier('b');
            let new_init = types.NumericLiteral(456);
            let new_node = types.VariableDeclarator(new_id, new_init);
            path.insertAfter(new_node);
        }
    }
}


//调用插件，遍历处理源代码
traverse(ast,visitor);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
console.log(code)
