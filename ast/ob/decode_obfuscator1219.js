/*****************************************************
Module name:decode_obfuscator.js
Author:陆小凤
Date:2020.12.19
Version:V9.0
混淆工具地址:https://obfuscator.io/
脚本仅用于被obfuscator混淆了的代码
声明:脚本仅用于学习研究，禁止非法使用，否则后果自负！
星球地址:
https://t.zsxq.com/FMRf2ZV
*****************************************************/

const fs = require('fs');
const parser    = require("@babel/parser");
const traverse  = require("@babel/traverse").default;
const types     = require("@babel/types");
const generator = require("@babel/generator").default;

//将源代码解析为AST
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./decode_result.js";

let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});
let ast    = parser.parse(sourceCode);


//判断节点元素是否全部为字面量
function isElementsLiteral(path)
{
	if (path.isLiteral()) return true;	
	
	if (path.isUnaryExpression({operator:"-"}) || path.isUnaryExpression({operator:"+"}))
	{
		return isElementsLiteral(path.get('argument'));
	}
	
	let key = null;
	if (path.isArrayExpression())
	{
		key = "elements";
	}
	else if(path.isObjectExpression())
	{
		key = "properties";
	}
	else if(path.isCallExpression())
	{
		key = "arguments";
	}
	
	else
	{
		return false;		
	}
	
	let elements = path.get(key);
	
	if (elements.length == 0) return false;
	
	if (key == "properties")
	{
		return elements.every(element => isElementsLiteral(element.get("value")));
	}
	else
	{
		return elements.every(element=>isElementsLiteral(element));
	}
}

//字面量解混淆
console.log("traverse Hex or Unicode String.......");

const traverseLiteral = {
	NumericLiteral({node}) {
		if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
			node.extra = undefined;
		}
  },
  StringLiteral({node}) 
  {
  	if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
  		node.extra = undefined;
    }
  },
}

traverse(ast, traverseLiteral);


const constantFold = 
{
	  "BinaryExpression|UnaryExpression"(path)
    {
    	if(path.isUnaryExpression({operator:"-"}) || path.isUnaryExpression({operator:"void"}))
    	{
    		return;
    	}
    	const {confident,value} = path.evaluate();
    	if (value == "Infinity" || !confident) return;
    	path.replaceInline(types.valueToNode(value));
    },
}

traverse(ast, constantFold);


const deleteRepeatDefine = {
	VariableDeclarator(path)
	{
		let {node,scope} = path;
		let name = node.id.name;
		let binding =  scope.getBinding(name);
		if (!binding || binding.constantViolations.length > 0)
    {
    	return;
    }
    
    scope.traverse(scope.block,{
    	VariableDeclarator(_path)
    	{
    		let {id,init} = _path.node;
    		if (!types.isIdentifier(init,{name:name})) return;
    		let _binding =  _path.scope.getBinding(id.name);
    		if (!_binding || _binding.constantViolations.length > 0)
    		{
    			return;
    		}
    		
    		_path.scope.rename(id.name,name);
    		_path.remove();
    	},
    })    
	},
}

traverse(ast, deleteRepeatDefine);



console.log("traverse callToLiteral.......");



const callToLiteral = {
	
	VariableDeclarator(path)
	{
		let {id} = path.node;
		let name = id.name;
		let init_path = path.get('init');

		if (!init_path.isArrayExpression()) return;
		
		let second_sibling = path.parentPath.getNextSibling(); 
		let third_sibling  = second_sibling.getNextSibling();  
		if (!second_sibling.isExpressionStatement() || !third_sibling.isVariableDeclaration()) 
		{
			return; 
		}
		let expression = second_sibling.get('expression');
		if (!expression.isCallExpression()) return;
		let declarations = third_sibling.get("declarations");
	  let func_node = declarations[0].node;
		let func_name = func_node.id.name;
		let third_init = func_node.init;
		if (!types.isFunctionExpression(third_init)) return;
		
		let code = path.toString() + ";!" + second_sibling.toString() + third_sibling.toString();
		
		let func_ast = parser.parse(code);
		sourceCode = generator(func_ast,opts = {"compact":true}).code;
	
		eval(sourceCode);
		
		let scope = path.scope;
		can_removed = true;
    
		let end = third_sibling.node.end;
		scope.traverse(scope.block,{
			"CallExpression"(_path)
			{
				if (_path.node.start < end) return;
				let {callee,arguments} = _path.node;
				if (!types.isIdentifier(callee,{name:func_name})) return;
				if (!isElementsLiteral(_path)) 
				{
					can_removed = false;
					return;
				}			
				let value = eval(_path.toString());
				console.log(_path.toString(),"-->",value);
				_path.replaceWith(types.valueToNode(value));				
			},
		});
		
		if (can_removed)
		{
			path.remove();
			second_sibling.remove();
			third_sibling.remove();
		}
	},
}

