
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = `
var a = 123,b;

let c = 4 + 5;

d = a + 12;
`;

//转换为ast树
let ast = parser.parse(jscode);

const visitor = {
    // 删除未被使用的变量
    "VariableDeclarator"(path) {
        const func_name = path.node.id.name;
        const binding = path.scope.getBinding(func_name);
        // 如果变量没有被引用过，那么删除也没关系
        // 此处不能用有无修改过进行判断，因为没有被修改过并不意味着没用
        if(binding && !binding.referenced){
            path.remove();
        }
    }
}


//调用插件，遍历处理源代码
traverse(ast,visitor);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
console.log(code)
