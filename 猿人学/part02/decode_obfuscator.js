/*****************************************************
Module name:decode_obfuscator.js
Author:陆小凤
Date:2020.8.29
Version:V2.0

混淆工具地址:https://obfuscator.io/

脚本仅用于被obfuscator混淆了的代码，如果js魔改过，

则可能会导致本脚本失效。

声明:脚本仅用于学习研究，禁止非法使用，否则后果自负！

欢迎加入本人星球，解锁更多AST相关姿势！^_^

星球地址:

https://t.zsxq.com/FMRf2ZV

书山有路勤为径
学海无涯苦作舟

*****************************************************/

//babel库及文件模块导入

const fs = require('fs');

const parser    = require("@babel/parser");
const traverse  = require("@babel/traverse").default;
const types     = require("@babel/types");
const generator = require("@babel/generator").default;


/**********************************************************

命令行输入，获取混淆前的js源代码及解混淆后生成的新的js代码。
eg: node decode_obfuscator.js encode.js udc.js
encode.js 混淆前js源代码的路径
udc.js 生成新js代码的路径
默认 混淆前js源代码的路径为 ./encode.js
默认 生成新js代码的路径为   ./udc.js

***********************************************************/

let encode_file = "./encode.js",decode_file = "./udc.js";

if (process.argv.length > 2)
{
	encode_file = process.argv[2];
}
if (process.argv.length > 3)
{
	decode_file = process.argv[3];
}

let jscode = fs.readFileSync(encode_file, {encoding: "utf-8"});
let ast = parser.parse(jscode);


/***********************************************************

NumericLiteral ---> Literal
StringLiteral  ---> Literal
用于处理已十六进制显示的字符串或者数值

***********************************************************/
const delete_extra = 
{
    "NumericLiteral|StringLiteral":function(path)
    {
      delete path.node.extra;
    },
}

traverse(ast, delete_extra);

/********************************************************

BinaryExpression --> Literal,object对象还原预处理
UnaryExpression  --> Literal,object对象还原预处理

********************************************************/
const combin_BinaryExpression = 
{
	  "BinaryExpression|UnaryExpression|ConditionalExpression"(path)
    {
    	if (path.type == "UnaryExpression" && path.node.operator == "-")
    	{
    		return;
    	}
    	const {confident,value} = path.evaluate();
    	value != "Infinity" && confident && path.replaceInline(types.valueToNode(value));
    },
}
traverse(ast, combin_BinaryExpression);

