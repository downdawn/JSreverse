
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = `
var a = b.length;
var foo = {
  bar: function () {},
}
`;

//转换为ast树
let ast = parser.parse(jscode);

const member_property_literals = {
  MemberExpression:
  {
    exit({node})
    {
      const prop = node.property;
      if (!node.computed && types.isIdentifier(prop))
      {
        node.property = types.StringLiteral(prop.name);
        node.computed = true;
      }
    }
  },
  ObjectProperty:
  {
    exit({node})
    {
      const key = node.key;
      if (!node.computed && types.isIdentifier(key))
      {
        node.key = types.StringLiteral(key.name);
      }
    }
  },
}

//some function code

//调用插件，遍历处理源代码
traverse(ast,member_property_literals);

//生成新的js code，并保存到文件中输出
// minimal, 处理中文Unicode
let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});
console.log(code)
