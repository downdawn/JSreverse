
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = `
var a = parseInt("12345",16),b = Number("123"),c = String(true),d = unescape("hello%2CAST%21");
eval("a = 1");
`;

//转换为ast树
let ast = parser.parse(jscode);

const evaluate_global_func =
{
  "CallExpression"(path)
  {
    let {callee,arguments} = path.node;
    if (!types.isIdentifier(callee) || callee.name == "eval") return;
    if (!arguments.every(arg=>types.isLiteral(arg))) return;

    let func = global[callee.name];
    if (typeof func !== "function") return;

    let args = [];
    arguments.forEach((ele,index) =>{args[index] = ele.value;});

    let value = func.apply(null,args);
    if (typeof value == "function") return;
    path.replaceInline(types.valueToNode(value));
  },
}

//some function code

//调用插件，遍历处理源代码
traverse(ast,evaluate_global_func);

//生成新的js code，并保存到文件中输出
// minimal, 处理中文Unicode
let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});
console.log(code)
