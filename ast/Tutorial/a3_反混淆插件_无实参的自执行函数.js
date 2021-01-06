
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = `
!(function()
{
  a = b;
})();
`;

//转换为ast树
let ast = parser.parse(jscode);

const simplify_auto_exec = {
  UnaryExpression(path)
  {
    let {operator,argument} = path.node;
    if (operator != "!" || !types.isCallExpression(argument)) return;
    let {arguments,callee} = argument;
    if (arguments.length !=0 || !types.isFunctionExpression(callee)) return;

    let {id,params,body} = callee;
    if (id != null || params.length !=0 || !types.isBlockStatement(body)) return;
    path.replaceWithMultiple(body.body);
  },
}

//some function code

//调用插件，遍历处理源代码
traverse(ast,simplify_auto_exec);

//生成新的js code，并保存到文件中输出
// minimal, 处理中文Unicode
let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});
console.log(code)
