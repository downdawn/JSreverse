function hi() {
  var _0x462bcd = 0;

  var _0x1952ad = function () {
    var _0x5a5674 = true;
    return function (_0x130720, _0x29ff1b) {
      var _0x5f5071 = _0x5a5674 ? function () {
        if (_0x29ff1b) {
          var _0x5b072e = _0x29ff1b["apply"](_0x130720, arguments);

          return _0x29ff1b = null, _0x5b072e;
        }
      } : function () {};

      return _0x5a5674 = false, _0x5f5071;
    };
  }();

  var _0x13eb6f = _0x1952ad(this, function () {
    var _0x1b96bc = 0;

    var _0x22dfe5 = function () {
      var _0x5eb032;

      try {
        _0x5eb032 = Function("return (function() " + "{}.constructor(\"return this\")( )" + ');')();
      } catch (_0x10323c) {
        _0x5eb032 = window;
      }

      return _0x5eb032;
    };

    var _0x10eb12 = _0x22dfe5();

    var _0x34d6c8 = _0x10eb12["console"] = _0x10eb12["console"] || {};

    var _0x5c4e5d = ["log", "warn", "info", "error", 'exception', "table", "trace"];
    var _0xcee0d = 0;

    for (; _0xcee0d < _0x5c4e5d['length']; _0xcee0d++) {
      var _0x134e84 = 0;

      var _0x5a4e21 = _0x1952ad["constructor"]["prototype"]["bind"](_0x1952ad);

      var _0x52d606 = _0x5c4e5d[_0xcee0d];

      var _0x53c5f2 = _0x34d6c8[_0x52d606] || _0x5a4e21;

      _0x5a4e21['__proto__'] = _0x1952ad["bind"](_0x1952ad);
      _0x5a4e21["toString"] = _0x53c5f2["toString"]['bind'](_0x53c5f2);
      _0x34d6c8[_0x52d606] = _0x5a4e21;
    }
  });

  _0x13eb6f();

  console["log"]("Hello World!");
}

hi();