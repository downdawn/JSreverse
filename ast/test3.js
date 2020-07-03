const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const fs = require('fs');

var jscode = 'let test = "\u4F60\u597D\uFF0C\u591C\u5E55\uFF01\u0054\u0068\u0069\u0073\u0020\u0069\u0073\u0020\u0061\u0020\u0074\u0065\u0073\u0074\u0021";';

const visitor = {
    StringLiteral(path) {
        delete path.node.extra;
    },
};

let ast = parser.parse(jscode);
traverse(ast, visitor);
let {code} = generator(ast, opts = {jsescOption:{"minimal":true}});

fs.writeFile('result.js', code, (err) => {
});
