const traverse_var_declarator = {
	
	VariableDeclarator(path){
		let {id,init} = path.node;
		const binding = path.scope.getBinding(id.name);
		
		if (!binding || binding.constantViolations.length > 0)
    {
    	return;
    }
		if (binding.referenced == false)
		{
			path.remove();
			return;
		}
		if (!types.isLiteral(init) && !types.isIdentifier(init))
		{
			return;
		}
		let refer_paths = binding.referencePaths;
		for (const refer_path of refer_paths)
		{
			refer_path.replaceWith(init);
		}             
    path.remove();	
	},
}

/***********************************************************
function name:traverse_literal
traverse:
var a = "\u0031\x32",b = 0x25,c = 0b10001001,d = 0o123456;
=====>
var a = "12",b = 37,c = 137,d = 42798;
注意:有些"\uxxxx" 或者 "\x**"，替换出来时可能是乱码。

注: 参考 官方插件 plugin-transform-literals，略有改动。
***********************************************************/
const traverse_literal = {
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

/********************************************************************
a.length  ====> a["length"];
参考官方插件
plugin-transform-member-expression-literals
略有修改

var foo = {
  bar: function () {},
}
=====>
var foo = {
  "bar": function () {},
}
参考官方插件 plugin-transform-property-literals
*********************************************************************/

const pre_object = {
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


/***************************************************
处理IfStatement，规范If表达式
if (a)
  console.log("123");
  
===>
if (a) {
  console.log("123");
}

删除条件已知的语句
if (1+2)
{
	console.log("123");
}
else
{
	console.log("456");
}

===>

console.log("123");
***************************************************/

const pretty_if_statement = {
	
	"IfStatement"(path)
	{
		let {consequent,alternate} = path.node;
		if (!types.isBlockStatement(consequent))
		{
			path.node.consequent = types.BlockStatement([consequent]);
		}
		if (alternate !== null && !types.isBlockStatement(alternate))
		{
			path.node.alternate = types.BlockStatement([alternate]);
		}  
		
		let test_path = path.get('test');
		const evaluateTest = test_path.evaluateTruthy();
		if (evaluateTest === true)
		{
			path.replaceInline(consequent.body);
		}
		else if (evaluateTest === false)
		{
			alternate = path.node.alternate;
			alternate === null? path.remove():path.replaceInline(alternate.body);
		}  
  },
  "ConditionalExpression"(path)
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
			path.replaceInline(alternate);
		}  
  }, 
}



/*********************************************
判断一个节点是否是字面量，仅支持判断
Literal表达式,或者数组类型的节点其元素是否全部为字面量
欢迎补充

ArrayExpression
ObjectExpression
CallExpression
这三种类型。

*********************************************/
function is_path_literal(path)
{
	if (path.isLiteral()) return true;	
	
	let key = null;
	if (path.isArrayExpression())
	{
		key = "elements";
	}
	else if (path.isObjectExpression())
	{
		key = "properties";
	}
	else if (path.isCallExpression())
	{
		key = "arguments";
	}
	
	else
	{
		return false;		
	}
	
	let elements = path.get(key);
	
	if (key == "properties")
	{
		return elements.every(element => element.get("value").isLiteral());
	}
	else
	{
		return elements.every(element=>element.isLiteral());
	}
}


/********************************************************
BinaryExpression      --> Literal
1+2       =====> 3
UnaryExpression       --> Literal
![]       =====> false
ConditionalExpression --> Literal
true?a:b; ====> a;
......其他类型的节点请自行添加
********************************************************/

const constant_fold = 
{
	"BinaryExpression|UnaryExpression|ConditionalExpression|CallExpression|MemberExpression"(path)
	{
		if(path.isUnaryExpression({operator:"-"}))
		{
			return;
		}
		const {confident,value} = path.evaluate();
		if (value == "Infinity" || !confident) return;
		path.replaceInline(types.valueToNode(value));
	},
}

