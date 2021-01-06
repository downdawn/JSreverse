
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
        // toString,获取当前路径所对应的源代码
        console.log(path.toString());

        // 判断path是什么type
        if(path.isVariableDeclarator()){

            // 获取path的父路径
            let parent = path.parentPath;
            // path.parent  = path.parentPath.node
            console.log(parent.toString());

            // 获取path的子路径
            let id = path.get('id');
            console.log(id.toString());

            // 删除path
            // path.remove();

            // 替换path
            // path.replaceWith({type:"NumericLiteral", value:456});
            // or
            // path.replaceWith(types.NumericLiteral(456));
            // or
            // path.replaceInline(types.NumericLiteral(456));  // 兼容replaceWithMultiple和replaceWith，推荐

            // 插入
            // path.insertBefore(types.NumericLiteral(123));
            path.insertAfter(types.NumericLiteral(789));
        }

    },

}

//some function code

//调用插件，遍历处理源代码
traverse(ast,visitor);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
console.log('new code:', code)
