
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
  
const fs = require('fs');

const delete_extra = 
{
    "NumericLiteral|StringLiteral":function(path)
    {
      delete path.node.extra;
    },
}

const combin_BinaryExpression = 
{
	  "BinaryExpression"(path)
    {
        const {confident,value} = path.evaluate();
        confident && path.replaceInline(t.valueToNode(value));
    },
}
   
function replace_ugly_code(path) {
   //获取第一个节点，大数组，不需要处理，直接得到源码
    let arr_path = path.get('body.0');
    let code = arr_path.toString();
    
   //获取第二个节点，自执行函数
    let shift_path = path.get('body.1');
    let callee_path = shift_path.get('expression.callee');

   //获取自执行函数的第二个形参，代码中的 ++_0x4187f8
    let second_arg_node = callee_path.get('params.1').node;
   
    //获取函数名，即代码中的_0x1672de 变量   
    let first_body = callee_path.get('body.body.0');
    let call_fun = first_body.node.declarations[0].id
    
    //删除所有_0x1672de 变量  的所有后兄弟节点
    var all_next_siblings = first_body.getAllNextSiblings();
    all_next_siblings.forEach(next_sibling => {
        next_sibling.remove();
    });
    
    //在函数(_0x1672de)前添加  ++_0x4187f8 节点
    first_body.insertBefore(t.ExpressionStatement(t.UpdateExpression("++", second_arg_node)));

   //在函数(_0x1672de)后添加  _0x1672de(_0x4187f8) 节点
    first_body.insertAfter(t.ExpressionStatement(t.callExpression(call_fun, [second_arg_node])));
      
    code += '!' + shift_path.toString();
    

   //获取第三个节点，解密函数
    let call_path = path.get('body.2');
   //获取函数名，需要进行返回
    let call_name = call_path.node.declarations[0].id.name;

    /*遍历所有AssignmentExpression节点，为了找到
   _0x1672de = _0x1672['nhkmlF'](_0x1672de, _0x4187f8);
   这行代码,找到后替换if父节点即可*/

    call_path.traverse({
        AssignmentExpression(_path) {
            let left = _path.get('left');
            let left_code = left.toString();
             
            let right = _path.get('right');
            let right_code = right.toString();
             
            if (right_code.indexOf(call_name) === -1 ||
                right_code.indexOf(left_code) === -1 ) 
            {
                return;
            }
             
            const if_parent_path = _path.findParent(p => {
                return p.isIfStatement();
            });
            if_parent_path && if_parent_path.replaceWith(_path.node);
        },
    })
     
    code += call_path.toString();
    return {call_name,code};
}
  
function replace_simple_code(path) {
     
    traverse(path.node,delete_extra)//防止所有字符串以十六进制形式展现导致查找失败。
       
    let source_code = path.toString();
    if(source_code.indexOf('removeCookie') !== -1) 
    {
        var {call_name,code} = replace_ugly_code(path);
    } 
    else
    {
        let arr_path = path.get('body.0');
        var code = arr_path.toString();
          
        let shift_path = path.get('body.1');
        code += '!' + shift_path.toString();
          
        let call_path = path.get('body.2');
        var call_name = call_path.get('declarations.0.id').toString();
        code += call_path.toString();
    }
      
    eval(code);
    
    let can_be_delete = true;
      
    path.traverse({
        CallExpression: function(_path) {
            let callee = _path.get('callee');
            if(callee.toString() !== call_name)
                return;
            try
            {
                let value = eval(_path.toString());
                console.log(value);
                value !== undefined && _path.replaceWith(t.valueToNode(value))
            }
            catch(e)
            {
                can_be_delete = false;
            }
        },
    });
     
    for (let i=0 ;can_be_delete && i<3; i++)
    {
        path.get('body.0').remove();
    }   
}

//解密字符串
const decode_str = {
    "Program"(path)
    {
        replace_simple_code(path)
    },
};

const decode_comma = {
	//破解逗号表达式，兼容之前的脚本
	ExpressionStatement(path)
	{
		//****************************************特征判断
		let prev_sibling = path.getPrevSibling();
		if (!prev_sibling.isVariableDeclaration()) return;
		let {declarations} = prev_sibling.node;
		if (declarations.length !== 1) return;
		let {id,init} = declarations[0]; 
		if (!t.isObjectExpression(init)) return;

		let {expression} = path.node;
		if (!t.isSequenceExpression(expression)) return;
		//****************************************特征判断
		
		let body = [];
		expression.expressions.forEach(express=>
		{
			body.push(t.ExpressionStatement(express));
		})
		
		path.replaceInline(body);
	},
}

