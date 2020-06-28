const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const t = require("@babel/types");


var jscode = "var a = !![],b = 'Hello ' + 'world' + '!',c = 2 + 3 * 50,d = Math.abs(-200) % 19,e = true ? 123:456;";

function PathToLiteral(path, value) {
    switch (typeof value) {
        case "boolean":
            path.replaceWith(t.BooleanLiteral(value));
            break;
        case "string":
            path.replaceWith(t.StringLiteral(value));
            break;
        case "number":
            path.replaceWith(t.NumericLiteral(value));
            break;
        default:
            break;
    }
}

const visitor =
    {
        "BinaryExpression|UnaryExpression|ConditionalExpression": {
            exit: function (path) {
                const {value} = path.evaluate();
                PathToLiteral(path, value);
                // console.log(path.toString(), '-------', value)
            }
        }
    };

let ast = parser.parse(jscode);

traverse(ast, visitor);

let {code} = generator(ast);


console.log(code);