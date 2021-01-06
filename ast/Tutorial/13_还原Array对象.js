
//文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

let jscode = `
var _2$SS = function(_SSz, _1111) {

    var _l1L1 = [46222, '\x74\x61\x43\x61\x70\x74\x63\x68\x61\x42\x6c\x6f\x62', '\x74', '\x61', '\x73', '\x6c', '\x64', '\x69', .3834417654519915, '\x65\x6e\x63\x72\x79\x70\x74\x4a', '\x73\x6f', '\x6e', 49344];

    var _2Szs = _l1L1[5] + _l1L1[7] + (_l1L1[4] + _l1L1[2])
      , _I1il1 = _l1L1[9] + (_l1L1[10] + _l1L1[11]);

    var _0ooQoO = _l1L1[0];
    var _$Z22 = _l1L1[12]
      , _2sS2 = _l1L1[8];

    return _l1L1[6] + _l1L1[3] + _l1L1[1];

};
`;

//转换为ast树
let ast = parser.parse(jscode);

const visitor = {
    // 还原数组对象
	VariableDeclarator(path){
		let {id,init} = path.node;
		// 非array或者没有元素，返回
		if (!types.isArrayExpression(init) || init.elements.length == 0) return;

		// 获取binding实例
		const binding = path.scope.getBinding(id.name);
		// 无修改，无引用，直接删除
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
			// 判断父节点是否是MemberExpression，索引值不是NumericLiteral类型不做处理
			if (!parent_path.isMemberExpression() || !types.isNumericLiteral(parent_node.property))
			{
				canRemoved = false;
				continue;
			};

			// 获取索引值
			let index = parent_node.property.value;
			// 获取索引值对应的节点，并替换
			parent_path.replaceWith(init.elements[index]);
		}
		canRemoved && path.remove();
	},
}


//调用插件，遍历处理源代码
traverse(ast,visitor);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
console.log(code)