//还原object
const decode_object = {
	VariableDeclarator(path)
	{
		const {id,init} = path.node;
		if (!t.isObjectExpression(init)) return;
		let name = id.name;
		let properties = init.properties;
		
		
		let all_next_siblings = path.parentPath.getAllNextSiblings();
		
		
		for (let next_sibling of all_next_siblings)
		{
			
			if (!next_sibling.isExpressionStatement())  break;
			
			
			let expression = next_sibling.get('expression');
			
			if (!expression.isAssignmentExpression()) break;
			
			
			let {operator,left,right} = expression.node;
			
			
			
			if (operator != '=' || !t.isMemberExpression(left) || !t.isIdentifier(left.object,{name:name}))
			{
				
				break;
			}
			

			properties.push(t.ObjectProperty(left.property,right));
			
			next_sibling.remove();
			
		}
		

		let scope = path.scope;
		let next_sibling = path.parentPath.getNextSibling();
		
		
		if (next_sibling.isVariableDeclaration())
		{
			let declarations = next_sibling.node.declarations;
			
			if (declarations.length == 1 && t.isIdentifier(declarations[0].init,{name:name}))
			{
				scope.rename(declarations[0].id.name,name);
				next_sibling.remove();
			}
		}

	
	
		for (const property of properties)
		{
			let key   = property.key.value;
			if (key.length !== 5)
			{
				return;
			} 
			let value = property.value;
			
			if (t.isLiteral(value))
			{
				scope.traverse(scope.block,{
					MemberExpression(_path)
					{
						let _node = _path.node;
						if (!t.isIdentifier(_node.object,{name:name})) return;
						if (!t.isLiteral(_node.property, {value:key})) return;
						_path.replaceWith(value);
					},
				})
			}
			else if (t.isFunctionExpression(value))
			{
				let ret_state = value.body.body[0];
				if(!t.isReturnStatement(ret_state)) continue;
				scope.traverse(scope.block,{
					CallExpression: function(_path) {
						let {callee,arguments} = _path.node;
						if (!t.isMemberExpression(callee)) return;
						
						if (!t.isIdentifier(callee.object,{name:name})) return;
						if (!t.isLiteral(callee.property, {value:key})) return;
						
						if (t.isCallExpression(ret_state.argument) && arguments.length > 0) {
							_path.replaceWith(t.CallExpression(arguments[0], arguments.slice(1)));
            }
						else if (t.isBinaryExpression(ret_state.argument) && arguments.length === 2) 
            {
            	let replace_node = t.BinaryExpression(ret_state.argument.operator, arguments[0], arguments[1]);
            	_path.replaceWith(replace_node);
            }		
						else if (t.isLogicalExpression(ret_state.argument) && arguments.length === 2) 
            {
            	let replace_node = t.LogicalExpression(ret_state.argument.operator, arguments[0], arguments[1]);
            	_path.replaceWith(replace_node);
            }
          }
        })
      }
    }
    
    path.remove();//慎重
  },
}



//去控制流
const decode_while = {
	
	WhileStatement(path)
	{

		const {test,body} = path.node;
		
		
		//特征语句判断，body.body[0] 必须是 SwitchStatement 节点，
		//注意一定要先判断长度，避免index出错
		if (!t.isUnaryExpression(test) || body.body.length === 0  || !t.isSwitchStatement(body.body[0])) return;
		
		let switch_state = body.body[0];
		
		//获取discriminant及cases节点
		let {discriminant,cases} = switch_state;
		
		//特征语句判断，经过此判断后，基本可以确定是需要还原的while节点了。
		//如果出错了，可以继续增加判断，直到不出错即可
		if (!t.isMemberExpression(discriminant) || !t.isUpdateExpression(discriminant.property)) return;
		
		//获取数组名，用于查找该数组。
		let arr_name = discriminant.object.name;
		let arr = [];
		
		//在这里再加一个特征语句的判断：WhileStatement 节点前面有一个节点
		let all_pre_siblings = path.getAllPrevSiblings();

		all_pre_siblings.forEach(pre_path =>
		{//虽然知道是第0个节点，但这里还是做下判断取arr
			const {declarations} = pre_path.node;
			let {id,init} = declarations[0];
			if (arr_name == id.name)
			{//如果是定义arr的节点，拿到该arr的值
				arr = init.callee.object.value.split("|");
			}
			//没啥用的语句可以直接删除
			pre_path.remove();
		})
		
		//新建一个 数组变量，用于存放 case 节点
		let ret_body = [];
		
		arr.forEach(index =>
		{//遍历数组，去case节点
			let case_body = cases[index].consequent;
			if (t.isContinueStatement(case_body[case_body.length-1]))
			{//删除 continue语句
				case_body.pop();
			}
			//存放于数组变量中
			ret_body = ret_body.concat(case_body);
		})
		
		//替换
		path.replaceInline(ret_body);
	},
}


const decode_if = {
    IfStatement(path)

    {
        let {test,consequent,alternate} = path.node;

        if (!t.isBlockStatement(consequent))

        {//添加中括号

            path.node.consequent = t.BlockStatement([consequent]);

        }

        if (alternate !== null && !t.isBlockStatement(alternate))

        {//添加中括号

            path.node.alternate = t.BlockStatement([alternate]);

        }

        //特征判断，if语句里面的test是否为字面量

        if (!t.isLiteral(test)) return;

        let value = test.value;
        consequent = path.node.consequent;

        alternate  = path.node.alternate;

        if (value)

        {//替换

            path.replaceInline(consequent.body);

        }

        else

        {//替换

            alternate === null? path.remove():path.replaceInline(alternate.body);

        }

    },

}


var jscode = fs.readFileSync("./encode.js", {
    encoding: "utf-8"
});
  

 
let ast = parser.parse(jscode);
 
traverse(ast, decode_str);
traverse(ast, combin_BinaryExpression);
traverse(ast, decode_comma);
traverse(ast, decode_object);
traverse(ast, decode_while);
traverse(ast, combin_BinaryExpression);
traverse(ast, decode_if);


let {code} = generator(ast);

fs.writeFile('decode_result.js', code, (err) => {});