/********************************************************************

替换函数调用处的字符串 即 CallExpression ----> StringLiteral
obfuscator 混淆过的js代码特征很明显 大数组 + 移位函数 + 解密函数，
然后在其他地方多次调用该解密函数
下面的插件将调用处的CallExpression直接计算出来，然后再替换值。

*********************************************************************/
const decode_str = {
	
	VariableDeclarator(path)
	{
		let {id,init} = path.node;
		if (!types.isArrayExpression(init) || init.elements.length == 0) return;
		let code = path.toString();
		
		let second_sibling = path.parentPath.getNextSibling(); //获取移位函数节点
		let third_sibling = second_sibling.getNextSibling();   //获取解密函数节点
		
		//******************************************************特征判断开始
		if (!second_sibling.isExpressionStatement() ||
		    !third_sibling.isVariableDeclaration()) 
		{
			return;
		}
	
		let expression = second_sibling.get('expression');
		if (!expression.isCallExpression()) return;
		
		
		
		let {callee,arguments} = expression.node;
		if (!types.isFunctionExpression(callee) || arguments.length < 2 ||
		    !types.isIdentifier(arguments[0],{name:id.name}) || 
		    !types.isNumericLiteral(arguments[1]))
		{
		   	return;
		}

		let declarations = third_sibling.node.declarations;
		if (declarations.length < 1 || !types.isFunctionExpression(declarations[0].init)) 
		{
			return;
		}
		//******************************************************特征判断结束
		
		
		
		let end = third_sibling.node.end; //防止遍历函数体里的调用
		let func_name = third_sibling.node.declarations[0].id.name; //解密函数的函数名，用于遍历其作用域
		let source_code = second_sibling.toString();
		
		if (source_code.indexOf('removeCookie') !== -1)
		{//如果含有检测格式化的代码，处理移位函数及解密函数
			let second_arg_node = callee.params[1];
			let body = callee.body.body;
			let call_fun = body[0].declarations[0].id;
			body.pop();
			body.push(types.ExpressionStatement(types.UpdateExpression("++", second_arg_node)));
			body.push(types.ExpressionStatement(types.CallExpression(call_fun, [second_arg_node])));
			
			third_sibling.traverse({
				AssignmentExpression(_path) {
					let left = _path.get('left');
					let left_code = left.toString();
					let right = _path.get('right');
					let right_code = right.toString();
					if (right_code.indexOf(func_name) === -1 ||right_code.indexOf(left_code) === -1 ) 
          {
          	return;
          }
          const if_parent_path = _path.findParent(p => {return p.isIfStatement();});
          if_parent_path && if_parent_path.replaceWith(_path.node);
        },
      })
    }

		code += ';!' + second_sibling.toString() + third_sibling.toString();
    //eval到本地环境
		eval(code);
		
		const binding = third_sibling.scope.getBinding(func_name);
		if (!binding || binding.constantViolations.length > 0)
		{
			return;
		}
		
		let can_removed = true;
		
		for (const refer_path of binding.referencePaths)
		{
		  if (refer_path.node.start < end)
			{
				continue;
			}
			let call_path = refer_path.findParent(p => {return p.isCallExpression();});

			try
			{
				let value = eval(call_path.toString());
				console.log(call_path.toString(),"-->",value);
				call_path.replaceWith(types.valueToNode(value))
      }catch(e){can_removed = false;}
		}
		
		if (can_removed)
		{
			path.remove();
			second_sibling.remove();
			third_sibling.remove();
		}
	},
}
traverse(ast, decode_str);



traverse(ast, combin_BinaryExpression);
//SequenceExpression ---> ExpressionStatement,object对象还原预处理 
const decode_comma = {
	ExpressionStatement(path)
	{
		//****************************************特征判断开始
		let prev_sibling = path.getPrevSibling();
		if (!prev_sibling.isVariableDeclaration()) return;
		let {declarations} = prev_sibling.node;
		if (declarations.length < 1) return;
		let {id,init} = declarations[0]; 
		if (!types.isObjectExpression(init)) return;

		let {expression} = path.node;
		if (!types.isSequenceExpression(expression)) return;
		//****************************************特征判断结束
		let body = [];
		expression.expressions.forEach(express=>
		{
			body.push(types.ExpressionStatement(express));
		})
		path.replaceInline(body);
	},
}
traverse(ast, decode_comma);


