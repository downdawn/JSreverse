var _$oe = function () {
  var b = true;
  return function (c, d) {
    var f = b ? function () {
      if (d) {
        var g = d["apply"](c, arguments);
        d = null;
        return g;
      }
    } : function () {};
    b = false;
    return f;
  };
}();

(function () {
  _$oe(this, function () {
    var b = new RegExp("function *\\( *\\)");
    var c = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "i");

    var d = _$og("init");

    if (!b["test"](d + "chain") || !c["test"](d + "input")) {
      d("0");
    } else {
      _$og();
    }
  })();
})();

var _$of = 160;
window["threshold"] = 160;
window["setInterval"](function () {
  if (window["outerWidth"] - window["innerWidth"] > _$of || window["outerHeight"] - window["innerHeight"] > _$of) {
    window["location"] = "about:blank";
    body["text"]("\u6B64\u7F51\u9875\u53D7\u3010\u7231\u952D\u4E91\u76FE V1.0 \u52A8\u6001\u7248\u3011\u4FDD\u62A4\uFF0C\u8BF7\u4E0D\u8981\u8C03\u51FA\u63A7\u5236\u53F0");
    window.threshold = 0;
  }
}, 0.25);

function _$og(a) {
  function c(d) {
    if (typeof d === "string") {
      return function (g) {}["constructor"]("while (true) {}")["apply"]("counter");
    } else {
      if (("" + d / d)["length"] !== 1 || d % 20 === 0) {
        (function () {
          return true;
        })["constructor"]("debugger")["call"]("action");
      } else {
        (function () {
          return false;
        })["constructor"]("debugger")["apply"]("stateObject");
      }
    }

    c(++d);
  }

  try {
    if (a) {
      return c;
    } else {
      c(0);
    }
  } catch (e) {}
}