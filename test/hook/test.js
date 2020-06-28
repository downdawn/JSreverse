window = new Proxy(global, {
    get: function (target, key, receiver) {
        console.log("window.get", key, target[key]);
        if (key == "location") {
            location = new Proxy(target[key], {
                get: function (_target, _key, _receiver) {
                    console.log("window.get", key, _key, _target[_key]);
                    if (_key == "port") {
                        console.log("关注公众号【妄为写代码】")
                    }
                    return _target[_key];
                }
            })
        }
        return target[key];
    }, set: function (target, key, value, receiver) {
        console.log("window.set", key, value);
        target[key] = value;
    }
});

window.a = {};
window.a;

window.location = {a: 2};
window.location.a;

window.b = {a: 2};
window.b.a;

location.port;

window.location.port;