/*******************************************************
还原object，key多为字符串，value为字符串和函数
*******************************************************/
const decode_object = {
	VariableDeclarator(path)
	{
		const {id,init} = path.node;
		if (!types.isObjectExpression(init)) return;
		let name = id.name;
		let properties = init.properties;
		let all_next_siblings = path.parentPath.getAllNextSiblings();
		
		for (let next_sibling of all_next_siblings)
		{
			if (!next_sibling.isExpressionStatement())  break;
			let expression = next_sibling.get('expression');
			if (!expression.isAssignmentExpression()) break;

			let {operator,left,right} = expression.node;

			if (operator != '=' || !types.isMemberExpression(left) || 
			    !types.isIdentifier(left.object,{name:name}) || !types.isStringLiteral(left.property))
			{
				break;
			}
			properties.push(types.ObjectProperty(left.property,right));
			
			next_sibling.remove();
			
		}
		
		if (properties.length == 0)
		{
			return;
		}
		
		let scope = path.scope;
		let next_sibling = path.parentPath.getNextSibling();
		if (next_sibling.isVariableDeclaration())
		{
			let declarations = next_sibling.node.declarations;
			
			if (declarations.length > 0 && types.isIdentifier(declarations[0].init,{name:name}))
			{
				scope.rename(declarations[0].id.name,name);
				next_sibling.remove();
			}
		}
		
		for (const property of properties)
		{//预判是否为 obfuscator 混淆的object
			let key   = property.key.value;
			let value = property.value;
			if (!types.isStringLiteral(value) && !types.isFunctionExpression(value))
			{
				return;
			}
		}

		for (const property of properties)
		{
			let key   = property.key.value;
			let value = property.value;
			if (types.isLiteral(value))
			{
				scope.traverse(scope.block,{
					MemberExpression(_path)
					{
						let _node = _path.node;
						if (!types.isIdentifier(_node.object,{name:name})) return;
						if (!types.isLiteral(_node.property, {value:key})) return;
						_path.replaceWith(value);
					},
				})
			}
			else if (types.isFunctionExpression(value))
			{
				let ret_state = value.body.body[0];
				if(!types.isReturnStatement(ret_state)) continue;
				scope.traverse(scope.block,{
					CallExpression: function(_path) {
						let {callee,arguments} = _path.node;
						if (!types.isMemberExpression(callee)) return;
						
						if (!types.isIdentifier(callee.object,{name:name})) return;
						if (!types.isLiteral(callee.property, {value:key})) return;
						
						let replace_node = null;
						
						if (types.isCallExpression(ret_state.argument) && arguments.length > 0) {
							replace_node = types.CallExpression(arguments[0], arguments.slice(1));
            }
						else if (types.isBinaryExpression(ret_state.argument) && arguments.length === 2) 
            {
            	replace_node = types.BinaryExpression(ret_state.argument.operator, arguments[0], arguments[1]);
            }		
						else if (types.isLogicalExpression(ret_state.argument) && arguments.length === 2) 
            {
            	replace_node = types.LogicalExpression(ret_state.argument.operator, arguments[0], arguments[1]);
            }
            replace_node && _path.replaceWith(replace_node);
          }
        })
      }
    }
    path.remove();
  },
}
traverse(ast, decode_object);


/*******************************************************
去控制流
*******************************************************/
const decode_while = {
	WhileStatement(path)
	{
		const {test,body} = path.node;
		if (!types.isLiteral(test,{value:true}) || body.body.length === 0  || !types.isSwitchStatement(body.body[0])) return;
		let switch_state = body.body[0];
		let {discriminant,cases} = switch_state;
		if (!types.isMemberExpression(discriminant) || !types.isUpdateExpression(discriminant.property)) return;
		
		let arr_name = discriminant.object.name;
		let arr = [];
		let all_pre_siblings = path.getAllPrevSiblings();
		all_pre_siblings.forEach(pre_path =>
		{
			const {declarations} = pre_path.node;
			let {id,init} = declarations[0];
			if (arr_name == id.name)
			{
				arr = init.callee.object.value.split("|");
			}
			pre_path.remove();
		})
		
		let ret_body = [];
		arr.forEach(index =>
		{
			let case_body = cases[index].consequent;
			if (types.isContinueStatement(case_body[case_body.length-1]))
			{
				case_body.pop();
			}

			ret_body = ret_body.concat(case_body);
		})
		
		path.replaceInline(ret_body);
	},
}
traverse(ast, decode_while);

/***************************************************
处理IfStatement，规范If表达式
删除条件已知的语句
***************************************************/
traverse(ast, combin_BinaryExpression);
const decode_if = {
    IfStatement(path)
    {
        let {test,consequent,alternate} = path.node;
        if (!types.isBlockStatement(consequent))
        {
            path.node.consequent = types.BlockStatement([consequent]);
        }

        if (alternate !== null && !types.isBlockStatement(alternate))
        {
            path.node.alternate = types.BlockStatement([alternate]);
        }

        if (!types.isLiteral(test)) return;

        let value = test.value;
        consequent = path.node.consequent;
        alternate  = path.node.alternate;

        if (value)
        {
            path.replaceInline(consequent.body);
        }
        else
        {
            alternate === null? path.remove():path.replaceInline(alternate.body);
        }
    },
    EmptyStatement(path)
    {
        path.remove();
    },
}
traverse(ast, decode_if);


/************************************
处理完毕，生成新代码
*************************************/
let {code} = generator(ast);
fs.writeFile(decode_file, code, (err) => {});