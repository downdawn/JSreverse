// 参考
// https://evilrecluse.top/post/7389a59f/#%E4%BD%9C%E7%94%A8%E5%9F%9FScope-%E4%B8%8E-%E8%A2%AB%E7%BB%91%E5%AE%9A%E9%87%8FBinding

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const jscode = `
function squire(i){
    return i * i * i;
}
function i()
{
    var i = 123;
    i += 2;
    return 123;
}
`;
let ast = parser.parse(jscode);
const visitor = {
    "FunctionDeclaration"(path){
        console.log("\n\n这里是函数 ", path.node.id.name + '()')
        path.scope.dump();
    }
}

traverse(ast, visitor);