traverse(ast, callToLiteral);



console.log("traverse ForStatement.......");

const moveUpInitOfFor = {
	ForStatement(path)
	{
		let {init} = path.node;
		if (init == null) return;
		path.insertBefore(init);
		path.get("init").remove();
	},
}


traverse(ast, moveUpInitOfFor);



//object key值Literal

console.log("Object Preconditioning .......");

const keyToLiteral = {
	ExpressionStatement(path)
	{
		//****************************************特征判断开始
		let prev_sibling = path.getPrevSibling();
		if (!prev_sibling.isVariableDeclaration()) return;
		let {declarations} = prev_sibling.node;
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
traverse(ast, keyToLiteral);


const preDecodeObject = {
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
	},
}

traverse(ast, preDecodeObject);


console.log("Object Decode .......");


//处理object
const decodeObject = {
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
		
		for (const property of properties)
		{//预判是否为 obfuscator 混淆的object
			let key   = property.key.value;
			let value = property.value;
			if (!types.isStringLiteral(value) && !types.isFunctionExpression(value))
			{
				return;
			}
			if (types.isFunctionExpression(value))
			{
				let ret_state = value.body.body;
				if (!ret_state || ret_state.length != 1) return;
				if (!types.isReturnStatement(ret_state[0])) return;
			}
		}

		
		let can_removed = false;
		for (const property of properties)
		{
			let key   = property.key.value;
			let value = property.value;
			
			if (types.isLiteral(value))
			{
				scope.traverse(scope.block,{
					MemberExpression:{
					exit(_path)
					{
						let {object,property} = _path.node;
						if (!types.isIdentifier(object,{name:name})) return;
						if (!types.isLiteral(property, {value:key})) return;					
						_path.replaceInline(value);				
					}
				},
				})
			}
			else
			{
				let ret_state = value.body.body[0];
				scope.traverse(scope.block,{
					CallExpression: {
					exit(_path) {
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
            if (replace_node)
            {//替换函数成功为删除标志
            	can_removed = true;
            	_path.replaceWith(replace_node);
            }
          }
        }
       })
      }	
    }
    can_removed && path.remove();
  },
}
traverse(ast, decodeObject);

//有时候需要遍历两次才能处理干净
traverse(ast, decodeObject);



console.log("Control Flow Decoding.......");
//去控制流

const decodeWhile = {
	WhileStatement(path)
	{
		const {test,body} = path.node;
		if (!types.isLiteral(test,{value:true}) || body.body.length === 0  || !types.isSwitchStatement(body.body[0])) return;
		let switch_state = body.body[0];
		let {discriminant,cases} = switch_state;
		if (!types.isMemberExpression(discriminant) || !types.isUpdateExpression(discriminant.property)) return;
		
		let arr_name = discriminant.object.name;
		let binding =  path.scope.getBinding(arr_name);
		if (!binding || !binding.path) return;
		let bindPath = binding.path;
		if (!bindPath.isVariableDeclarator()) return;
		let {id,init} = bindPath.node; 
		if (!types.isCallExpression(init) || !types.isMemberExpression(init.callee)) return;
		let object = init.callee.object;
		if (!types.isStringLiteral(object)) return;
		let arr = object.value.split("|");
		bindPath.remove();
		
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
traverse(ast, decodeWhile);


console.log("RemoveDeadCode Decoding.......");

const removeDeadCode = {
	"IfStatement|ConditionalExpression"(path)
	{
		let {consequent,alternate} = path.node;
		let test_path = path.get('test');
		const evaluateTest = test_path.evaluateTruthy();
		if (evaluateTest === true)
		{
			path.replaceInline(consequent);
		}
		else if (evaluateTest === false)
		{
			if (alternate != null)
			{
				path.replaceInline(alternate);
			}
			else
			{
				path.remove();
			}
		}  		
	},
  EmptyStatement(path)
  {
  	path.remove();
  },  
}
traverse(ast, removeDeadCode);

//处理完毕，生成新代码
let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

fs.writeFile(decodeFile, code, (err) => {});