const replace_eval = {
  CallExpression: {
  	exit(path) {
      let {callee, arguments} = path.node;
      if (!types.isIdentifier(callee, {name: "eval"})) return;
      if (arguments.length != 1 || !types.isLiteral(arguments[0]))
          return;
      let func_path = path.getFunctionParent();
      let source_code = func_path.toString();
      let value = arguments[0].value;
      source_code = source_code.replace(path.toString(), value);
      func_path.replaceWithSourceString(source_code);
   }
 },
}

/********************************************************************
处理FunctionDeclaration
思路:对于实参全部是字面量的函数调用，且运行结果唯一时，可以进行替换
before:
function add(a,b)
{
	return a+b;
}
s = add(1,2) + add(111,222);
after:
function add(a, b) {
  return a + b;
}

s = 3 + 333;
********************************************************************/
const traverse_func_declarator = {
	FunctionDeclaration(path)
	{
		let {id} = path.node;
		const binding = path.scope.parent.getBinding(id.name);
		if (!binding || binding.constantViolations.length > 0)
		{
			return;
		}
    
		if (binding.referenced == false)
		{
			path.remove();
			return;
		}
		
		let refer_paths = binding.referencePaths;
		
		let params_path = path.get('params');
		if (params_path.length == 0) return;
    
		let params = path.get('params').toString();
		let code   = "let window = this;\n" + path.get('body').toString();
		if (code.indexOf("try") != -1 || code.indexOf('random') != -1 || code.indexOf('Date') != -1)
		{//返回值不唯一不做处理
			return;
		}	
		
		var call_fun = new Function(params,code);
		
		for (const refer_path of binding.referencePaths)
		{
			let call_express = refer_path.findParent(p=>p.isCallExpression());
			if (!is_path_literal(call_express)) continue;

			let args = call_express.get('arguments');
			let new_args = [];

			for(var i=0; i<args.length; i++)
			{
				new_args[i] = args[i].node.value;
			}
			try{
				let value = call_fun.apply(null,new_args);
				
				console.log(call_express.toString(),"-->",value);
				
				if (typeof value == "string" || typeof value == "number")
				{
					call_express.replaceWith(types.valueToNode(value));
				}
			}catch(e){};
		}
	},
}

const replace_arr_element = 
{//数组还原
	VariableDeclarator(path){
		let {id,init} = path.node;
		if (!types.isArrayExpression(init) || init.elements.length == 0) return;
		
		const binding = path.scope.getBinding(id.name);
		if (!binding || binding.constantViolations.length > 0)
    {
    	return;
    }
		if (binding.referenced == false)
		{
			path.remove();
			return;
		}
		
		let canRemoved = true;
		
		for (refer_path of binding.referencePaths)
		{
			var parent_path = refer_path.parentPath;
			let parent_node = parent_path.node;
			if (!parent_path.isMemberExpression() || !types.isNumericLiteral(parent_node.property))
			{
				canRemoved = false;
				continue;
			};
			
			let index = parent_node.property.value;
			parent_path.replaceWith(init.elements[index]);
		}
		canRemoved && path.remove();
	},
}

const auto_exec = {
	CallExpression(path)
	{
		
		let callee    = path.get('callee');
		let arguments = path.get('arguments');
		if (!callee.isFunctionExpression() || arguments.length == 0)
		{
			return;
		}
		
		let params = callee.get('params');
		let scope  = callee.scope;
		
		for (let i=0; i<arguments.length; i++)
		{
			let arg = params[i];
			let name = arg.node.name;
			const binding = scope.getBinding(name);
			if (!binding || binding.constantViolations.length > 0)
			{
				continue;
			}
			for (refer_path of binding.referencePaths)
			{
				refer_path.replaceWith(arguments[i]);
			}
			arg.remove();
			arguments[i].remove();
		}
	},
	
	UnaryExpression:
	{
		exit(path)
		{
			const {operator, argument} = path.node;
			if (operator !== "!" || !types.isCallExpression(argument))
			{
				return;
			}
			let {callee, arguments} = argument;
			if (!types.isFunctionExpression(callee) || arguments.length !== 0)
			{
				return;
			}
			path.replaceInline(callee.body.body);
		}
	},
}






