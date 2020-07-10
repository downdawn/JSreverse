const parser = require("@babel/parser");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const path = require('path');
const fs = require('fs');

const {decryptStr, decryptStrFnName} = require('./module');

fs.readFile(path.resolve(__dirname, './fullpage.8.9.5.js'), {"encoding": 'utf-8'}, function (err, data) {
    const ast = parser.parse(data);
    visitor(ast);

    // 将ast 转为 js
    let {code} = generator(ast, opts = {jsescOption: {"minimal": true}});
    // code = code.replace(/!!\[\]/g, 'true').replace(/!\[\]/g, 'false');
    console.log(code);
    fs.writeFile('result1.js', code, (err) => {
    });
});

function visitor(ast) {
    traverse(ast, {
        CallExpression: replace_DAI
    })
}

function replace_DAI(path) {
    var node = path.node;

    if (node.callee == undefined || node.callee.property == undefined) return;

    if (node.callee.property.name == 'DAi') {
        var arg = node.arguments[0].value;
        console.log(arg);
        console.log(decryptStr);
        var value = decryptStr(arg);
        // path.replaceInline(types.valueToNode(value));
        path.replaceWith(t.stringLiteral(value))
    }
}
