const parser = require("@babel/parser");
const fs = require("fs");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const t = require("@babel/types");

// var jscode = "var a = \"\x48\x65\x6c\x6c\x6f\x2c\x4e\x69\x67\x68\x74\x54\x65\x61\x6d\x21\";\n";

// console.log(JSON.stringify(ast, null, '\t'));

// fs.writeFile('ast.js', JSON.stringify(ast, null, '\t'), (err)=>{});

// const visitor = {
//     // 匹配路径
//     "StringLiteral"(path) {
//         let {value,extra} = path.node;
//         delete extra.raw;
//
//     },
// };
//
// let ast = parser.parse(jscode);
//
// traverse(ast, visitor);

// let {code} = generator(ast);
// console.log(code);

// console.log(JSON.stringify(ast, null, '\t'));

var jscode = "var a =123;";

const visitor =
    {
        VariableDeclaration(path) {
            const operator = '='; //赋值语句的运算符是 =
            const left = t.Identifier('b'); //新建赋值语句左边的节点;
            const right = t.NumericLiteral(456);//新建赋值语句右边的节点;

            const new_assign = t.AssignmentExpression(operator, left, right) //构造一个赋值语句节点
            const new_express = t.ExpressionStatement(new_assign); //再构造成表达式语句
            path.insertAfter(new_express); //在变量声明语句后面插入
        }
    };

let ast = parser.parse(jscode);

traverse(ast, visitor);

let {code} = generator(ast);

console.log('插入前：', jscode);
console.log('插入后：', code);
