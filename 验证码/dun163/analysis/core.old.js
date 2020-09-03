window.NECaptcha = function(e) {
    function t(i) {
        if (n[i])
            return n[i].exports;
        var r = n[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(r.exports, r, r.exports, t),
            r.loaded = !0,
            r.exports
    }
    var n = {};
    return t.m = e,
        t.c = n,
        t.p = "/2.14.0/",
        t(0)
}([function(e, t, n) {
    n(54),
        n(45);
    var i = n(29);
    e.exports = i
}
    , function(e, t) {
        var n = {}.toString
            , i = {
            slice: function(e, t, n) {
                for (var i = [], r = t || 0, o = n || e.length; r < o; r++)
                    i.push(r);
                return i
            },
            getObjKey: function(e, t) {
                for (var n in e)
                    if (e.hasOwnProperty(n) && e[n] === t)
                        return n
            },
            typeOf: function(e) {
                return null == e ? String(e) : n.call(e).slice(8, -1).toLowerCase()
            },
            isFn: function(e) {
                return "function" == typeof e
            },
            log: function(e, t) {
                var n = ["info", "warn", "error"];
                return "string" == typeof e && ~n.indexOf(e) ? void (console && console[e]("[NECaptcha] " + t)) : void i.error('util.log(type, msg): "type" must be one string of ' + n.toString())
            },
            warn: function(e) {
                i.log("warn", e)
            },
            error: function(e) {
                i.log("error", e)
            },
            assert: function(e, t) {
                if (!e)
                    throw new Error("[NECaptcha] " + t)
            },
            msie: function r() {
                var e = navigator.userAgent
                    , r = parseInt((/msie (\d+)/.exec(e.toLowerCase()) || [])[1]);
                return isNaN(r) && (r = parseInt((/trident\/.*; rv:(\d+)/.exec(e.toLowerCase()) || [])[1])),
                    r
            },
            now: function() {
                return (new Date).getTime()
            },
            getIn: function(e, t, n) {
                if ("[object Object]" !== Object.prototype.toString.call(e))
                    return n;
                "string" == typeof t && (t = t.split("."));
                for (var i = 0, r = t.length; i < r; i++) {
                    var o = t[i];
                    if (i < r - 1 && !e[o])
                        return n || void 0;
                    e = e[o]
                }
                return e
            },
            raf: function o(e) {
                var o = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
                        window.setTimeout(e, 16)
                    }
                ;
                o(e)
            },
            nextFrame: function(e) {
                i.raf(function() {
                    return i.raf(e)
                })
            },
            sample: function(e, t) {
                var n = e.length;
                if (n <= t)
                    return e;
                for (var i = [], r = 0, o = 0; o < n; o++)
                    o >= r * (n - 1) / (t - 1) && (i.push(e[o]),
                        r += 1);
                return i
            },
            template: function(e, t) {
                var n = function(e) {
                    return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
                }
                    , i = {
                    start: "<%",
                    end: "%>",
                    interpolate: /<%=(.+?)%>/g
                }
                    , r = i
                    , o = new RegExp("'(?=[^" + r.end.substr(0, 1) + "]*" + n(r.end) + ")","g")
                    , a = new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").replace(o, "\t").split("'").join("\\'").split("\t").join("'").replace(r.interpolate, "',$1,'").split(r.start).join("');").split(r.end).join("p.push('") + "');}return p.join('');");
                return t ? a(t) : a
            },
            uuid: function a(e, t) {
                var n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
                    , a = []
                    , i = void 0;
                if (t = t || n.length,
                    e)
                    for (i = 0; i < e; i++)
                        a[i] = n[0 | Math.random() * t];
                else {
                    var r = void 0;
                    for (a[8] = a[13] = a[18] = a[23] = "-",
                             a[14] = "4",
                             i = 0; i < 36; i++)
                        a[i] || (r = 0 | 16 * Math.random(),
                            a[i] = n[19 === i ? 3 & r | 8 : r])
                }
                return a.join("")
            },
            reverse: function(e) {
                return Array.isArray(e) ? e.reverse() : "string" === i.typeOf(e) ? e.split("").reverse().join("") : e
            },
            encodeUrlParams: function(e) {
                var t = [];
                for (var n in e)
                    e.hasOwnProperty(n) && t.push(window.encodeURIComponent(n) + "=" + window.encodeURIComponent(e[n]));
                return t.join("&")
            }
        };
        e.exports = i
    }
    , function(e, t, n) {
        function i(e) {
            if (e = e || window.event,
                e[v])
                return e;
            this.event = e,
                this.target = e.target || e.srcElement;
            var t = this.type = e.type;
            if (c.test(t) && (this.clientX = e.clientX || e.changedTouches && e.changedTouches[0].clientX,
                this.clientY = e.clientY || e.changedTouches && e.changedTouches[0].clientY,
                this.pageX = null != e.pageX ? e.pageX : e.clientX + j.scrollLeft,
                this.pageY = null != e.pageX ? e.pageY : e.clientY + j.scrollTop,
            "mouseover" === t || "mouseout" === t)) {
                for (var n = e.relatedTarget || e[("mouseover" === t ? "from" : "to") + "Element"]; n && 3 === n.nodeType; )
                    n = n.parentNode;
                this.relatedTarget = n
            }
            this[v] = !0
        }
        function r(e) {
            var t = e.nodeType;
            return 1 === t || 9 === t || 11 === t ? "string" == typeof e.textContent ? e.textContent : e.innerText : 3 === t || 4 === t ? e.nodeValue : ""
        }
        var o, a, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , l = n(1), u = n(17), f = document.createElement("div"), c = /^(?:click|dblclick|contextmenu|DOMMouseScroll|(mouse|touch|pointer)(?:\w+))$/, j = document;
        j = j.compatMode && "CSS1Compat" !== j.compatMode ? j.body : j.documentElement;
        var d = /Mobile/i.test(window.navigator.userAgent)
            , h = function() {
            var e = 0
                , t = !1
                , n = window.navigator;
            "undefined" != typeof n.maxTouchPoints ? e = n.maxTouchPoints : "undefined" != typeof n.msMaxTouchPoints && (e = n.msMaxTouchPoints);
            try {
                document.createEvent("TouchEvent"),
                    t = !0
            } catch (i) {}
            var r = "ontouchstart"in window;
            return e > 0 || t || r
        }()
            , p = function() {
            try {
                return document.createEvent("PointerEvent"),
                    !0
            } catch (e) {
                return !1
            }
        }()
            , y = {
            click: "touchstart",
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        }
            , v = "_fixed_" + Math.random().toString(36).slice(2, 7)
            , g = !1;
        try {
            document.createElement("div").addEventListener("test", function() {}, Object.defineProperty({}, "passive", {
                get: function() {
                    return g = !0,
                        !1
                }
            }))
        } catch (b) {}
        Object.assign(i.prototype, {
            stop: function() {
                this.preventDefault().stopPropagation()
            },
            preventDefault: function() {
                var e = this.event;
                return !h && e.preventDefault ? e.preventDefault() : e.returnValue = !1,
                    this
            },
            stopPropagation: function() {
                return this.event.stopPropagation ? this.event.stopPropagation() : this.event.cancelBubble = !0,
                    this
            },
            stopImmediatePropagation: function() {
                this.event.stopImmediatePropagation && this.event.stopImmediatePropagation()
            }
        });
        var m = {};
        m.body = document.body,
            m.doc = document,
            m.isMobile = d,
            m.supportTouch = h,
            m.supportPointer = p,
            m.supportPassive = g,
            f.addEventListener ? (o = function(e, t, n) {
                    e.addEventListener(t, n, !1)
                }
                    ,
                    a = function(e, t, n) {
                        e.removeEventListener(t, n, !1)
                    }
            ) : (o = function(e, t, n) {
                    e.attachEvent("on" + t, n)
                }
                    ,
                    a = function(e, t, n) {
                        e.detachEvent("on" + t, n)
                    }
            ),
            m.on = function(e, t, n) {
                var r = t.split(" ");
                return n.real = function(t) {
                    var r = new i(t);
                    r.origin = e,
                        n.call(e, r)
                }
                    ,
                    r.map(function(t) {
                        switch (!0) {
                            case d:
                                o(e, y[t] || t, n.real);
                                break;
                            case !d && h:
                                o(e, t, n.real),
                                "click" !== t && o(e, y[t], n.real);
                                break;
                            default:
                                o(e, t, n.real)
                        }
                    }),
                    m
            }
            ,
            m.once = function(e, t, n) {
                var i = function r() {
                    var i = n.apply(this, arguments);
                    return m.off(e, t, r),
                        i
                };
                return m.on(e, t, i)
            }
            ,
            m.off = function(e, t, n) {
                var i = t.split(" ");
                n = n.real || n,
                    i.map(function(t) {
                        switch (!0) {
                            case d:
                                a(e, y[t] || t, n);
                                break;
                            case !d && h:
                                a(e, t, n),
                                    a(e, y[t], n);
                                break;
                            default:
                                a(e, t, n)
                        }
                    })
            }
            ,
            m.find = function(e, t) {
                return "object" === ("undefined" == typeof e ? "undefined" : s(e)) && e.nodeType ? e : e ? (e = e.trim(),
                    t = t || document,
                    t.querySelector ? t.querySelector(e) : /^#[^#]+$/.test(e) ? document.getElementById(e.slice(1)) : /^\.[^.]+$/.test(e) ? m.getElementsByClassName(e.slice(1), t)[0] || null : /^[^.#]+$/.test(e) ? t.getElementsByTagName(e)[0] || null : null) : null
            }
            ,
            m.findAll = function(e, t) {
                if (t = t || document,
                    e = e.trim(),
                    t.querySelectorAll)
                    return t.querySelectorAll(e);
                if (/^#[^#]+$/.test(e)) {
                    var n = document.getElementById(e.slice(1));
                    return n ? [n] : []
                }
                return /^\.[^.]+$/.test(e) ? m.getElementsByClassName(e.slice(1), t) : /^[^.#]+$/.test(e) ? t.getElementsByTagName(e) : []
            }
            ,
            m.html = function(e, t) {
                return "undefined" === l.typeOf(t) ? e.innerHTML : void (e.innerHTML = t)
            }
            ,
            m.css = function(e, t) {
                e.style.cssText += ";" + t
            }
            ,
            m.replace = function(e, t) {
                t.parentNode && t.parentNode.replaceChild(e, t)
            }
            ,
            m.remove = function(e) {
                e.parentNode && e.parentNode.removeChild(e)
            }
            ,
            m.getComputedStyle = function(e, t) {
                var n = e.currentStyle || window.getComputedStyle(e, null);
                return t ? n[t] : n
            }
            ,
            m.addClass = function(e, t) {
                if (e) {
                    var n = e.className || "";
                    ~(" " + n + " ").indexOf(" " + t + " ") || (e.className = n ? n + " " + t : t)
                }
            }
            ,
            m.delClass = function(e, t) {
                if (e) {
                    var n = e.className || "";
                    e.className = (" " + n + " ").replace(" " + t + " ", " ").trim()
                }
            }
            ,
            m.hasClass = function(e, t) {
                if (!e)
                    return !1;
                var n = e.className || "";
                return ~(" " + n + " ").indexOf(" " + t + " ")
            }
            ,
            m.getElementsByClassName = function(e, t) {
                if (t = t || document,
                    document.getElementsByClassName)
                    return t.getElementsByClassName(e);
                for (var n, i = t.getElementsByTagName("*"), r = [], o = 0, a = i.length; o < a; o++)
                    n = i[o],
                    ~(" " + n.className + " ").indexOf(" " + e + " ") && r.push(n);
                return r
            }
            ,
            m.getBubblePath = function(e) {
                for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document, n = [], i = e; i && i !== t; )
                    n.push(i),
                        i = i.parentNode;
                return n
            }
            ,
            m.transition = function(e, t) {
                function n() {}
                l.assert(e && e.nodeType, 'transition(el, opts) "el" must be a DOM element!');
                var i = {
                    name: "",
                    "enter-class": "",
                    "enter-active-class": "",
                    "leave-class": "",
                    "leave-active-class": "",
                    beforeEnter: n,
                    enter: n,
                    afterEnter: n,
                    enterCanceled: n,
                    beforeLeave: n,
                    leave: n,
                    afterLeave: n,
                    leaveCanceled: n,
                    insert: n
                };
                t = Object.assign({}, i, t);
                var r = t
                    , o = r.name
                    , a = r.beforeEnter
                    , s = r.enter
                    , f = r.afterEnter
                    , c = r.enterCanceled
                    , j = r.beforeLeave
                    , d = r.leave
                    , h = r.afterLeave
                    , p = r.leaveCanceled
                    , y = r.insert
                    , v = t["enter-class"] || o && o + "-enter"
                    , g = t["enter-active-class"] || o && o + "-enter-active"
                    , b = t["leave-class"] || o && o + "-leave"
                    , _ = t["leave-active-class"] || o && o + "-leave-active"
                    , w = !l.msie() || l.msie() > 9
                    , T = "transitionend"
                    , S = "animationend"
                    , E = !0
                    , R = !1
                    , k = !1;
                if (void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (T = "webkitTransitionEnd"),
                void 0 === !window.onanimationend && void 0 !== window.onwebkitanimationend && (S = "webkitAnimationEnd"),
                    w) {
                    var C = function() {
                        R && (E = !0,
                            R = !1,
                            m.delClass(e, g),
                            f(e)),
                        k && (k = !1,
                            m.delClass(e, _),
                            h(e))
                    };
                    e.addEventListener(T, C),
                        e.addEventListener(S, C)
                }
                return {
                    enter: function() {
                        if (e) {
                            if (!w)
                                return y(e),
                                    void f(e);
                            e.className = u(e.className.trim().split(/\s+/), v, g),
                                a(e),
                                y(e),
                                E = !1,
                                R = !0,
                                l.nextFrame(function() {
                                    m.delClass(e, v),
                                        s(e)
                                })
                        }
                    },
                    leave: function() {
                        if (e) {
                            if (!w || !E)
                                return void h(e);
                            e.className = u(e.className.trim().split(/\s+/), b, _),
                                j(e),
                                k = !0,
                                l.nextFrame(function() {
                                    m.delClass(e, b),
                                        d(e)
                                })
                        }
                    },
                    cancelEnter: function() {
                        R && (R = !1,
                            m.delClass(e, g),
                            c(e))
                    },
                    cancelLeave: function() {
                        k && (k = !1,
                            m.delClass(e, _),
                            p(e))
                    },
                    dispose: function() {
                        w && (e.removeEventListener(T, C),
                            e.removeEventListener(S, C)),
                            e = null
                    }
                }
            }
            ,
            m.text = function(e, t) {
                if (void 0 === t)
                    return r(e);
                var n = e.nodeType;
                1 !== n && 11 !== n && 9 !== n || ("string" == typeof e.textContent ? e.textContent = t : e.innerText = t)
            }
            ,
            f.className = "yidun_class",
            m.className = f.getAttribute("className") ? function(e) {
                    return e.getAttribute("className")
                }
                : function(e) {
                    return e.getAttribute("class")
                }
            ,
            m.getRect = function(e) {
                var t = e.getBoundingClientRect();
                if ("width"in t)
                    return t;
                var n = t.left
                    , i = t.top
                    , r = t.right
                    , o = t.bottom;
                return Object.assign({}, t, {
                    width: r - n,
                    height: o - i
                })
            }
            ,
            e.exports = m
    }
    , function(e, t) {
        t.CAPTCHA_TYPE = {
            JIGSAW: 2,
            POINT: 3,
            SMS: 4,
            INTELLISENSE: 5,
            ICON_POINT: 7,
            INFERENCE: 9,
            WORD_ORDER: 10,
            SPACE: 11
        },
            t.CAPTCHA_CLASS = {
                CAPTCHA: "yidun",
                PANEL: "yidun_panel",
                SLIDE_INDICATOR: "yidun_slide_indicator",
                SLIDER: "yidun_slider",
                JIGSAW: "yidun_jigsaw",
                POINT: "point",
                SMS: "yidun_sms",
                TIPS: "yidun_tips",
                REFRESH: "yidun_refresh",
                CONTROL: "yidun_control",
                BGIMG: "yidun_bgimg",
                INPUT: "yidun_input",
                LOADBOX: "yidun_loadbox",
                LOADICON: "yidun_loadicon",
                LOADTEXT: "yidun_loadtext",
                ERROR: "error",
                WARN: "warn",
                VERIFY: "verifying",
                SUCCESS: "success",
                LOADING: "loading",
                LOADFAIL: "loadfail"
            },
            t.WIDTH_LIMIT = [220, 1e4],
            t.SAMPLE_NUM = 50,
            t.DEVICE = {
                MOUSE: 1,
                TOUCH: 2,
                MOUSE_TOUCH: 3
            },
            t.MAX_VERIFICATION = 5,
            t.RTL_LANGS = ["ar", "he"],
            t.CACHE_MIN = 6e4,
            t.FILE_DETECT_KEY = {
                core: "NECaptcha",
                light: "NECaptcha_theme_light",
                dark: "NECaptcha_theme_dark",
                plugins: "NECaptcha_plugin",
                watchman: "initWatchman"
            },
            t.FEEDBACK_URL = "http://support.dun.163.com/feedback/captcha",
            t.RUN_ENV = {
                WEB: 10,
                ANDROID: 20,
                IOS: 30,
                MINIPROGRAM: 40,
                JUMPER_MINI_PROGRAM: 50,
                QUICKAPP: 60
            }
    }
    , function(e, t) {
        var n = {
            INVOKE_HOOK: "INVOKE_HOOK",
            EVENT_RESET: "EVENT_RESET",
            SWITCH_TYPE: "SWITCH_TYPE",
            SET_TYPE: "SET_TYPE",
            SWITCH_LOAD_STATUS: "SWITCH_LOAD_STATUS",
            UPDATE_VERIFY_STATUS: "UPDATE_VERIFY_STATUS",
            REFRESH: "REFRESH",
            UPDATE_COUNTS_OF_VERIFYERROR: "UPDATE_COUNTS_OF_VERIFYERROR",
            SET_TOKEN: "SET_TOKEN",
            EVENT_RESET_CLASSIC: "EVENT_RESET_CLASSIC"
        };
        e.exports = n
    }
    , function(e, t) {
        function n(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
                e
        }
        function i(e, t) {
            function n() {}
            n.prototype = t.prototype,
                e.prototype = new n,
                e.prototype.constructor = e
        }
        function r(e, t, n) {
            this.name = "CaptchaError",
                this.code = e,
                this.message = e + ("(" + b[e] + ")") + (t ? " - " + t : ""),
                Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack,
                this.data = n || {}
        }
        var o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , s = "prototype", l = 100, u = 200, f = 300, c = 432, j = 500, d = 501, h = 502, p = 503, y = 504, v = 600, g = 1e3, b = (o = {},
            n(o, l, "script error"),
            n(o, u, "business error"),
            n(o, f, "unpass error"),
            n(o, c, "captcha id is invalid"),
            n(o, j, "request error"),
            n(o, d, "request api error"),
            n(o, h, "request script error"),
            n(o, p, "request img error"),
            n(o, y, "request timeout error"),
            n(o, v, "request anticheat token error"),
            n(o, g, "unknown error"),
            o);
        i(r, Error),
            r[s].toString = function() {
                var e = String(this.stack);
                return 0 === e.indexOf("CaptchaError:") ? e : this.name + ": " + this.message + (e ? "\n    " + e : "")
            }
            ,
            r.set = function(e, t) {
                "number" == typeof e && "string" == typeof t && (b[e] = t),
                "object" === ("undefined" == typeof e ? "undefined" : a(e)) && e && Object.assign(b, e)
            }
            ,
            r.get = function(e) {
                return b[e]
            }
            ,
            r.remove = function(e) {
                String(e)in b && delete b[e]
            }
            ,
            t = e.exports = r,
            t.SCRIPT_ERROR = l,
            t.BUSINESS_ERROR = u,
            t.UNPASS_ERROR = f,
            t.ID_INVAILD_ERROR = c,
            t.REQUEST_ERROR = j,
            t.REQUEST_API_ERROR = d,
            t.REQUEST_SCRIPT_ERROR = h,
            t.REQUEST_IMG_ERROR = p,
            t.REQUEST_TIMEOUT_ERROR = y,
            t.ANTICHEAT_TOKEN_ERROR = v,
            t.UNKNOWN_ERROR = g
    }
    , function(e, t, n) {
        function i(e) {
            var t = {};
            return e.map(function(e) {
                t[e] = function() {
                    var t = this
                        , n = _.options.mixins || {};
                    (n[e] || []).map(function(e) {
                        return e.call(t)
                    }),
                        this.$options[e].map(function(e) {
                            return e.call(t)
                        })
                }
            }),
                t
        }
        function r(e) {
            function t() {}
            function n() {
                o.apply(this, arguments)
            }
            if (e instanceof _)
                return e;
            var i = {};
            Object.keys(e).map(function(t) {
                ["render"].indexOf(t) > -1 && (i[t] = e[t])
            }),
            f(e.methods) && Object.assign(i, e.methods);
            var o = this.extend({});
            return t.prototype = o.prototype,
                n.prototype = new t,
                Object.assign(n.prototype, i),
                n.prototype.constructor = n,
                n._options = e,
                n._extend = r,
                n
        }
        var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }
            , a = n(18)
            , s = n(39)
            , l = n(10)
            , u = l.getDocFragmentRegex
            , f = l.isPlainObject
            , c = l.getIn
            , j = l.parseAttrsStr
            , d = l.diffDataToUpdate
            , h = l.nextTick
            , p = l.lifeCycleHooks
            , y = n(38)
            , v = n(37)
            , g = n(40)
            , b = n(2)
            , m = 0
            , _ = a(o({
            initialize: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                    , t = this.constructor
                    , n = m++;
                this.id = "__c_" + n,
                    this.name = e.name,
                    this._isMounted = !1,
                    this.$options = y(t._options || {}, e),
                e.render && (this.render = e.render),
                e.methods && Object.assign(this, e.methods),
                    this._boundProps = e._boundProps || {};
                var i = this.$parent = e.$parent || null;
                if (i)
                    if (i.$root)
                        this.$root = i.$root;
                    else {
                        for (var r = i; r.$parent; )
                            r = r.$parent;
                        this.$root = r
                    }
                this.beforeCreate();
                var o = this.$options
                    , a = o.template
                    , l = o.propsData
                    , u = o.data;
                this.$props = this._validateProps(l, !0) || {},
                    Object.assign(this, this.$props),
                    this.$data = "function" == typeof u ? u.call(this) : u || {},
                    Object.assign(this, this.$data),
                    this._composer = s(a, this),
                    this.$children = [],
                    this._instantiateChildren(),
                    this._updater = {
                        id: n,
                        instance: this,
                        data: {}
                    },
                    this.created(),
                e.el && this.$mount(e.el)
            },
            $mount: function(e) {
                this.beforeMount(),
                    this._childrenBeforeMount(),
                    this._composeString(this._composer, this);
                var t = this._composer.toString();
                if ("string" == typeof e || e && 1 === e.nodeType)
                    e = b.find(e),
                        this.$options["abstract"] ? this.$el = e : (e.innerHTML = t,
                            this.$el = e.children[0]);
                else {
                    var n = document.createElement("div");
                    n.innerHTML = t,
                        this.$el = n.children[0],
                    "function" == typeof e && e(this.$el)
                }
                return this._childrenMounted(),
                    this._initEvents(),
                    this._isMounted = !0,
                    this.mounted(),
                    this
            }
        }, i(p), {
            $setData: function(e, t) {
                !t && (e = d(e, this.$data)),
                e && Object.keys(e).length && (this._resolveWatch(e).map(function(e) {
                    return e()
                }),
                    Object.assign(this.$data, e),
                    Object.assign(this, this.$data),
                    Object.assign(this._updater.data, e),
                    v(this._updater),
                    this._renderChildren(e))
            },
            $forceUpdate: function() {
                var e = Object.assign({}, this.$data, this.$props);
                this.$setData(e, !0)
            },
            $replaceChild: function(e, t) {
                var n = t.$el.parentElement
                    , i = t.$el.nextSibling
                    , r = void 0;
                r = null === i ? function(e) {
                        n.appendChild(e)
                    }
                    : function(e) {
                        n.insertBefore(e, i)
                    }
                    ,
                    e._boundProps = t._boundProps,
                    e.$parent = this,
                    t.$destroy();
                var o = this.$children.indexOf(t);
                o > -1 && this.$children.splice(o, 1, e),
                    e.$mount(r)
            },
            $destroy: function(e) {
                this._isMounted && (this.beforeDestroy(),
                    this._childrenBeforeDestroy(),
                !e && !this.$options["abstract"] && this.$el && this.$el.parentElement && this.$el.parentElement.removeChild(this.$el),
                this._events && (this._events.off(),
                    this._events = null),
                    this.$el = null,
                    this.$props = null,
                    this.$data = null,
                    this.$root = null,
                    this.$parent = null,
                    this.$children = null,
                    this.$options = null,
                    this._isMounted = !1)
            },
            $nextTick: h,
            render: function() {},
            _initEvents: function() {
                var e = this
                    , t = this.$el
                    , n = this.$options.on;
                if (t && f(n)) {
                    var i = {};
                    Object.keys(n).map(function(t) {
                        i[t] = n[t].bind(e)
                    }),
                        this._events = new g({
                            $el: t,
                            events: i
                        })
                }
            },
            _childrenBeforeMount: function() {
                this.$children.map(function(e) {
                    e.beforeMount(),
                        e._childrenBeforeMount()
                })
            },
            _childrenMounted: function() {
                this.$children.map(function(e) {
                    e._childrenMounted();
                    var t = e.$root.$el;
                    e.$el = b.find(e.$options.el, t) || b.find(e.$options.el, t.parentElement),
                        e._initEvents(),
                        e._isMounted = !0,
                        e.mounted()
                })
            },
            _childrenBeforeDestroy: function() {
                this.$children.map(function(e) {
                    e.$destroy(!0)
                })
            },
            _composeString: function(e, t) {
                var n = this;
                t.$children.map(function(t) {
                    e.compose(t.name, t._composer.toString()),
                        n._composeString(e, t)
                })
            },
            _setProps: function(e) {
                e = d(e, this.$props),
                e && Object.keys(e).length && (e = this._validateProps(e),
                    this._resolveWatch(e).map(function(e) {
                        return e()
                    }),
                    Object.assign(this.$props, e),
                    Object.assign(this, this.$props),
                    Object.assign(this._updater.data, e),
                    v(this._updater))
            },
            _resolveWatch: function(e) {
                var t = this
                    , n = this.$options.watch;
                if (!n)
                    return [];
                var i = [];
                return Object.keys(n).map(function(r) {
                    var o = c(e, r);
                    if (void 0 !== o) {
                        var a = n[r].bind(t, o, c(t, r));
                        i.push(a)
                    }
                }),
                    i
            },
            _renderChildren: function(e) {
                this.$children.map(function(t) {
                    var n = t._boundProps
                        , i = {};
                    Object.keys(n).map(function(t) {
                        var r = c(e, n[t]);
                        void 0 !== r && (i[t] = r)
                    }),
                        t._setProps(i),
                        t._renderChildren(i)
                })
            },
            _validateProps: function(e, t) {
                if (e) {
                    var n = this.$options.props
                        , i = {};
                    return f(n) ? (Object.keys(n).map(function(r) {
                        var o = n[r]
                            , a = e[r];
                        if (f(o) || (o = {
                            type: o
                        }),
                        void 0 !== a) {
                            var s = Object.prototype.toString;
                            if (o.type && s.call(a) !== s.call(o.type()))
                                throw new Error("[" + r + "] is not valid type.");
                            i[r] = a
                        } else
                            t && (i[r] = o["default"])
                    }),
                        i) : e
                }
            },
            _instantiateChildren: function() {
                var e = this
                    , t = this.$options.components;
                if (t) {
                    var n = this._composer.toString();
                    Object.keys(t).map(function(i) {
                        var r = n.match(u(i, !0)) || [];
                        r.map(function(n) {
                            n = n.match(u(i)) || [];
                            var r = j(n[1])
                                , o = r.props
                                , a = r.bound;
                            Object.keys(a).map(function(t) {
                                var n = c(e, a[t]);
                                o[t] = "function" == typeof n ? n.bind(e) : n
                            });
                            var s = _._extend(t[i])
                                , l = new s({
                                name: i,
                                propsData: o,
                                _boundProps: a,
                                $parent: e
                            });
                            e.$children.push(l)
                        })
                    })
                }
            }
        }));
        _.options = {},
            _._extend = r,
            _.mixin = function(e) {
                var t = _.options.mixins || {};
                _.options.mixins = y(t, e)
            }
            ,
            e.exports = _
    }
    , function(e, t, n) {
        function i(e, t) {
            var n = {};
            for (var i in e)
                t.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
            return n
        }
        function r(e, t) {
            function n() {}
            n.prototype = t.prototype,
                e.prototype = new n,
                e.prototype.constructor = e
        }
        function o(e, t) {
            this.snaker = new u(l({}, e, {
                pid: "captcha",
                limit: 5
            })),
                this._captchaConfig = t || {},
                this.events = {}
        }
        function a(e, t) {
            var n = j(e);
            if ("string" === n || "number" === n)
                return "string" === n && (e = parseFloat(e),
                !isNaN(e) && (e = e.toFixed)),
                    e.toFixed(t)
        }
        function s(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , n = "network";
            return function(i, r, o, s) {
                var u = s.status
                    , c = s.error
                    , j = s.index
                    , h = s.res;
                try {
                    var g = f(i)
                        , w = "image" === o ? "image" : g.path;
                    if (c) {
                        e.remove(n, w, r);
                        var T = {
                            script: p,
                            image: v,
                            api: y
                        }
                            , S = new d(T[o],c.message,l({}, t, {
                            url: i
                        }));
                        e.collectErr(S, {
                            times: j + 1
                        })
                    } else {
                        var E = _[u];
                        if (m) {
                            if ("end" !== E)
                                return;
                            var R = b.getEntriesByName(h && h._originUrl || i)[0];
                            if (!R)
                                return;
                            e.collect(n, w, {
                                tc: a(R.responseEnd - (R.domainLookupStart || R.connectStart), 1),
                                dc: a(R.domainLookupEnd - R.domainLookupStart, 1),
                                cc: a(R.connectEnd - R.connectStart, 1),
                                rc: a(R.responseStart - R.requestStart, 1),
                                rr: a(R.responseEnd - R.responseStart, 1),
                                url: i,
                                host: g.host,
                                https: "https" === g.protocol,
                                from: "PERF"
                            }, {}, l({}, t))
                        } else
                            e.collect(n, w, {
                                timestamp: (new Date).valueOf(),
                                url: i,
                                host: g.host,
                                https: "https" === g.protocol,
                                from: "js"
                            }, {
                                rangeId: r,
                                rangeType: E
                            }, l({}, t))
                    }
                } catch (S) {}
            }
        }
        var l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }
            , u = n(23)
            , f = n(42)
            , c = n(1)
            , j = c.typeOf
            , d = n(5)
            , h = n(33)
            , p = d.REQUEST_SCRIPT_ERROR
            , y = d.REQUEST_API_ERROR
            , v = d.REQUEST_IMG_ERROR
            , g = "prototype"
            , b = window.performance || window.msPerformance || window.webkitPerformance || {}
            , m = b && "getEntriesByName"in b;
        r(o, Error),
            o[g].collect = function(e, t, n, r, o) {
                var a = r.rangeId
                    , s = r.rangeType;
                try {
                    if (a) {
                        var u = n.timestamp
                            , f = i(n, ["timestamp"]);
                        !this.events[e] && (this.events[e] = {}),
                        !this.events[e][t] && (this.events[e][t] = {});
                        var c = this.events[e][t][a];
                        if ("start" !== s || c) {
                            if ("end" === s && c && !c.end) {
                                Object.assign(c, l({
                                    end: u,
                                    extra: o
                                }, f));
                                var d = c.end
                                    , h = c.start
                                    , p = c.extra
                                    , y = i(c, ["end", "start", "extra"]);
                                this.snaker.trackAsync(e, t, window.encodeURIComponent(JSON.stringify(l({
                                    tc: d - h
                                }, y))), l({}, p, {
                                    nts: (new Date).valueOf()
                                })),
                                    this.events[e][t][a] = null
                            }
                        } else
                            this.events[e][t][a] = l({
                                ev: c,
                                start: u,
                                extra: o
                            }, f)
                    } else
                        this.snaker.trackAsync(e, t, "string" === j(n) ? n : window.encodeURIComponent(JSON.stringify(n)), l({}, o, {
                            nts: (new Date).valueOf()
                        }))
                } catch (v) {}
            }
            ,
            o[g].collectErr = function(e, t) {
                h(e, this._captchaConfig, l({}, t))
            }
            ,
            o[g].remove = function(e, t, n) {
                e && t && n ? this.events[e] && this.events[e][t] && delete this.events[e][t][n] : e && t ? this.events[e] && (this.events[e][t] = {}) : e && (this.events[e] = {})
            }
            ,
            o[g].clear = function() {
                try {
                    this.snaker.flush(),
                        this.events = {}
                } catch (e) {}
            }
        ;
        var _ = {
            start: "start",
            success: "end"
        };
        t = e.exports = o,
            t.createNetCollect = s
    }
    , function(e, t) {
        function n(e, t) {
            function n(e, t) {
                return e.charCodeAt(Math.floor(t % e.length))
            }
            function i(e, t) {
                return t.split("").map(function(t, i) {
                    return t.charCodeAt(0) ^ n(e, i)
                })
            }
            return t = i(e, t),
                _(t)
        }
        __toByte = function(e) {
            function t(t) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }
                ,
                t
        }(function(e) {
            if (e < -128)
                return __toByte(128 - (-128 - e));
            if (e >= -128 && e <= 127)
                return e;
            if (e > 127)
                return __toByte(-129 + e - 127);
            throw new Error("1001")
        });
        var i = function(e, t) {
            return __toByte(e + t)
        }
            , r = function(e, t) {
            if (null == e)
                return null;
            if (null == t)
                return e;
            for (var n = [], r = t.length, o = 0, a = e.length; o < a; o++)
                n[o] = i(e[o], t[o % r]);
            return n
        }
            , o = function(e, t) {
            return e = __toByte(e),
                t = __toByte(t),
                __toByte(e ^ t)
        }
            , a = function(e, t) {
            if (null == e || null == t || e.length != t.length)
                return e;
            for (var n = [], i = e.length, r = 0, a = i; r < a; r++)
                n[r] = o(e[r], t[r]);
            return n
        }
            , s = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
            , l = function(e) {
            var t = [];
            return t.push(s[e >>> 4 & 15]),
                t.push(s[15 & e]),
                t.join("")
        }
            , u = function(e) {
            var t = e.length;
            if (null == e || t < 0)
                return new String("");
            for (var n = [], i = 0; i < t; i++)
                n.push(l(e[i]));
            return n.join("")
        }
            , f = function(e) {
            if (null == e || 0 == e.length)
                return [];
            for (var t = new String(e), n = [], i = t.length / 2, r = 0, o = 0; o < i; o++) {
                var a = parseInt(t.charAt(r++), 16) << 4
                    , s = parseInt(t.charAt(r++), 16);
                n[o] = __toByte(a + s)
            }
            return n
        }
            , c = function(e) {
            if (null == e || void 0 == e)
                return e;
            for (var t = encodeURIComponent(e), n = [], i = t.length, r = 0; r < i; r++)
                if ("%" == t.charAt(r)) {
                    if (!(r + 2 < i))
                        throw new Error("1009");
                    n.push(f(t.charAt(++r) + "" + t.charAt(++r))[0])
                } else
                    n.push(t.charCodeAt(r));
            return n
        }
            , j = function(e) {
            var t = [];
            return t[0] = e >>> 24 & 255,
                t[1] = e >>> 16 & 255,
                t[2] = e >>> 8 & 255,
                t[3] = 255 & e,
                t
        }
            , d = function(e) {
            var t = j(e);
            return u(t)
        }
            , h = function(e, t, n) {
            var i = [];
            if (null == e || 0 == e.length)
                return i;
            if (e.length < n)
                throw new Error("1003");
            for (var r = 0; r < n; r++)
                i[r] = e[t + r];
            return i
        }
            , p = function(e, t, n, i, r) {
            if (null == e || 0 == e.length)
                return n;
            if (null == n)
                throw new Error("1004");
            if (e.length < r)
                throw new Error("1003");
            for (var o = 0; o < r; o++)
                n[i + o] = e[t + o];
            return n
        }
            , y = function(e) {
            for (var t = [], n = 0; n < e; n++)
                t[n] = 0;
            return t
        }
            , v = function(e) {
            return null == e || void 0 == e || "" == e
        }
            , g = function() {
            return ["i", "/", "x", "1", "X", "g", "U", "0", "z", "7", "k", "8", "N", "+", "l", "C", "p", "O", "n", "P", "r", "v", "6", "\\", "q", "u", "2", "G", "j", "9", "H", "R", "c", "w", "T", "Y", "Z", "4", "b", "f", "S", "J", "B", "h", "a", "W", "s", "t", "A", "e", "o", "M", "I", "E", "Q", "5", "m", "D", "d", "V", "F", "L", "K", "y"]
        }
            , b = function() {
            return "3"
        }
            , m = function(e, t, n) {
            var i, r, o, a = g(), s = b(), l = [];
            if (1 == n)
                i = e[t],
                    r = 0,
                    o = 0,
                    l.push(a[i >>> 2 & 63]),
                    l.push(a[(i << 4 & 48) + (r >>> 4 & 15)]),
                    l.push(s),
                    l.push(s);
            else if (2 == n)
                i = e[t],
                    r = e[t + 1],
                    o = 0,
                    l.push(a[i >>> 2 & 63]),
                    l.push(a[(i << 4 & 48) + (r >>> 4 & 15)]),
                    l.push(a[(r << 2 & 60) + (o >>> 6 & 3)]),
                    l.push(s);
            else {
                if (3 != n)
                    throw new Error("1010");
                i = e[t],
                    r = e[t + 1],
                    o = e[t + 2],
                    l.push(a[i >>> 2 & 63]),
                    l.push(a[(i << 4 & 48) + (r >>> 4 & 15)]),
                    l.push(a[(r << 2 & 60) + (o >>> 6 & 3)]),
                    l.push(a[63 & o])
            }
            return l.join("")
        }
            , _ = function(e) {
            if (null == e || void 0 == e)
                return null;
            if (0 == e.length)
                return "";
            var t = 3;
            try {
                for (var n = [], i = 0; i < e.length; ) {
                    if (!(i + t <= e.length)) {
                        n.push(m(e, i, e.length - i));
                        break
                    }
                    n.push(m(e, i, t)),
                        i += t
                }
                return n.join("")
            } catch (r) {
                throw new Error("1010")
            }
        }
            , w = function(e) {
            return _(c(e))
        }
            , T = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117]
            , S = function(e) {
            var t = 4294967295;
            if (null != e)
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    t = t >>> 8 ^ T[255 & (t ^ i)]
                }
            return d(4294967295 ^ t, 8)
        }
            , E = function(e) {
            return S(null == e ? [] : c(e))
        }
            , R = [120, 85, -95, -84, 122, 38, -16, -53, -11, 16, 55, 3, 125, -29, 32, -128, -94, 77, 15, 106, -88, -100, -34, 88, 78, 105, -104, -90, -70, 90, -119, -28, -19, -47, -111, 117, -105, -62, -35, 2, -14, -32, 114, 23, -21, 25, -7, -92, 96, -103, 126, 112, -113, -65, -109, -44, 47, 48, 86, 75, 62, -26, 72, -56, -27, 66, -42, 63, 14, 92, 59, -101, 19, -33, 12, -18, -126, -50, -67, 42, 7, -60, -81, -93, -86, 40, -69, -37, 98, -63, -59, 108, 46, -45, 93, 102, 65, -79, 73, -23, -46, 37, -114, -15, 44, -54, 99, -10, 60, -96, 76, 26, 61, -107, 18, -116, -55, -40, 57, -76, -82, 45, 0, -112, -77, 29, 43, -30, 109, -91, -83, 107, 101, 81, -52, -71, 84, 36, -41, 68, 39, -75, -122, -6, 11, -80, -17, -74, -73, 35, 49, -49, -127, 80, 103, 79, -25, 52, -43, 56, 41, -61, -24, 17, -118, 115, -38, 8, -78, 33, -85, -106, 58, -98, -108, 94, 116, -125, -51, -9, 71, 82, 87, -115, 9, 69, -123, 123, -117, 113, -22, -124, -87, 64, 13, 21, -89, -2, -99, -97, 1, -4, 34, 20, 83, 119, 30, -12, -110, -66, 118, -48, 6, -36, 104, -58, -102, 97, 5, -20, 31, -72, 70, -39, 67, -68, -57, 110, 89, 51, 10, -120, 28, 111, 127, 22, -3, 54, 53, -1, 100, 74, 50, 91, 27, -31, -5, -64, 124, -121, 24, -13, 95, 121, -8, 4]
            , k = 4
            , C = 4
            , O = 4
            , I = 4
            , $ = function(e) {
            var t = [];
            if (null == e || void 0 == e || 0 == e.length)
                return y(C);
            if (e.length >= C)
                return h(e, 0, C);
            for (var n = 0; n < C; n++)
                t[n] = e[n % e.length];
            return t
        }
            , X = function(e) {
            if (null == e || void 0 == e || 0 == e.length)
                return y(k);
            var t = e.length
                , n = 0;
            n = t % k <= k - O ? k - t % k - O : 2 * k - t % k - O;
            var i = [];
            p(e, 0, i, 0, t);
            for (var r = 0; r < n; r++)
                i[t + r] = 0;
            var o = j(t);
            return p(o, 0, i, t + n, O),
                i
        }
            , x = function(e) {
            if (null == e || e.length % k != 0)
                throw new Error("1005");
            for (var t = [], n = 0, i = e.length / k, r = 0; r < i; r++) {
                t[r] = [];
                for (var o = 0; o < k; o++)
                    t[r][o] = e[n++]
            }
            return t
        }
            , A = function(e) {
            var t = e >>> 4 & 15
                , n = 15 & e
                , i = 16 * t + n;
            return R[i]
        }
            , P = function(e) {
            if (null == e)
                return null;
            for (var t = [], n = 0, i = e.length; n < i; n++)
                t[n] = A(e[n]);
            return t
        }
            , N = function() {
            for (var e = [], t = 0; t < I; t++) {
                var n = 256 * Math.random();
                n = Math.floor(n),
                    e[t] = __toByte(n)
            }
            return e
        }
            , M = function(e, t) {
            if (null == e)
                return null;
            for (var n = __toByte(t), i = [], r = e.length, a = 0; a < r; a++)
                i.push(o(e[a], n));
            return i
        }
            , D = function(e, t) {
            if (null == e)
                return null;
            for (var n = __toByte(t), r = [], o = e.length, a = 0; a < o; a++)
                r.push(i(e[a], n));
            return r
        }
            , M = function(e, t) {
            if (null == e)
                return null;
            for (var n = __toByte(t), i = [], r = e.length, a = 0; a < r; a++)
                i.push(o(e[a], n));
            return i
        }
            , L = function(e) {
            var t = M(e, 56)
                , n = D(t, -40)
                , i = M(n, 103);
            return i
        }
            , V = function(e, t) {
            null == e && (e = []);
            var n = N();
            t = $(t),
                t = a(t, $(n)),
                t = $(t);
            var i = t
                , o = X(e)
                , s = x(o)
                , l = [];
            p(n, 0, l, 0, I);
            for (var u = s.length, f = 0; f < u; f++) {
                var c = L(s[f])
                    , j = a(c, t)
                    , d = r(j, i);
                j = a(d, i);
                var h = P(j);
                h = P(h),
                    p(h, 0, l, f * k + I, k),
                    i = h
            }
            return l
        }
            , B = function(e) {
            var t = "14731382d816714fC59E47De5dA0C871D3F";
            if (null == t || void 0 == t)
                throw new Error("1008");
            null != e && void 0 != e || (e = "");
            var n = e + E(e)
                , i = c(n)
                , r = c(t)
                , o = V(i, r);
            return _(o)
        };
        t.eypt = B,
            t.xor_encode = n,
            t.toByte = __toByte,
            t.str2Bytes = c,
            t.arrayCopy = h,
            t.arrayCopy2 = p,
            t.createEmptyArray = y,
            t.isEmptyString = v,
            t.base64Encode = w,
            t.getStringCRC32 = E,
            t.toByte = __toByte
    }
    , function(e, t, n) {
        function i(e, t) {
            var n = {};
            for (var i in e)
                t.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
            return n
        }
        var r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }
            , o = n(60)
            , a = n(19)
            , s = n(47)
            , l = n(41)
            , u = n(1)
            , f = 0
            , c = function(e) {
            return "string" == typeof e ? [e, e] : Array.isArray(e) && 1 === e.length ? e.concat(e) : e
        }
            , j = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            return parseInt((new Date).valueOf() / e, 10)
        }
            , d = {
            script: function(e, t) {
                var n = this;
                this.cacheTime && (e = e + "?v=" + j(this.cacheTime)),
                    o(e, {
                        charset: "UTF-8"
                    }, function(i, r) {
                        var o = n.detectKey;
                        if (i || o && !window[o]) {
                            var a = new Error("Failed to load script(" + e + ")." + (i ? i.message : "unreliable script"));
                            return a.data = {
                                url: e,
                                retry: !!n._options.retry
                            },
                                void t(a)
                        }
                        t({
                            scriptEl: r,
                            _originUrl: e
                        })
                    })
            },
            image: function(e, t) {
                var n = this
                    , i = document.createElement("img");
                i.onload = function() {
                    i.onload = i.onerror = null,
                        t({
                            width: i.width,
                            height: i.height,
                            src: e
                        })
                }
                    ,
                    i.onerror = function(r) {
                        i.onload = i.onerror = null;
                        var o = new Error("Failed to load image(" + e + ")." + r.message);
                        o.data = {
                            url: e,
                            retry: !!n._options.retry
                        },
                            t(o)
                    }
                    ,
                    i.src = e
            },
            api: function(e, t, n) {
                var i = this;
                l(e, n, function(n, o, a) {
                    if (n) {
                        var s = new Error("Failed to request api(" + e + ")." + n.message);
                        return s.data = {
                            url: e,
                            retry: !!i._options.retry
                        },
                            void t(s)
                    }
                    t(r({}, o, {
                        _originUrl: a.url
                    }))
                }, {
                    timeout: this.timeout
                })
            }
        }
            , h = function(e) {
            this.id = e.id || "resource_" + f++,
                this.type = e.type || "script",
                this.url = e.url || "",
                this.payload = e.payload,
                this.timeout = e.timeout || 6e3,
                this.cacheTime = e.cacheTime ? parseInt(e.cacheTime, 10) : 0,
                this.detectKey = e.detectKey || "",
                this._options = e,
                a.call(this),
                this.load(),
                this.setTimeout()
        };
        s(h, a),
            Object.assign(h.prototype, {
                load: function() {
                    var e = this
                        , t = d[this.type];
                    t && t.call(this, this.url, function(t) {
                        return e.resolve(t)
                    }, this.payload)
                },
                addSupport: function(e, t, n) {
                    ("function" != typeof d[e] || n) && (d[e] = t)
                },
                setTimeout: function() {
                    var e = this;
                    window.setTimeout(function() {
                        var t = String(e.url)
                            , n = new Error("Timeout: failed to request " + e.type + "(" + t + ").");
                        n.data = {
                            url: t
                        },
                            e.resolve(n)
                    }, this.timeout)
                }
            }),
            h.SUPPORTS = d;
        var p = function(e) {
            d.hasOwnProperty(e) && (h[e] = function(t) {
                    var n = t.disableRetry
                        , o = t.onProcess
                        , s = t.checkResult
                        , l = i(t, ["disableRetry", "onProcess", "checkResult"]);
                    if (n) {
                        var f = l.url;
                        return Array.isArray(f) && (f = f[0] || ""),
                            new h(r({}, l, {
                                url: f,
                                type: e
                            }))
                    }
                    var j = c(t.url)
                        , d = new a
                        , p = function y() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                            , n = function(n) {
                            var i = j.length;
                            t < i - 1 ? y(t + 1) : t === i - 1 && (n.data = r({}, n.data, {
                                url: String(j),
                                requestId: p.id
                            }),
                                d.resolve(n)),
                            u.isFn(o) && o(c, p.id, e, {
                                status: "error",
                                error: n,
                                index: t
                            })
                        }
                            , i = function(e) {
                            var t = e instanceof Error ? e : new Error("Failed to check result of " + c);
                            t.data = {
                                url: c,
                                retry: !!l.retry
                            },
                                n(t)
                        }
                            , f = function(t) {
                            u.isFn(o) && o(c, p.id, e, {
                                status: "success",
                                res: t
                            }),
                                d.resolve(t)
                        }
                            , c = j[t]
                            , p = new h(r({}, l, {
                            type: e,
                            url: c,
                            retry: t > 0
                        }));
                        u.isFn(o) && o(c, p.id, e, {
                            status: "start"
                        }),
                            p.then(function(e) {
                                if (!u.isFn(s))
                                    return f(e);
                                var t = s(e);
                                t instanceof a ? t.then(f(e))["catch"](function(e) {
                                    return i(e)
                                }) : t ? f(e) : i()
                            })["catch"](function(e) {
                                return n(e)
                            })
                    };
                    return p(0),
                        d
                }
            )
        };
        for (var y in d)
            p(y);
        h.all = function(e) {
            var t = 0
                , n = !1
                , i = new a
                , r = [];
            return e.map(function(o, a) {
                o.then(function(o) {
                    n || (r[a] = o,
                        t++,
                    t === e.length && i.resolve(r))
                })["catch"](function(e) {
                    n = !0,
                        i.resolve(e)
                })
            }),
                i
        }
            ,
            e.exports = h
    }
    , function(e, t) {
        var n = function() {
            function e(e, t) {
                var n = []
                    , i = !0
                    , r = !1
                    , o = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value),
                    !t || n.length !== t); i = !0)
                        ;
                } catch (l) {
                    r = !0,
                        o = l
                } finally {
                    try {
                        !i && s["return"] && s["return"]()
                    } finally {
                        if (r)
                            throw o
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        t.getDocFragmentRegex = function(e, t) {
            return new RegExp("<" + e + "\\s*([\\s\\S]+)?(?!%)>([\\s\\S]+)?<\\/" + e + ">",t ? "g" : "")
        }
            ,
            t.isPlainObject = function(e) {
                return "[object Object]" === Object.prototype.toString.call(e) && e && e.constructor === Object
            }
            ,
            t.getIn = function(e, t, n) {
                "string" == typeof t && (t = t.split("."));
                for (var i = 0, r = t.length; i < r; i++) {
                    var o = t[i];
                    if (i < r - 1 && !e[o])
                        return n;
                    e = e[o]
                }
                return e
            }
            ,
            t.parseAttrsStr = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                    , t = e.match(/[^<>*+\s=]+(?:=".*?")?/g);
                if (!t)
                    return {
                        props: {},
                        bound: {}
                    };
                var i = {}
                    , r = {};
                return t.map(function(e) {
                    var t = e.split("=")
                        , o = n(t, 2)
                        , a = o[0]
                        , s = o[1];
                    void 0 === s && (s = !0);
                    try {
                        s = JSON.parse(s)
                    } catch (l) {
                        console.error(l)
                    }
                    if (0 === a.indexOf(":")) {
                        var u = !1;
                        a = a.substring(1);
                        try {
                            s = JSON.parse(s)
                        } catch (l) {
                            r[a] = s,
                                u = !0
                        }
                        !u && (i[a] = s)
                    }
                    0 === a.indexOf("@") ? (a = a.substring(1),
                        r[a] = s) : i[a] = s
                }),
                    {
                        props: i,
                        bound: r
                    }
            }
            ,
            t.nextTick = function(e) {
                window.Promise ? Promise.resolve().then(e) : window.setTimeout(e, 0)
            }
            ,
            t.diffDataToUpdate = function(e, t) {
                var n = {};
                for (var i in e) {
                    var r = e[i];
                    r !== t[i] && (n[i] = r)
                }
                return n
            }
            ,
            t.lifeCycleHooks = ["beforeCreate", "created", "beforeMount", "mounted", "beforeDestroy"]
    }
    , function(e, t, n) {
        function i(e) {
            var t = this;
            o.mixin(this);
            var n = function(e) {
                return t.resolve(e)
            }
                , i = function(e) {
                return t.resolve(e)
            };
            "function" == typeof e && e(n, i)
        }
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , o = n(19);
        i.all = function(e) {
            return new i(function(t, n) {
                    var i = 0
                        , r = !1
                        , o = [];
                    e.map(function(a, s) {
                        a.then(function(n) {
                            r || (o[s] = n,
                                i++,
                            i === e.length && t(o))
                        })["catch"](function(e) {
                            r = !0,
                                n(e)
                        })
                    })
                }
            )
        }
            ,
            i.resolve = function(e) {
                return e && "object" === ("undefined" == typeof e ? "undefined" : r(e)) && "function" == typeof e.then ? e : new i(function(t) {
                        return t(e)
                    }
                )
            }
            ,
            i.reject = function(e) {
                return new i(function(t, n) {
                        return n(e)
                    }
                )
            }
            ,
            e.exports = i
    }
    , function(e, t) {
        var n = {
            FETCH_CAPTCHA: "FETCH_CAPTCHA",
            FETCH_INTELLISENSE_CAPTCHA: "FETCH_INTELLISENSE_CAPTCHA",
            VERIFY_CAPTCHA: "VERIFY_CAPTCHA",
            VERIFY_INTELLISENSE_CAPTCHA: "VERIFY_INTELLISENSE_CAPTCHA",
            RESET_STATE: "RESET_STATE"
        };
        e.exports = n
    }
    , function(e, t, n) {
        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
                e
        }
        function r(e, t) {
            if (!e)
                return {};
            var n = e.customStyles
                , i = e.width
                , r = e.minWidth
                , o = parseInt(n.controlBar.height, 10)
                , a = parseInt(n.gap, 10)
                , s = Math.max(parseInt(i, 10), parseInt(r, 10)) / 2;
            return {
                controlBarHeight: o,
                imagePanelHeight: t ? 0 : s,
                gapHeight: t ? 0 : a,
                total: t ? o : o + a + s
            }
        }
        var o, a = n(1), s = n(2), l = n(3), u = l.CAPTCHA_TYPE, f = l.CAPTCHA_CLASS, c = l.WIDTH_LIMIT, j = l.RTL_LANGS, d = l.FEEDBACK_URL, h = n(15), p = n(17), y = n(4), v = y.SWITCH_TYPE, g = y.INVOKE_HOOK, b = y.EVENT_RESET, m = y.SWITCH_LOAD_STATUS, _ = y.UPDATE_VERIFY_STATUS, w = y.REFRESH, T = y.EVENT_RESET_CLASSIC, S = y.SET_TOKEN, E = n(12), R = E.FETCH_CAPTCHA, k = E.VERIFY_CAPTCHA, C = E.RESET_STATE, O = n(26), I = n(27), $ = n(28), X = n(25);
        e.exports = {
            el: ".yidun",
            template: n(57),
            props: {
                autoWidth: {
                    type: Boolean,
                    "default": !1
                },
                intellisense: {
                    type: Boolean,
                    "default": !1
                },
                enableColor: {
                    type: Boolean,
                    "default": !1
                }
            },
            data: function() {
                var e = this.$store.state
                    , t = e.captchaType
                    , n = e.langPkg
                    , i = e.config
                    , r = e.load
                    , o = e.verifyStatus
                    , a = s.isMobile && this.intellisense && "bind" !== i.mode ? "260px" : i.width;
                return {
                    captchaId: i.captchaId,
                    captchaType: t,
                    theme: i.theme,
                    customStyles: i.customStyles,
                    feedback: {
                        url: d,
                        enable: !!i.feedbackEnable
                    },
                    mode: "bind" === i.mode ? "popup" : this.intellisense ? "embed" : i.mode,
                    width: this.autoWidth ? "auto" : a,
                    minWidth: c[0] + "px",
                    langPkg: n,
                    load: r,
                    verifyStatus: o,
                    verifyPayload: null,
                    inferences: [0, 1, 2, 3, 4, 5, 6, 7]
                }
            },
            on: (o = {},
                i(o, "." + f.REFRESH + " click", function(e) {
                    e.stopPropagation();
                    var t = this.$store.state
                        , n = t.config
                        , i = t.countsOfVerifyError
                        , r = t.verifyStatus;
                    i > n.maxVerification || "verifying" === r && this.captchaType !== u.SMS || "loading" === this.load.status || this.refresh()
                }),
                i(o, ".yidun_tips click", function() {
                    var e = this.$store.state
                        , t = e.config
                        , n = e.countsOfVerifyError
                        , i = e.verifyStatus;
                    "error" === i && n > t.maxVerification && this.$store.commit(T)
                }),
                o),
            watch: {
                captchaType: function(e, t) {
                    e !== t && this.updateUIByType(e, t)
                }
            },
            mounted: function() {
                var e = this
                    , t = this.$store.state
                    , n = t.config
                    , i = t.token;
                h(this.$store.state.config.customStyles.primaryColor, this.$el, this.enableColor),
                    this._baseClassNames = this.$el.className.trim(),
                    this._removeEvents = this.initEvents(),
                    this._unsubscribe = this.$store.subscribe(function(t, n) {
                        var r = t.type
                            , o = t.payload
                            , a = n.captchaType
                            , s = n.load
                            , l = n.verifyStatus;
                        switch (r) {
                            case v:
                                e.$setData({
                                    captchaType: a
                                });
                                break;
                            case m:
                                e.$setData({
                                    load: s
                                }),
                                s && "done" === s.status && e.$store.commit(g, {
                                    name: "onDidRefresh"
                                });
                                break;
                            case _:
                                e.$setData({
                                    verifyStatus: l,
                                    verifyPayload: o
                                });
                                break;
                            case b:
                                !e.intellisense && e.reset();
                                break;
                            case T:
                                var u = e.intellisense ? {
                                    token: i
                                } : null;
                                e.reset(u);
                                break;
                            case S:
                                e.setFeedbackUrl()
                        }
                    }),
                this.intellisense || this.reset({
                    token: i
                }),
                "bind" === n.mode && this.refresh({
                    token: i
                }),
                j.indexOf(n.lang) !== -1 && (this.$el.style.direction = "rtl")
            },
            beforeDestroy: function() {
                this._unsubscribe(),
                    this._removeEvents()
            },
            render: function(e) {
                var t = e.captchaType
                    , n = e.load
                    , i = e.verifyStatus
                    , r = e.verifyPayload;
                "undefined" != typeof t && this.switchCaptchaType(t),
                "undefined" != typeof n && this.changeLoadStatus(n),
                "undefined" != typeof i && this.updateVerifyStatus(i, r)
            },
            methods: {
                initEvents: function() {
                    var e = this
                        , t = void 0;
                    "float" === this.mode && (t = this.initFloatMode());
                    var n = function(e) {
                        /^IMG$/i.test(e.target.tagName) && e.preventDefault()
                    };
                    return s.on(this.$el, "dragstart", n),
                        function() {
                            t && t(),
                                s.off(e.$el, "dragstart", n)
                        }
                },
                initFloatMode: function() {
                    var e = this
                        , t = s.find("." + f.PANEL, this.$el)
                        , n = s.find("." + f.CONTROL, this.$el)
                        , i = !1
                        , o = null
                        , l = null
                        , u = s.transition(t, {
                        name: "panel_ease_" + this.customStyles.imagePanel.align,
                        insert: function(e) {
                            e.style.display = "block",
                                i = !0
                        },
                        afterLeave: function(e) {
                            e.style.display = "none",
                                i = !1
                        },
                        leaveCanceled: function(e) {
                            e.style.display = "none",
                                i = !1
                        }
                    })
                        , c = this
                        , j = function(e) {
                        c.panelVisible = !e,
                        c.$children && c.$children.map(function(e) {
                            e.floatStatusChange && e.floatStatusChange()
                        }),
                        s.isMobile && setTimeout(function() {
                            c._isMounted && c.$store.commit(g, {
                                name: "onFloatHeightChange",
                                args: [r(c.$data, e)]
                            })
                        }, 200)
                    }
                        , d = !0
                        , h = function(t) {
                        if (e._isMounted) {
                            var n = t.relatedTarget && e.$el.contains(t.relatedTarget);
                            if ((d || !n || "mouseover" !== t.type) && (d = !1,
                                window.clearTimeout(l),
                                u.cancelLeave(),
                            "success" !== e.$store.state.verifyStatus))
                                return i ? j() : void (o = window.setTimeout(function() {
                                    var e = document.activeElement;
                                    e && e !== document.body && e.blur(),
                                        u.enter(),
                                        j()
                                }, 300))
                        }
                    }
                        , p = function(t) {
                        if (e._isMounted) {
                            var n = t.relatedTarget && e.$el.contains(t.relatedTarget)
                                , r = !(s.isMobile || !s.supportTouch) && null === t.relatedTarget;
                            if (!n && !r || "mouseout" !== t.type) {
                                d = !0;
                                var a = s.getBubblePath(t.target);
                                if (!(~["touchstart", "pointerdown"].indexOf(t.type) && ~a.indexOf(e.$el) || ~["mouseleave", "pointerleave"].indexOf(t.type) && null === t.event.relatedTarget)) {
                                    window.clearTimeout(o),
                                        u.cancelEnter();
                                    var f = e.$children[0]
                                        , c = f && f.drag;
                                    !i || c && "dragging" === c.status || (l = window.setTimeout(function() {
                                        u.leave(),
                                            j(!0)
                                    }, 300))
                                }
                            }
                        }
                    }
                        , y = this.$store.subscribe(function(e, t) {
                        var n = e.type;
                        n === _ && "success" === t.verifyStatus && (u.leave(),
                            j(!0))
                    })
                        , v = a.msie()
                        , b = v ? "mouseenter" : "mouseover"
                        , m = v ? "mouseleave" : "mouseout";
                    switch (!0) {
                        case s.isMobile:
                            s.on(n, "touchstart", h),
                                s.on(document.body, "touchstart", p);
                            break;
                        case !s.isMobile && s.supportTouch:
                            s.on(n, "touchstart", h),
                                s.on(document.body, "touchstart", p),
                                s.on(this.$el, b, h),
                                s.on(this.$el, m, p);
                            break;
                        case s.supportPointer:
                            s.on(n, "pointerdown", h),
                                s.on(document.body, "pointerdown", p),
                                s.on(this.$el, "pointerenter", h),
                                s.on(this.$el, "pointerleave", p);
                            break;
                        default:
                            s.on(this.$el, b, h),
                                s.on(this.$el, m, p)
                    }
                    return function() {
                        s.off(e.$el, b, h),
                            s.off(e.$el, m, p),
                            s.off(n, "touchstart", h),
                            s.off(document.body, "touchstart", p),
                        s.supportPointer && (s.off(n, "pointerdown", h),
                            s.off(document.body, "pointerdown", p),
                            s.off(e.$el, "pointerenter", h),
                            s.off(e.$el, "pointerleave", p)),
                            y(),
                            u.dispose()
                    }
                },
                fetchCaptcha: function(e, t) {
                    var n = {
                        width: this.getWidth()
                    };
                    n.token = this.intellisense ? this.$store.state.token : this.$store.state.previousToken,
                        Object.assign(n, e),
                        this.$store.dispatch(R, n, t)
                },
                verifyCaptcha: function(e) {
                    var t = this;
                    this.$store.commit(_, {
                        verifyStatus: "verifying"
                    });
                    var n = this.$store.state.token
                        , i = function(i) {
                        t.$store.dispatch(k, Object.assign({
                            token: n,
                            acToken: i,
                            width: t.getWidth()
                        }, e))
                    };
                    this.$anticheatPromise ? this.$anticheatPromise.then(i) : i("")
                },
                reset: function(e) {
                    this.$store.dispatch(C),
                        this.refresh(e)
                },
                refresh: function(e, t) {
                    var n = this.$children[0];
                    n && n.reset(),
                        this.$anticheatPromise = null,
                        this.$store.commit(w),
                        this.fetchCaptcha(e, t)
                },
                updateUIByType: function(e, t) {
                    t && s.delClass(this.$el, this.getCaptchaTypeClassName(t)),
                        s.addClass(this.$el, this.getCaptchaTypeClassName(e))
                },
                getCaptchaTypeClassName: function(e) {
                    return e ? f.CAPTCHA + "--" + a.getObjKey(u, e).toLowerCase() : ""
                },
                getWidth: function() {
                    return this.$el.offsetWidth
                },
                resetClassNames: function() {
                    for (var e = this._baseClassNames.split(/\s+/), t = arguments.length, n = Array(t), i = 0; i < t; i++)
                        n[i] = arguments[i];
                    this.$el.className = p(e, this.getCaptchaTypeClassName(this.captchaType), n)
                },
                switchCaptchaType: function(e) {
                    if (e) {
                        var t = u.JIGSAW
                            , n = u.POINT
                            , i = u.SMS
                            , r = u.ICON_POINT
                            , o = u.INFERENCE
                            , a = u.WORD_ORDER
                            , s = u.SPACE
                            , l = {
                            el: this.$el,
                            propsData: {
                                loadInfo: this.load,
                                mode: this.mode,
                                type: e,
                                onVerifyCaptcha: this.verifyCaptcha.bind(this)
                            },
                            _boundProps: {
                                loadInfo: "load"
                            },
                            $parent: this
                        }
                            , f = this.$children[0];
                        switch (f && f.$destroy(),
                            e) {
                            case t:
                                f = new O(l);
                                break;
                            case n:
                            case r:
                            case a:
                            case s:
                                f = new I(l);
                                break;
                            case i:
                                f = new $(l);
                                break;
                            case o:
                                f = new X(l)
                        }
                        f.$forceUpdate(),
                            this.$children = [f]
                    }
                },
                changeLoadStatus: function(e) {
                    if (e) {
                        var t = f.CAPTCHA
                            , n = f.LOADING
                            , i = f.LOADFAIL
                            , r = f.LOADTEXT
                            , o = s.find("." + r, this.$el)
                            , a = s.find(".yidun_tips__text", this.$el)
                            , l = s.find(".yidun_tips__answer", this.$el)
                            , u = this.$store.state.langPkg
                            , c = e.status
                            , j = e.data;
                        switch (c) {
                            case "loading":
                                j || (this.resetClassNames(t + "--" + n),
                                    s.text(o, u.loading),
                                    s.text(a, u.loading),
                                    s.addClass(l, "hide"));
                                break;
                            case "done":
                                this.resetClassNames();
                                break;
                            case "fail":
                                this.resetClassNames(t + "--" + i),
                                    s.text(o, u.loadfail),
                                    s.text(a, u.loadfail),
                                    s.addClass(l, "hide")
                        }
                        "done" !== c || this.intellisense || this.isReady || (this.isReady = !0,
                            this.$store.commit(g, {
                                name: "onReady"
                            }))
                    }
                },
                updateVerifyStatus: function(e, t) {
                    var n = this
                        , i = f.CAPTCHA
                        , r = f.SUCCESS
                        , o = f.VERIFY
                        , a = f.ERROR
                        , l = s.find(".yidun_tips__text", this.$el)
                        , c = s.find(".yidun_tips__answer", this.$el)
                        , j = s.find(".yidun_slider__icon--img", this.$el)
                        , d = this.$data.customStyles
                        , h = d.controlBar
                        , p = void 0 === h ? {} : h
                        , y = d.icon
                        , v = void 0 === y ? {} : y
                        , g = this.$store.state
                        , b = g.langPkg
                        , m = g.config
                        , _ = g.countsOfVerifyError
                        , w = function(e) {
                        !v.slider && j && (e ? (j.src = e,
                            j.style.display = "block") : j.style.display = "none")
                    };
                    switch (e) {
                        case "verifying":
                            this.resetClassNames(i + "--" + o);
                            break;
                        case "success":
                            this.resetClassNames(i + "--" + r),
                                this.captchaType === u.JIGSAW ? s.text(l, "") : s.text(l, b.verifySuccess),
                                s.addClass(c, "hide"),
                                w(p.slideIconSuccess);
                            break;
                        case "error":
                            var T = _ > m.maxVerification
                                , S = i + "--" + a
                                , E = T ? S + " yidun--maxerror" : S;
                            this.resetClassNames(E),
                                T ? s.text(l, b.verifyOutOfLimit) : this.captchaType === u.JIGSAW ? s.text(l, "") : s.text(l, b.verifyError),
                                s.addClass(c, "hide"),
                                w(p.slideIconError),
                            !T && window.setTimeout(function() {
                                return n.refresh()
                            }, [u.POINT, u.INFERENCE, u.WORD_ORDER, u.ICON_POINT, u.SPACE].indexOf(this.captchaType) > -1 ? 1200 : 300)
                    }
                },
                setFeedbackUrl: function() {
                    var e = s.find(".yidun_feedback", this.$el);
                    if (e) {
                        var t = this.$store.state.token;
                        e.href = this.feedback.url + "?" + a.encodeUrlParams({
                            captchaId: this.captchaId,
                            token: t
                        })
                    }
                },
                getAnticheatToken: function(e) {
                    var t = e.timeout;
                    this.$anticheatPromise = this.$store.state.captchaAnticheat.getToken({
                        timeout: t
                    })
                },
                shouldHandleFloatChange: function(e) {
                    var t = this.$store.state
                        , n = t.countsOfVerifyError
                        , i = t.verifyStatus
                        , r = t.config;
                    return !(n > r.maxVerification) && ((!e || "done" === e.status) && !i)
                }
            }
        }
    }
    , function(e, t, n) {
        function i(e) {
            e.stopPropagation(),
                e.nativeEvent.stopPropagation(),
                this.close()
        }
        function r(e, t) {
            if (!t)
                return e;
            var n = Object.assign({}, e, t)
                , i = n.capPadding
                , r = n.capBarHeight
                , o = n.width
                , a = n.top;
            i = parseFloat(i, 10),
                i = i && 0 !== i ? i : e.capPadding,
                r = parseFloat(r, 10),
                r = r && 0 !== i ? r : e.capBarHeight;
            var l = "auto" !== o;
            if (l) {
                var u = d[0] + 2 * i + 2;
                o = parseFloat(o, 10) || 0,
                    o = o > u ? o : u
            }
            var f = "auto" !== a;
            return f && ("number" === s.typeOf(a) || Number(a) || "0" === a ? a += "px" : /\d+(\.\d+)?(px|rem)/.test(a) || (a = parseFloat(a, 10) || 0,
                a = a >= 0 && a <= 100 ? a + "%" : e.top)),
                {
                    width: o,
                    top: a,
                    capPadding: i,
                    capBarHeight: r
                }
        }
        var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }
            , a = n(2)
            , s = n(1)
            , l = n(4)
            , u = l.UPDATE_VERIFY_STATUS
            , f = n(13)
            , c = n(3)
            , j = c.RTL_LANGS
            , d = c.WIDTH_LIMIT
            , h = n(15)
            , p = {
            capPadding: 15,
            capBarHeight: 50,
            width: "auto",
            top: "20%"
        };
        e.exports = {
            el: ".yidun_popup",
            template: n(59),
            components: {
                "captcha-core": f
            },
            props: {
                autoOpen: {
                    type: Boolean,
                    "default": !0
                },
                intellisense: {
                    type: Boolean,
                    "default": !1
                },
                enableColor: {
                    type: Boolean,
                    "default": !1
                },
                onClose: Function
            },
            data: function() {
                var e = this.$store.state
                    , t = e.langPkg
                    , n = e.config
                    , i = o({}, p, n.appendTo ? {
                    top: "auto"
                } : {})
                    , a = r(i, n.popupStyles)
                    , s = "auto" !== a.width
                    , l = "auto" !== a.top;
                return {
                    langPkg: t,
                    widthIsNotAuto: s,
                    width: s ? a.width + "px" : "auto",
                    topIsNotAuto: l,
                    top: l ? a.top : "auto",
                    theme: n.theme,
                    popupStyles: a,
                    appendTo: n.appendTo,
                    enableClose: n.enableClose,
                    bodyCloseModalFn: this.bodyCloseModal.bind(this)
                }
            },
            on: Object.assign({
                ".yidun_modal__close click": i
            }, a.isMobile ? null : {
                ".yidun_popup__mask click": i
            }),
            mounted: function() {
                var e = this;
                h(this.$store.state.config.customStyles.primaryColor, this.$el, this.enableColor);
                var t = a.find(".yidun_modal", this.$el)
                    , n = a.find(".yidun_popup__mask", this.$el);
                a.on(this.appendTo ? n : document, "click", this.bodyCloseModalFn),
                    this._transition = a.transition(t, {
                        name: "popup_ease",
                        beforeEnter: function() {
                            n.style.opacity = "0"
                        },
                        insert: function() {
                            e.$el.style.display = "block"
                        },
                        enter: function() {
                            n.style.opacity = ""
                        },
                        leave: function() {
                            n.style.opacity = "0"
                        },
                        afterLeave: function() {
                            var t = e.onClose;
                            e.$el.style.display = "none",
                            t && t()
                        }
                    }),
                    this._unsubscribe = this.$store.subscribe(function(t, n) {
                        var i = t.type;
                        i === u && "success" === n.verifyStatus && window.setTimeout(e.close.bind(e), 500)
                    }),
                j.indexOf(this.$store.state.config.lang) !== -1 && (this.$el.style.direction = "rtl"),
                this.autoOpen && this.open()
            },
            beforeDestroy: function() {
                this._transition.dispose(),
                    a.off(this.appendTo ? a.find(".yidun_popup__mask", this.$el) : document, "click", this.bodyCloseModalFn)
            },
            methods: {
                open: function() {
                    var e = this;
                    s.nextFrame(function() {
                        return e._transition.enter()
                    })
                },
                bodyCloseModal: function(e) {
                    var t = a.className(e.target);
                    t && t.search(/yidun/g) > -1 || this.close()
                },
                close: function() {
                    this.$store.state.config.enableClose || this.closeModal()
                },
                closeModal: function() {
                    this._isMounted && "none" !== this.$el.style.display && this._transition.leave()
                },
                refresh: function() {
                    var e = this.$children[0];
                    e && e.refresh.apply(e, arguments)
                }
            }
        }
    }
    , function(e, t, n) {
        var i = n(21)
            , r = n(1);
        e.exports = function(e, t) {
            var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            if (e && n) {
                var o = r.uuid()
                    , a = "\n    .yidun_intellisense .yidun_intelli-tips:hover .yidun_intelli-icon,\n    .yidun_intellisense.yidun_intellisense--checking .yidun_intelli-icon,\n    .yidun_intellisense.yidun_intellisense--loading .yidun_intelli-icon,\n    .yidun.yidun--jigsaw .yidun_control .yidun_slider:hover,\n    .yidun.yidun--jigsaw .yidun_control.yidun_control--moving .yidun_slider {\n      background-color: " + e + ";\n    }\n    .yidun.yidun--jigsaw .yidun_control.yidun_control--moving .yidun_slide_indicator {\n      border-color: " + e + ";\n    }\n  "
                    , s = Object.assign([["NECaptcha-color__" + o, a]]);
                i(s, t)
            }
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            var t = e.protocol
                , n = void 0 === t ? "" : t
                , i = e.host
                , r = void 0 === i ? "" : i
                , o = e.port
                , a = void 0 === o ? "" : o
                , s = e.path
                , l = void 0 === s ? "" : s
                , u = e.search
                , f = void 0 === u ? "" : u
                , c = e.hash
                , j = void 0 === c ? "" : c;
            if (n && (n = n.replace(/:?\/{0,2}$/, "://")),
                r) {
                var d = r.match(/^([-0-9a-zA-Z.:]*)(\/.*)?/);
                r = d[1],
                    l = (d[2] || "") + "/" + l
            }
            if (!r && (n = ""),
                a) {
                if (!r)
                    throw Error('"host" is required, if "port" was provided');
                a = ":" + a
            }
            return l && (l = l.replace(/^\/*|\/+/g, "/")),
            f && (f = f.replace(/^\??/, "?")),
            j && (j = j.replace(/^#?/, "#")),
            n + r + a + l + f + j
        }
    }
    , function(e, t, n) {
        var i, r, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
        ;
        !function() {
            var a = function() {
                function e() {}
                function t(e, t) {
                    for (var n = t.length, i = 0; i < n; ++i)
                        a(e, t[i])
                }
                function n(e, t) {
                    e[t] = !0
                }
                function i(e, t) {
                    for (var n in t)
                        l.call(t, n) && (e[n] = !!t[n])
                }
                function r(e, t) {
                    for (var n = t.split(u), i = n.length, r = 0; r < i; ++r)
                        e[n[r]] = !0
                }
                function a(e, a) {
                    if (a) {
                        var s = "undefined" == typeof a ? "undefined" : o(a);
                        "string" === s ? r(e, a) : Array.isArray(a) ? t(e, a) : "object" === s ? i(e, a) : "number" === s && n(e, a)
                    }
                }
                function s() {
                    for (var n = arguments.length, i = Array(n), r = 0; r < n; r++)
                        i[r] = arguments[r];
                    var o = new e;
                    t(o, i);
                    var a = [];
                    for (var s in o)
                        o[s] && a.push(s);
                    return a.join(" ")
                }
                e.prototype = {};
                var l = {}.hasOwnProperty
                    , u = /\s+/;
                return s
            }();
            "undefined" != typeof e && e.exports ? e.exports = a : "object" === o(n(22)) && n(22) ? (i = [],
                r = function() {
                    return a
                }
                    .apply(t, i),
                !(void 0 !== r && (e.exports = r))) : window.classNames = a
        }()
    }
    , function(e, t) {
        function n() {
            function e(e) {
                return o.call(t(e) ? e : function() {}
                    , e, 1)
            }
            function t(e) {
                return ("undefined" == typeof e ? "undefined" : i(e)) === a
            }
            function n(e, t, n) {
                return function() {
                    var i = this.supr;
                    this.supr = n[l][e];
                    var r = {}.fabricatedUndefined
                        , o = r;
                    try {
                        o = t.apply(this, arguments)
                    } finally {
                        this.supr = i
                    }
                    return o
                }
            }
            function r(e, i, r) {
                for (var o in i)
                    i.hasOwnProperty(o) && (e[o] = t(i[o]) && t(r[l][o]) && s.test(i[o]) ? n(o, i[o], r) : i[o])
            }
            function o(e, n) {
                function i() {}
                function o() {
                    this.initialize ? this.initialize.apply(this, arguments) : (n || u && a.apply(this, arguments),
                        f.apply(this, arguments))
                }
                i[l] = this[l];
                var a = this
                    , s = new i
                    , u = t(e)
                    , f = u ? e : this
                    , c = u ? {} : e;
                return o.methods = function(e) {
                    return r(s, e, a),
                        o[l] = s,
                        this
                }
                    ,
                    o.methods.call(o, c).prototype.constructor = o,
                    o.extend = arguments.callee,
                    o[l].implement = o.statics = function(e, t) {
                        return e = "string" == typeof e ? function() {
                            var n = {};
                            return n[e] = t,
                                n
                        }() : e,
                            r(this, e, a),
                            this
                    }
                    ,
                    o
            }
            var a = "function"
                , s = /xyz/.test(function() {
                xyz
            }) ? /\bsupr\b/ : /.*/
                , l = "prototype";
            return e
        }
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
        ;
        e.exports = n()
    }
    , function(e, t) {
        function n() {
            this._state = o,
                this._arg = void 0,
                this._fullfilledCallback = [],
                this._rejectedCallback = []
        }
        function i(e) {
            window.setTimeout(e, 1)
        }
        function r(e) {
            if (e) {
                var t = new n;
                e.then = function() {
                    return t.then.apply(t, arguments)
                }
                    ,
                    e["catch"] = function() {
                        return t["catch"].apply(t, arguments)
                    }
                    ,
                    e["finally"] = function() {
                        return t["finally"].apply(t, arguments)
                    }
                    ,
                    e.resolve = function() {
                        return t.resolve.apply(t, arguments)
                    }
            }
        }
        var o = "pending"
            , a = "fullfilled"
            , s = "rejected";
        Object.assign(n.prototype, {
            then: function(e, t) {
                var n = function(e) {
                    return "function" == typeof e
                };
                return n(e) && this._fullfilledCallback.push(e),
                n(t) && this._rejectedCallback.push(t),
                this._state !== o && this._emit(this._state),
                    this
            },
            "catch": function(e) {
                return this.then(null, e)
            },
            "finally": function(e) {
                return this.then(e, e)
            },
            resolve: function(e) {
                this._state === o && (e instanceof Error ? this._state = s : this._state = a,
                    this._arg = e,
                    this._emit(this._state))
            },
            _emit: function(e) {
                var t = this;
                switch (e) {
                    case a:
                        i(function() {
                            t._fullfilledCallback.map(function(e) {
                                return e(t._arg)
                            }),
                                t._fullfilledCallback = [],
                                t._rejectedCallback = []
                        });
                        break;
                    case s:
                        i(function() {
                            t._rejectedCallback.map(function(e) {
                                return e(t._arg)
                            }),
                                t._fullfilledCallback = [],
                                t._rejectedCallback = []
                        })
                }
            }
        }),
            n.mixin = r,
            e.exports = n
    }
    , function(e, t, n) {
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }
            , r = n(9)
            , o = n(34);
        e.exports = function(e) {
            return function(t, n, a, s) {
                Object.assign(n, {
                    referer: o()
                });
                var l = i({}, e, s, {
                    url: t,
                    payload: n
                });
                r.api(l).then(function(e) {
                    return a(null, e)
                })["catch"](a)
            }
        }
    }
    , function(e, t) {
        function n(e, t) {
            Object.keys(t).map(function(n) {
                e.setAttribute(n, t[n])
            })
        }
        function i(e, t) {
            var n = null;
            n = t && t.nodeType ? t : document.head || document.getElementsByTagName("head")[0],
                n.appendChild(e)
        }
        function r(e) {
            var t = document.createElement("style")
                , r = {
                type: "text/css"
            };
            return n(t, r),
                i(t, e),
                t
        }
        function o(e, t, n) {
            var i = t.css
                , r = t.media;
            if (r && e.setAttribute("media", r),
                e.styleSheet)
                e.styleSheet.cssText = i;
            else {
                for (; e.firstChild; )
                    e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(i))
            }
        }
        var a = {};
        e.exports = function(e, t) {
            var n = e[0]
                , i = n[0]
                , s = {
                css: n[1],
                media: n[2]
            };
            !a[i] && (a[i] = r(t)),
                o(a[i], s)
        }
    }
    , function(e, t) {
        (function(t) {
                e.exports = t
            }
        ).call(t, {})
    }
    , function(e, t, n) {
        !function(t, n) {
            e.exports = n()
        }(this, function() {
            "use strict";
            function e(e) {
                var t = new RegExp("(^|;)[ ]*" + e + "=([^;]*)")
                    , n = t.exec(document.cookie);
                return n ? decodeURIComponent(n[2]) : ""
            }
            function t(e, t, n) {
                var i, r = e + "=" + encodeURIComponent(t) + ";";
                n && (i = new Date,
                    i.setTime(i.getTime() + n),
                    r += "expires=" + i.toUTCString()),
                    document.cookie = r
            }
            function n() {
                for (var e = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", t = "", n = 0, i = e.length; n < 16; n++)
                    t += e.charAt(Math.floor(Math.random() * i));
                return t
            }
            var i, r = function() {
                return r = Object.assign || function(e) {
                    for (var t, n = 1, i = arguments.length; n < i; n++) {
                        t = arguments[n];
                        for (var r in t)
                            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
                    }
                    return e
                }
                    ,
                    r.apply(this, arguments)
            }, o = {
                userData: null,
                name: location.hostname + "_snaker",
                init: function() {
                    if (!o.userData)
                        try {
                            o.userData = document.createElement("INPUT"),
                                o.userData.type = "hidden",
                                o.userData.style.display = "none",
                                o.userData.addBehavior("#default#userData"),
                            o.userData && document.body.appendChild(o.userData);
                            var e = new Date;
                            e.setDate(e.getDate() + 365),
                                o.userData.expires = e.toUTCString()
                        } catch (t) {
                            return console.log("userData is disabled!"),
                                !1
                        }
                    return !0
                },
                setItem: function(e, t) {
                    o.init() && o.userData && (o.userData.load(o.name),
                        o.userData.setAttribute(e, t),
                        o.userData.save(o.name))
                },
                getItem: function(e) {
                    return o.init() && o.userData ? (o.userData.load(o.name),
                    o.userData.getAttribute(e) || "") : ""
                },
                removeItem: function(e) {
                    o.init() && o.userData && (o.userData.load(o.name),
                        o.userData.removeAttribute(e),
                        o.userData.save(o.name))
                }
            };
            try {
                i = localStorage || o
            } catch (a) {
                i = o
            }
            var s = function() {
                function e(e) {
                    this.name = e
                }
                return e.prototype.push = function(e) {
                    if (e)
                        try {
                            var t = i.getItem(this.name);
                            i.setItem(this.name, t ? t + "," + e : e)
                        } catch (n) {
                            console.log("localstorage or userData is disabled!")
                        }
                }
                    ,
                    e.prototype.length = function() {
                        try {
                            var e = i.getItem(this.name) || "";
                            return e ? e.split(",").length : 0
                        } catch (t) {
                            return console.log("localstorage or userData is disabled!"),
                                0
                        }
                    }
                    ,
                    e.prototype.pop = function(e) {
                        void 0 === e && (e = 1);
                        var t;
                        try {
                            var n = i.getItem(this.name)
                                , r = n ? n.split(",") : [];
                            t = r.splice(0, e),
                                i.setItem(this.name, r.join(","))
                        } catch (o) {
                            t = [],
                                console.log("localstorage or userData is disabled!")
                        }
                        return t
                    }
                    ,
                    e.prototype.clear = function() {
                        try {
                            i.removeItem(this.name)
                        } catch (e) {
                            console.log("localstorage or userData is disabled!")
                        }
                    }
                    ,
                    e
            }()
                , l = function() {
                function i(i) {
                    if (!i.pid)
                        throw new Error("product id is required!");
                    var r = i.pid
                        , o = i.bid
                        , a = i.url
                        , l = i.random
                        , u = i.limit;
                    this.pid = r,
                        this.bid = o,
                        this.random = l || 100,
                        this.limit = u || 5,
                        this.url = a || "https://da.dun.163.com/sn.gif",
                        this.prefix = "__snaker__" + r,
                        this.cache = new s(this.prefix);
                    var f = e(this.prefix);
                    f ? this.uuid = f : (this.uuid = n(),
                        t(this.prefix, this.uuid, 31536e6))
                }
                return i.prototype.setUser = function(e) {
                    this.uid = e
                }
                    ,
                    i.prototype.serialize = function(e, t) {
                        var n = this
                            , i = n.pid
                            , o = n.bid
                            , a = n.uuid
                            , s = n.uid
                            , l = e.type
                            , u = e.name
                            , f = e.value
                            , c = function(e, t) {
                            return e.substring(0, t)
                        }
                            , j = screen.width + "x" + screen.height
                            , d = c(location.href, 200)
                            , h = (new Date).getTime() + ""
                            , p = r({
                            pid: i,
                            bid: o,
                            uid: s,
                            uuid: a,
                            type: l,
                            name: u,
                            value: f,
                            res: j,
                            pu: d,
                            nts: h
                        }, t)
                            , y = [];
                        for (var v in p)
                            p.hasOwnProperty(v) && void 0 !== p[v] && y.push(encodeURIComponent(v + "=") + encodeURIComponent(p[v]));
                        return y.join("%26")
                    }
                    ,
                    i.prototype.sendRequest = function(e, t) {
                        var n = new Image(1,1);
                        n.src = e + "?d=" + t,
                            n.onload = function() {}
                            ,
                            n.onerror = function() {}
                    }
                    ,
                    i.prototype.report = function(e, t, n, i, r) {
                        var o = this.serialize({
                            type: e,
                            name: t,
                            value: n
                        }, r ? r : {});
                        this.random < Math.random() || (i ? (this.cache.push(o),
                        this.cache.length() >= this.limit && this.flush()) : this.sendRequest(this.url, o))
                    }
                    ,
                    i.prototype.track = function(e, t, n, i) {
                        this.report(e, t, n, !1, i)
                    }
                    ,
                    i.prototype.trackAsync = function(e, t, n, i) {
                        this.report(e, t, n, !0, i)
                    }
                    ,
                    i.prototype.flush = function() {
                        for (var e = "", t = this.cache.pop(this.limit); t.length; ) {
                            var n = t.pop() || "";
                            n && (e.length + n.length <= 1800 ? (e = e ? e + "," + n : n,
                            t.length || this.sendRequest(this.url, e)) : (this.sendRequest(this.url, e),
                                e = n))
                        }
                    }
                    ,
                    i
            }();
            return l
        })
    }
    , function(e, t, n) {
        var i = n(12)
            , r = i.FETCH_INTELLISENSE_CAPTCHA
            , o = i.VERIFY_INTELLISENSE_CAPTCHA
            , a = i.RESET_STATE
            , s = n(4)
            , l = s.SWITCH_LOAD_STATUS
            , u = s.UPDATE_VERIFY_STATUS
            , f = s.INVOKE_HOOK
            , c = s.EVENT_RESET
            , j = n(3)
            , d = j.CAPTCHA_TYPE
            , h = j.SAMPLE_NUM
            , p = n(1)
            , y = n(8)
            , v = y.eypt
            , g = y.xor_encode
            , b = n(6)
            , m = n(14)
            , _ = n(2)
            , w = n(11);
        e.exports = {
            data: function() {
                return {
                    beginTime: p.now(),
                    traceData: [],
                    status: "normal",
                    classicVisible: !1
                }
            },
            mounted: function() {
                this._removeEvents = this.initEvents(),
                    this.fetchCaptcha()
            },
            render: function(e) {
                var t = e.status
                    , n = e.classicVisible;
                void 0 !== t && this.updateUI(t),
                void 0 !== n && this.toggleClassicVisible(n)
            },
            beforeDestroy: function() {
                this._removeEvents(),
                    this.clear()
            },
            methods: {
                fetchCaptcha: function() {
                    var e = this;
                    return new w(function(t, n) {
                            e.$store.dispatch(r, {
                                width: ""
                            }, function(i, r) {
                                if (e._isMounted) {
                                    if (i)
                                        return e.$setData({
                                            status: "loadfail"
                                        }),
                                            void n(i);
                                    e.$store.commit(f, {
                                        name: "onReady"
                                    }),
                                        e.$store.commit(f, {
                                            name: "onDidRefresh"
                                        }),
                                        t(r)
                                }
                            })
                        }
                    )
                },
                initEvents: function() {
                    var e = this
                        , t = this.$store.subscribe(function(t, n) {
                        var i = t.type
                            , r = (t.payload,
                            n.verifyStatus)
                            , o = n.load;
                        switch (i) {
                            case l:
                                o && ("loading" === o.status && e.$setData({
                                    status: "loading"
                                }),
                                "done" === o.status && e.$setData({
                                    status: "loaddone"
                                }),
                                "fail" === o.status && e.$setData({
                                    status: "loadfail"
                                }));
                                break;
                            case u:
                                "success" === r && e.$setData({
                                    status: "success"
                                }),
                                "error" === r && e.$setData({
                                    status: "error"
                                });
                                break;
                            case c:
                                e.reset()
                        }
                    });
                    return function() {
                        t()
                    }
                },
                reset: function() {
                    var e = this;
                    this.$store.dispatch(a),
                        this.fetchCaptcha().then(function() {
                            e.clear(),
                                e.$setData({
                                    status: "normal"
                                })
                        })
                },
                clear: function() {
                    var e = this;
                    this._captchaIns && (this.$setData({
                        classicVisible: !1
                    }),
                        this.$nextTick(function() {
                            e._captchaIns.$destroy(),
                                e._captchaIns = null
                        })),
                        this.beginTime = 0,
                        this.traceData = []
                },
                toggleClassicVisible: function(e) {
                    var t = this._captchaIns;
                    if (_.isMobile && t)
                        e && t.open(),
                        !e && t.close();
                    else {
                        var n = _.find(".yidun_classic-wrapper", this.$el);
                        n.style.display = e ? "block" : "none"
                    }
                },
                updateUI: function(e) {
                    var t = this
                        , n = _.find(".yidun_tips__text", this.$el)
                        , i = this.$store.state.config
                        , r = function(e) {
                        e.stopPropagation(),
                            t.$store.commit(c)
                    };
                    switch (n && _.off(n, "click", r),
                        e) {
                        case "error":
                            this.$store.state.countsOfVerifyError > i.maxVerification && n && _.on(n, "click", r)
                    }
                },
                verifyCaptcha: function() {
                    "normal" === this.status ? this.verifyIntellisenseCaptcha() : this._captchaIns && this._captchaIns.open()
                },
                verifyIntellisenseCaptcha: function() {
                    var e = this
                        , t = this.$store.state
                        , n = t.token
                        , i = t.captchaAnticheat
                        , r = p.now()
                        , a = g(n, [0, 0, r - (this.beginTime || r)] + "")
                        , s = this.traceData.map(function(e) {
                        return g(n, e)
                    })
                        , l = function(t) {
                        e.$store.dispatch(o, {
                            token: n,
                            acToken: t,
                            type: d.INTELLISENSE,
                            width: "240",
                            data: JSON.stringify({
                                d: "",
                                m: v(p.sample(s, h).join(":")),
                                p: v(a),
                                ext: v(g(n, "1," + s.length))
                            })
                        }, function(t) {
                            if (e._isMounted) {
                                if (!t)
                                    return void e.$setData({
                                        status: "success"
                                    });
                                if (!e._captchaIns) {
                                    var n = e.$store.state.config
                                        , i = b._extend(m);
                                    e._captchaIns = new i({
                                        store: e.$store,
                                        propsData: {
                                            intellisense: !0,
                                            enableColor: !0,
                                            onClose: function() {
                                                e.$store.commit(f, {
                                                    name: "onClose"
                                                })
                                            }
                                        }
                                    }).$mount(function(e) {
                                        n.appendTo ? n.appendTo.appendChild(e) : document.body.appendChild(e)
                                    }),
                                        e.$setData({
                                            status: "loading"
                                        })
                                }
                                e._captchaIns.open()
                            }
                        })
                    };
                    i.getToken({
                        timeout: 500
                    }).then(l)["catch"](l)
                },
                closeModal: function() {
                    this._captchaIns && this._captchaIns.closeModal()
                }
            }
        }
    }
    , function(e, t, n) {
        var i = n(6)
            , r = n(2)
            , o = n(1)
            , a = n(8)
            , s = a.eypt
            , l = a.xor_encode
            , u = n(3)
            , f = u.CAPTCHA_CLASS
            , c = u.SAMPLE_NUM
            , j = n(4)
            , d = j.SWITCH_LOAD_STATUS
            , h = j.INVOKE_HOOK
            , p = n(5)
            , y = p.REQUEST_IMG_ERROR
            , v = n(9)
            , g = n(7)
            , b = g.createNetCollect
            , m = 4
            , _ = 2
            , w = {
            status: "dragend",
            beginTime: 0,
            clientX: 0,
            clientY: 0,
            startX: 0,
            startY: 0,
            startLeft: 0,
            startTop: 0,
            el: null
        };
        e.exports = i._extend({
            "abstract": !0,
            props: ["loadInfo", "mode"],
            data: function() {
                var e = this.$store.state.langPkg;
                return {
                    langPkg: e
                }
            },
            mounted: function() {
                this.initData(),
                    this._removeEvents = this.initEvents(),
                    this.initCustomStyles()
            },
            beforeDestroy: function() {
                this._removeEvents(),
                    this.$el = null,
                    this.$bgImgWrap = null,
                    this.$picViews = [],
                    this.drag = null,
                    this.traceData = null,
                    this.exchangePos = null
            },
            render: function(e) {
                var t = e.loadInfo;
                t && this.changeLoadStatus(t)
            },
            methods: {
                initData: function() {
                    this.clickCounts = 0,
                        this.traceData = [],
                        this.exchangePos = [],
                        this.drag = Object.assign({}, w)
                },
                initEvents: function() {
                    var e = this;
                    this.$bgImgWrap = r.find("." + f.BGIMG, this.$el),
                        this.$picViews = [];
                    for (var t = r.findAll(".yidun_inference", this.$el), n = function(t) {
                        t.target.className.indexOf("yidun_inference") !== -1 && e.onMouseDown(t)
                    }, i = this.onDragEnd.bind(this), o = this.onMouseMove.bind(this), a = 0, s = t.length; a < s; a++)
                        this.$picViews.push({
                            view: t[a],
                            img: r.find(".yidun_inference__img", t[a])
                        });
                    var l = r.supportPointer ? "pointer" : "mouse";
                    return r.on(this.$bgImgWrap, l + "down", n),
                        r.on(document, l + "up", i),
                        r.on(document, l + "move", o),
                        function() {
                            r.off(e.$bgImgWrap, l + "down", n),
                                r.off(document, l + "up", i),
                                r.off(document, l + "move", o)
                        }
                },
                initCustomStyles: function() {
                    var e = this.$store.state.config.customStyles.imagePanel;
                    this.$picViews[0].view.style.borderTopLeftRadius = e.borderRadius,
                        this.$picViews[m - 1].view.style.borderTopRightRadius = e.borderRadius,
                        this.$picViews[m].view.style.borderBottomLeftRadius = e.borderRadius,
                        this.$picViews[m * _ - 1].view.style.borderBottomRightRadius = e.borderRadius
                },
                reset: function() {
                    var e = this.$store.state
                        , t = e.countsOfVerifyError
                        , n = e.config
                        , i = t > n.maxVerification;
                    if (!i) {
                        var o = this.$picViews;
                        this.initData(),
                            r.delClass(this.$bgImgWrap, "yidun_bgimg--dragging");
                        for (var a = 0, s = o.length; a < s; a++) {
                            this.cleanInferenceCls(a);
                            var l = o[a].img;
                            l.style.top = "",
                                l.style.left = ""
                        }
                    }
                },
                cleanInferenceCls: function(e) {
                    this.$picViews[e] && (this.$picViews[e].view.className = "yidun_inference yidun_inference--" + e)
                },
                floatStatusChange: function() {
                    this.$parent.shouldHandleFloatChange(this.loadInfo) && this.changeTipElText()
                },
                changeTipElText: function() {
                    var e = r.find(".yidun_tips__text", this.$el)
                        , t = this.$store.state.config;
                    "float" !== (this.mode || t.mode) || this.$parent.panelVisible ? (r.text(e, this.langPkg.inferenceTip),
                        r.delClass(this.$el, "yidun--button")) : (r.text(e, this.langPkg.clickButton),
                        r.addClass(this.$el, "yidun--button"))
                },
                changeLoadStatus: function(e) {
                    var t = this
                        , n = e.status
                        , i = e.data;
                    if ("loading" === n && i) {
                        var o = r.find(".yidun_bg-img", this.$el)
                            , a = r.find(".yidun_tips__text", this.$el)
                            , s = this.$store
                            , l = s.commit
                            , u = s.state
                            , f = u.langPkg
                            , c = u.config
                            , j = u.captchaCollector;
                        v.image({
                            url: i.bg,
                            timeout: c.timeout,
                            onProcess: b(j, {
                                token: i.token
                            })
                        }).then(function(e) {
                            if (t._isMounted) {
                                o.src = e.src;
                                for (var n = 0, s = t.$picViews.length; n < s; n++)
                                    t.$picViews[n].img.src = e.src;
                                r.text(a, f.inferenceTip),
                                    l(d, {
                                        status: "done",
                                        data: i
                                    })
                            }
                        })["catch"](function(e) {
                            if (t._isMounted) {
                                var n = Object.assign({}, e.data, {
                                    token: i.token
                                });
                                l(d, {
                                    status: "fail"
                                }),
                                    l(h, {
                                        name: "onError",
                                        args: [new p(y,e.message,n)]
                                    })
                            }
                        })
                    } else
                        "done" === n && this.changeTipElText()
                },
                onMouseDown: function(e) {
                    if (e.preventDefault(),
                    this.handleDown() && "dragend" === this.drag.status) {
                        var t = e.clientX
                            , n = e.clientY;
                        Object.assign(this.drag, {
                            beginTime: o.now(),
                            clientX: t,
                            clientY: n,
                            startX: t,
                            startY: n
                        })
                    }
                    return !1
                },
                onDragEnd: function(e) {
                    if ("dragend" === this.drag.status)
                        return void Object.assign(this.drag, {
                            beginTime: 0
                        });
                    var t = this.drag.el;
                    Object.assign(this.drag, w);
                    var n = this.exchangePos[0]
                        , i = this.$picViews[n].view;
                    t.style.display = "none",
                        this.cleanInferenceCls(n);
                    var a = i.cloneNode(!0);
                    if (r.replace(a, i),
                        this.$picViews[n].view = a,
                        this.$picViews[n].img = r.find(".yidun_inference__img", a),
                        r.delClass(this.$bgImgWrap, "yidun_bgimg--dragging"),
                    this.exchangePos[1] || 0 === this.exchangePos[1]) {
                        var u = this.$picViews[this.exchangePos[1]].img
                            , f = this.getImgPos(n)
                            , j = f.top
                            , d = f.left;
                        u.style.top = j,
                            u.style.left = d,
                            this.onVerifyCaptcha({
                                data: JSON.stringify({
                                    d: "",
                                    m: s(o.sample(this.traceData, c).join(":")),
                                    p: s(l(this.$store.state.token, this.exchangePos.join(","))),
                                    ext: s(l(this.$store.state.token, this.clickCounts + "," + this.traceData.length))
                                })
                            })
                    } else {
                        var h = this.$picViews[n].img;
                        h.style.top = "",
                            h.style.left = ""
                    }
                },
                onMouseMove: function(e) {
                    var t = e.clientX
                        , n = e.clientY
                        , i = this.drag
                        , r = i.status
                        , a = i.beginTime
                        , s = i.startX
                        , u = i.startY
                        , f = t - s
                        , c = n - u;
                    if ("dragend" === r && a && (this.drag.status = "dragstart"),
                    "dragend" !== this.drag.status) {
                        Object.assign(this.drag, {
                            clientX: t,
                            clientY: n
                        });
                        var j = this.$store.state.token
                            , d = l(j, [Math.round(f), Math.round(c), o.now() - this.drag.beginTime] + "");
                        this.traceData.push(d),
                        "dragstart" === this.drag.status && this.startDrag(e),
                        "dragging" === this.drag.status && this.dragging(e)
                    }
                },
                handleDown: function() {
                    this.clickCounts++;
                    var e = this.$store.state
                        , t = e.load
                        , n = e.verifyStatus;
                    return "done" === t.status && !n && "dragend" === this.drag.status
                },
                startDrag: function(e) {
                    var t = e.target;
                    r.addClass(this.$bgImgWrap, "yidun_bgimg--dragging");
                    var n = t.parentNode
                        , i = n.cloneNode(!0);
                    i.draggable = !1,
                        i.removeAttribute("style");
                    for (var o = r.findAll(".yidun_inference--drag", this.$bgImgWrap), a = 0, s = o.length; a < s; a++)
                        r.remove(o[a]);
                    r.addClass(i, "yidun_inference--drag"),
                        this.$bgImgWrap.appendChild(i),
                        r.addClass(n, "yidun_inference--origin"),
                        Object.assign(this.drag, {
                            status: "dragging",
                            el: i,
                            startLeft: i.offsetLeft,
                            startTop: i.offsetTop
                        });
                    for (var l = 0, u = this.$picViews.length; l < u; l++)
                        if (this.$picViews[l].view === n) {
                            this.exchangePos[0] = l;
                            break
                        }
                    this.$parent.getAnticheatToken({
                        timeout: 750
                    })
                },
                dragging: function() {
                    var e = this.drag
                        , t = e.clientX
                        , n = e.clientY
                        , i = e.startX
                        , r = e.startY
                        , o = e.el
                        , a = this.computeOffset(t - i, n - r)
                        , s = a.x
                        , l = a.y;
                    o.style.left = s + "px",
                        o.style.top = l + "px",
                        this.readyExchange(s, l)
                },
                readyExchange: function(e, t) {
                    var n = this.getDragCenterIndex(e, t)
                        , i = this.exchangePos[0]
                        , o = this.$picViews[i].view;
                    if (n !== this.exchangePos[1]) {
                        for (var a = 0, s = this.$picViews.length; a < s; a++)
                            r.delClass(this.$picViews[a].view, "yidun_inference--target");
                        if (n === -1 || i === n)
                            return r.delClass(o, "yidun_inference--swap"),
                                void (this.exchangePos[1] = void 0);
                        this.exchangePos[1] = n,
                            r.addClass(this.$picViews[n].view, "yidun_inference--target"),
                            r.addClass(o, "yidun_inference--swap");
                        var l = this.$picViews[i].img
                            , u = this.getImgPos(n)
                            , f = u.top
                            , c = u.left;
                        l.style.top = f,
                            l.style.left = c
                    }
                },
                computeOffset: function(e, t) {
                    var n = this.drag
                        , i = n.startLeft
                        , r = n.startTop
                        , o = n.el
                        , a = this.$bgImgWrap.offsetWidth - o.offsetWidth
                        , s = this.$bgImgWrap.offsetHeight - o.offsetHeight
                        , l = e + i
                        , u = t + r;
                    return l < 0 ? l = 0 : l > a && (l = a),
                        u < 0 ? u = 0 : u > s && (u = s),
                        {
                            x: l,
                            y: u
                        }
                },
                getDragCenterIndex: function(e, t) {
                    var n = r.getRect(this.drag.el)
                        , i = n.width
                        , o = n.height
                        , a = e + i / 2
                        , s = t + o / 2
                        , l = parseInt(a / i, 10)
                        , u = parseInt(s / o, 10);
                    return a % i === 0 || s % o === 0 ? -1 : l + u * m
                },
                getImgPos: function(e) {
                    var t = e - m;
                    return {
                        top: (t < 0 ? 0 : -100) + "%",
                        left: (t < 0 ? e * -100 : t * -100) + "%"
                    }
                }
            }
        })
    }
    , function(e, t, n) {
        var i = function() {
            function e(e, t) {
                var n = []
                    , i = !0
                    , r = !1
                    , o = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value),
                    !t || n.length !== t); i = !0)
                        ;
                } catch (l) {
                    r = !0,
                        o = l
                } finally {
                    try {
                        !i && s["return"] && s["return"]()
                    } finally {
                        if (r)
                            throw o
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
            , r = n(6)
            , o = n(2)
            , a = n(1)
            , s = n(3)
            , l = s.CAPTCHA_CLASS
            , u = s.SAMPLE_NUM
            , f = n(4)
            , c = f.SWITCH_LOAD_STATUS
            , j = f.INVOKE_HOOK
            , d = n(8)
            , h = d.eypt
            , p = d.xor_encode
            , y = n(5)
            , v = y.REQUEST_IMG_ERROR
            , g = n(9)
            , b = n(7)
            , m = b.createNetCollect
            , _ = document
            , w = {
            status: "dragend",
            beginTime: 0,
            clientX: 0,
            startX: 0,
            clientY: 0,
            startY: 0,
            left: 0,
            startLeft: 0,
            dragX: 0
        };
        e.exports = r._extend({
            "abstract": !0,
            props: ["loadInfo"],
            mounted: function() {
                this.initData(),
                    this._removeEvents = this.initEvents()
            },
            beforeDestroy: function() {
                this._removeEvents(),
                    this.sliderTransition = null,
                    this.$slider.style.transition = "",
                    this.$el = null,
                    this.$slideIndicator = null,
                    this.$slider = null,
                    this.$jigsaw = null,
                    this.drag = null
            },
            render: function(e) {
                var t = e.loadInfo;
                t && this.changeLoadStatus(t)
            },
            methods: {
                initData: function() {
                    this.drag = Object.assign({}, w),
                        this.traceData = [],
                        this.mouseDownCounts = 0
                },
                changeSlideIcon: function(e) {
                    !this.$store.state.config.customStyles.icon.slider && this.$slideIcon && (e ? (this.$slideIcon.src = e,
                        this.$slideIcon.style.display = "block") : this.$slideIcon.style.display = "none")
                },
                initEvents: function() {
                    var e = this;
                    this.$slideIndicator = o.find("." + l.SLIDE_INDICATOR, this.$el),
                        this.$jigsaw = o.find("." + l.JIGSAW, this.$el),
                        this.$control = o.find("." + l.CONTROL, this.$el),
                        this.$slider = o.find("." + l.SLIDER, this.$el),
                        this.$slideIcon = o.find(".yidun_slider__icon--img", this.$el);
                    var t = this.$parent.$data.customStyles.controlBar
                        , n = void 0 === t ? {} : t;
                    this.controlBar = n;
                    var i = this.onMouseDown.bind(this)
                        , r = this.onMouseDown.bind(this)
                        , a = this.onMouseMove.bind(this)
                        , s = this.onMouseUp.bind(this)
                        , u = o.supportPointer ? "pointer" : "mouse";
                    return o.on(this.$slider, u + "down", i),
                        o.on(this.$jigsaw, u + "down", r),
                        o.on(_, u + "move", a),
                        o.on(_, u + "up", s),
                        this.sliderTransition = o.transition(this.$slider, {
                            beforeLeave: function(e) {
                                e.style.transition = "left .3s ease-out"
                            },
                            afterLeave: function(e) {
                                e.style.transition = ""
                            }
                        }),
                    o.supportPointer && (document.documentElement.style.touchAction = "none"),
                        function() {
                            o.off(e.$slider, u + "down", i),
                                o.off(e.$jigsaw, u + "down", r),
                                o.off(_, u + "move", a),
                                o.off(_, u + "up", s),
                                e.sliderTransition.dispose(),
                            o.supportPointer && (document.documentElement.style.touchAction = "auto")
                        }
                },
                reset: function() {
                    var e = this.$store.state
                        , t = e.countsOfVerifyError
                        , n = e.config
                        , i = t > n.maxVerification;
                    i || (this.initData(),
                        o.delClass(this.$control, "yidun_control--moving"),
                    parseInt(this.$slider.style.left) && this.sliderTransition.leave(),
                        this.$slideIndicator.style.width = 0,
                        this.$slider.style.left = 0,
                        this.$jigsaw.style.left = 0)
                },
                changeLoadStatus: function(e) {
                    var t = this
                        , n = e.data;
                    if (this.changeSlideIcon(this.controlBar.slideIcon),
                    "loading" === e.status && n) {
                        var r = this.$store.state
                            , a = r.langPkg
                            , s = r.config
                            , u = r.captchaCollector
                            , f = o.find(".yidun_tips__text", this.$el)
                            , d = o.find(".yidun_bg-img", this.$el)
                            , h = o.find("." + l.JIGSAW, this.$el)
                            , p = this.$store.commit
                            , b = m(u, {
                            token: n.token
                        });
                        g.all([g.image({
                            url: n.bg,
                            timeout: s.timeout,
                            onProcess: b
                        }), g.image({
                            url: n.front,
                            timeout: s.timeout,
                            onProcess: b
                        })]).then(function(e) {
                            if (t._isMounted) {
                                var r = i(e, 2)
                                    , s = r[0]
                                    , l = r[1];
                                d.src = s.src,
                                    h.src = l.src,
                                    o.text(f, a.slideTip),
                                    p(c, {
                                        status: "done",
                                        data: n
                                    })
                            }
                        })["catch"](function(e) {
                            if (t._isMounted) {
                                var i = Object.assign({}, e.data, {
                                    token: n.token
                                });
                                p(c, {
                                    status: "fail"
                                }),
                                    p(j, {
                                        name: "onError",
                                        args: [new y(v,e.message,i)]
                                    })
                            }
                        })
                    }
                },
                onMouseDown: function(e) {
                    e.preventDefault(),
                        this.mouseDownCounts++,
                        this.width = this.$el.offsetWidth;
                    var t = this.$store.state
                        , n = t.load
                        , i = t.verifyStatus;
                    if ("done" === n.status && !i) {
                        var r = e.clientX
                            , o = e.clientY
                            , s = this.drag;
                        "dragend" === s.status && Object.assign(s, {
                            beginTime: a.now(),
                            clientX: r,
                            startX: r,
                            clientY: o,
                            startY: o,
                            dragX: 0
                        })
                    }
                },
                onMouseMove: function(e) {
                    var t = e.clientX
                        , n = e.clientY
                        , i = this.drag
                        , r = i.status
                        , s = i.beginTime
                        , l = i.startX;
                    if (i.status = s && t - l > 3 && "dragend" === r ? "dragstart" : r,
                    "dragend" !== i.status) {
                        !(e.type.indexOf("touch") !== -1 && o.supportPassive) && e.preventDefault(),
                            Object.assign(i, {
                                clientX: t,
                                clientY: n,
                                dragX: t - i.startX
                            });
                        var u = this.$store.state.token;
                        var my_xy = [Math.round(i.dragX < 0 ? 0 : i.dragX), Math.round(i.clientY - i.startY), a.now() - i.beginTime];
                        this.my_xy = []
                        this.my_xy.push(my_xy);
                        console.log("my_xy: ", my_xy)
                        console.log("this.my_xy: ", this.my_xy);
                        // var f = p(u, [Math.round(i.dragX < 0 ? 0 : i.dragX), Math.round(i.clientY - i.startY), a.now() - i.beginTime] + "");
                        var f = p(u, my_xy + "");
                        this.traceData.push(f),
                        "dragstart" === i.status && this.onMouseMoveStart(e),
                        "dragging" === i.status && this.onMouseMoving(e)
                    }
                },
                onMouseMoveStart: function(e) {
                    var t = o.getComputedStyle(this.$slider, "left")
                        , n = o.find(".yidun_tips__text", this.$el);
                    o.text(n, ""),
                        Object.assign(this.drag, {
                            status: "dragging",
                            startLeft: parseInt(t.slice(0, -2), 10)
                        }),
                        this.$parent.getAnticheatToken({
                            timeout: 750
                        })
                },
                onMouseMoving: function() {
                    var e = this.$slider.offsetWidth
                        , t = this.$jigsaw.offsetWidth
                        , n = this.drag.left = this.restrict(this.$slider);
                    this.$slider.style.left = n + "px",
                        this.$jigsaw.style.left = this.restrict(this.$jigsaw, e - t) + "px",
                        o.addClass(this.$control, "yidun_control--moving"),
                        this.$slideIndicator.style.width = n + e + "px",
                        this.changeSlideIcon(this.controlBar.slideIconMoving)
                },
                onMouseUp: function(e) {
                    var t = this.drag;
                    if ("dragend" === t.status)
                        return void Object.assign(t, {
                            beginTime: 0
                        });
                    Object.assign(t, w);
                    var n = a.sample(this.traceData, u)
                        , i = this.$store.state.token
                        , r = h(p(i, parseInt(this.$jigsaw.style.left, 10) / this.width * 100 + ""));
                    this.onVerifyCaptcha({
                        data: JSON.stringify({
                            d: h(n.join(":")),
                            m: "",
                            p: r,
                            ext: h(p(i, this.mouseDownCounts + "," + this.traceData.length))
                        })
                    })
                },
                restrict: function(e, t) {
                    if (e) {
                        var n, i, r = this.drag, o = r.startLeft, a = r.dragX, s = this.width, l = e.offsetWidth, u = this.$slider.offsetWidth, f = s - l, c = o + a, j = t < 0 ? -t : t / 2;
                        return e === this.$jigsaw && (a <= j ? (n = a,
                            i = t < 0 ? -n / 2 : n,
                            c += i) : s - a - u <= j ? (n = a - (s - u - j),
                            i = t < 0 ? -n / 2 : n,
                            c += t / 2 + i) : c += t / 2),
                        c <= 0 && (c = 0),
                        c >= f && (c = f),
                            c
                    }
                }
            }
        })
    }
    , function(e, t, n) {
        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
                e
        }
        var r, o = n(6), a = n(2), s = n(1), l = n(8), u = l.eypt, f = l.xor_encode, c = n(3), j = c.CAPTCHA_TYPE, d = c.CAPTCHA_CLASS, h = c.SAMPLE_NUM, p = c.RTL_LANGS, y = n(4), v = y.SWITCH_LOAD_STATUS, g = y.INVOKE_HOOK, b = n(5), m = b.REQUEST_IMG_ERROR, _ = n(9), w = n(7), T = w.createNetCollect;
        e.exports = o._extend({
            "abstract": !0,
            props: ["loadInfo", "mode", "type"],
            data: function() {
                var e = this.$store.state.langPkg;
                return {
                    langPkg: e
                }
            },
            on: (r = {},
                i(r, "." + d.BGIMG + " click", function(e) {
                    this.onClick(e)
                }),
                i(r, "." + d.BGIMG + " mousemove", function(e) {
                    this.trackMoving(e)
                }),
                r),
            mounted: function() {
                this.initData(),
                    this.$bgImg = a.find("." + d.BGIMG, this.$el)
            },
            beforeDestroy: function() {
                this.$bgImg = null
            },
            render: function(e) {
                var t = e.loadInfo;
                if (t && "done" === t.status) {
                    var n = t.data && t.data.front;
                    Array.isArray(n) && (n = n[0],
                        t.data.front = n)
                }
                t && this.changeLoadStatus(t)
            },
            methods: {
                initData: function() {
                    this.pointsStack = [],
                        this.MAX_POINTS = 0,
                        this.traceData = [],
                        this.beginTime = 0,
                        this.clickCounts = 0
                },
                reset: function() {
                    var e = this.$store.state
                        , t = e.countsOfVerifyError
                        , n = e.config
                        , i = t > n.maxVerification;
                    i || (this.cleanPoints(),
                        this.initData())
                },
                floatStatusChange: function() {
                    if (this.$parent.shouldHandleFloatChange(this.loadInfo)) {
                        var e = this.loadInfo.data.front || "";
                        this.changeTipElText({
                            message: e
                        })
                    }
                },
                changeTipElText: function(e) {
                    var t = e.message
                        , n = void 0 === t ? "" : t
                        , i = this.$store.state.config
                        , r = this.langPkg
                        , o = this.$parent.panelVisible
                        , l = "float" === (this.mode || i.mode)
                        , u = a.find(".yidun_tips__text", this.$el)
                        , f = a.find(".yidun_tips__answer", this.$el)
                        , c = a.find(".yidun_tips__point", this.$el);
                    if (l && !o)
                        a.text(u, r.clickButton),
                            a.addClass(this.$el, "yidun--button"),
                            a.addClass(f, "hide");
                    else {
                        var d = p.indexOf(i.lang) > -1;
                        this.type === j.ICON_POINT ? (d && a.addClass(f, "yidun_answer--r2l"),
                            a.text(u, r.clickInTurn)) : this.type === j.WORD_ORDER ? a.text(u, r.clickWordInTurn) : this.type === j.SPACE ? a.text(u, n) : (d && (n = s.reverse(n)),
                            a.text(c, n.replace(/./g, ' "$&"')),
                            a.text(u, r.clickInTurn)),
                            a.delClass(f, "hide"),
                            a.delClass(this.$el, "yidun--button")
                    }
                },
                changeLoadStatus: function(e) {
                    var t = this
                        , n = e.status
                        , i = e.data;
                    switch (n) {
                        case "loading":
                            if (i) {
                                var r = a.find(".yidun_bg-img", this.$el)
                                    , o = a.find(".yidun_tips__img", this.$el)
                                    , s = this.$store
                                    , l = s.commit
                                    , u = s.state
                                    , f = _.image({
                                    url: i.bg,
                                    timeout: u.config.timeout,
                                    onProcess: T(u.captchaCollector, {
                                        token: i.token
                                    })
                                });
                                f.then(function(e) {
                                    t._isMounted && (r.src = e.src,
                                    t.type === j.ICON_POINT && (o.src = e.src),
                                        l(v, {
                                            status: "done",
                                            data: i
                                        }))
                                })["catch"](function(e) {
                                    if (t._isMounted) {
                                        var n = Object.assign({}, e.data, {
                                            token: i.token
                                        });
                                        l(v, {
                                            status: "fail"
                                        }),
                                            l(g, {
                                                name: "onError",
                                                args: [new b(m,e.message,n)]
                                            })
                                    }
                                })
                            }
                            break;
                        case "done":
                            var c = i.front || ""
                                , d = 0;
                            d = this.type === j.ICON_POINT ? 3 : this.type === j.WORD_ORDER ? parseInt(c, 10) : this.type === j.SPACE ? 1 : c.length,
                                this.MAX_POINTS = d,
                                this.changeTipElText({
                                    message: c
                                })
                    }
                },
                onClick: function(e) {
                    var t = this
                        , n = this.$store.state
                        , i = n.countsOfVerifyError
                        , r = n.config
                        , o = i > r.maxVerification;
                    if (!o) {
                        this.clickCounts++;
                        var a = this.$bgImg.getBoundingClientRect()
                            , l = a.left
                            , u = a.top;
                        this.pointsStack.length || (this.beginTime = s.now());
                        var f = this.pointsStack.slice(-1)[0];
                        return f && e.target === f.el && !this.$store.state.verifyStatus ? void s.raf(function() {
                            return t.$bgImg.removeChild(t.pointsStack.pop().el)
                        }) : void this.addPoint({
                            left: e.clientX - l,
                            top: e.clientY - u
                        })
                    }
                },
                trackMoving: function(e) {
                    if (this.beginTime) {
                        var t = this.$bgImg.getBoundingClientRect()
                            , n = t.left
                            , i = t.top
                            , r = f(this.$store.state.token, [Math.round(e.clientX - n), Math.round(e.clientY - i), s.now() - this.beginTime] + "");
                        this.traceData.push(r)
                    }
                },
                addPoint: function(e) {
                    var t = e.left
                        , n = e.top;
                    this.pointsStack.length || this.$parent.getAnticheatToken({
                        timeout: 1e3
                    });
                    var i = this.pointsStack.length + 1;
                    if (!(i > this.MAX_POINTS)) {
                        var r = document.createElement("div");
                        r.className = "yidun_icon-point yidun_point-" + i,
                            a.css(r, "left: " + (t - 10) + "px; top: " + (n - 25) + "px;"),
                            this.$bgImg.appendChild(r),
                            this.pointsStack.push({
                                el: r,
                                coord: f(this.$store.state.token, [Math.round(t), Math.round(n), s.now() - this.beginTime] + "")
                            }),
                            this.shouldVerifyCaptcha()
                    }
                },
                shouldVerifyCaptcha: function() {
                    var e = this.pointsStack;
                    if (e.length === this.MAX_POINTS) {
                        var t = e.map(function(e) {
                            return e.coord
                        })
                            , n = this.traceData;
                        this.onVerifyCaptcha({
                            data: JSON.stringify({
                                d: "",
                                m: u(s.sample(n, h).join(":")),
                                p: u(t.join(":")),
                                ext: u(f(this.$store.state.token, this.clickCounts + "," + n.length))
                            })
                        })
                    }
                },
                cleanPoints: function() {
                    for (var e; e = this.pointsStack.pop(); )
                        this.$bgImg.removeChild(e.el)
                }
            }
        })
    }
    , function(e, t, n) {
        var i = n(6)
            , r = n(2)
            , o = n(4)
            , a = o.SWITCH_LOAD_STATUS
            , s = o.UPDATE_VERIFY_STATUS
            , l = o.INVOKE_HOOK
            , u = n(5)
            , f = u.REQUEST_IMG_ERROR
            , c = n(9)
            , j = n(7)
            , d = j.createNetCollect;
        e.exports = i._extend({
            "abstract": !0,
            props: ["loadInfo"],
            data: function() {
                var e = this.$store.state
                    , t = e.langPkg
                    , n = e.config.lang;
                return {
                    langPkg: t,
                    lang: n
                }
            },
            mounted: function() {
                var e = this;
                this.TIMEOUT_SECONDS = 300,
                    this._unsubscribe = this.$store.subscribe(function(t, n) {
                        var i = t.type
                            , r = n.verifyStatus;
                        switch (i) {
                            case s:
                                switch (r) {
                                    case "success":
                                    case "error":
                                        e.clearTimers()
                                }
                        }
                    })
            },
            beforeDestroy: function() {
                this._unsubscribe(),
                    this.clearTimers()
            },
            render: function(e) {
                var t = e.loadInfo;
                t && this.changeLoadStatus(t)
            },
            methods: {
                changeLoadStatus: function(e) {
                    var t = e.status
                        , n = e.data;
                    switch (t) {
                        case "loading":
                            if (n) {
                                var i = r.find(".yidun_bg-img", this.$el)
                                    , o = this.$store
                                    , s = o.commit
                                    , j = o.state
                                    , h = c.image({
                                    url: n.bg,
                                    timeout: j.config.timeout,
                                    onProcess: d(j.captchaCollector, {
                                        token: n.token
                                    })
                                });
                                h.then(function(e) {
                                    i.src = e.src,
                                        s(a, {
                                            status: "done",
                                            data: n
                                        })
                                })["catch"](function(e) {
                                    var t = Object.assign({}, e.data, {
                                        token: n.token
                                    });
                                    s(a, {
                                        status: "fail"
                                    }),
                                        s(l, {
                                            name: "onError",
                                            args: [new u(f,e.message,t)]
                                        })
                                })
                            }
                            break;
                        case "done":
                            var p = r.find(".yidun_tips__text", this.$el)
                                , y = this.langPkg;
                            p.innerHTML = y.waitForSMS + '\n          <span class="yidun_sms-counter"></span>',
                                this.countDown(),
                                this.pollingToVerify()
                    }
                },
                pollingToVerify: function() {
                    var e = this
                        , t = this.TIMEOUT_SECONDS
                        , n = 5
                        , i = 0
                        , r = function o() {
                        return n * i >= t ? void e.$store.commit(s, {
                            verifyStatus: "error",
                            error: new Error("SMS is outdated")
                        }) : (i++,
                            e.onVerifyCaptcha({
                                data: ""
                            }),
                            void (e.pollingTimer = setTimeout(o, 1e3 * n)))
                    };
                    r()
                },
                countDown: function() {
                    var e = this
                        , t = this.TIMEOUT_SECONDS
                        , n = r.find(".yidun_sms-counter", this.$el)
                        , i = function o() {
                        r.text(n, t-- + "s"),
                        0 !== t && (e.countTimer = setTimeout(o, 1e3))
                    };
                    i()
                },
                clearTimers: function() {
                    this.countTimer && (clearTimeout(this.countTimer),
                        this.countTimer = null),
                    this.pollingTimer && (clearTimeout(this.pollingTimer),
                        this.pollingTimer = null)
                },
                reset: function() {
                    this.clearTimers()
                }
            }
        })
    }
    , function(e, t, n) {
        function i(e, t) {
            var n = this;
            e = h(e),
                j(e.__theme__, {
                    protocol: e.protocol,
                    staticServer: Array.isArray(e.staticServer) ? e.staticServer[0] : e.staticServer,
                    theme: e.theme
                });
            var i = window.gdxidpyhxde;
            t = t || new k({
                bid: e.captchaId,
                url: ""
            },e);
            var o = Object.assign({}, c.state, {
                config: e,
                fingerprint: i,
                langPkg: e.customTexts,
                $fetch: d({
                    timeout: e.timeout,
                    captchaConfig: e
                }),
                captchaAnticheat: new R(e,t),
                captchaCollector: t
            })
                , S = new f(Object.assign({}, c, {
                state: o
            }))
                , C = e.__serverConfig__.smart
                , O = null
                , I = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                if (e && e.nodeType) {
                    var n = p.find(".yidun_input", e);
                    n ? n.value = t : (n = document.createElement("input"),
                        n.type = "hidden",
                        n.name = "NECaptchaValidate",
                        n.value = t,
                        n.className = "yidun_input",
                        e.appendChild(n))
                }
            }
                , $ = {
                onVerify: function(n, i) {
                    if (n) {
                        var r = n.data;
                        if (r && r.counts > e.maxVerification) {
                            var o = new m(_,"verify failed more then " + e.maxVerification + " times--" + n.message,Object.assign({
                                token: r.token
                            }, n.data));
                            return void t.collectErr(o)
                        }
                        return void (n.code === w && t.collectErr(n))
                    }
                    var a = i.validate;
                    I(e.element, a),
                        t.clear()
                },
                onError: function(e) {
                    e && "get" === e.data.api && e.code === w && t.collectErr(e)
                }
            };
            this.version = S.state.version,
                this.captchaId = e.captchaId,
                this.captchaType = S.state.captchaType,
                this.mode = e.mode,
                this.theme = e.theme,
                this.protocol = e.protocol,
                this.lang = e.lang;
            var X = S.subscribe(function(t, i) {
                var r = t.type
                    , o = t.payload;
                switch (r) {
                    case a:
                        n.captchaType = i.captchaType;
                        break;
                    case u:
                    case l:
                        I(e.element, "");
                        break;
                    case s:
                        var f = o.name
                            , c = o.args;
                        window.setTimeout(function() {
                            var t = $[f];
                            !c && (c = [n]),
                            t && t.apply(null, c),
                            "function" == typeof e[f] && e[f].apply(null, c)
                        })
                }
            });
            r.mixin({
                beforeCreate: function() {
                    this.$store = this.$parent && this.$parent.$store || this.$options.store
                }
            }),
                this.popUp = function() {
                    T.assert(!1, "popUp function could only be invoked in not intellisense and mode is popup")
                }
                ,
                this.close = function() {
                    T.assert(!1, 'close function could only be invoked in only "enableClose" is true and intellisense on mobile devices or mode is bind/popup')
                }
                ,
                this.verify = function() {
                    T.assert(!1, "verify function could only be invoked in intellisense and mode is bind")
                }
            ;
            var x = function(t, i) {
                e.enableClose && (i && !p.isMobile || (n.close = function() {
                        var e = t || O;
                        e && e.closeModal()
                    }
                ))
            };
            switch (C) {
                case !0:
                    if ("bind" === this.mode) {
                        var A = r._extend(b);
                        O = new A({
                            "abstract": !0,
                            el: e.element,
                            store: S
                        }),
                            this.verify = function() {
                                return O.verifyCaptcha()
                            }
                            ,
                            x(O),
                            this._captchaIns = O
                    } else {
                        O = new r({
                            el: e.element,
                            store: S,
                            template: "<captcha-intellisense></captcha-intellisense>",
                            components: {
                                "captcha-intellisense": g
                            }
                        });
                        var P = O && O.$children && O.$children[0];
                        x(P, !0),
                            this._captchaIns = P
                    }
                    break;
                case !1:
                default:
                    "popup" === this.mode ? (this.popUp = function() {
                        if (!O) {
                            var t = r._extend(v);
                            O = new t({
                                store: S,
                                propsData: {
                                    onClose: function() {
                                        S.commit(s, {
                                            name: "onClose"
                                        })
                                    },
                                    enableColor: !0
                                }
                            }).$mount(function(t) {
                                e.appendTo ? e.appendTo.appendChild(t) : document.body.appendChild(t)
                            })
                        }
                        O.open(),
                            this._captchaIns = O
                    }
                        ,
                        x()) : (O = new r({
                        el: e.element,
                        store: S,
                        template: '<captcha-core :enableColor="true"></captcha-core>',
                        components: {
                            "captcha-core": y
                        }
                    }),
                        this._captchaIns = O)
            }
            I(e.element),
                this.getCaptchaType = function() {
                    for (var e in E)
                        if (E[e] === S.state.type)
                            return e.toLowerCase();
                    return ""
                }
                ,
                this.refresh = function() {
                    S.commit(l)
                }
                ,
                this.destroy = function() {
                    X(),
                    O && (O.$destroy(),
                        O = null);
                    var t = e.element;
                    if (t) {
                        var n = p.find(".yidun_input", t);
                        n && t.removeChild(n)
                    }
                }
        }
        var r = n(6)
            , o = n(4)
            , a = o.SWITCH_TYPE
            , s = o.INVOKE_HOOK
            , l = o.EVENT_RESET
            , u = o.EVENT_RESET_CLASSIC
            , f = n(43)
            , c = n(56)
            , j = n(31)
            , d = n(20)
            , h = n(35)
            , p = n(2)
            , y = n(13)
            , v = n(14)
            , g = n(30)
            , b = n(24)
            , m = n(5)
            , _ = m.UNPASS_ERROR
            , w = m.BUSINESS_ERROR
            , T = n(1)
            , S = n(3)
            , E = S.CAPTCHA_TYPE
            , R = n(32)
            , k = n(7);
        e.exports = window.NECaptcha || i
    }
    , function(e, t, n) {
        var i = function() {
            function e(e, t) {
                var n = []
                    , i = !0
                    , r = !1
                    , o = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value),
                    !t || n.length !== t); i = !0)
                        ;
                } catch (l) {
                    r = !0,
                        o = l
                } finally {
                    try {
                        !i && s["return"] && s["return"]()
                    } finally {
                        if (r)
                            throw o
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
            , r = n(12)
            , o = r.FETCH_INTELLISENSE_CAPTCHA
            , a = r.VERIFY_INTELLISENSE_CAPTCHA
            , s = r.RESET_STATE
            , l = n(4)
            , u = l.SWITCH_LOAD_STATUS
            , f = l.UPDATE_VERIFY_STATUS
            , c = l.INVOKE_HOOK
            , j = l.EVENT_RESET
            , d = n(3)
            , h = d.CAPTCHA_TYPE
            , p = d.SAMPLE_NUM
            , y = d.RTL_LANGS
            , v = n(1)
            , g = n(2)
            , b = n(17)
            , m = n(8)
            , _ = m.eypt
            , w = m.xor_encode
            , T = n(6)
            , S = n(13)
            , E = n(14)
            , R = n(11)
            , k = n(15);
        e.exports = {
            el: ".yidun_intellisense",
            template: n(58),
            components: {
                "captcha-core": S
            },
            data: function() {
                var e = this.$store.state
                    , t = e.langPkg
                    , n = e.config;
                return {
                    langPkg: t,
                    theme: n.theme,
                    status: "normal",
                    classicVisible: !1,
                    icon: n.customStyles.icon
                }
            },
            on: {
                ".yidun_intelli-control click": function(e) {
                    if (!(["checking", "loading", "loadfail", "success"].indexOf(this.status) > -1))
                        return "normal" === this.status ? void this.verifyIntelliCaptcha(e) : void (!this.classicVisible && this.$setData({
                            classicVisible: !0
                        }))
                },
                ".yidun_intelli-control mousemove": function(e) {
                    this.trackMoving(e)
                }
            },
            watch: {
                status: function(e) {
                    "loaddone" === e && this.firstLoad && (this.$setData({
                        classicVisible: !0
                    }),
                        this.firstLoad = !1),
                    "success" === e && this.$setData({
                        classicVisible: !1
                    })
                }
            },
            mounted: function() {
                var e = this;
                k(this.$store.state.config.customStyles.primaryColor, this.$el),
                    this.beginTime = 0,
                    this.traceData = [],
                    this._baseClassNames = this.$el.className.trim(),
                    this._removeEvents = this.initEvents(),
                    this.fetchCaptcha().then(function() {
                        e.$store.commit(c, {
                            name: "onReady"
                        }),
                            e.$store.commit(c, {
                                name: "onDidRefresh"
                            })
                    })["finally"](function() {
                        e.$el.style.display = ""
                    }),
                y.indexOf(this.$store.state.config.lang) !== -1 && (this.$el.style.direction = "rtl")
            },
            beforeDestroy: function() {
                this._removeEvents(),
                    this.clear()
            },
            render: function(e) {
                var t = e.status
                    , n = e.classicVisible;
                void 0 !== t && this.updateUI(t),
                void 0 !== n && this.toggleClassicVisible(n)
            },
            methods: {
                initEvents: function() {
                    var e = this
                        , t = g.find(".yidun_intelli-control", this.$el)
                        , n = function(t) {
                        e.$el.contains(t.target) || e.classicVisible && e.$setData({
                            classicVisible: !1
                        })
                    }
                        , i = function(t) {
                        e.beginTime || (e.beginTime = v.now())
                    };
                    !g.isMobile && g.on(document, "mousedown", n),
                        g.on(t, "mouseover", i);
                    var r = this.$store.subscribe(function(t, n) {
                        var i = t.type
                            , r = (t.payload,
                            n.load)
                            , o = n.verifyStatus;
                        switch (i) {
                            case u:
                                r && ("loading" === r.status && e.$setData({
                                    status: "loading"
                                }),
                                "done" === r.status && e.$setData({
                                    status: "loaddone"
                                }),
                                "fail" === r.status && e.$setData({
                                    status: "loadfail"
                                }));
                                break;
                            case f:
                                "success" === o && e.$setData({
                                    status: "success"
                                }),
                                "error" === o && e.$setData({
                                    status: "error"
                                });
                                break;
                            case j:
                                e.reset()
                        }
                    });
                    return function() {
                        !g.isMobile && g.off(document, "mousedown", n),
                            g.off(t, "mouseover", i),
                            r()
                    }
                },
                createClassicCaptcha: function() {
                    var e = this;
                    if (g.isMobile) {
                        var t = this.$store.state.config
                            , n = T._extend(E);
                        this._captchaIns = new n({
                            store: this.$store,
                            propsData: {
                                autoOpen: !1,
                                intellisense: !0,
                                enableColor: !1,
                                onClose: function(t) {
                                    e.$setData({
                                        classicVisible: !1
                                    }),
                                        e.$store.commit(c, {
                                            name: "onClose"
                                        })
                                }
                            }
                        }).$mount(function(e) {
                            t.appendTo ? t.appendTo.appendChild(e) : document.body.appendChild(e)
                        })
                    } else {
                        var i = T._extend(S);
                        this._captchaIns = new i({
                            el: g.find(".yidun_classic-wrapper", this.$el),
                            store: this.$store,
                            propsData: {
                                intellisense: !0,
                                enableColor: !1
                            }
                        })
                    }
                },
                fetchCaptcha: function() {
                    var e = this;
                    return new R(function(t, n) {
                            e.$store.dispatch(o, {
                                width: e.getWidth()
                            }, function(i, r) {
                                if (e._isMounted)
                                    return i ? (e.$setData({
                                        status: "loadfail"
                                    }),
                                        void n(i)) : void t(r)
                            })
                        }
                    )
                },
                clear: function() {
                    var e = this;
                    this._captchaIns && (this.$setData({
                        classicVisible: !1
                    }),
                        this.$nextTick(function() {
                            e._captchaIns.$destroy(),
                                e._captchaIns = null
                        })),
                        this.beginTime = 0,
                        this.traceData = []
                },
                reset: function() {
                    var e = this;
                    this.$store.dispatch(s),
                        this.fetchCaptcha().then(function() {
                            e.clear(),
                                e.resetClassNames(),
                                e.$setData({
                                    status: "normal"
                                })
                        })
                },
                getWidth: function() {
                    return this.$el.offsetWidth
                },
                resetClassNames: function() {
                    for (var e = this._baseClassNames.split(/\s+/), t = arguments.length, n = Array(t), i = 0; i < t; i++)
                        n[i] = arguments[i];
                    this.$el.className = b(e, n)
                },
                loadClassicCaptcha: function() {
                    this.createClassicCaptcha(),
                        this.firstLoad = !0,
                        this.$setData({
                            status: "loading"
                        }),
                        this._captchaIns.refresh()
                },
                verifyIntelliCaptcha: function(e) {
                    var t = this;
                    this.$setData({
                        status: "checking"
                    });
                    var n = function(n) {
                        R.all([new R(function(i, r) {
                                var o = t.$store.state.token
                                    , s = t.$el.getBoundingClientRect()
                                    , l = s.left
                                    , u = s.top
                                    , f = v.now()
                                    , c = w(o, [Math.round(e.clientX - l), Math.round(e.clientY - u), f - (t.beginTime || f)] + "")
                                    , j = t.traceData.map(function(e) {
                                    return w(o, e)
                                });
                                t.$store.dispatch(a, {
                                    token: o,
                                    acToken: n,
                                    type: h.INTELLISENSE,
                                    width: t.getWidth(),
                                    data: JSON.stringify({
                                        d: "",
                                        m: _(v.sample(j, p).join(":")),
                                        p: _(c),
                                        ext: _(w(o, "1," + j.length))
                                    })
                                }, function(e, n) {
                                    if (t._isMounted)
                                        return e ? void r(e) : void i(n)
                                })
                            }
                        ), new R(function(e, t) {
                                window.setTimeout(e, 300)
                            }
                        )]).then(function(e) {
                            var n = i(e, 1);
                            n[0];
                            t.$setData({
                                status: "success"
                            })
                        })["catch"](function() {
                            return t.loadClassicCaptcha()
                        })
                    };
                    this.$store.state.captchaAnticheat.getToken({
                        timeout: 500
                    }).then(n)["catch"](n)
                },
                trackMoving: function(e) {
                    if (this.beginTime) {
                        var t = this.$el.getBoundingClientRect()
                            , n = t.left
                            , i = t.top
                            , r = [Math.round(e.clientX - n), Math.round(e.clientY - i), v.now() - this.beginTime] + "";
                        this.traceData.push(r)
                    }
                },
                toggleClassicVisible: function(e) {
                    var t = this._captchaIns;
                    if (g.isMobile && t)
                        e && t.open(),
                        !e && t.close();
                    else {
                        var n = g.find(".yidun_classic-wrapper", this.$el);
                        n.style.display = e ? "block" : "none"
                    }
                },
                updateUI: function(e) {
                    var t = this
                        , n = g.find(".yidun_intelli-text", this.$el)
                        , i = g.find(".yidun_tips__text", this.$el)
                        , r = this.langPkg.intellisense
                        , o = "yidun_intellisense"
                        , a = this.$store.state
                        , s = a.countsOfVerifyError
                        , l = a.config
                        , u = function(e) {
                        e.stopPropagation(),
                            t.$store.commit(j)
                    };
                    switch (g.off(i, "click", u),
                        e) {
                        case "normal":
                            g.text(n, r.normal);
                            break;
                        case "checking":
                            this.resetClassNames(o + "--checking"),
                                g.text(n, r.checking);
                            break;
                        case "loading":
                            this.resetClassNames(o + "--loading"),
                                g.text(n, r.loading);
                            break;
                        case "loaddone":
                            this.resetClassNames(),
                                g.text(n, r.loaddone);
                            break;
                        case "loadfail":
                            this.resetClassNames(o + "--loadfail"),
                                g.text(i, r.loadfail);
                            break;
                        case "success":
                            this.resetClassNames(o + "--success"),
                                g.text(i, this.langPkg.verifySuccess);
                            break;
                        case "error":
                            var f = o + "--error";
                            s > l.maxVerification ? (f += " " + o + "--maxerror",
                                g.text(i, this.langPkg.verifyOutOfLimit),
                                g.on(i, "click", u)) : g.text(i, this.langPkg.verifyError),
                                this.resetClassNames(f)
                    }
                },
                closeModal: function() {
                    g.isMobile && this._captchaIns && this._captchaIns.closeModal()
                }
            }
        }
    }
    , function(e, t, n) {
        var i = n(21)
            , r = n(1)
            , o = n(16)
            , a = {};
        e.exports = function(e, t) {
            e = Object.assign([], e);
            var n = t.protocol
                , s = t.staticServer
                , l = t.theme
                , u = e[0].slice(0);
            if (!a[l]) {
                r.assert(e, "apply [" + l + " theme] failed");
                var f = o({
                    protocol: n,
                    host: s
                });
                u[1] = u[1].replace(/url\(['"]?\/?([^'"\s]+?)['"]?\)/g, 'url("' + f + '/$1")'),
                    e[0] = u,
                    i(e),
                    a[l] = !0,
                    delete e.__theme__
            }
        }
    }
    , function(e, t, n) {
        function i(e, t) {
            this._captchaConf = e,
                this._captchaCollector = t
        }
        var r = n(11)
            , o = n(5)
            , a = o.ANTICHEAT_TOKEN_ERROR
            , s = n(1);
        i.prototype.getAnticheat = function() {
            return this._captchaConf.__anticheat__ ? this._captchaConf.__anticheat__.instance : null
        }
            ,
            i.prototype.getToken = function(e) {
                var t = this
                    , n = e.timeout
                    , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3
                    , l = this._captchaConf
                    , u = new r(function(e) {
                        var r = function u() {
                            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                                , f = null
                                , c = function(n) {
                                if (clearTimeout(f),
                                r < i)
                                    setTimeout(function() {
                                        return u(r + 1)
                                    }, 200);
                                else {
                                    var c = new o(a,n.message + ";initWatchman: " + s.typeOf(window.initWatchman) + ";Watchman: " + s.typeOf(window.Watchman));
                                    t._captchaCollector.collectErr(c),
                                        e(l.acConfig.token || "")
                                }
                            };
                            try {
                                f = setTimeout(function() {
                                    c(new Error("get anticheat token timeout"))
                                }, n + 50),
                                    t.getAnticheat().getToken(l.acConfig.bid, function(t) {
                                        clearTimeout(f),
                                            e(t)
                                    }, n)
                            } catch (j) {
                                c(j)
                            }
                        };
                        1 === l.acConfig.enable ? r(0) : e("")
                    }
                );
                return u
            }
            ,
            e.exports = i
    }
    , function(e, t, n) {
        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
                e
        }
        var r, o = n(20), a = n(16), s = n(5), l = s.REQUEST_SCRIPT_ERROR, u = s.REQUEST_API_ERROR, f = s.REQUEST_IMG_ERROR, c = s.BUSINESS_ERROR, j = s.UNPASS_ERROR, d = s.ANTICHEAT_TOKEN_ERROR, h = n(19), p = n(9), y = n(1), v = y.uuid, g = (r = {},
            i(r, u, "api"),
            i(r, f, "image"),
            i(r, l, "script"),
            i(r, c, "business"),
            i(r, j, "unpass"),
            i(r, d, "anticheat"),
            r), b = null;
        e.exports = function(e, t, n) {
            var i = t.protocol
                , r = t.apiServer
                , s = t.__serverConfig__
                , l = void 0 === s ? {} : s
                , u = t.captchaId
                , f = t.timeout
                , c = new h
                , j = function(e) {
                var t = "/api/v2/collect";
                return Array.isArray(e) ? e.map(function(e) {
                    return a({
                        protocol: i,
                        host: e,
                        path: t
                    })
                }) : a({
                    protocol: i,
                    host: e,
                    path: t
                })
            }
                , d = j(r || l.apiServer || ["c.dun.163yun.com", "c.dun.163.com"])
                , y = o({
                timeout: f,
                disableRetry: !0
            })
                , m = e.data
                , _ = Object.assign({
                id: u,
                token: m.token || "",
                type: g[e.code] || "other",
                target: m.url || m.resource || "",
                message: e.toString()
            }, n);
            null == window.ip && (window.ip = function(e, t, n) {
                    b = {
                        ip: e,
                        dns: n
                    }
                }
            );
            var w = i + "://only-d-" + v(32) + "-" + (new Date).valueOf() + ".nstool.netease.com/ip.js";
            return p.script({
                url: w,
                timeout: f,
                checkResult: function(e) {
                    e && e.scriptEl && e.scriptEl.parentElement.removeChild(e.scriptEl);
                    var t = new h;
                    return b && b.dns ? (t.resolve(),
                        t) : (setTimeout(function() {
                        return t.resolve(new Error("try to collect dns again"))
                    }, 100),
                        t)
                }
            })["finally"](function() {
                Object.assign(_, b),
                    y(d, _, function(e, t) {
                        if (e || t.error) {
                            console && console.warn("Failed to collect error.");
                            var n = new Error(e ? e.message : t.msg);
                            return n.data = {
                                url: d
                            },
                                void c.resolve(n)
                        }
                        c.resolve()
                    })
            }),
                c
        }
    }
    , function(e, t) {
        e.exports = function() {
            return location.href.replace(/\?[\s\S]*/, "").substring(0, 128)
        }
    }
    , function(e, t, n) {
        function i(e) {
            return "number" === f.typeOf(e)
        }
        function r(e, t) {
            var n = /^((\d|[1-9]\d+)(\.\d+)?)(px|rem|%)?$/
                , r = e.width
                , o = r === g.width
                , a = "popup" === e.mode || "bind" === e.mode;
            f.assert(r === g.width || n.test(r) || i(r) && r >= 0, 'config: "width" should be a valid number or string like "**px", "**rem", "**%"(except popup/bind mode) or "auto". By default, it is "auto"'),
                f.assert(!(a && /%$/.test(r)), 'config: "width" can\'t be percentage like "**%", when mode is "popup".');
            var s = f.msie();
            f.assert(!(s < 9 && /rem$/.test(r)), 'config: "width", IE' + s + ' does not support "rem", please use a valid value');
            var l = r;
            return o && a ? l = u.isMobile ? "260px" : m + "px" : (i(r) || Number(r)) && (l = r + "px"),
                l
        }
        function o(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , n = {
                imagePanel: {},
                controlBar: {},
                gap: "",
                icon: {},
                primaryColor: ""
            };
            return Object.assign(n.imagePanel, e.imagePanel, t.imagePanel),
                Object.assign(n.controlBar, e.controlBar, t.controlBar),
                n.gap = t.gap || e.gap,
                n.primaryColor = t.primaryColor || e.primaryColor,
                Object.assign(n.icon, e.icon, t.icon),
                n
        }
        function a(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , n = function i(e, t) {
                for (var n = {}, r = Object.keys(e), o = 0, a = r.length; o < a; o++) {
                    var s = r[o];
                    void 0 === t[s] ? n[s] = e[s] : "string" === f.typeOf(e[s]) ? n[s] = t[s] + "" : n[s] = i(e[s], t[s])
                }
                return n
            };
            return n(e, t)
        }
        function s(e) {
            e = Object.assign({}, g, e);
            var t = e.__serverConfig__.smart
                , n = e.element
                , s = "popup" === e.mode;
            f.assert(e.captchaId, 'config: "captchaId" is required!'),
                f.assert(s || n, 'config: "element" is required when "mode" is not "popup"'),
            n.nodeType || "string" !== f.typeOf(n) || (n = u.find(n),
                f.assert(n, 'config: "element ' + e.element + '" not found'),
                e.element = n),
            !t && f.assert(~["float", "embed", "popup"].indexOf(e.mode), 'config: "current captcha is not intellisense , mode "' + e.mode + '" is invalid, "float", "embed" or "popup" is expected'),
                f.assert(/^https?$/.test(e.protocol), 'config: "protocol ' + e.protocol + '" is invalid. "http", "https" is expected. By default, it depends on user\'s website'),
                f.assert(c[e.lang], 'config: "lang ' + e.lang + '" is invalid, supported lang: ' + Object.keys(c).toString() + ". By default, it's " + g.lang),
                t && "bind" !== e.mode ? e.width = g.width : e.width = r(e, n);
            var l = e.appendTo;
            return !t && "popup" === e.mode || "bind" === e.mode || t && u.isMobile ? f.assert(!l || l.nodeType || "string" === f.typeOf(l), "config: appendTo should be a elment or string") : f.assert(!l, 'config: appendTo could only be valid when aptchaType is not intellisense and mode is "popup", or mode is bind, or captchaType is intellisense on the mobile side'),
            l && !l.nodeType && "string" === f.typeOf(l) && (l = u.find(l),
                f.assert(l, 'config: "element ' + e.appendTo + '" which "appendTo" defined not found'),
                e.appendTo = l),
            l && "static" === u.getComputedStyle(l, "position") && (l.style.position = "relative"),
                e.__serverConfig__.customStyles ? (f.assert(e.customStyles && v(e.customStyles), 'config: "customStyles" must be a plain Object'),
                    e.customStyles = o(g.customStyles, e.customStyles),
                    f.assert(e.customTexts && v(e.customTexts), 'config: "customTexts" must be a plain Object'),
                    e.customTexts = a(c[e.lang], e.customTexts)) : (e.customStyles = g.customStyles,
                    e.customTexts = c[e.lang]),
                f.assert("string" === f.typeOf(e.group) && e.group.length <= 32, 'config: "group" must be a string and it\'s length less than or equal 32'),
                f.assert("string" === f.typeOf(e.scene) && e.scene.length <= 32, 'config: "scene" must be a string and it\'s length less than or equal 32'),
                f.assert(i(e.maxVerification) && e.maxVerification >= 0, 'config: "maxVerification" must be a number and it\'s greater than or equal 0'),
                e.acConfig = e.acConfig || e.__serverConfig__.ac || {},
                e
        }
        var l = function() {
            function e(e, t) {
                var n = []
                    , i = !0
                    , r = !1
                    , o = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value),
                    !t || n.length !== t); i = !0)
                        ;
                } catch (l) {
                    r = !0,
                        o = l
                } finally {
                    try {
                        !i && s["return"] && s["return"]()
                    } finally {
                        if (r)
                            throw o
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
            , u = n(2)
            , f = n(1)
            , c = n(44)
            , j = n(3)
            , d = j.WIDTH_LIMIT
            , h = j.RUN_ENV
            , p = j.MAX_VERIFICATION
            , y = n(10)
            , v = y.isPlainObject
            , g = {
            captchaId: "",
            element: null,
            appendTo: null,
            mode: u.isMobile ? "popup" : "float",
            protocol: window.location.protocol.replace(":", ""),
            lang: "zh-CN",
            width: "auto",
            ipv6: !1,
            enableClose: !1,
            customStyles: {
                imagePanel: {
                    align: "top",
                    borderRadius: "2px"
                },
                controlBar: {
                    height: "40px",
                    borderRadius: "2px"
                },
                gap: "15px",
                icon: {
                    intellisenseLogo: "",
                    slider: ""
                },
                primaryColor: ""
            },
            customTexts: {},
            feedbackEnable: !0,
            runEnv: h.WEB,
            group: "",
            scene: "",
            maxVerification: p
        }
            , b = l(d, 1)
            , m = b[0];
        e.exports = s
    }
    , function(e, t) {
        e.exports = function(e) {
            var t = {
                "\\": "-",
                "/": "_",
                "+": "."
            };
            return e.replace(/[\\/+]/g, function(e) {
                return t[e]
            })
        }
    }
    , function(e, t, n) {
        function i() {
            c = d.length = 0,
                j = {},
                u = f = !1
        }
        function r() {
            f = !0;
            var e = void 0
                , t = void 0;
            for (d.sort(function(e, t) {
                return e.id - t.id
            }),
                     c = 0; c < d.length; c++)
                e = d[c],
                    t = e.instance,
                    j[e.id] = null,
                t._isMounted && t.render(e.data);
            var n = d.slice();
            i(),
                o(n)
        }
        function o(e) {
            for (var t = e.length; t--; ) {
                var n = e[t]
                    , i = n.instance;
                i._updater === n && i._isMounted && (n.data = {})
            }
        }
        function a(e) {
            var t = e.id;
            if (null == j[t]) {
                if (j[t] = !0,
                    f) {
                    for (var n = d.length - 1; n > c && d[n].id > e.id; )
                        n--;
                    d.splice(n + 1, 0, e)
                } else
                    d.push(e);
                u || (u = !0,
                    l(r))
            }
        }
        var s = n(10)
            , l = s.nextTick
            , u = !1
            , f = !1
            , c = 0
            , j = {}
            , d = [];
        e.exports = a
    }
    , function(e, t, n) {
        var i = n(10)
            , r = i.lifeCycleHooks;
        e.exports = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                , n = {}
                , i = t.el || e.el
                , o = t.template || e.template
                , a = e["abstract"]
                , s = t.components || e.components
                , l = t.on || e.on
                , u = t.render || e.render
                , f = e.props
                , c = t.propsData
                , j = t.data || e.data
                , d = e.methods || t.methods
                , h = e.watch || t.watch;
            i && (n.el = i),
            o && (n.template = o),
            a && (n["abstract"] = !!a),
            s && (n.components = s),
            l && (n.on = Object.assign({}, e.on, t.on)),
            u && (n.render = u),
            f && (n.props = f),
            c && (n.propsData = c),
            j && (n.data = j),
            d && (n.methods = Object.assign({}, e.methods, t.methods)),
            h && (n.watch = Object.assign({}, e.watch, t.watch));
            var p = function(e, t) {
                var n = [];
                return e && (n = n.concat(e)),
                t && (n = n.concat(t)),
                    n
            };
            return r.map(function(i) {
                n[i] = p(e[i], t[i])
            }),
                n = Object.assign({}, t, n)
        }
    }
    , function(e, t, n) {
        function i() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                , t = arguments[1];
            return this instanceof i ? (this._originalTemplate = e,
                void (this._composedStr = t ? r.template(e, t) : e)) : new i(e,t)
        }
        var r = n(1)
            , o = n(10)
            , a = o.getDocFragmentRegex;
        i.prototype.compose = function(e, t, n) {
            var i = a(e)
                , o = r.template(t, n);
            return this._composedStr = this._composedStr.replace(i, o),
                this
        }
            ,
            i.prototype.toString = function() {
                return this._composedStr
            }
            ,
            i.prototype.reset = function(e) {
                return this._composedStr = r.template(this._originalTemplate, e),
                    this
            }
            ,
            e.exports = i
    }
    , function(e, t, n) {
        var i = function() {
            function e(e, t) {
                var n = []
                    , i = !0
                    , r = !1
                    , o = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value),
                    !t || n.length !== t); i = !0)
                        ;
                } catch (l) {
                    r = !0,
                        o = l
                } finally {
                    try {
                        !i && s["return"] && s["return"]()
                    } finally {
                        if (r)
                            throw o
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t))
                    return t;
                if (Symbol.iterator in Object(t))
                    return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }()
            , r = n(2)
            , o = n(18)
            , a = o({
            initialize: function(e) {
                var t = this.nativeEvent = e.nativeEvent;
                this.target = t.target,
                    this.currentTarget = e.currentTarget,
                    this.pageX = t.pageX,
                    this.pageY = t.pageY,
                    this.clientX = t.clientX,
                    this.clientY = t.clientY,
                    this.defaultPrevented = !1,
                    this.cancelBubble = !1,
                    this.cancelImmediateBubble = !1,
                    this.type = t.type
            },
            preventDefault: function() {
                this.defaultPrevented = !0
            },
            stopPropagation: function() {
                this.cancelBubble = !0
            },
            stopImmediatePropagation: function() {
                this.cancelImmediateBubble = !0
            }
        })
            , s = o({
            initialize: function(e) {
                this.$el = e.$el,
                    this.initEvents(e.events)
            },
            initEvents: function(e) {
                var t = this;
                this._captureEvents = {},
                    this._bubbleEvents = {},
                    this._delegationHandlers = {};
                var n = this.normalizeEvents(e);
                Object.keys(n).map(function(e) {
                    var i = n[e];
                    i.map(function(n) {
                        t.delegate(e, n.selector, n.handler)
                    });
                    var o = t._delegationHandlers[e] = function(n) {
                            var i = n.target
                                , r = i
                                , o = !1
                                , s = function() {
                                var i = null
                                    , s = t._bubbleEvents[e];
                                Object.keys(s).map(function(e) {
                                    var t = e.match(/^([.#])([^.#\s]+)$/) || []
                                        , l = t[1]
                                        , u = t[2];
                                    if ("." === l && ~r.className.indexOf(u) || "#" === l && r.id === u) {
                                        i = r;
                                        for (var f = s[e], c = 0; c < f.length; c++) {
                                            var j = f[c]
                                                , d = new a({
                                                nativeEvent: n,
                                                currentTarget: i
                                            });
                                            if (j.call(i, d),
                                            d.defaultPrevented && n.preventDefault(),
                                                d.cancelImmediateBubble) {
                                                o = !0;
                                                break
                                            }
                                        }
                                        d.cancelBubble && (o = !0)
                                    }
                                }),
                                    r = r.parentElement,
                                r === t.$el && (o = !0)
                            };
                            do
                                s();
                            while (t.$el && !o && r)
                        }
                    ;
                    r.on(t.$el, e, o)
                })
            },
            off: function() {
                var e = this._delegationHandlers;
                for (var t in e)
                    r.off(this.$el, t, e[t]);
                this._captureEvents = {},
                    this._bubbleEvents = {},
                    this._delegationHandlers = {},
                    this.$el = null
            },
            delegate: function(e, t, n) {
                this._bubbleEvents[e] || (this._bubbleEvents[e] = {});
                var i = this._bubbleEvents[e];
                i[t] || (i[t] = []);
                var r = i[t];
                return r.push(n),
                    function() {
                        var e = r.indexOf(n);
                        e > -1 && r.splice(e, 1)
                    }
            },
            normalizeEvents: function(e) {
                var t = {};
                for (var n in e)
                    if (e.hasOwnProperty(n)) {
                        var r = n.split(/\s+/)
                            , o = i(r, 2)
                            , a = o[0]
                            , s = o[1];
                        t[s] || (t[s] = []);
                        var l = t[s];
                        l.push({
                            selector: a,
                            handler: e[n]
                        })
                    }
                return t
            }
        });
        e.exports = s
    }
    , function(e, t) {
        function n() {}
        function i(e, t, i, a) {
            function s() {
                f.parentNode && f.parentNode.removeChild(f),
                    window[h] = n,
                c && clearTimeout(c)
            }
            function l() {
                window[h] && s()
            }
            function u(e) {
                var t = [];
                for (var n in e)
                    e.hasOwnProperty(n) && t.push(v(n) + "=" + v(e[n]));
                return t.join("&")
            }
            "object" === ("undefined" == typeof i ? "undefined" : r(i)) && (a = i,
                i = null),
            "function" == typeof t && (i = t,
                t = null),
            a || (a = {});
            var f, c, j = Math.random().toString(36).slice(2, 9), d = a.prefix || "__JSONP", h = a.name || d + ("_" + j) + ("_" + o++), p = a.param || "callback", y = a.timeout || 6e3, v = window.encodeURIComponent, g = document.getElementsByTagName("script")[0] || document.head;
            return y && (c = setTimeout(function() {
                s(),
                i && i(new Error("Timeout"))
            }, y)),
                window[h] = function(t) {
                    s(),
                    i && i(null, t, {
                        url: e
                    })
                }
                ,
            t && (e = e.split("?")[0]),
                e += (~e.indexOf("?") ? "&" : "?") + u(t) + "&" + p + "=" + v(h),
                e = e.replace("?&", "?"),
                f = document.createElement("script"),
                f.type = "text/javascript",
                f.src = e,
                g.parentNode.insertBefore(f, g),
                l
        }
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , o = 0;
        e.exports = i
    }
    , function(e, t) {
        function n(e) {
            if (!e)
                return {};
            var t = document.createElement("a");
            return t.href = e,
                {
                    source: e,
                    protocol: t.protocol.replace(":", ""),
                    host: t.hostname,
                    port: t.port,
                    query: t.search,
                    hash: t.hash.replace("#", ""),
                    path: t.pathname.replace(/^([^/])/, "/$1"),
                    segments: t.pathname.replace(/^\//, "").split("/")
                }
        }
        e.exports = n
    }
    , function(e, t, n) {
        var i = n(18)
            , r = n(1)
            , o = n(11)
            , a = i({
            initialize: function(e) {
                this.state = e.state,
                    this._committing = !1,
                    this._subscribers = [];
                var t = this
                    , n = this.dispatch
                    , i = this.commit;
                this.dispatch = function(e, i, r) {
                    return n.call(t, e, i, r)
                }
                    ,
                    this.commit = function(e, n) {
                        return i.call(t, e, n)
                    }
                    ,
                    this.registerMutations(e.mutations),
                    this.registerActions(e.actions)
            },
            registerMutations: function(e) {
                this._mutations = Object.assign(this._mutations || {}, e)
            },
            registerActions: function(e) {
                this._actions = Object.assign(this._actions || {}, e)
            },
            commit: function(e, t) {
                var n = this
                    , i = {
                    type: e,
                    payload: t
                }
                    , o = this._mutations[e];
                return o ? (this._withCommit(function() {
                    o(n.state, t)
                }),
                    void this._subscribers.map(function(e) {
                        return e(i, n.state)
                    })) : void r.error("[Store] unknown mutation type: " + e)
            },
            _withCommit: function(e) {
                var t = this._committing;
                this._committing = !0,
                    e(),
                    this._committing = t
            },
            dispatch: function(e, t, n) {
                var i = this._actions[e];
                if (!i)
                    return void r.error("[Store] unknown action type: " + e);
                var a = {
                    state: this.state,
                    commit: this.commit,
                    dispatch: this.dispatch
                };
                return o.resolve(i(a, t, n))
            },
            subscribe: function(e) {
                var t = this._subscribers;
                return t.indexOf(e) < 0 && t.push(e),
                    function() {
                        var n = t.indexOf(e);
                        n > -1 && t.splice(n, 1)
                    }
            },
            replaceState: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.state = e
            }
        });
        e.exports = a
    }
    , function(e, t) {
        e.exports = {
            "zh-CN": {
                loading: "加载中...",
                loadfail: "加载失败",
                verifySuccess: "验证成功",
                verifyError: "验证失败，请重试",
                verifyOutOfLimit: "失败过多，点此重试",
                clickButton: "点此进行验证",
                clickInTurn: "请依次点击",
                clickWordInTurn: "请按语序依次点击文字",
                slideTip: "向右拖动滑块填充拼图",
                smsTip: "请按照上方图片提示完成验证",
                inferenceTip: "拖动交换2个图块复原图片",
                waitForSMS: "等待短信验证，剩余",
                popupTitle: "请完成安全验证",
                intellisense: {
                    normal: "点击完成验证",
                    checking: "安全检测中",
                    loading: "正在加载验证",
                    loadfail: "加载失败",
                    loaddone: "请完成安全验证"
                }
            },
            en: {
                loading: "loading...",
                loadfail: "Load failed",
                verifySuccess: "verify success",
                verifyError: "verify failed",
                verifyOutOfLimit: "Verify failed. Please retry",
                clickButton: "Click here to verify",
                clickInTurn: "click in turn ",
                clickWordInTurn: "Please click on the text in order",
                slideTip: "drag to complete puzzle",
                smsTip: "follow the prompts complete verification",
                inferenceTip: "swap 2 tiles to restore the image",
                waitForSMS: "waiting for SMS，remaining ",
                popupTitle: "Please complete verification",
                intellisense: {
                    normal: "Click the button to verify",
                    checking: "verifying...",
                    loading: "loading...",
                    loadfail: "Load failed",
                    loaddone: "Please complete verification"
                }
            },
            "zh-TW": {
                loading: "加載中...",
                loadfail: "加載失敗",
                verifySuccess: "驗證成功",
                verifyError: "驗證失敗，請重試",
                verifyOutOfLimit: "失敗過多，點此重試",
                clickButton: "點此進行驗證",
                clickInTurn: "請依次點擊",
                clickWordInTurn: "請按語序依次點擊文字",
                slideTip: "向右拖動滑塊填充拼圖",
                smsTip: "請按照上方圖片提示完成驗證",
                inferenceTip: "拖動交換2個圖塊恢復圖片",
                waitForSMS: "等待短信驗證，剩餘",
                popupTitle: "請完成安全驗證",
                intellisense: {
                    normal: "點擊完成驗證",
                    checking: "安全檢測中",
                    loading: "正在加載驗證",
                    loadfail: "加載失敗",
                    loaddone: "請完成安全驗證"
                }
            },
            ja: {
                loading: "ローディング中...",
                loadfail: "失敗を収める",
                verifySuccess: "検証の成功",
                verifyError: "失敗しました",
                verifyOutOfLimit: "失敗、再試行をクリック",
                clickButton: "確認するにはここをクリック",
                clickInTurn: "順にクリックしてください",
                clickWordInTurn: "順番にテキストをクリックしてください",
                slideTip: "右にドラッグ",
                smsTip: "上の写真に従って検証を完了してください。",
                inferenceTip: "2つのタイル復元図を交換する",
                waitForSMS: "メールの検証を待って、残ります。",
                popupTitle: "安全検証を完了してください。",
                intellisense: {
                    normal: "クリックして検証を完了する",
                    checking: "安全診断中",
                    loading: "検証をロードしている",
                    loadfail: "失敗を収める",
                    loaddone: "安全検証を完了してください。"
                }
            },
            ko: {
                loading: "적재 중...",
                loadfail: "실패를 거듭하다.",
                verifySuccess: "검증에 성공하다",
                verifyError: "검증 실패, 다시 시험 해 보세요.",
                verifyOutOfLimit: "실패, 다시 시도를 클릭하십시오.",
                clickButton: "확인하려면 여기를 클릭하십시오",
                clickInTurn: "순서 대로 클릭 하세요.",
                clickWordInTurn: "순서대로 텍스트를 클릭하십시오",
                slideTip: "오른쪽으로 드래그",
                smsTip: "위쪽 사진에 따라 검증이 완성 되세요.",
                inferenceTip: "두 타일 복원 다이어그램 교환",
                waitForSMS: "문자 검증을 기다리 며 남다.",
                popupTitle: "안전 검증 완료.",
                intellisense: {
                    normal: "클릭 하여 검증하다",
                    checking: "안전 검사 중",
                    loading: "추가 검증을하고 있다.",
                    loadfail: "실패를 거듭하다.",
                    loaddone: "안전 검증 완료."
                }
            },
            th: {
                loading: "กำลังโหลด ...",
                loadfail: "ไม่สามารถโหลด",
                verifySuccess: "การยืนยันที่ประสบความสำเร็จ",
                verifyError: "การยืนยันล้มเหลวโปรดลองอีกครั้ง",
                verifyOutOfLimit: "ความล้มเหลวมากเกินไปลองอีกครั้ง",
                clickButton: "คลิกที่นี่เพื่อยืนยัน",
                clickInTurn: "โปรดคลิก",
                clickWordInTurn: "โปรดคลิกที่ข้อความตามลำดับ",
                slideTip: "ลากตัวเลื่อนไปทางขวาเพื่อเติมปริศนา",
                smsTip: "โปรดทำตามภาพด้านบนเพื่อยืนยัน",
                inferenceTip: "แลกเปลี่ยนไพ่สองใบเพื่อคืนค่ารูปภาพ",
                waitForSMS: "รอการยืนยันทาง SMS เหลืออยู่",
                popupTitle: "โปรดกรอกข้อมูลการยืนยันความปลอดภัย",
                intellisense: {
                    normal: "คลิก Finish เพื่อยืนยัน",
                    checking: "การทดสอบความปลอดภัย",
                    loading: "กำลังโหลดการยืนยัน",
                    loadfail: "ไม่สามารถโหลด",
                    loaddone: "โปรดกรอกข้อมูลการยืนยันความปลอดภัย"
                }
            },
            vi: {
                loading: "Tải trong...",
                loadfail: "Tải thất bại",
                verifySuccess: "Xác minh thành công",
                verifyError: "Kiểm tra thất bại, hãy thử lại",
                verifyOutOfLimit: "Quá nhiều thất bại, thử lại lần nữa",
                clickButton: "Nhấp vào đây để xác minh",
                clickInTurn: "Xin vui lòng nhấp vào",
                clickWordInTurn: "Bấm vào văn bản theo thứ tự",
                slideTip: "Kéo sang phải để điền vào câu đố",
                smsTip: "Hãy làm theo hình ở trên để hoàn thành xác minh",
                inferenceTip: "Trao đổi hai gạch để khôi phục lại hình ảnh",
                waitForSMS: "Chờ đợi tin nhắn SMS còn lại",
                popupTitle: "Hãy hoàn thành kiểm tra an toàn",
                intellisense: {
                    normal: "Nhấp vào để hoàn thành xác nhận",
                    checking: "Kiểm tra an ninh",
                    loading: "Đang tải kiểm tra",
                    loadfail: "Tải thất bại",
                    loaddone: "Hãy hoàn thành kiểm tra an toàn"
                }
            },
            fr: {
                loading: "téléchargement en cours...",
                loadfail: "téléchargement échoué",
                verifySuccess: "vérification confirmée",
                verifyError: "vérification échouée, veuillez réessayer",
                verifyOutOfLimit: "échecs excessifs, cliquer pour réessayer",
                clickButton: "cliquer pour accomplir la vérification",
                clickInTurn: "veuillez cliquer par ordre",
                clickWordInTurn: "Cliquez sur le texte dans l'ordre",
                slideTip: "glisser le puzzle",
                smsTip: "veuillez accomplir la vérification en suivant l'image",
                inferenceTip: "Carte de réduction des tuiles Exchange",
                waitForSMS: "En attedant de la vérification de message, il reste encore",
                popupTitle: "veuillez accomplir la vérification",
                intellisense: {
                    normal: "cliquer pour accomplir la vérification",
                    checking: "en vérification",
                    loading: "téléchargement en cours",
                    loadfail: "téléchargement échoué",
                    loaddone: "veuillez accomplir la vérification"
                }
            },
            ru: {
                loading: "загрузка...",
                loadfail: "ошибка загрузки",
                verifySuccess: "проверка прошла успешно",
                verifyError: "ошибка проверки, повторите побытку",
                verifyOutOfLimit: "Много ошибок, повторите попытку",
                clickButton: "щелкать, чтобы завершить проверку",
                clickInTurn: "щелкать по очереди",
                clickWordInTurn: "Нажмите на текст в порядке",
                slideTip: "перетащить на головоломку",
                smsTip: "завершить проверку, следуя выше изображнению",
                inferenceTip: "Обменная карта сокращения тайлов",
                waitForSMS: "Ожидание подтверждения СМС, осталось",
                popupTitle: "завершите проверку безопасности",
                intellisense: {
                    normal: "щелкать, чтобы завершить проверку",
                    checking: "Мониторинг безопасности",
                    loading: "загрузка проверки",
                    loadfail: "ошибка загрузки",
                    loaddone: "завершиите проверку безопасрость"
                }
            },
            ar: {
                loading: "جاري التحميل...",
                loadfail: "فشل التحميل",
                verifySuccess: "نجح التحقق",
                verifyError: "فشل التحقق، الرجاء المحاولة لمرة أخرى",
                verifyOutOfLimit: "الكثير من الفشل، انقر هنا للمحاولة لمرة أخرى",
                clickButton: "انقر لإكمال التحقق",
                clickInTurn: "الرجاء الضغط بالترتيب الصحيح",
                clickWordInTurn: "الرجاء الضغط على النص بالترتيب",
                slideTip: "حرك شريط التمرير إلى اليمين لملء اللغز",
                smsTip: "يرجي إكمال التحقق حسب الصورة أعلاه",
                inferenceTip: "تبادل اثنين من البلاط لاستعادة الصورة",
                waitForSMS: "في انتظار التحقق من الرسائل القصيرة ، تبقى",
                popupTitle: "يرجى إكمال التحقق الأمني",
                intellisense: {
                    normal: "انقر لإكمال التحقق",
                    checking: "جاري التفتيش الأمني",
                    loading: "جاري تحميل التحقق",
                    loadfail: "فشل التحميل",
                    loaddone: "يرجي إكمال التحقق الأمني"
                }
            },
            de: {
                loading: "Wird geladen...",
                loadfail: "Laden fehlgeschlagen",
                verifySuccess: "Erfolg verifizieren",
                verifyError: "gescheitert. Bitte erneut versuchen",
                verifyOutOfLimit: "gescheitert. Bitte erneut versuchen",
                clickButton: "Klicken Sie auf Verifizierung",
                clickInTurn: "Klicken Sie nacheinander",
                clickWordInTurn: "Klicken Sie der Reihe nach auf den Text",
                slideTip: "ziehen sie um puzzle",
                inferenceTip: "Kachelwiederherstellungskarte austauschen",
                waitForSMS: "Warten auf SMS, bleiben",
                popupTitle: "Bitte vervollständigen Sie die Bestätigung",
                intellisense: {
                    normal: "Klicken Sie auf Verifizierung",
                    checking: "Überprüfen",
                    loading: "Wird geladen",
                    loadfail: "Laden fehlgeschlagen",
                    loaddone: "Bitte vervollständigen Sie die Bestätigung"
                }
            },
            it: {
                loading: "Caricamento in corso...",
                loadfail: "Carico fallito",
                verifySuccess: "verificare il successo",
                verifyError: "verifica fallita. Per favore riprova",
                verifyOutOfLimit: "Troppi guasti, riprova",
                clickButton: "Fai clic sul pulsante per verificare",
                clickInTurn: "clicca a turno",
                clickWordInTurn: "Fare clic sul testo in ordine",
                slideTip: "trascina per completare il puzzle",
                inferenceTip: "Scambia la mappa di recupero delle tessere",
                waitForSMS: "in attesa di SMS, rimanenti",
                popupTitle: "Si prega di completare la verifica",
                intellisense: {
                    normal: "Fai clic sul pulsante per verificare",
                    checking: "Nella verifica",
                    loading: "Caricamento in corso",
                    loadfail: "Carico fallito",
                    loaddone: "Si prega di completare la verifica"
                }
            },
            he: {
                loading: "טעינה...",
                loadfail: "טעינה נכשלה",
                verifySuccess: "לאמת הצלחה",
                verifyError: "טעינה נכשלה, נסה שוב",
                verifyOutOfLimit: "יותר מדי כשלים, נסה שוב",
                clickButton: "לחץ על הלחצן כדי לאמת",
                clickInTurn: "לחץ בתורו",
                clickWordInTurn: "אנא לחץ על הטקסט לפי הסדר",
                slideTip: "גרור כדי להשלים את הפאזל",
                inferenceTip: "החלף שני אריחים כדי לשחזר את התמונה",
                waitForSMS: "מחכה SMS, הנותרים",
                popupTitle: "מלא את אימות האבטחה",
                intellisense: {
                    normal: "לחץ על הלחצן כדי לאמת",
                    checking: "בדיקת בטיחות",
                    loading: "טעינה",
                    loadfail: "טעינה נכשלה",
                    loaddone: "מלא את אימות האבטחה"
                }
            },
            hi: {
                loading: "लोड हो रहा है...",
                loadfail: "लोड विफल हो गया",
                verifySuccess: "सफल सत्यापन",
                verifyError: "सत्यापित विफल। कृपया पुनः प्रयास करें",
                verifyOutOfLimit: "सत्यापित विफल। कृपया पुनः प्रयास करें",
                clickButton: "सत्यापित करने के लिए बटन पर क्लिक करें",
                clickInTurn: "क्लिक पर क्लिक करें",
                clickWordInTurn: "कृपया क्रम में पाठ पर क्लिक करें",
                slideTip: "पहेली को पूरा करने के लिए स्लाइडर खींचें",
                inferenceTip: "विनिमय दो टाइल वसूली नक्शे",
                waitForSMS: "एसएमएस की प्रतीक्षा कर रहा है, शेष",
                popupTitle: "कृपया सत्यापन पूरा करें",
                intellisense: {
                    normal: "सत्यापित करने के लिए बटन पर क्लिक करें",
                    checking: "पुष्टि करने",
                    loading: "लोड हो रहा है",
                    loadfail: "लोड विफल हो गया",
                    loaddone: "कृपया सत्यापन पूरा करें"
                }
            },
            id: {
                loading: "pemuatan...",
                loadfail: "Pemuatan gagal",
                verifySuccess: "Verifikasi yang berhasil",
                verifyError: "Verifikasi gagal, coba lagi",
                verifyOutOfLimit: "Terlalu banyak kegagalan, coba lagi",
                clickButton: "Klik untuk menyelesaikan verifikasi",
                clickInTurn: "klik pada gilirannya",
                clickWordInTurn: "Silakan klik teksnya secara berurutan",
                slideTip: "Seret penggeser ke teka-teki",
                inferenceTip: "Tukar dua peta pemulihan ubin",
                waitForSMS: "Menunggu verifikasi SMS, tersisa",
                popupTitle: "Silakan lengkapi verifikasi keamanan",
                intellisense: {
                    normal: "Klik untuk menyelesaikan verifikasi",
                    checking: "Inspeksi keamanan",
                    loading: "pemuatan",
                    loadfail: "Pemuatan gagal",
                    loaddone: "Klik untuk menyelesaikan verifikasi"
                }
            },
            my: {
                loading: "တင်...",
                loadfail: "ဝန်ရန်မအောင်မြင်ခဲ့ပါ",
                verifySuccess: "စိစစ်အတည်ပြု အောင်မြင်မှု",
                verifyError: "မအောင်မြင်အတည်ပြုရန်။ ထပ်ကြိုးစားပါ",
                verifyOutOfLimit: "မအောင်မြင်အတည်ပြုရန်။ ထပ်ကြိုးစားပါ",
                clickButton: "အတည်ပြုရန်ခလုတ်ကိုကလစ်နှိပ်ပါ",
                clickInTurn: "အလှည့်အတွက်ကိုကလစ်နှိပ်ပါ",
                clickWordInTurn: "ကျေးဇူးပြု၍ စာသားပေါ်တွင်ကလစ်နှိပ်ပါ",
                slideTip: "ပဟေဠိဖြည့်စွက်ဖို့ဆွဲ",
                inferenceTip: "လဲလှယ်ရေးနှစ်ခုအုပ်ကြွပ်ပြန်လည်နာလန်ထူပုံရိပ်",
                waitForSMS: "ယင်း SMS အတွက်စောင့်ဆိုင်းနေ,  ရှိနေဆဲ ",
                popupTitle: "စိစစ်အတည်ပြုဖြည့်စွက်ပေးပါ",
                intellisense: {
                    normal: "အတည်ပြုရန်ခလုတ်ကိုကလစ်နှိပ်ပါ",
                    checking: "အတည်ပြု",
                    loading: "တင်",
                    loadfail: "ဝန်ရန်မအောင်မြင်ခဲ့ပါ",
                    loaddone: "စိစစ်အတည်ပြုဖြည့်စွက်ပေးပါ"
                }
            },
            lo: {
                loading: "ກໍາລັງໂຫລດ",
                loadfail: "ກໍາລັງໂຫລດ ບໍ່ຮູ້",
                verifySuccess: "ການຢັ້ງຢືນສົບຜົນສໍາເລັດ",
                verifyError: "ການຢືນຢັນໄດ້ລົ້ມເຫລວ, ກະລຸນາລອງອີກຄັ້ງ",
                verifyOutOfLimit: "ການຢືນຢັນໄດ້ລົ້ມເຫລວ, ກະລຸນາລອງອີກຄັ້ງ",
                clickButton: "ກົດເພື່ອໃຫ້ສໍາເລັດການຢັ້ງຢືນ",
                clickInTurn: "ກະລຸນາກົດ",
                clickWordInTurn: "ກະລຸນາກົດໃສ່ຂໍ້ຄວາມຕາມ ລຳ ດັບ",
                slideTip: "ລາກລາກລົງໄປທາງຂວາເພື່ອຕື່ມຂໍ້ມູນໃສ່ປິດ",
                inferenceTip: "ແລກປ່ຽນສອງໂລ້ເພື່ອເຮັດໃຫ້ຮູບພາບຄືນ",
                waitForSMS: "ລໍຖ້າການຢືນຢັນ SMS, ຍັງເຫຼືອ",
                popupTitle: "ກະລຸນາສໍາເລັດການກວດສອບຄວາມປອດໄພ",
                intellisense: {
                    normal: "ກົດເພື່ອໃຫ້ສໍາເລັດການຢັ້ງຢືນ",
                    checking: "ການກວດສອບຄວາມປອດໄພ",
                    loading: "ກໍາລັງໂຫລດ",
                    loadfail: "ກໍາລັງໂຫລດ ບໍ່ຮູ້",
                    loaddone: "ກະລຸນາສໍາເລັດການກວດສອບຄວາມປອດໄພ"
                }
            },
            ms: {
                loading: "Memuatkan",
                loadfail: "Beban gagal",
                verifySuccess: "Pengesahan yang berjaya",
                verifyError: "Pengesahan gagal, sila cuba lagi",
                verifyOutOfLimit: "Gagal beberapa kali, klik Cuba lagi",
                clickButton: "Klik untuk menyelesaikan pengesahan",
                clickInTurn: "Sila klik",
                clickWordInTurn: "Sila klik teks mengikut urutan",
                slideTip: "Seret untuk menyelesaikan teka-teki",
                inferenceTip: "Tukar dua jubin untuk memulihkan imej",
                waitForSMS: "Menunggu pengesahan SMS, selebihnya",
                popupTitle: "Sila lengkapkan pengesahan",
                intellisense: {
                    normal: "Klik untuk menyelesaikan pengesahan",
                    checking: "Pemeriksaan keselamatan",
                    loading: "Memuatkan",
                    loadfail: "Beban gagal",
                    loaddone: "Sila lengkapkan pengesahan"
                }
            },
            pl: {
                loading: "Ładowanie...",
                loadfail: "Ładowanie nie powiodło się",
                verifySuccess: "Pomyślna weryfikacja",
                verifyError: "Błąd, spróbuj ponownie",
                verifyOutOfLimit: "Zbyt wiele błędów, spróbuj ponownie",
                clickButton: "Kliknij, aby dokończyć weryfikację",
                clickInTurn: "kliknij po kolei",
                clickWordInTurn: "Proszę kliknąć tekst w kolejności",
                slideTip: "przeciągnij, aby ukończyć układankę",
                inferenceTip: "Wymień dwie mapy redukcji płytek",
                waitForSMS: "czekam na SMS-y, pozostałe",
                popupTitle: "Zakończ weryfikację zabezpieczeń",
                intellisense: {
                    normal: "Kliknij, aby dokończyć weryfikację",
                    checking: "Inspekcja bezpieczeństwa",
                    loading: "Ładowanie",
                    loadfail: "Ładowanie nie powiodło się",
                    loaddone: "Zakończ weryfikację zabezpieczeń"
                }
            },
            pt: {
                loading: "Carregando...",
                loadfail: "Carga falhou",
                verifySuccess: "Verificação bem sucedida",
                verifyError: "Falhou, por favor tente novamente",
                verifyOutOfLimit: "Muitas falhas, clique em Repetir",
                clickButton: "Clique para concluir a confirmação",
                clickInTurn: "Clique por sua vez",
                clickWordInTurn: "Por favor, clique no texto em ordem",
                slideTip: "Arraste para completar o quebra-cabeça",
                inferenceTip: "Troque dois mapas de redução de blocos",
                waitForSMS: "Aguardando SMS, permanecendo",
                popupTitle: "Por favor complete a verificação",
                intellisense: {
                    normal: "Clique para concluir a confirmação",
                    checking: "Na detecção de segurança",
                    loading: "Carregando",
                    loadfail: "Carga falhou",
                    loaddone: "Por favor complete a verificação"
                }
            },
            es: {
                loading: "Cargando...",
                loadfail: "Falló la carga",
                verifySuccess: "Verificación exitosa",
                verifyError: "Falló, por favor intente de nuevo",
                verifyOutOfLimit: "Demasiados fallos, haga clic en Reintentar",
                clickButton: "Haga clic para completar la verificación",
                clickInTurn: "Por favor haga clic",
                clickWordInTurn: "Por favor haga clic en el texto en orden",
                slideTip: "Arrastra para completar el puzzle",
                inferenceTip: "Intercambia mapas de reducción de fichas",
                waitForSMS: "esperando SMS, restantes",
                popupTitle: "Por favor complete la verificación",
                intellisense: {
                    normal: "Haga clic para completar la verificación",
                    checking: "Inspección de seguridad",
                    loading: "Cargando",
                    loadfail: "Falló la carga",
                    loaddone: "Haga clic para completar la verificación"
                }
            },
            tr: {
                loading: "Yükleniyor",
                loadfail: "Yükleme başarısız",
                verifySuccess: "Başarılı doğrulama",
                verifyError: "Başarısız, lütfen tekrar deneyin",
                verifyOutOfLimit: "Çok fazla hata var, lütfen tekrar deneyin",
                clickButton: "Doğrulamayı tamamlamak için tıklayın",
                clickInTurn: "sırayla tıkla",
                clickWordInTurn: "Lütfen sırayla metne tıklayın",
                slideTip: "Bulmacayı tamamlamak için sürükleyin",
                inferenceTip: "İki kutu kurtarma haritasını değiştirin",
                waitForSMS: "SMS beklemek ， kalan",
                popupTitle: "Lütfen doğrulama işlemini tamamlayın",
                intellisense: {
                    normal: "Doğrulamayı tamamlamak için tıklayın",
                    checking: "doğrulama",
                    loading: "Yükleniyor",
                    loadfail: "Yükleme başarısız",
                    loaddone: "Lütfen doğrulama işlemini tamamlayın"
                }
            }
        }
    }
    , function(e, t) {
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
        ;
        !function() {
            function e() {
                var e = "bi1euljfv3Yg4RyX".split("");
                this.d = function(t) {
                    if (null == t || void 0 == t)
                        return t;
                    if (0 != t.length % 2)
                        throw Error("1100");
                    for (var n = [], i = 0; i < t.length; i++) {
                        0 == i % 2 && n.push("%");
                        for (var r = e, o = 0; o < r.length; o++)
                            if (t.charAt(i) == r[o]) {
                                n.push(o.toString(16));
                                break
                            }
                    }
                    return decodeURIComponent(n.join(""))
                }
            }
            var t = (new e).d
                , i = (new e).d
                , r = (new e).d
                , o = (new e).d
                , a = (new e).d;
            !function() {
                var e = [a("u3jyjjjXlujlfvfu"), i("f1jRjXjefv1yl1jljij4lbj4jif3jlf11bufe11buejXjyfuf1jXj4"), i("j3uRjlfejv1bfbj4fljfj3jy"), t("l1jljij4uujXffjyj4jXjijujlf11blbj4fljfj3jy"), o("lef3jRjijyfujlje1blbugu31buej4j3jljyfu"), a("lXfbjvjijyfujXjR"), o("ufuuu41buXj1jYjljefu1blfjlj11blbj4fljf1Rj3jy1beiej1yebeb"), o("ffjlj1jfj4"), t("ylvRvyyj3jvfylYyvgyugR3e"), i("fejef1jljljy"), o("j1jXjuf3"), a("lul1u3uiuyufu4ullXlelul1u3lb"), o("jyeR"), t("luj4ffjfuRjXjyjX"), t("1feY1f"), o("u4jXjfuRjlu3jy1blbj4fljfj3jy1bei1yeb1yeb1ye3eeel"), r("jjfljyjefuj3jXjy"), t("jejXjyfujlfvfu1yjvjifejvuejXjujl"), t("uif1jejvj3ueuiuu"), o("ljull1luullvlXleuvuiuuull1"), t("llj1fljyfufl"), i("ujjijejlj1jXjXjg1blbj4fljfj3jy"), a("uijefuj3fjjluejifbfuj3jXjy"), t("yfggvjyj3vvyyugR3e"), t("uRjij4jffljy1bufjXfujvj3je"), i("uyjlfffe1bufjXfujvj3je1buRlu"), i("uejifbfuj3jXjylujlfvfu"), t("jilYj1l3ebjelvjulfeijlljjje1lljfeelujveulej3l1eljYlijgejlbj4uXefjRuyjyevuRjXu4e3fbugfiuYf1u3feuvfuufflujfjulffuufvuef3u1fYui"), i("uujljYjiljfl1bu4ufue1blejijyfe1buRjXjyjX"), r("uejXfbfbjlf1fbj4jifujl1bufjXfujvj3je1bu4j3jfjvfu"), a("lejljfjXjl1blbf1j3jyfu"), t("lejiffjifejujljl"), a("u1jifljvjiflfe1be3ee"), r("uejvjij4jgjuflfefujlf1"), i("uij1jijuj31buRlu1buejXjyjujljyfejlju1bu4j3jfjvfu"), t("u4fljej3juji1bu1f1j3jfjvfu"), o("lfj3jujl1bu4jifuj3jy"), o("jjjXjyfu1bjujlfujljefu1bjlf1f1jXf1"), o("ugjXfYfljgji1bufjXfujvj3je1blbf1ejuy"), o("uvfujRj4el1bj4jXjejifuj3jXjy1bfbf1jXfjj3jujlf1"), r("uuj3fjlv1blbj4flfe1blfjlj11blbj4jif3jlf1"), r("ljj4jijuj3jRj3f11blejef1j3fbfu"), a("ujj3j4jl1buujXffjyj4jXjijujlf11blbj4fljf1Rj3jy"), r("jXj1"), o("uijujXjuj11ylefuf1jljijR"), i("uRjljyj4jX"), r("jejij4j4lbjvjijyfujXjR"), t("lfjXj4jjf1jijR1buRjifujvjljRjifuj3jeji"), t("uejifujij4j3jyjiuff1jXflfb1bllfbjujifujl"), t("ulf1jife1bu1jXj4ju1bu3luue"), r("uujlfjjij4ljl1lvuefuf1j41yuujlfjjij4ljl1lvuefuf1j41yei"), t("ylvRvyyj3jvfyfggvjy3gg3i"), t("jijujuu1jljvjifjj3jXf1"), i("fbji"), t("u1j3fufefuf1jljijR1bljjlf1ji1blejlf1j3jj"), a("1vjjfljyjefuj3jXjy1v13fgf1jlfuflf1jy1beie1eeegfR131v13eg"), o("fbj3"), t("lujljyjejljyfu1bujluuy1bfbj4fljf1Rj3jy"), t("f1jljRjXfjjluejvj3j4ju"), o("ujjXj4fv1bee1bu1f1jXfffejlf11blbj4fljfj3jy"), i("flfejllbf1jXjff1jijR"), a("jvjXfefujyjijRjl"), t("fbjvjijyfujXjR1yj3jyjYjljefuuYfe"), o("lejvjXjejgffjifjjlujj4jifejv1ylejvjXjejgffjifjjlujj4jifejv"), i("f1jfj1ji1veiebe1141be1ebeu141beb141beb1yef13"), t("uijuj1j4jXjejglbj4fljfj3jy"), i("u1jijejgjff1jXfljyju"), r("uijfuejXjyfuf1jXj41yuijfuejXjyfuf1jXj4"), a("lbjvjXfujXuejljyfujlf1lbj4fljfj3jyei1yei1ye11ye1"), o("uffljyjflejljX"), o("feeR"), a("jujljejXjujllll1u3"), a("yj3jg3yjYRYeyvvv31yugR3e"), t("ylvRvyyj3jvfyj3jgby3YRvX"), a("eie1ee"), r("ffjlj1jfj41bjlfvjejlfbfuj3jXjy"), a("f1jl"), r("lfuRlbj4jif3jlf11yuXuelv"), t("efe1fbfv"), i("uifbfblfjXf1jgfefbjijejl"), t("uvj3jfjvj4j3jfjvfu"), t("jujXjefljRjljyfu"), r("l3jijyjujlfv1buRjljuj3ji1blbj4fljfj3jy"), r("ulleuy1bu4jifljyjejv1buRjXfYj3j4j4ji1blbj4fljfj3jy"), r("efebfbfv1b1fuif1j3jij41f"), r("j3jyjYjljefuuYfe"), r("u4jXjRji"), r("u1j3fuuejXjRjlfuuijfjljyfu"), t("uejij4j3j1f1j3"), a("u1jXjXjgjRjijy1buXj4ju1blefuf3j4jl"), i("fejlfefej3jXjylefujXf1jijfjl"), i("llfujXfbj3ji"), r("jejXjRfbj3j4jllejvjijujlf1"), r("jlfejejifbjl"), t("lejef1jXj4j4j1jif1"), a("lfj3jyjujXff"), o("y33Ygjyug3Yj"), i("ugjifefbjlf1fejgf31blbjifefeffjXf1ju1buRjijyjijfjlf1"), a("uRj3jyjfu4j3ll1Rulfvfuu1"), o("jfjlfu1bfef3fefujljR1bjejXj4jXf1fe1bjlfvjejlfbfuj3jXjy"), a("lejgf3fbjl1yuujlfujljefuj3jXjy"), a("ujj3j4jlu4jij11bfbj4fljfj3jy"), o("jyfbuilbu31blbj4fljfj3jy"), r("jyjXfulXjlfvj3fefulXjvjXfefu"), t("e1ju"), r("uijefuj3fjjllvuXj1jYjljefu"), o("uujXfufljR"), t("lbuuuj1Rlvuejvjijyjfjl1bljj3jlffjlf1"), r("lbuRj3jyjfu4j3ll"), i("jejXj4jXf1uujlfbfujv"), i("uyjXjgj3ji1bleflj3fujl1buljyjij1j4jlf11blbj4fljfj3jy"), t("l1jljij4ljj3jujljX1yl1jljij4ljj3jujljX1vfujR131buijefuj3fjjllv1buejXjyfuf1jXj41b1veee11Rj1j3fu13"), t("uRjijfjyjlfujX"), a("uijujXj1jlulfvuRjijyueueuujlfujljefu"), o("lXe3efelelfvjYjujlfefvfvjulX"), o("ufjij1f1j3jXj4ji"), a("lbj4jif3j1j3j4j4"), o("jyjifjj3jfjifujXf1"), i("l1jijejvjijyji"), r("luff1buejljy1buRlu1buejXjyjujljyfejlju1bulfvfuf1ji1bu1jXj4ju"), a("liliuRj3jyj3uuu41blbj4fljfj3jy"), a("1ejjejeb"), a("jjj3j4j4l1jljefu")]
                    , s = [o("eRjyflj4j4eg1bfbjifujveR1Xeg1bjujXjRjij3jyeR"), o("uujljjjiflj4fu1bu1f1jXfffejlf11buvjlj4fbjlf1"), o("ujf1jljyjejv1blejef1j3fbfu1buRlu"), i("yjYbvfyjYlgfyugR3e"), a("jljyjejXjujllll1u3"), t("lljRfbflfejv"), i("j3jefb"), r("ylvRvyyj3jvfyf3bYlyfvXvb"), o("jef1jljifujllbf1jXjff1jijR"), i("jRjXjyjXfefbjijejl"), r("u1flfufujXjylejvjijujXff"), i("u1jXjujXjyj31buRlu"), a("leluuiluu3uelXuul1uilf"), t("y3gg3iyugR3e"), r("jujXffjyj4jXjijullfbjujifujlf1"), a("uij4j3jljuj3fu1blbj4fljf1Ru3jy"), t("lbuuuj1bj3jyfujljff1jijujX1bjujX1blfjlj1ugj3fu"), o("fljyj3jjjXf1jRuXjjjjfejlfu"), o("jljyjejXjujllll1u3uejXjRfbjXjyjljyfu"), r("lbj3jejifeji"), t("uijujXj1jl1bujjijyjffejXjyjf1blefuju"), a("j1j3jyjuu1fljjjjjlf1"), r("uiljuf1blej3fujllejijjjlfuf31bfbj4fljfj3jy"), r("uXf1j1j3fu1buujXffjyj4jXjijujlf1"), t("jejXj4jXf1"), r("jvj3jujujljy"), r("j4jXjejij4lefujXf1jijfjl"), i("ufjXjXjfj4jl1blujij4jg1buljjjjjljefufe1blbj4fljfj3jy"), a("j3jyjujlfvjljuuuu1"), a("u4fljej3juji1bujjifv"), r("uijRjifYjXjyuRlbeeuujXffjyj4jXjijujlf1lbj4fljfj3jy"), i("jef1jljifujlu1fljjjjjlf1"), o("uejifefujlj4j4jif1"), t("j4j3jyjglbf1jXjff1jijR"), o("uejij4j3jjjXf1jyj3jijy1buju1"), i("lujvf1jljluuuvj3jfjvj4j3jfjvfu"), o("jef1jljifujllejvjijujlf1"), t("ufflj4j3jR"), a("uyf3fvu4jifljyjejvjlf1"), r("l3jXflluflj1jl1blbj4fljf1Rj3jy"), a("yjYlgfyugR3elXufu1e1eeeie1"), o("lelfuefuj41ylelfuefuj4"), a("ufjXjXjfj4jl1buljif1fujv1blbj4fljf1Rj3jy"), t("liliuujXffjyj4jXjiju1blbj4fljfj3jy"), r("uyjXf1fujXjy1bu3jujljyfuj3fuf31blejijjjl"), o("fbjif1fejlu3jyfu"), i("lej3jRfbj4jl1blbjifefe"), i("uejXj4jXjyjyji1buRlu"), r("fYjijgjX"), a("jfjlfulljyj3jjjXf1jRu4jXjejifuj3jXjy"), r("fejvjijujlf1lejXflf1jejl"), o("uujXffjyj4jXjijujlf1fe1bfbj4fljfj3jy"), i("j4jXjejifuj3jXjy"), i("uvjlf1jXjlfe1b1j1bufjljyjlf1jij4fe1bj4j3fjjl"), i("ffj3jyjujXff"), i("lejvjXffjejif1ju1bufjXfujvj3je"), r("ylgyYyyvgRYXyjYRYey3gg3iyugR3e"), o("ylvRvyyj3jvfyvYiv4yjYlgf"), o("ufj3jyjfjlf1"), a("l1jXjejguRjlj4fu1bllfbjujifujl"), t("lfj3jyjujXffujf1jijRjl"), t("jljyjij1j4jlljjlf1fujlfvuifufuf1j3j1uif1f1jif3"), t("ugjijefefuuXjyjl"), t("jifufuf1j3j1flfujl1bfjjljee11bjifufuf1ljjlf1fujlfveg1bfjjif1f3j3jyjf1bfjjljee11bfjjif1f3j3jylujlfvuejXjXf1juj3jyjifujleg1bfljyj3jjjXf1jR1bfjjljee11bfljyj3jjjXf1jRuXjjjjfejlfueg1bfjjXj3ju1bjRjij3jy1v131bfg1b1b1bfjjif1f3j3jylujlfvuejXjXf1juj3jyjifujl1beR1bjifufuf1ljjlf1fujlfv1b1g1bfljyj3jjjXf1jRuXjjjjfejlfueg1b1b1bjfj4lXlbjXfej3fuj3jXjy1beR1bfjjljeeu1vjifufuf1ljjlf1fujlfv141beb141bei13eg1bfR"), a("lbjlf1fbjlfuflji"), i("jXfbjljyuujifujij1jifejl"), a("jejijyfjjife"), i("j3ufjlfufujlf1lejef1j3fbfujij1j4jllbj4fljfj3jy"), r("u3jyjjjXf1jRjij41bl1jXjRjijy"), a("uyj3fuf1jX1blbuuuj1blbj4fljf1Ru3jy"), r("uRfefvjRj4e11ylvuRu4uvlululb"), t("ylvRvyyj3jvfy3gg3iyugR3e"), o("uylbu4jifefulbjifefe"), i("lujvf1jljluuujjijejl"), o("u4jifefulbjifefe"), t("eYeY"), o("fbjif1fejlujj4jXjifu"), i("ylvRvyyj3jvfy33Ygjyug3Yj"), i("eg1b"), i("jfjlfuuifufuf1j3j1u4jXjejifuj3jXjy"), a("fg1fjyjijRjl1feY"), a("uyf3jij4ji"), i("jyjXfulXjlfvj3fefulXjvjXfefujyjijRjl"), i("l41f"), o("ufujuiueul1blbj4fljfj3jy"), r("fljyjujljjj3jyjlju"), a("yj3jgbylYyvgyugR3e"), a("l41y"), a("uRjifuflf1ji1buRlu1blejef1j3fbfu1buejifbj3fujij4fe"), i("uif1j3jij41bu1j4jijejg"), i("ujjijyjflejXjyjf"), a("jRffue1bjyjgj1jijjjYjXf1ju1bfbjvfejfj4f31bjlfvfjfu1bfYfij3fl141byigRYb1bfufbjvfefu1XeY1Xfljvj1jffuj3je1yjRjX1Xj4jlfjfjji"), r("u1f1jijfjfjijujXjej3jX"), i("uvjif1jRjXjyf31bujj3f1jljjjXfv1blbj4fljfj3jy"), t("lbjij4jijejl1blejef1j3fbfu1buRlu"), o("uyjifuj3fjjl1buej4j3jljyfu"), r("flfejlf1uijfjljyfu"), a("liflj3jejgluj3jRjl1yliflj3jejgluj3jRjl"), i("jlfvfbjlf1j3jRjljyfujij41Rffjlj1jfj4"), t("uil1l1uil3lXu1llujujull1"), a("yvvgg3yj3y34yugvgRyugvYRy3gg3i"), t("uij4j3fbjif31blejljeflf1j3fuf31buejXjyfuf1jXj41bee"), a("lejef1j3fbfu1buRlu1bu1jXj4ju"), a("141b1fj1f1jXfffejlf1lbf1jXfb1feY"), i("luuuueuefuj41yluuuueuefuj4"), a("fejlj4jj"), i("u3jyjjjXu1jijejgjff1jXfljyju"), o("lbjijyjujX1blfjlj11blbj4fljfj3jy"), a("uvjijlfufujljyfejejvffjlj3j4jlf1"), i("fefbjijy"), i("uijefuj3fjjlu1jXf1jujlf1"), r("lujvf1jljluuu4j3jfjvfulejvjijujXff"), o("ebe1ebe1"), a("ebe1ebee"), a("ebe1ebeb"), r("ebe1ebei"), i("lflbu31buujlfujljefujXf11bei1yeu"), o("eg1bjlfvfbj3f1jlfeeR"), i("lujvf1jljluuuujif1jglejvjijujXff"), t("ulfvj3jj1bulfjjlf1f3ffjvjlf1jl"), o("u1jifufuj4jlj4jXjf1bufjijRjl1bu4jifljyjejvjlf1"), o("u3jRfbjijefu"), a("lju4ue1buRflj4fuj3jRjljuj3ji1blbj4fljfj3jy"), t("uijujXj1jl1buvjlj1f1jlff"), a("u1j4fljllefujijejgfe1bu3jyfefujij4j41buujlfujljefujXf1"), i("ffffffjRjRjRjRjRjRjRjRjRjRj4j4j3"), a("jvj3fefujXf1f3"), a("fejijyfe1Rfejlf1j3jj"), o("eieuefeeeie1elele1eeeujueueieujeuje3eieeelejjuejeveuuleuulevujelujelejjeevjjeij1je"), a("lbjifbf3f1flfe"), o("u1flfufujXjylujlfvfu"), a("ebe1eiei"), o("uifbfbllfb"), o("lbjif1jXjR1ylulj1bfbj4jif3jlf11bfbj4fljfj3jy"), a("uujljij4lbj4f3u4j3fjjl1bllfbjujifujl"), i("u4jXjvj3fu1buffljYjif1jifuj3"), i("ujl1uiufuRuluylulXleuvuiuuull1"), o("uijfjljyjef31buju1"), o("uRjijef1jXjRjljuj3jiujj4jifejvlbjifbjlf11yuRjijef1jXjRjljuj3jiujj4jifejvlbjifbjlf1"), a("1e1e1e"), t("lfjXf1juuejifbfuflf1jllv"), a("jfjlfuuejXjRfbflfujljulefuf3j4jl"), r("fbj4jifujjjXf1jR"), a("ebeiebel"), t("uif1jij1j3je1bluf3fbjlfejlfufuj3jyjf"), r("ebeiebej"), a("ebeiebee"), t("ylvRvyyj3jvfyugvYRylYyvg"), i("ebeiebeu"), r("ebeiebei"), r("ebeiebe1"), o("ebeiebeb"), r("ebeiebef"), r("u1flfufujXjyuvj3jfjvj4j3jfjvfu"), i("fjjlf1fujlfvuifufuf1j3j1lbjXj3jyfujlf1"), i("ebeiebev"), r("fujlfvfuu1jifejlj4j3jyjl"), t("1eebeje3"), t("jujXflj1j4jlluffj3fefu1blfjlj11blbj4fljfj3jy"), i("fljyjlfejejifbjl"), t("lujvfljyjujlf11buujifbuefuf1j41buylbuilbu31blbj4fljfj3jy"), a("u1jifujijyjf"), i("uuujugjij31Rleu1"), i("lejyjifb1bu3luue"), t("uujifujl"), i("uRj3jyj3j1jif1lbj4fljfj3jy"), o("jujljejXjujllll1u3uejXjRfbjXjyjljyfu"), o("uylblbj4jif3jlf1lejvjlj4j4"), o("uRle1bl1jljjjlf1jljyjejl1blejijyfe1blejlf1j3jj"), a("uvj3f1jijfj3jyjX1blejijyfe1bufu1"), o("fejlf1j3jj"), r("jfjlfuuejXjyfujlfvfu"), i("fljyj3jjjXf1jRe1jj"), i("uRjXjXj4u1jXf1jijy")]
                    , l = [a(""), r("uff1jif3lujlfvfu"), a("fbjif1jljyfu"), o("ylg3g4yl34vj"), t("fbj4fljfj3jyfe"), t("uijujXj1jlulfvuRjijyuujlfujljefu"), a("ebebeieb"), a("ufjXjXjfj4jl1buljif1fujv1blbj4fljfj3jy"), o("ljjljlfuj4jl1blulj1buejXf1jl"), t("ebebebef"), t("ebebebeu"), o("ebebebe1"), o("ebebebee"), a("ebebebeb"), i("ebebebei"), r("lljyj3fuf31blbj4jif3jlf1"), a("lejgf3fbjl1blfjlj11blbj4fljfj3jy"), r("lfjlj1ugj3fu1Rj3jyfujljff1j3jlf1fujl1blbuuuj"), i("jfjufvj3jufbf3jvfvjuul"), i("u1jlj4j41buRlu"), a("ebebebev"), o("jfjlfuleflfbfbjXf1fujljuulfvfujljyfej3jXjyfe"), i("fejlfuluj3jRjl"), a("ebebebe3"), a("lejijjjllejljif1jejv"), a("11"), t("1u"), i("lljyj3fjjlf1fe"), o("1l"), a("1j"), i("1f"), i("eieieieb"), a("jfjlfu1bfbj4fljfj3jy1bfefuf1j3jyjf1bjlfvjejlfbfuj3jXjy"), o("lujvf1jljluulejvjijujXff"), o("1g"), o("14"), r("1R"), t("uif1jij1"), o("yvvgg3yj3y34yugvgRyfggvjylYyvg"), i("1y"), r("ujlllYullejvjif1jl"), a("1X"), t("eb"), r("ei"), o("e1"), i("ee"), o("eu"), a("yugggXylYyvglXufu1e1eeeie1")]
                    , u = [o("el"), i("ej"), r("u3jyjijefuj3fjjluejifbfuj3jXjylujlfvfu"), t("ef"), r("lfulu1lYuluy1bu1f1jXfffejlf11bulfvfujljyfej3jXjy"), o("ev"), a("e3"), r("eY"), i("uuj3fjlv1bu1f1jXfffejlf11blbj4fljf1Ru3jy"), r("eg"), t("eR"), t("llfbj4jif31blbue"), t("jejijyfjjife1bjlfvjejlfbfuj3jXjy"), o("ui"), a("u1"), a("ue"), r("uu"), o("ul"), r("ylgyYyyvgRYXy33gvly3gg3i"), i("uj"), i("uvjif1f1j3jyjffujXjy"), t("uf"), i("uv"), a("u3"), a("uY"), o("ufjyjXjRjl1blejvjlj4j41bu3jyfujljff1jifuj3jXjy"), o("ug"), r("u4"), r("uR"), a("uy"), a("uX"), t("lb"), r("li"), a("l1"), r("le"), t("uyj3jijfjif1ji1blejXj4j3ju"), t("lu"), i("lejljjuej4j3jljyfu1blbj4fljfj3jy"), r("ll"), r("lj"), a("eieieiei"), i("lf"), o("lv"), o("l3"), r("lY"), i("ufjXfljuf31buXj4ju1blefuf3j4jl"), a("l4"), r("l1jXj1j4jXfv1bu4jifljyjejvjlf11blbj4fljfj3jy"), r("uRj3jef1jXfejXjjfu1buXjjjjj3jejl1be1ebeiee"), i("liliuRflfej3je"), t("ji"), t("ulflf1jXfefuj3j4jl"), o("j1"), t("f1jRjXjefv1yl1jljij4lbj4jif3jlf11bufe11buejXjyfuf1jXj41yei"), r("je"), t("lejef1j3fbfuj3jyjf1yuuj3jefuj3jXjyjif1f3"), r("ju"), o("yugggXylYyvg"), a("jl"), r("jj"), o("jf"), t("jv"), t("uRji1RuejXjyjjj3jf1yjejXjR1bfbj4fljfj3jy"), i("j3"), i("eiebeieb"), i("uejifefljij4"), t("jY"), i("jg"), o("j4"), o("jR"), a("jy"), o("jX"), r("fb"), a("eiebebev"), i("jefu"), t("jujXuyjXfuluf1jijejg"), r("fi"), o("fejlfuluj3jRjljXflfu"), a("yugvgRylYyvg1blbf1jX"), t("f1"), i("ufj3fejvji"), o("jfjlfuluj3jRjlfYjXjyjluXjjjjfejlfu"), a("fe"), r("eiebebel"), i("eiebebeu"), t("fu"), i("fl"), t("eiebebee"), t("fj"), o("eiebebei"), t("ff"), r("fv"), t("juf1jiffuif1f1jif3fe"), a("f3"), a("fY"), o("fg"), t("fR"), a("fy"), r("jjjXjyfu"), t("eiebebe3"), o("eRjyflj4j4eg1bfbjifujveR1Xeg1bjlfvfbj3f1jlfeeR"), t("lejvjlj4j41yllu3uvjlj4fbjlf1"), i("fujXuujifujilll1u4"), o("lfj3jyjujXfflujlfvfu"), i("j4jijyjffljijfjl"), a("jujX"), r("yugvgRy3gg3i1blbf1jX"), o("uvj3jfjvj4j3jfjvfulujlfvfu"), i("juj3fj"), t("uRjljyfllujlfvfu"), a("uiuXu41buRjljuj3ji1blbj4jif3j1jijejg1blbj4fljfj3jy"), i("uej3fuf1j3fv1bjXjyj4j3jyjl1bfbj4fljf1Rj3jy"), o("jlje"), t("uujlfejujljRjXjyji"), t("u3jyjijefuj3fjjlu1jXf1jujlf1"), t("l1jljij4lbj4jif3jlf1"), r("uvulu4u4uX"), o("141b1fjejXjujl1feY"), o("jljR"), r("jyfblujXjyjfj1fluijujuj3jy"), i("jef1jljifujlulj4jljRjljyfu"), r("fbjvjijyfujXjR"), a("uRle1blbuRj3jyjejvjX"), t("yjYlgfyugR3e"), r("jlfjjij4"), i("jlfv"), i("uuj3fjlv1bljuXuu1buvjlj4fbjlf11blbj4fljf1Rj3jy"), a("yj3jgbyfggvjyj3vvyyugR3e"), o("liflj3jejgluj3jRjluejvjljejguXj1jYjljefu1yliflj3jejgluj3jRjluejvjljejg1yei"), r("ujj4f3uXf1uuj3jl1bufjijRjlfe1blbj4fljfj3jy"), r("jifufujijejvlejvjijujlf1"), i("lbj4jif3uXjy1blbj4fljf1Rj3jy"), r("jfjlfuluj3jRjl"), i("ei1yebei"), r("u1f1jXjijuffjif3"), r("jjfb"), o("uij4jiffjif11buylbuilbu31bflfuj3j4fe"), t("ujjXf1fujl"), a("jvjifejvuejXjujl"), t("yj3jg3yjYRYeylYf3YyugR3e"), o("ulleuy1blejXjyjif11builbu3"), i("uvlbuujlfujljefu"), r("u1j3fujujljjjljyjujlf11bliflj3jejglejejijy"), t("u3ul1blujij11bfbj4fljfj3jy"), o("1f14"), t("u1flfufujXjyujjijejl"), t("jefbfluej4jifefe"), i("uejljyfuflf1f31bufjXfujvj3je"), t("uXjyj4j3jyjl1blefujXf1jijfjl1bfbj4fljf1Rj3jy"), i("lejijjjlf11bllfbjujifujl"), a("uRfefvjRj4e11yuuuXuRuujXjefljRjljyfu"), o("uljyjff1jifjjlf1fe1buRlu"), i("lej3j4fjjlf1j4j3jfjvfu1blbj4fljf1Ru3jy"), o("ufjXjXjfj4jl1bufjljif1fe1beb1yel1yeeee1yeb"), o("uej3fuf1j3fv1bu3ueui1buej4j3jljyfu"), t("jij4fbjvjij1jlfuj3je"), t("ljuujXffjyj4jXjijujlf1"), a("ylvRvyyj3jvfyjYlgfyugR3e"), o("jifufuf1ljjlf1fujlfv"), o("ylYyvgyugR3e"), t("jejXjXjgj3jl"), o("1le1e1"), i("1le1ej"), o("uejljyfujiflf1"), t("eujfjijRjl"), a("l1jXjejgffjlj4j4"), o("u4jXjfuRjlu3jy1blbj4fljfj3jy1bei1yeb1yeb1ye3ejei"), t("uXjefujXfejvjifbjl1blefuf1jljijRj3jyjf1blejlf1fjj3jejlfe"), r("fujXufuRlulefuf1j3jyjf"), o("fujveR1X"), a("lefljRjifuf1jilbuuuj1bu1f1jXfffejlf11blbj4fljfj3jy"), a("lbuuuj1ylbjujjuefuf1j4"), r("jjj3j4j4lefuf3j4jl"), o("jYjl"), a("uijujXj1jl1buRj3jyjf1blefuju"), o("lujXf1jejvuvjlj4fbjlf1"), a("ujf1jijyjgj4j3jy1bufjXfujvj3je1buvjljifjf3"), o("ylvRvyyj3jvfyugggXylYyvg"), o("uvjif1jRjXjyf31blbj4fljf1Ru3jy"), o("ufj3jfj3"), i("fjei1yei"), i("ugj3jyjX1buRlu"), o("lej3jRuvjlj3"), t("uij4j3leleuXu4jXjfj3jy1bfbj4fljfj3jy"), r("l1jljij4lbj4jif3jlf11yl1jljij4lbj4jif3jlf11vfujR131buijefuj3fjjllv1buejXjyfuf1jXj41b1veee11Rj1j3fu13"), a("l3jijyjujlfv1blbuuuj1bljj3jlffjlf1"), r("uej3fuf1j3fv1bl1jljejlj3fjjlf11blbj4fljf1Rj3jy"), o("jRjij3"), o("fujXfb"), o("uijef1jXlbuuuj1ylbuuuj"), r("jejijyfjjife1bjifbj31bjlfvjejlfbfuj3jXjy"), o("u3jyjijefuj3fjjluejifbfuj3jXjy"), r("uRjljyfl"), r("fbf1jljej3fej3jXjy1bjRjljuj3fljRfb1bjjj4jXjifueg1bfjjif1f3j3jyjf1bfjjljee11bfjjif1f3j3jylujlfvuejXjXf1juj3jyjifujleg1bfjjXj3ju1bjRjij3jy1v131bfg1b1b1bjfj4lXujf1jijfuejXj4jXf11beR1bfjjljeeu1vfjjif1f3j3jylujlfvuejXjXf1juj3jyjifujl141beb141bei13eg1bfR"), r("lilie1ebeiee1bujj3f1jljjjXfv1blbj4fljfj3jy"), t("ufjXjXjfj4jl1bllfbjujifujl"), i("ylvRvyyj3jvfylgRY3yugY3i"), i("jluRflfej3jelbj4fljfj3jy1buuu4uRej"), r("lfjlj11buejXjRfbjXjyjljyfufe"), o("u1jij1f3j4jXjy1blujXjXj4u1jif1"), o("uejXjXffjXjy1bllfbjujifujl")];
                !function() {
                    var t = [66, 60, 79, 60, 7, 17, 33, 96, 68, 0, 2, 1423857449, -2, 3, -3, 3432918353, 1555261956, 4, 2847714899, -4, 5, -5, 2714866558, 1281953886, 6, -6, 198958881, 1141124467, 2970347812, -7, 7, 3110523913, 8, -8, 2428444049, -9, 9, 10, -10, -11, 11, 2563907772, -12, 12, 13, 2282248934, -13, 2154129355, -14, 14, 15, -15, 16, -16, 17, -17, -18, 18, 19, -19, 20, -20, 21, -21, -22, 22, -23, 23, 24, -24, 25, -25, -26, 26, 27, -27, 28, -28, 29, -29, 30, -30, 31, -31, 33, -33, -32, 32, -34, -35, 34, 35, 37, -37, 36, -36, 38, 39, -39, -38, 40, 41, -41, -40, 42, -43, -42, 43, 45, -45, -44, 44, 47, -46, -47, 46, 48, -49, -48, 49, -50, 51, -51, 50, 570562233, 53, -52, 52, -53, -54, -55, 55, 54, 503444072, 57, -56, -57, 56, 59, 58, -59, -58, 60, 61, -61, -60, 62, 63, -63, -62, -64, 711928724, -66, 67, -65, 65, -67, 66, 64, -71, -69, 69, 68, 70, -68, -70, 71, -72, 3686517206, -74, -73, 73, 75, 74, -75, 72, -79, 76, 79, 78, -78, -76, 77, -77, 3554079995, -81, 81, -82, -83, 80, -80, 82, 83, -84, 84, 85, -86, -87, 86, -85, 87, 90, -88, -89, -90, 88, 89, 91, -91, 94, 92, 95, -94, 93, -93, -95, -92, -98, 97, 98, -97, -99, 96, 99, -96, -100, 3272380065, 102, -102, -101, -103, 103, 100, 101, -107, -104, 105, 104, 106, -106, -105, 107, 109, -109, -108, -111, 110, -110, 111, 108, 251722036, 115, -115, 112, -114, -112, 113, 114, -113, -117, 119, -116, -119, 117, -118, 118, 116, 123, -120, 122, -121, 120, -122, -123, 121, 125, 127, 3412177804, -127, 126, -126, 124, -125, -124, -128, 128, -129, 1843258603, 3803740692, 984961486, 3939845945, 4195302755, 4066508878, 255, 1706088902, 256, 1969922972, 365, 2097651377, 376229701, 853044451, 752459403, 1e3, 426522225, 3772115230, 615818150, 3904427059, 4167216745, 4027552580, 3654703836, 1886057615, 879679996, 3518719985, 3244367275, 2013776290, 3373015174, 1759359992, 285281116, 1622183637, 1006888145, 1e4, 1231636301, 83908371, 1090812512, 2463272603, 1373503546, 2596254646, 2321926636, 1504918807, 2181625025, 2882616665, 2747007092, 3009837614, 3138078467, 397917763, 81470997, 829329135, 2657392035, 956543938, 2517215374, 2262029012, 40735498, 2394877945, 3266489909, 702138776, 2808555105, 2936675148, 1258607687, 1131014506, 3218104598, 3082640443, 1404277552, 565507253, 534414190, 1541320221, 1913087877, 2053790376, 1789927666, 3965973030, 3826175755, 4107580753, 4240017532, 1658658271, 3579855332, 3708648649, 3453421203, 3317316542, 1873836001, 1742555852, 461845907, 3608007406, 1996959894, 3747672003, 3485111705, 2137656763, 3352799412, 213261112, 3993919788, 1.01, 3865271297, 4139329115, 4275313526, 282753626, 1068828381, 2768942443, 2909243462, 936918e3, 3183342108, 27492, 141376813, 3050360625, 654459306, 2617837225, 1454621731, 2489596804, 2227061214, 1591671054, 2362670323, 4294967295, 1308918612, 2246822507, 795835527, 1181335161, 414664567, 4279200368, 1661365465, 1037604311, 4150417245, 3887607047, 1802195444, 4023717930, 2075208622, 1943803523, 901097722, 628085408, 755167117, 3322730930, 3462522015, 3736837829, 3604390888, 2366115317, .4, 2238001368, 2512341634, 2647816111, -.2, 314042704, 1510334235, 9e5, 58964, 1382605366, 31158534, 450548861, 3020668471, 1119000684, 3160834842, 2898065728, 1256170817, 2765210733, 3060149565, 3188396048, 2932959818, 124634137, 2797360999, 366619977, 62317068, -.26, 1202900863, 498536548, 1340076626, 2405801727, 2265490386, 1594198024, 1466479909, 2547177864, 249268274, 2680153253, 2125561021, 3294710456, 855842277, 3423369109, .732134444, 3705015759, 3569037538, 1994146192, 1711684554, 1852507879, 997073096, 733239954, 4251122042, 601450431, 4111451223, 167816743, 3855990285, 3988292384, 3369554304, 3233442989, 3495958263, 3624741850, 65535, 453092731, -.9, 2094854071, 1957810842, 325883990, 4057260610, 1684777152, 4189708143, 3915621685, 162941995, 1812370925, 3775830040, 783551873, 3134207493, 1172266101, 2998733608, 2724688242, 1303535960, 2852801631, 112637215, 1567103746, 651767980, 1426400815, 906185462, 2211677639, 1047427035, 2344532202, 2607071920, 2466906013, 225274430, 544179635, 2176718541, 2312317920, 1483230225, 1342533948, 2567524794, 2439277719, 1088359270, 671266974, 1219638859, 84e4, 953729732, 3099436303, 2966460450, 817233897, 2685067896, 2825379669, 4089016648, 4224994405, 3943577151, 3814918930, 476864866, 1634467795, 335633487, 1762050814, 1, 2044508324, -1, 3401237130, 3268935591, 3524101629, 3663771856, 1907459465];
                    !function() {
                        function i(e) {
                            if (null == e)
                                return null;
                            for (var n = [], i = t[9], r = e.length; i < r; i++) {
                                var o = e[i];
                                n[i] = ne[(o >>> t[17] & t[50]) * t[52] + (o & t[50])]
                            }
                            return n
                        }
                        function r(e) {
                            var n = [];
                            if (null == e || void 0 == e || e.length == t[9])
                                return f(re);
                            if (e.length >= re) {
                                var n = t[9]
                                    , i = [];
                                if (null != e && e.length != t[9]) {
                                    if (e.length < re)
                                        throw Error(u[87]);
                                    for (var r = t[9]; r < re; r++)
                                        i[r] = e[n + r]
                                }
                                return i
                            }
                            for (i = t[9]; i < re; i++)
                                n[i] = e[i % e.length];
                            return n
                        }
                        function o(e) {
                            var n = t[398];
                            if (null != e)
                                for (var i = t[9]; i < e.length; i++)
                                    n = n >>> t[32] ^ te[(n ^ e[i]) & t[293]];
                            if (e = j(n ^ t[398]),
                                n = e.length,
                            null == e || n < t[9])
                                e = new String(l[0]);
                            else {
                                for (var i = [], r = t[9]; r < n; r++)
                                    i.push(p(e[r]));
                                e = i.join(l[0])
                            }
                            return e
                        }
                        function a(e, n, i) {
                            var r, o = [l[44], l[46], l[42], u[50], u[43], u[22], u[63], u[32], u[91], u[27], u[46], u[44], u[86], u[59], u[39], u[68], u[60], u[5], u[82], u[31], u[28], u[33], u[1], u[56], u[21], u[67], u[42], u[88], u[30], l[41], u[15], u[52], u[90], u[6], u[41], u[16], u[66], l[43], u[17], u[36], u[93], u[23], u[34], u[54], u[69], u[58], u[71], u[24], u[94], l[45], u[3], u[76], u[85], u[61], u[14], u[79], u[38], l[34], u[26], u[29], u[13], u[0], u[72], u[70]], a = u[19], s = [];
                            if (i == t[535])
                                i = e[n],
                                    r = t[9],
                                    s.push(o[i >>> t[10] & t[147]]),
                                    s.push(o[(i << t[17] & t[116]) + (r >>> t[17] & t[50])]),
                                    s.push(a),
                                    s.push(a);
                            else if (i == t[10])
                                i = e[n],
                                    r = e[n + t[535]],
                                    e = t[9],
                                    s.push(o[i >>> t[10] & t[147]]),
                                    s.push(o[(i << t[17] & t[116]) + (r >>> t[17] & t[50])]),
                                    s.push(o[(r << t[10] & t[142]) + (e >>> t[24] & t[13])]),
                                    s.push(a);
                            else {
                                if (i != t[13])
                                    throw Error(u[64]);
                                i = e[n],
                                    r = e[n + t[535]],
                                    e = e[n + t[10]],
                                    s.push(o[i >>> t[10] & t[147]]),
                                    s.push(o[(i << t[17] & t[116]) + (r >>> t[17] & t[50])]),
                                    s.push(o[(r << t[10] & t[142]) + (e >>> t[24] & t[13])]),
                                    s.push(o[e & t[147]])
                            }
                            return s.join(l[0])
                        }
                        function f(e) {
                            for (var n = [], i = t[9]; i < e; i++)
                                n[i] = t[9];
                            return n
                        }
                        function c(e, n, i, r, o) {
                            if (null != e && e.length != t[9]) {
                                if (null == i)
                                    throw Error(u[84]);
                                if (e.length < o)
                                    throw Error(u[87]);
                                for (var a = t[9]; a < o; a++)
                                    i[r + a] = e[n + a]
                            }
                        }
                        function j(e) {
                            var n = [];
                            return n[0] = e >>> t[68] & t[293],
                                n[1] = e >>> t[52] & t[293],
                                n[2] = e >>> t[32] & t[293],
                                n[3] = e & t[293],
                                n
                        }
                        function d(e) {
                            if (null == e || void 0 == e)
                                return e;
                            e = encodeURIComponent(e);
                            for (var n = [], i = e.length, r = t[9]; r < i; r++)
                                if (e.charAt(r) == l[28]) {
                                    if (!(r + t[10] < i))
                                        throw Error(u[99]);
                                    n.push(h(e.charAt(++r) + l[0] + e.charAt(++r))[0])
                                } else
                                    n.push(e.charCodeAt(r));
                            return n
                        }
                        function h(e) {
                            if (null == e || e.length == t[9])
                                return [];
                            e = new String(e);
                            for (var n = [], i = e.length / t[10], r = t[9], o = t[9]; o < i; o++) {
                                var a = parseInt(e.charAt(r++), t[52]) << t[17]
                                    , s = parseInt(e.charAt(r++), t[52]);
                                n[o] = b(a + s)
                            }
                            return n
                        }
                        function p(e) {
                            var n = [];
                            return n.push(ee[e >>> t[17] & t[50]]),
                                n.push(ee[e & t[50]]),
                                n.join(l[0])
                        }
                        function y(e, n) {
                            if (null == e || null == n || e.length != n.length)
                                return e;
                            for (var i = [], r = t[9], o = e.length; r < o; r++)
                                i[r] = v(e[r], n[r]);
                            return i
                        }
                        function v(e, t) {
                            return e = b(e),
                                t = b(t),
                                b(e ^ t)
                        }
                        function g(e, t) {
                            return b(e + t)
                        }
                        function b(e) {
                            if (e < t[284])
                                return b(t[285] - (t[284] - e));
                            if (e >= t[284] && e <= t[276])
                                return e;
                            if (e > t[276])
                                return b(t[286] + e - t[276]);
                            throw Error(u[89])
                        }
                        function m(i) {
                            function r() {
                                for (var n = [e[34], s[20], s[123], u[174], s[137], l[37], s[144], s[89], s[161], e[32], l[19], e[54], s[11], e[89], s[92], u[134], e[88], s[34], s[32], u[65], u[163], u[147], e[33], s[47], e[29], e[28], u[113], s[162], e[106], u[151], e[49], u[51], s[90], u[137], u[176], s[2], e[115], u[179], u[80], u[45], s[37], e[69], s[108], u[20], s[169], s[121], s[68], s[62], u[181], e[38], s[135], e[86], e[35], s[29], e[112], e[24], s[88], e[45], e[98], s[173], u[122], s[168], e[25], u[35], s[81], s[94], s[129], s[64], e[116], e[108], e[118], u[165], e[31], s[102], e[30], s[55], u[182], s[163], e[13], e[119], e[20], s[5], l[27], e[91], e[41], e[36], u[57], s[147], u[177], e[8], u[196], e[73], u[157], s[7], e[51], s[57], s[77], u[159], l[3], u[18], s[86], u[139], e[72], u[123], e[96], s[13], u[127], e[23], s[3], l[47], s[40], s[56], s[71], u[106], u[78], s[100], l[38]], i = [], r = t[9]; r < n.length; r++)
                                    try {
                                        var a = n[r];
                                        o()(a) && i.push(a)
                                    } catch (f) {}
                                return i.join(u[9])
                            }
                            function o() {
                                function n(t) {
                                    var n = {};
                                    return c.style.fontFamily = t,
                                        f.appendChild(c),
                                        n.height = c.offsetHeight,
                                        n.width = c.offsetWidth,
                                        f[e[58]](c),
                                        n
                                }
                                var i = [s[9], s[127], s[170]]
                                    , r = []
                                    , o = s[125]
                                    , a = e[78]
                                    , f = G[e[10]]
                                    , c = G[u[120]](s[109]);
                                for (c.style.fontSize = a,
                                         c.style.visibility = s[25],
                                         c.innerHTML = o,
                                         o = t[9]; o < i.length; o++)
                                    r[o] = n(i[o]);
                                return function(e) {
                                    for (var o = t[9]; o < r.length; o++) {
                                        var a = n(e + l[35] + i[o])
                                            , s = r[o];
                                        if (a.height !== s.height || a.width !== s.width)
                                            return !0
                                    }
                                    return !1
                                }
                            }
                            function a() {
                                var t = null
                                    , n = null
                                    , i = [];
                                try {
                                    n = G[u[120]](s[66]),
                                        t = n[s[171]](e[7]) || n[s[171]](s[98])
                                } catch (r) {}
                                if (!t)
                                    return i;
                                try {
                                    i.push(t[l[21]]())
                                } catch (o) {}
                                try {
                                    i.push(f(t, n))
                                } catch (a) {}
                                return i.join(u[9])
                            }
                            function f(n, i) {
                                try {
                                    var r = s[63]
                                        , o = u[193]
                                        , a = n[s[31]]();
                                    n[s[21]](n[s[99]], a);
                                    var l = new Float32Array([t[425], t[481], t[9], t[421], t[446], t[9], t[9], t[461], t[9]]);
                                    n.bufferData(n[s[99]], l, n[s[12]]),
                                        a.k = t[13],
                                        a.l = t[13];
                                    var f = n[s[8]]()
                                        , c = n[s[36]](n[e[19]]);
                                    n[s[50]](c, r),
                                        n[e[92]](c);
                                    var j = n[s[36]](n[s[136]]);
                                    return n[s[50]](j, o),
                                        n[e[92]](j),
                                        n[u[130]](f, c),
                                        n[u[130]](f, j),
                                        n[s[33]](f),
                                        n[e[60]](f),
                                        f.n = n[s[79]](f, u[158]),
                                        f.m = n[s[49]](f, s[17]),
                                        n[s[61]](f.o),
                                        n[s[154]](f.n, a.k, n.FLOAT, !t[535], t[9], t[9]),
                                        n[s[172]](f.m, t[535], t[535]),
                                        n[u[92]](n[e[11]], t[9], a.l),
                                        _(i[u[102]]())
                                } catch (d) {
                                    return e[75]
                                }
                            }
                            function c() {
                                var n = G[u[120]](u[108])
                                    , i = []
                                    , r = [s[110], e[22], e[79], e[66], u[145], s[153], s[10], s[130], e[26], l[1], e[80], u[107], u[114], u[191], u[2], s[106], e[0], u[192], u[109], e[94], s[118], s[73], s[35], s[111], l[33], e[95], s[60], u[103]];
                                if (!window[s[141]])
                                    return i.join(l[0]);
                                for (var o = t[9]; o < r.length; o++)
                                    try {
                                        G[e[10]].appendChild(n),
                                            n.style.color = r[o],
                                            i.push(r[o]),
                                            i.push(window[s[141]](n).getPropertyValue(s[24])),
                                            G[e[10]][e[58]](n)
                                    } catch (a) {
                                        i.push(e[99])
                                    }
                                return i.join(u[7])
                            }
                            function j() {
                                try {
                                    var n = G[u[120]](s[66])
                                        , i = n[s[171]](e[104])
                                        , r = s[91];
                                    return i[s[156]] = u[188],
                                        i[u[98]] = e[84],
                                        i[s[156]] = u[155],
                                        i[u[172]] = e[121],
                                        i[e[122]](t[275], t[535], t[146], t[60]),
                                        i[u[172]] = s[157],
                                        i.fillText(r, t[10], t[50]),
                                        i[u[172]] = e[64],
                                        i.fillText(r, t[17], t[54]),
                                        n[u[102]]()
                                } catch (o) {
                                    return u[190]
                                }
                            }
                            function d() {
                                debugger;
                                try {
                                    return window[e[105]] && m.h ? p() : h()
                                } catch (t) {
                                    return l[32]
                                }
                            }
                            function h() {
                                debugger
                                if (!J[l[4]])
                                    return l[0];
                                var n = [u[164], e[65], e[113], l[5], u[136], s[15], s[101], u[183], s[30], u[110], s[132], e[18], s[22], u[199], s[120], e[87], u[142], s[124], e[48], u[154], u[111], u[186], u[200], s[134], s[1], u[8], e[40], u[126], s[158], s[51], s[14], u[197], e[83], u[140], s[119], e[21], e[42], e[101], u[129], e[59], l[40], e[6], s[84], s[58], u[25], l[7], s[42], u[153], s[27], u[195], s[93], u[178], s[53], u[141], e[39], u[143], s[67], e[2], e[97], s[74], e[15], u[166], u[62], u[48], s[165], s[95], s[69], e[110], s[44], e[102], s[72], s[167], u[119], s[38], u[167], u[148], s[23], s[107], s[133], s[16], e[107], e[68], s[19], u[131], u[194], s[43], e[120], u[49], e[3], u[47], s[59], u[149], l[24], u[55], u[37], u[101], u[152], s[46], l[16], u[170], e[4], e[57], s[160], u[175], l[15], u[11], u[156], l[8], s[122], u[198], l[17], u[4], e[47], s[140], s[116], e[82], u[185], s[39], s[48]]
                                    , i = []
                                    , r = {};

                                var fc = function(e) {
                                    r[e.name] = t[535];
                                    var n = y(e, function(e) {
                                        return [e.type, e.suffixes].join(u[97])
                                    }).join(l[35]);
                                    return [e.name, e.description, n].join(s[75])
                                };
                                var my_y = y(J[l[4]], fc, this);
                                i.push(my_y.join(l[26]));

                                var my_y2 = y(n, function(e) {
                                    if (r[e])
                                        return l[0];
                                    if (e = J[l[4]][e],
                                        !e)
                                        return l[0];
                                    var t = y(e, function(e) {
                                        return [e.type, e.suffixes].join(u[97])
                                    }).join(l[35]);
                                    return [e.name, e.description, t].join(s[75])
                                }, this);

                                i.push(my_y2.join(u[9]));
                                console.log("i.join(u[9]): ", i.join(u[9]));
                                return i.join(u[9]);
                            }
                            function p() {
                                return window[e[105]] ? y([u[189], e[44], e[67], e[50], s[138], u[150], s[70], u[171], s[97], u[128], e[1], u[53], u[115], u[184], e[111], e[1], u[55], u[101], e[63], s[41], e[100], s[104], e[77]], function(t) {
                                    try {
                                        return new window[e[105]](t),
                                            t
                                    } catch (n) {
                                        return null
                                    }
                                }).join(u[9]) : l[0]
                            }
                            function y(e, t, n) {
                                var i = [];
                                return null == e ? i : b && e.map === b ? e.map(t, n) : (v(e, function(e, r, o) {
                                    i[i.length] = t.call(n, e, r, o)
                                }),
                                    i)
                            }
                            function v(e, n) {
                                if (null !== e)
                                    if (g && e.forEach === g)
                                        e.forEach(n, void 0);
                                    else if (e.length === +e.length)
                                        for (var i = t[9], r = e.length; i < r && n.call(void 0, e[i], i, e) !== {}; i++)
                                            ;
                                    else
                                        for (i in e)
                                            if (e.hasOwnProperty(i) && n.call(void 0, e[i], i, e) === {})
                                                break
                            }
                            var g = Array.prototype.forEach
                                , b = Array.prototype.map
                                , m = {
                                e: _,
                                j: !0,
                                i: !0,
                                h: !0,
                                b: !0,
                                a: !0
                            };
                            ("undefined" == typeof i ? "undefined" : n(i)) == e[16] ? m.e = i : (null != i.b && void 0 != i.b && (m.b = i.b),
                            null != i.a && void 0 != i.a && (m.a = i.a)),
                                this.get = function() {
                                    var i = []
                                        , o = [];
                                    if (K) {
                                        var l;
                                        try {
                                            l = !!window[e[90]]
                                        } catch (f) {
                                            l = !0
                                        }
                                        i.push(l);
                                        var h;
                                        try {
                                            h = !!window[s[26]]
                                        } catch (p) {
                                            h = !0
                                        }
                                        if (i.push(h),
                                            i.push(!!window[s[28]]),
                                            G[e[10]] ? i.push(n(G[e[10]][e[52]])) : i.push("undefined"),
                                            i.push(n(window[s[65]])),
                                            i.push(J[u[146]]),
                                            i.push(J[s[142]]),
                                            l = m.i)
                                            try {
                                                var y = G[u[120]](s[66]);
                                                l = !(!y[s[171]] || !y[s[171]](e[104]))
                                            } catch (v) {
                                                l = !1
                                            }
                                        if (l)
                                            try {
                                                i.push(j()),
                                                m.b && i.push(a())
                                            } catch (g) {
                                                i.push(u[12])
                                            }
                                        i.push(c()),
                                        m.a && o.push(r()),
                                            o.push(J[s[96]]),
                                            o.push(J[u[104]]),
                                            o.push(window[e[9]][e[109]]),
                                        m.j && (y = window[e[9]] ? [window[e[9]].height, window[e[9]].width] : [t[9], t[9]],
                                        ("undefined" == typeof y ? "undefined" : n(y)) !== s[85] && o.push(y.join(u[91]))),
                                            o.push((new Date)[u[81]]()),
                                            o.push(J[u[75]]),
                                            o.push(d())
                                    }
                                    return y = [],
                                        m.e ? (y.push(m.e(i.join(s[139]))),
                                            y.push(m.e(o.join(s[139])))) : (y.push(_(i.join(s[139]))),
                                            y.push(_(o.join(s[139])))),
                                        y
                                }
                        }
                        function _(e) {
                            var n, i, r, o, a, s, u = t[82];
                            for (n = e.length & t[13],
                                     i = e.length - n,
                                     r = u,
                                     u = t[15],
                                     o = t[369],
                                     s = t[9]; s < i; )
                                a = e.charCodeAt(s) & t[293] | (e.charCodeAt(++s) & t[293]) << t[32] | (e.charCodeAt(++s) & t[293]) << t[52] | (e.charCodeAt(++s) & t[293]) << t[68],
                                    ++s,
                                    a = (a & t[479]) * u + (((a >>> t[52]) * u & t[479]) << t[52]) & t[398],
                                    a = a << t[50] | a >>> t[54],
                                    a = (a & t[479]) * o + (((a >>> t[52]) * o & t[479]) << t[52]) & t[398],
                                    r ^= a,
                                    r = r << t[44] | r >>> t[58],
                                    r = (r & t[479]) * t[20] + (((r >>> t[52]) * t[20] & t[479]) << t[52]) & t[398],
                                    r = (r & t[479]) + t[388] + (((r >>> t[52]) + t[429] & t[479]) << t[52]);
                            switch (a = t[9],
                                n) {
                                case t[13]:
                                    a ^= (e.charCodeAt(s + t[10]) & t[293]) << t[52];
                                case t[10]:
                                    a ^= (e.charCodeAt(s + t[535]) & t[293]) << t[32];
                                case t[535]:
                                    a ^= e.charCodeAt(s) & t[293],
                                        a = (a & t[479]) * u + (((a >>> t[52]) * u & t[479]) << t[52]) & t[398],
                                        a = a << t[50] | a >>> t[54],
                                        a = (a & t[479]) * o + (((a >>> t[52]) * o & t[479]) << t[52]) & t[398],
                                        r ^= a
                            }
                            r ^= e.length,
                                r ^= r >>> t[52],
                                r = (r & t[479]) * t[400] + (((r >>> t[52]) * t[400] & t[479]) << t[52]) & t[398],
                                r ^= r >>> t[44],
                                r = (r & t[479]) * t[343] + (((r >>> t[52]) * t[343] & t[479]) << t[52]) & t[398],
                                r ^= r >>> t[52],
                                e = r >>> t[9],
                                n = [],
                                n.push(e);
                            try {
                                for (var f, c = e + l[0], j = t[9], d = t[9], h = t[9]; h < c.length; h++)
                                    try {
                                        var p = parseInt(c.charAt(h) + l[0])
                                            , j = p || p === t[9] ? j + p : j + t[535];
                                        d++
                                    } catch (y) {
                                        j += t[535],
                                            d++
                                    }
                                d = d == t[9] ? t[535] : d,
                                    f = w(j * t[535] / d, Q);
                                for (var v, g = Math.floor(f / Math.pow(t[37], Q - t[535])), b = e + l[0], m = t[9], _ = t[9], E = t[9], R = t[9], k = t[9]; k < b.length; k++)
                                    try {
                                        var C = parseInt(b.charAt(k) + l[0]);
                                        C || C === t[9] ? C < g ? (_++,
                                            m += C) : (R++,
                                            E += C) : (R++,
                                            E += g)
                                    } catch (O) {
                                        R++,
                                            E += g
                                    }
                                R = R == t[9] ? t[535] : R,
                                    _ = _ == t[9] ? t[535] : _,
                                    v = w(E * t[535] / R - m * t[535] / _, Z),
                                    n.push(T(f, Q, l[42])),
                                    n.push(T(v, Z, l[42]))
                            } catch (I) {
                                n = [],
                                    n.push(e),
                                    n.push(S(Q, l[36]).join(l[0])),
                                    n.push(S(Z, l[36]).join(l[0]))
                            }
                            return n.join(l[0])
                        }
                        function w(e, n) {
                            if (e < t[9] || e >= t[37])
                                throw Error(l[31]);
                            for (var i = S(n, l[42]), r = l[0] + e, o = t[9], a = t[9]; o < i.length && a < r.length; a++)
                                r.charAt(a) != l[39] && (i[o++] = r.charAt(a));
                            return parseInt(i.join(l[0]))
                        }
                        function T(e, t, n) {
                            if (e = l[0] + e,
                            e.length > t)
                                throw Error(u[40]);
                            if (e.length == t)
                                return e;
                            for (var i = [], r = e.length; r < t; r++)
                                i.push(n);
                            return i.push(e),
                                i.join(l[0])
                        }
                        function S(e, n) {
                            if (e <= t[9])
                                return [t[9]];
                            for (var i = [], r = t[9]; r < e; r++)
                                i.push(n);
                            return i
                        }
                        function E(e) {
                            return null == e || void 0 == e
                        }
                        function R(e, t, n) {
                            this.f = e,
                                this.c = t,
                                this.g = !!E(n) || n
                        }
                        function k(e) {
                            if (E(e) || E(e.f) || E(e.c))
                                return !1;
                            try {
                                if (E(window[e.f]))
                                    return !1
                            } catch (t) {
                                return !1
                            }
                            return !0
                        }
                        function C(e, n) {
                            if (E(e))
                                return l[0];
                            for (var i = t[9]; i < e.length; i++) {
                                var r = e[i];
                                if (!E(r) && r.f == n)
                                    return r
                            }
                        }
                        function O() {
                            var n;
                            e: {
                                if (!E(z))
                                    for (n = t[9]; n < z.length; n++) {
                                        var i = z[n];
                                        if (i.g && !k(i)) {
                                            n = i;
                                            break e
                                        }
                                    }
                                n = null
                            }
                            var r;
                            if (E(n)) {
                                try {
                                    r = window.parseFloat(u[133]) === t[378] && window.isNaN(window.parseFloat(u[116]))
                                } catch (o) {
                                    r = !1
                                }
                                if (r) {
                                    var a;
                                    try {
                                        a = window.parseInt(e[74]) === t[267] && window.isNaN(window.parseInt(u[116]))
                                    } catch (f) {
                                        a = !1
                                    }
                                    if (a) {
                                        var c;
                                        try {
                                            c = window.decodeURI(u[161]) === l[25]
                                        } catch (j) {
                                            c = !1
                                        }
                                        if (c) {
                                            var d;
                                            try {
                                                d = window.decodeURIComponent(u[162]) === l[29]
                                            } catch (h) {
                                                d = !1
                                            }
                                            if (d) {
                                                var p;
                                                try {
                                                    p = window.encodeURI(l[25]) === u[161]
                                                } catch (y) {
                                                    p = !1
                                                }
                                                if (p) {
                                                    var v;
                                                    try {
                                                        v = window.encodeURIComponent(l[29]) === u[162]
                                                    } catch (g) {
                                                        v = !1
                                                    }
                                                    if (v) {
                                                        var b;
                                                        try {
                                                            b = window.escape(l[29]) === u[162]
                                                        } catch (m) {
                                                            b = !1
                                                        }
                                                        if (b) {
                                                            var _;
                                                            try {
                                                                _ = window.unescape(u[162]) === l[29]
                                                            } catch (w) {
                                                                _ = !1
                                                            }
                                                            if (_) {
                                                                var T;
                                                                try {
                                                                    T = window.eval(e[55]) === t[267]
                                                                } catch (S) {
                                                                    T = !1
                                                                }
                                                                r = T ? null : C(z, u[124])
                                                            } else
                                                                r = C(z, s[159])
                                                        } else
                                                            r = C(z, e[93])
                                                    } else
                                                        r = C(z, s[18])
                                                } else
                                                    r = C(z, s[4])
                                            } else
                                                r = C(z, s[166])
                                        } else
                                            r = C(z, e[71])
                                    } else
                                        r = C(z, s[45])
                                } else
                                    r = C(z, s[76])
                            } else
                                r = n;
                            return r
                        }
                        function I() {
                            var t = O();
                            if (!E(t))
                                return t.c;
                            try {
                                t = E(window[u[121]]) || E(window[u[121]][e[85]]) ? null : C(z, e[62])
                            } catch (n) {
                                t = null
                            }
                            if (!E(t))
                                return t.c;
                            try {
                                t = E(context) || E(context[u[138]]) ? null : C(z, e[17])
                            } catch (i) {
                                t = null
                            }
                            return E(t) ? null : t.c
                        }
                        function $(e) {
                            for (var n = [], i = t[9]; i < e; i++) {
                                var r = Math.random() * je
                                    , r = Math.floor(r);
                                n.push(ce.charAt(r))
                            }
                            return n.join(l[0])
                        }
                        function X(e) {
                            for (var n = (G[u[160]] || l[0]).split(s[78]), i = t[9]; i < n.length; i++) {
                                var r = n[i].indexOf(u[10]);
                                if (r >= t[9]) {
                                    var o = n[i].substring(r + t[535], n[i].length);
                                    if (n[i].substring(t[9], r) == e)
                                        return window.decodeURIComponent(o)
                                }
                            }
                            return null
                        }
                        function x(i) {
                            var r = [u[88], u[135], u[86], u[61], u[112], u[118], s[6]]
                                , o = l[0];
                            if (null == i || void 0 == i)
                                return i;
                            if (("undefined" == typeof i ? "undefined" : n(i)) == [e[43], u[173], u[74]].join(l[0])) {
                                for (var o = o + u[95], a = t[9]; a < r.length; a++)
                                    if (i.hasOwnProperty(r[a])) {
                                        var f, c = l[30] + r[a] + e[14];
                                        f = l[0] + i[r[a]],
                                            f = null == f || void 0 == f ? f : f.replace(/'/g, s[83]).replace(/"/g, l[25]),
                                            o += c + f + u[144]
                                    }
                                return o.charAt(o.length - t[535]) == l[35] && (o = o.substring(t[9], o.length - t[535])),
                                    o += u[96]
                            }
                            return null
                        }
                        function A(t, n, i, r) {
                            var o = [];
                            o.push(t + u[10] + encodeURIComponent(n)),
                            i && (t = new Date,
                                t = new Date(r),
                                r = t[u[168]](),
                                o.push(s[78]),
                                o.push(u[125]),
                                o.push(e[56]),
                                o.push(e[76]),
                                o.push(e[70]),
                                o.push(r)),
                                o.push(s[78]),
                                o.push(e[53]),
                                o.push(u[169]),
                            null != ge && void 0 != ge && ge != l[0] && (o.push(s[78]),
                                o.push(u[105]),
                                o.push(u[187]),
                                o.push(e[12]),
                                o.push(ge)),
                                G[u[160]] = o.join(l[0])
                        }
                        function P(e) {
                            window[be] = e
                        }
                        function N(e) {
                            window[me] = e
                        }
                        function M(e, n) {
                            for (var i = [], r = t[9]; r < n; r++)
                                i.push(e);
                            return i.join(l[0])
                        }
                        function D(e, t) {
                            var n = X(e);
                            null !== n && void 0 !== n && n !== l[0] || A(e, t, !1)
                        }
                        function L() {
                            var e = X(ue);
                            return null != e && void 0 != e && e != l[0] || (e = window[me]),
                                e
                        }
                        function V() {
                            var e = L();
                            if (null == e || void 0 == e || e == l[0])
                                return !1;
                            try {
                                return !!((e = parseInt(e)) && e >= fe)
                            } catch (t) {
                                return !1
                            }
                        }
                        function B(e) {
                            return null == e || void 0 == e || e == l[0] ? null : (e = e.split(u[7]),
                                e.length < t[10] || !/^[0-9]+$/gi.test(e[1]) ? null : parseInt(e[1]))
                        }
                        function Y() {
                            var e = X(le);
                            return null != e && void 0 != e && e != l[0] || (e = window[be]),
                                e
                        }
                        function F() {
                            var e = Y();
                            return null == e || void 0 == e || e == l[0] ? t[9] : (e = B(e),
                                null == e ? t[9] : e - (de - he) - (new window[s[164]])[u[132]]())
                        }
                        function U(n, i) {
                            var r = new window[s[164]];
                            r[l[22]](r[u[132]]() - t[320]),
                                window[e[81]][u[160]] = null == i || void 0 == i || i == l[0] ? n + u[100] + r[u[168]]() : n + s[0] + i + s[117] + r[u[168]]()
                        }
                        function H() {
                            if (!(null == _e || void 0 == _e || _e.length <= t[9]))
                                for (var e = t[9]; e < _e.length; e++) {
                                    var n = _e[e];
                                    (null != ge && void 0 != ge && ge != l[0] || null != n && void 0 != n && n != l[0]) && ge != n && (U(le, n),
                                        U(ue, n))
                                }
                        }
                        function W() {
                            H(),
                                window[me] = null,
                                window[be] = null;
                            var e = !0
                                , n = {
                                v: u[180]
                            }
                                , h = I();
                            h && (n[s[6]] = h),
                                h = null,
                                n[u[61]] = q;
                            var p = (new window[s[164]])[u[132]]() + de
                                , _ = p + t[302] * t[142] * t[142] * t[68] * t[297] * t[20];
                            n[u[86]] = $(t[13]) + p + $(t[13]);
                            try {
                                var w = new m({
                                    b: ye,
                                    a: pe
                                }).get();
                                console.log("w: ", w);
                                null != w && void 0 != w && w.length > t[9] ? n[u[135]] = w.join(l[35]) : (n[u[135]] = M(l[42], t[37]),
                                    n[u[112]] = l[43],
                                    e = !1)
                            } catch (T) {
                                n[u[135]] = M(l[42], t[37]),
                                    n[u[112]] = l[43],
                                    e = !1
                            }
                            try {
                                var S = h = x(n)
                                    , n = se;
                                if (null == n || void 0 == n)
                                    throw Error(u[73]);
                                null != S && void 0 != S || (S = l[0]);
                                var E, w = S;
                                E = o(null == S ? [] : d(S));
                                var R = d(w + E)
                                    , k = d(n);
                                null == R && (R = []),
                                    E = [];
                                for (var C = t[9]; C < ae; C++) {
                                    var O = Math.random() * t[295]
                                        , O = Math.floor(O);
                                    E[C] = b(O)
                                }
                                var X, k = r(k), k = y(k, r(E)), C = k = r(k);
                                if (null == R || void 0 == R || R.length == t[9])
                                    X = f(ie);
                                else {
                                    var L = R.length
                                        , V = t[9]
                                        , V = L % ie <= ie - oe ? ie - L % ie - oe : ie * t[10] - L % ie - oe
                                        , O = [];
                                    c(R, t[9], O, t[9], L);
                                    for (var B = t[9]; B < V; B++)
                                        O[L + B] = t[9];
                                    c(j(L), t[9], O, L + V, oe),
                                        X = O
                                }
                                if (L = X,
                                null == L || L.length % ie != t[9])
                                    throw Error(u[83]);
                                X = [];
                                for (var Y = t[9], F = L.length / ie, U = t[9]; U < F; U++) {
                                    X[U] = [];
                                    for (var z = t[9]; z < ie; z++)
                                        X[U][z] = L[Y++]
                                }
                                Y = [],
                                    c(E, t[9], Y, t[9], ae);
                                for (var K = X.length, G = t[9]; G < K; G++) {
                                    var J, Q, Z = X[G];
                                    if (null == Z)
                                        Q = null;
                                    else {
                                        for (var ee = b(t[92]), F = [], te = Z.length, ne = t[9]; ne < te; ne++)
                                            F.push(v(Z[ne], ee));
                                        Q = F
                                    }
                                    var re;
                                    if (F = Q,
                                    null == F)
                                        re = null;
                                    else {
                                        for (var ce = b(t[91]), U = [], je = F.length, ve = t[9]; ve < je; ve++)
                                            U.push(v(F[ve], ce--));
                                        re = U
                                    }
                                    if (F = re,
                                    null == F)
                                        J = null;
                                    else {
                                        for (var ge = b(t[110]), U = [], _e = F.length, we = t[9]; we < _e; we++)
                                            U.push(g(F[we], ge++));
                                        J = U
                                    }
                                    var Te, Se = y(J, k);
                                    if (F = Se,
                                        U = C,
                                    null == F)
                                        Te = null;
                                    else if (null == U)
                                        Te = F;
                                    else {
                                        for (var z = [], Ee = U.length, Re = t[9], ke = F.length; Re < ke; Re++)
                                            z[Re] = b(F[Re] + U[Re % Ee]);
                                        Te = z
                                    }
                                    var Se = y(Te, C)
                                        , Ce = i(Se)
                                        , Ce = i(Ce);
                                    c(Ce, t[9], Y, G * ie + ae, ie),
                                        C = Ce
                                }
                                var Oe;
                                if (null == Y || void 0 == Y)
                                    Oe = null;
                                else if (Y.length == t[9])
                                    Oe = l[0];
                                else {
                                    var Ie = t[13];
                                    try {
                                        for (var K = [], $e = t[9]; $e < Y.length; ) {
                                            if (!($e + Ie <= Y.length)) {
                                                K.push(a(Y, $e, Y.length - $e));
                                                break
                                            }
                                            K.push(a(Y, $e, Ie)),
                                                $e += Ie
                                        }
                                        Oe = K.join(l[0])
                                    } catch (Xe) {
                                        throw Error(u[64])
                                    }
                                }
                                h = Oe
                            } catch (xe) {
                                h = x({
                                    ec: l[44],
                                    em: xe.message
                                }),
                                    e = !1
                            }
                            debugger;
                            h = h + u[7] + p,
                                A(le, h, e, _),
                                D(le, h),
                                P(h),
                                A(ue, fe, e, _),
                                D(ue, fe),
                                N(fe),
                            window[u[77]] && window[u[77]](W, he),
                            console.log("h: ", h),
                            console.log("u[7]: ", u[7]),
                            console.log("p: ", p);
                        }
                        R.prototype = {
                            toString: function() {
                                return s[80] + this.f + u[117] + this.c + s[103] + this.g + u[96]
                            }
                        };
                        var z = [new R(s[54],l[13]), new R(e[81],l[14]), new R(e[117],l[11]), new R(s[52],l[12]), new R(s[126],l[10]), new R(e[9],l[9]), new R(l[2],l[20]), new R(u[188],l[23]), new R(s[105],l[6]), new R(s[76],s[151]), new R(s[45],s[149]), new R(e[71],s[150]), new R(s[166],s[146]), new R(s[4],s[148]), new R(s[18],s[143]), new R(e[93],s[145]), new R(s[159],s[152]), new R(u[124],s[155]), new R(e[5],s[114],!1), new R(e[46],s[115],!1), new R(u[121],s[112],!1), new R(e[62],s[113],!1), new R(e[17],s[131],!1)]
                            , K = !O()
                            , q = window && window[s[52]] && window[s[52]].host || e[103]
                            , G = window[e[81]]
                            , J = window[e[117]]
                            , Q = t[10]
                            , Z = t[10]
                            , ee = [l[42], l[43], l[44], l[45], l[46], u[0], u[1], u[3], u[5], u[6], u[50], u[52], u[54], u[56], u[58], u[59]]
                            , te = [t[9], t[371], t[377], t[515], t[442], t[310], t[488], t[337], t[455], t[536], t[304], t[454], t[489], t[457], t[408], t[34], t[448], t[357], t[527], t[395], t[432], t[287], t[360], t[504], t[484], t[486], t[469], t[327], t[533], t[405], t[291], t[420], t[467], t[23], t[363], t[496], t[319], t[347], t[540], t[384], t[413], t[434], t[168], t[436], t[300], t[494], t[462], t[330], t[501], t[325], t[475], t[349], t[352], t[393], t[373], t[522], t[518], t[452], t[416], t[28], t[401], t[513], t[313], t[439], t[464], t[431], t[41], t[410], t[542], t[499], t[456], t[306], t[314], t[250], t[339], t[491], t[374], t[389], t[516], t[379], t[409], t[531], t[422], t[292], t[490], t[480], t[329], t[471], t[294], t[426], t[506], t[361], t[362], t[444], t[397], t[528], t[497], t[289], t[331], t[463], t[437], t[406], t[438], t[184], t[348], t[311], t[385], t[541], t[27], t[459], t[498], t[364], t[514], t[391], t[440], t[315], t[453], t[510], t[31], t[417], t[396], t[344], t[523], t[375], t[328], t[492], t[350], t[476], t[474], t[326], t[445], t[483], t[290], t[424], t[335], t[412], t[530], t[394], t[509], t[356], t[359], t[508], t[472], t[298], t[308], t[451], t[133], t[534], t[407], t[47], t[303], t[466], t[381], t[512], t[382], t[368], t[487], t[342], t[334], t[318], t[419], t[22], t[521], t[449], t[312], t[443], t[383], t[519], t[478], t[346], t[503], t[323], t[372], t[526], t[336], t[402], t[277], t[435], t[414], t[430], t[460], t[333], t[124], t[502], t[366], t[495], t[468], t[16], t[539], t[390], t[301], t[354], t[507], t[358], t[296], t[341], t[392], t[529], t[355], t[322], t[423], t[288], t[411], t[376], t[324], t[473], t[482], t[26], t[340], t[485], t[316], t[353], t[511], t[380], t[367], t[403], t[45], t[404], t[465], t[317], t[450], t[307], t[532], t[299], t[525], t[370], t[399], t[338], t[345], t[477], t[321], t[505], t[441], t[309], t[517], t[386], t[18], t[418], t[447], t[524], t[387], t[538], t[351], t[305], t[493], t[365], t[11], t[470], t[332], t[458], t[500], t[151], t[433], t[226], t[427], t[415]]
                            , ne = [t[35], t[193], t[120], t[138], t[251], t[227], t[134], t[275], t[209], t[51], t[50], t[10], t[167], t[217], t[176], t[96], t[135], t[117], t[177], t[72], t[259], t[142], t[201], t[36], t[234], t[42], t[159], t[225], t[147], t[104], t[56], t[76], t[268], t[39], t[84], t[108], t[178], t[210], t[92], t[218], t[17], t[139], t[219], t[194], t[220], t[202], t[211], t[235], t[46], t[203], t[179], t[204], t[260], t[152], t[44], t[21], t[78], t[261], t[19], t[185], t[74], t[100], t[140], t[105], t[195], t[116], t[169], t[242], t[150], t[73], t[153], t[85], t[252], t[9], t[93], t[228], t[205], t[118], t[276], t[196], t[101], t[236], t[12], t[269], t[106], t[253], t[212], t[186], t[83], t[154], t[229], t[48], t[155], t[119], t[156], t[254], t[230], t[197], t[59], t[237], t[157], t[170], t[88], t[180], t[109], t[75], t[243], t[244], t[112], t[143], t[198], t[107], t[129], t[70], t[158], t[89], t[110], t[125], t[255], t[94], t[171], t[206], t[187], t[121], t[86], t[97], t[188], t[189], t[199], t[245], t[43], t[141], t[231], t[181], t[113], t[278], t[90], t[535], t[221], t[49], t[136], t[246], t[238], t[213], t[126], t[40], t[256], t[60], t[239], t[172], t[146], t[160], t[98], t[130], t[262], t[279], t[257], t[267], t[37], t[182], t[270], t[33], t[173], t[62], t[214], t[54], t[144], t[63], t[240], t[280], t[57], t[281], t[55], t[127], t[38], t[183], t[69], t[64], t[271], t[215], t[71], t[222], t[247], t[65], t[66], t[161], t[282], t[284], t[114], t[99], t[537], t[13], t[61], t[232], t[162], t[233], t[20], t[263], t[272], t[111], t[122], t[95], t[102], t[68], t[190], t[80], t[191], t[148], t[103], t[216], t[207], t[25], t[128], t[283], t[149], t[77], t[248], t[58], t[123], t[249], t[163], t[164], t[79], t[174], t[223], t[208], t[145], t[165], t[166], t[264], t[14], t[192], t[200], t[29], t[87], t[131], t[82], t[273], t[274], t[241], t[258], t[115], t[81], t[265], t[132], t[67], t[266], t[53], t[30], t[24], t[91], t[52], t[224], t[137], t[175], t[32]]
                            , ie = t[158]
                            , re = t[158]
                            , oe = t[17]
                            , ae = t[17]
                            , se = s[128]
                            , le = l[18]
                            , ue = e[114]
                            , fe = t[87]
                            , ce = e[27]
                            , je = ce.length
                            , de = t[428]
                            , he = t[520]
                            , pe = !1
                            , ye = !1
                            , ve = window && window[s[52]] && window[s[52]][e[61]] || s[82]
                            , ge = l[0]
                            , ge = function(e, n) {
                            if (null == e || void 0 == e || e == l[0] || null == n || void 0 == n || n.length <= t[9])
                                return null;
                            n = n.split(u[9]);
                            for (var i = t[9]; i < n.length; i++) {
                                var r = new RegExp(n[i].replace(/\./g, s[87]) + l[26]);
                                if (null != e.match(r) || null != (l[39] + e).match(r))
                                    return n[i]
                            }
                            return null
                        }(ve, ge)
                            , be = le.replace(/[^a-zA-Z0-9$]/g, l[0]).toLowerCase()
                            , me = ue.replace(/[^a-zA-Z0-9$]/g, l[0]).toLowerCase()
                            , _e = function(e) {
                            var n = [];
                            if (!e)
                                return n;
                            e = e.split(l[39]);
                            for (var i = l[0], r = t[9]; r < e.length; r++)
                                r < e.length - t[535] && (i = l[39] + e[e.length - t[535] - r] + i,
                                    n.push(i));
                            return n
                        }(ve);
                        _e.push(null),
                            _e.push(l[39] + ve),
                        function(e) {
                            for (var n = t[9], i = (G[u[160]] || l[0]).split(s[78]), r = t[9]; r < i.length; r++) {
                                var o = i[r].indexOf(u[10]);
                                o >= t[9] && i[r].substring(t[9], o) == e && (n += t[535])
                            }
                            return n
                        }(le) > t[535] && H(),
                            function() {
                                var e = Y();
                                if (null == e || void 0 == e || e == l[0])
                                    e = !1;
                                else {
                                    var t;
                                    (t = V()) && (e = B(e),
                                        t = !(null == e || isNaN(e) || e - (new window[s[164]])[u[132]]() <= de - he)),
                                        e = t
                                }
                                return e
                            }() ? (P(Y()),
                                N(L()),
                                ve = F(),
                            window[u[77]] && window[u[77]](W, ve)) : W()
                    }()
                }()
            }()
        }()
    }
    , function(module, exports) {
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
        ;
        "object" !== ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) && (JSON = {}),
            function() {
                "use strict";
                function f(e) {
                    return e < 10 ? "0" + e : e
                }
                function this_value() {
                    return this.valueOf()
                }
                function quote(e) {
                    return rx_escapable.lastIndex = 0,
                        rx_escapable.test(e) ? '"' + e.replace(rx_escapable, function(e) {
                            var t = meta[e];
                            return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                        }) + '"' : '"' + e + '"'
                }
                function str(e, t) {
                    var n, i, r, o, a, s = gap, l = t[e];
                    switch (l && "object" === ("undefined" == typeof l ? "undefined" : _typeof(l)) && "function" == typeof l.toJSON && (l = l.toJSON(e)),
                    "function" == typeof rep && (l = rep.call(t, e, l)),
                        "undefined" == typeof l ? "undefined" : _typeof(l)) {
                        case "string":
                            return quote(l);
                        case "number":
                            return isFinite(l) ? String(l) : "null";
                        case "boolean":
                        case "null":
                            return String(l);
                        case "object":
                            if (!l)
                                return "null";
                            if (gap += indent,
                                a = [],
                            "[object Array]" === Object.prototype.toString.apply(l)) {
                                for (o = l.length,
                                         n = 0; n < o; n += 1)
                                    a[n] = str(n, l) || "null";
                                return r = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + s + "]" : "[" + a.join(",") + "]",
                                    gap = s,
                                    r
                            }
                            if (rep && "object" === ("undefined" == typeof rep ? "undefined" : _typeof(rep)))
                                for (o = rep.length,
                                         n = 0; n < o; n += 1)
                                    "string" == typeof rep[n] && (i = rep[n],
                                        r = str(i, l),
                                    r && a.push(quote(i) + (gap ? ": " : ":") + r));
                            else
                                for (i in l)
                                    Object.prototype.hasOwnProperty.call(l, i) && (r = str(i, l),
                                    r && a.push(quote(i) + (gap ? ": " : ":") + r));
                            return r = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + s + "}" : "{" + a.join(",") + "}",
                                gap = s,
                                r
                    }
                }
                var rx_one = /^[\],:{}\s]*$/
                    , rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g
                    , rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g
                    , rx_four = /(?:^|:|,)(?:\s*\[)+/g
                    , rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
                    , rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
                }
                    ,
                    Boolean.prototype.toJSON = this_value,
                    Number.prototype.toJSON = this_value,
                    String.prototype.toJSON = this_value);
                var gap, indent, meta, rep;
                "function" != typeof JSON.stringify && (meta = {
                        "\b": "\\b",
                        "\t": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    },
                        JSON.stringify = function(e, t, n) {
                            var i;
                            if (gap = "",
                                indent = "",
                            "number" == typeof n)
                                for (i = 0; i < n; i += 1)
                                    indent += " ";
                            else
                                "string" == typeof n && (indent = n);
                            if (rep = t,
                            t && "function" != typeof t && ("object" !== ("undefined" == typeof t ? "undefined" : _typeof(t)) || "number" != typeof t.length))
                                throw new Error("JSON.stringify");
                            return str("", {
                                "": e
                            })
                        }
                ),
                "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
                        function walk(e, t) {
                            var n, i, r = e[t];
                            if (r && "object" === ("undefined" == typeof r ? "undefined" : _typeof(r)))
                                for (n in r)
                                    Object.prototype.hasOwnProperty.call(r, n) && (i = walk(r, n),
                                        void 0 !== i ? r[n] = i : delete r[n]);
                            return reviver.call(e, t, r)
                        }
                        var j;
                        if (text = String(text),
                            rx_dangerous.lastIndex = 0,
                        rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(e) {
                            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                        })),
                            rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")))
                            return j = eval("(" + text + ")"),
                                "function" == typeof reviver ? walk({
                                    "": j
                                }, "") : j;
                        throw new SyntaxError("JSON.parse")
                    }
                )
            }()
    }
    , function(e, t) {
        e.exports = function(e, t) {
            function n() {}
            n.prototype = t.prototype,
                e.prototype = new n,
                e.prototype.constructor = e
        }
    }
    , function(e, t) {
        Array.isArray || (Array.isArray = function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
        )
    }
    , function(e, t) {
        "function" != typeof Object.assign && (Object.assign = function(e) {
                if (null == e)
                    throw new TypeError("Cannot convert undefined or null to object");
                e = Object(e);
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    if (null != n)
                        for (var i in n)
                            Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                }
                return e
            }
        )
    }
    , function(e, t) {
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
        ;
        Object.keys || (Object.keys = function() {
            "use strict";
            var e = Object.prototype.hasOwnProperty
                , t = !{
                toString: null
            }.propertyIsEnumerable("toString")
                , i = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]
                , r = i.length;
            return function(o) {
                if ("function" != typeof o && ("object" !== ("undefined" == typeof o ? "undefined" : n(o)) || null === o))
                    throw new TypeError("Object.keys called on non-object");
                var a, s, l = [];
                for (a in o)
                    e.call(o, a) && l.push(a);
                if (t)
                    for (s = 0; s < r; s++)
                        e.call(o, i[s]) && l.push(i[s]);
                return l
            }
        }())
    }
    , function(e, t) {
        Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
                var n;
                if (null == this)
                    throw new TypeError('"this" is null or not defined');
                var i = Object(this)
                    , r = i.length >>> 0;
                if (0 === r)
                    return -1;
                var o = +t || 0;
                if (Math.abs(o) === 1 / 0 && (o = 0),
                o >= r)
                    return -1;
                for (n = Math.max(o >= 0 ? o : r - Math.abs(o), 0); n < r; ) {
                    if (n in i && i[n] === e)
                        return n;
                    n++
                }
                return -1
            }
        )
    }
    , function(e, t) {
        Array.prototype.map || (Array.prototype.map = function(e, t) {
                var n, i, r;
                if (null == this)
                    throw new TypeError(" this is null or not defined");
                var o = Object(this)
                    , a = o.length >>> 0;
                if ("[object Function]" !== Object.prototype.toString.call(e))
                    throw new TypeError(e + " is not a function");
                for (t && (n = t),
                         i = new Array(a),
                         r = 0; r < a; ) {
                    var s, l;
                    r in o && (s = o[r],
                        l = e.call(n, s, r, o),
                        i[r] = l),
                        r++
                }
                return i
            }
        )
    }
    , function(e, t) {
        Function.prototype.bind || (Function.prototype.bind = function(e) {
                if ("function" != typeof this)
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                var t = Array.prototype.slice.call(arguments, 1)
                    , n = this
                    , i = function() {}
                    , r = function() {
                    return n.apply(this instanceof i ? this : e, t.concat(Array.prototype.slice.call(arguments)))
                };
                return this.prototype && (i.prototype = this.prototype),
                    r.prototype = new i,
                    r
            }
        )
    }
    , function(e, t, n) {
        n(46),
            n(52),
            n(51),
            n(48),
            n(50),
            n(49),
            n(55),
            n(53)
    }
    , function(e, t) {
        String.prototype.trim || (String.prototype.trim = function() {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            }
        )
    }
    , function(e, t, n) {
        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
                e
        }
        function r(e, t) {
            var n = e.apiServer
                , i = e.protocol
                , r = "/api/v2" + t;
            return Array.isArray(n) ? n.map(function(e) {
                return X({
                    protocol: i,
                    host: e,
                    path: r
                })
            }) : X({
                protocol: i,
                host: n,
                path: r
            })
        }
        function o(e, t, n) {
            var i = e || !t && new Error('Server error, "res" is not right.(' + n + ")") || t.error && new Error(t.error + ": " + t.msg + ".(" + n + ")") || null;
            return !e && t && t.error ? i.code = B : !e && t || (i.code = V),
                i
        }
        function a(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 256;
            return null == e ? "" : String($.isFn(e) ? e() : e).substring(0, t)
        }
        function s() {
            var e = $.uuid(32);
            return A(e)
        }
        var l, u, f = n(4), c = f.INVOKE_HOOK, j = f.EVENT_RESET, d = f.SWITCH_TYPE, h = f.SET_TYPE, p = f.SWITCH_LOAD_STATUS, y = f.UPDATE_VERIFY_STATUS, v = f.REFRESH, g = f.UPDATE_COUNTS_OF_VERIFYERROR, b = f.SET_TOKEN, m = f.EVENT_RESET_CLASSIC, _ = n(12), w = _.FETCH_CAPTCHA, T = _.FETCH_INTELLISENSE_CAPTCHA, S = _.VERIFY_CAPTCHA, E = _.VERIFY_INTELLISENSE_CAPTCHA, R = _.RESET_STATE, k = n(3), C = k.CAPTCHA_TYPE, O = k.DEVICE, I = n(2), $ = n(1), X = n(16), x = n(8), A = x.eypt, P = n(36), N = n(7), M = N.createNetCollect, D = n(5), L = D.UNPASS_ERROR, V = D.REQUEST_API_ERROR, B = D.BUSINESS_ERROR, Y = I.isMobile ? O.TOUCH : I.supportTouch ? O.MOUSE_TOUCH : O.MOUSE, F = {
            state: {
                version: "2.14.0",
                fingerprint: "",
                config: null,
                langPkg: null,
                captchaType: null,
                type: "",
                load: null,
                verifyStatus: "",
                token: "",
                previousToken: "",
                countsOfVerifyError: 0
            },
            mutations: (l = {},
                i(l, c, function() {}),
                i(l, j, function() {}),
                i(l, m, function() {}),
                i(l, d, function(e, t) {
                    e.captchaType = t.captchaType
                }),
                i(l, h, function(e, t) {
                    e.type = t.captchaType
                }),
                i(l, p, function(e, t) {
                    e.load = t
                }),
                i(l, y, function(e, t) {
                    e.verifyStatus = t.verifyStatus
                }),
                i(l, v, function(e) {
                    e.load = null,
                        e.verifyStatus = ""
                }),
                i(l, g, function(e, t) {
                    e.countsOfVerifyError = t.counts
                }),
                i(l, b, function(e, t) {
                    t && (e.previousToken = t),
                        e.token = t
                }),
                l),
            actions: (u = {},
                i(u, R, function(e) {
                    var t = e.commit;
                    t(d, {
                        captchaType: null
                    }),
                        t(p, null),
                        t(y, {
                            verifyStatus: ""
                        }),
                        t(b, ""),
                        t(g, {
                            counts: 0
                        })
                }),
                i(u, w, function(e, t) {
                    var n = e.commit
                        , i = e.state
                        , a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}
                        , l = i.fingerprint
                        , u = i.version
                        , f = i.$fetch
                        , j = i.captchaCollector
                        , y = i.config
                        , v = y.apiServer
                        , g = y.captchaId
                        , m = y.protocol
                        , _ = y.captchaType
                        , w = y.ipv6
                        , T = y.runEnv
                        , S = y.group
                        , E = y.scene
                        , R = Object.assign({
                        id: g,
                        fp: l,
                        https: "https" === m,
                        type: _,
                        version: u,
                        dpr: window.devicePixelRatio || 1,
                        dev: Y,
                        cb: s(),
                        ipv6: w,
                        runEnv: T,
                        group: S,
                        scene: E
                    }, t)
                        , k = r({
                        apiServer: v,
                        protocol: m
                    }, "/get");
                    n(p, {
                        status: "loading"
                    }),
                        f(k, R, function(e, t) {
                            if (e = o(e, t, k)) {
                                var r = new D(e.code,e.message,{
                                    url: k,
                                    api: "get"
                                });
                                return a(r),
                                    n(p, {
                                        status: "fail",
                                        data: r
                                    }),
                                    void n(c, {
                                        name: "onError",
                                        args: [r]
                                    })
                            }
                            a(null, t);
                            var s = t.data;
                            s.type !== C.INTELLISENSE && s.type !== i.captchaType && n(d, {
                                captchaType: s.type,
                                prevCaptchaType: i.captchaType
                            }),
                                n(h, {
                                    captchaType: s.type
                                }),
                                n(b, s.token),
                                n(p, {
                                    status: "loading",
                                    data: s
                                })
                        }, {
                            onProcess: M(j)
                        })
                }),
                i(u, T, function(e, t) {
                    var n = e.commit
                        , i = e.state
                        , a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}
                        , l = i.fingerprint
                        , u = i.version
                        , f = i.$fetch
                        , j = i.captchaCollector
                        , d = i.config
                        , p = d.apiServer
                        , y = d.captchaId
                        , v = d.protocol
                        , g = d.captchaType
                        , m = d.ipv6
                        , _ = d.runEnv
                        , w = d.group
                        , T = d.scene
                        , S = r({
                        apiServer: p,
                        protocol: v
                    }, "/get");
                    f(S, {
                        id: y,
                        fp: l,
                        https: "https" === v,
                        type: g,
                        width: t.width,
                        version: u,
                        dpr: window.devicePixelRatio || 1,
                        dev: Y,
                        cb: s(),
                        ipv6: m,
                        runEnv: _,
                        group: w,
                        scene: T
                    }, function(e, t) {
                        if (e = o(e, t, S)) {
                            var i = new D(e.code,e.message,{
                                url: S,
                                api: "get"
                            });
                            return n(c, {
                                name: "onError",
                                args: [i]
                            }),
                                void a(i)
                        }
                        n(h, {
                            captchaType: C.INTELLISENSE
                        }),
                            n(b, t.data.token),
                            a(null, t)
                    }, {
                        onProcess: M(j)
                    })
                }),
                i(u, E, function(e, t, n) {
                    var i = e.commit
                        , l = e.state
                        , u = l.version
                        , f = l.type
                        , j = l.$fetch
                        , d = l.captchaCollector
                        , h = l.config
                        , p = h.apiServer
                        , y = h.captchaId
                        , v = h.protocol
                        , g = h.extraData
                        , b = h.runEnv
                        , m = Object.assign({
                        id: y,
                        version: u,
                        cb: s(),
                        extraData: a(g),
                        runEnv: b
                    }, t)
                        , _ = r({
                        apiServer: p,
                        protocol: v
                    }, "/check");
                    j(_, m, function(e, t) {
                        if (e = o(e, t, _),
                            e ? e = new D(e.code,e.message,{
                                url: _,
                                token: m.token,
                                type: f
                            }) : $.getIn(t, "data.result") || (e = new D(L,"Failed to verify captcha.",{
                                url: _,
                                type: f,
                                token: m.token
                            })),
                            e)
                            i(c, {
                                name: "onVerify",
                                args: [e]
                            });
                        else {
                            var r = l.fingerprint
                                , a = P(A(t.data.validate + "::" + r));
                            i(c, {
                                name: "onVerify",
                                args: [null, {
                                    validate: a
                                }]
                            })
                        }
                        n && n(e, t)
                    }, {
                        onProcess: M(d, {
                            token: m.token
                        })
                    })
                }),
                i(u, S, function(e, t) {
                    var n = e.commit
                        , i = e.state
                        , l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}
                        , u = i.fingerprint
                        , f = i.captchaType
                        , j = i.version
                        , d = i.verifyStatus
                        , h = i.countsOfVerifyError
                        , p = i.$fetch
                        , v = i.type
                        , b = i.captchaCollector
                        , m = i.config
                        , _ = m.apiServer
                        , w = m.captchaId
                        , T = m.protocol
                        , S = m.extraData
                        , E = m.runEnv
                        , R = t.token
                        , k = t.data
                        , O = t.width
                        , I = t.acToken
                        , $ = r({
                        apiServer: _,
                        protocol: T
                    }, "/check");
                    n(y, {
                        verifyStatus: "verifying"
                    });
                    var X = function(e, t) {
                        var i = t && t.data;
                        if (e = o(e, t, $),
                            !(["success", "error"].indexOf(d) > -1)) {
                            if (e || !i.result && f !== C.SMS) {
                                var r = e ? e.message : "Failed to verify captcha."
                                    , a = e ? e.code : L;
                                return e = new D(a,r,{
                                    url: $,
                                    token: R,
                                    type: v,
                                    counts: h + 1
                                }),
                                    n(y, {
                                        verifyStatus: "error",
                                        error: e
                                    }),
                                    n(g, {
                                        counts: h + 1
                                    }),
                                    n(c, {
                                        name: "onVerify",
                                        args: [e]
                                    }),
                                    void l(e)
                            }
                            if (i.result) {
                                var s = P(A(i.validate + "::" + u));
                                n(y, {
                                    verifyStatus: "success",
                                    validate: i.validate
                                }),
                                    n(c, {
                                        name: "onVerify",
                                        args: [null, {
                                            validate: s
                                        }]
                                    }),
                                    l(null, t)
                            }
                        }
                    };
                    p($, {
                        id: w,
                        token: R,
                        acToken: I,
                        data: k,
                        width: O,
                        type: f,
                        version: j,
                        cb: s(),
                        extraData: a(S),
                        runEnv: E
                    }, X, {
                        onProcess: M(b, {
                            token: R
                        })
                    })
                }),
                u)
        };
        e.exports = F
    }
    , function(e, t) {
        e.exports = '<div\n  class="yidun <%= \'yidun--\' + theme %> <%= \'yidun--\' + mode %>"\n  style="width: <%= width %>; min-width: <%= minWidth %>">\n  <div\n    class="yidun_panel"\n    <% if (mode === \'float\') { %>\n    style="<%= customStyles.imagePanel.align === \'top\'\n    ? \'bottom: \' + customStyles.controlBar.height + \'; padding-bottom: \' + customStyles.gap\n    : \'top: \' + customStyles.controlBar.height + \'; padding-top: \' + customStyles.gap %>"\n    <% } else { %>\n    style="padding-bottom: <%= customStyles.gap %>"\n    <% } %>\n    >\n    <div class="yidun_panel-placeholder">\n      <% if (mode === \'float\') { %>\n      <iframe class="yidun_cover-frame"></iframe>\n      <% } %>\n      <div class="yidun_bgimg" style="border-radius: <%= customStyles.imagePanel.borderRadius %>">\n        <img class="yidun_bg-img" style="border-radius: <%= customStyles.imagePanel.borderRadius %>"/>\n        <img class="yidun_jigsaw"/>\n        <% for (var i in inferences) { %>\n          <% if (inferences.hasOwnProperty(i)) { %>\n          <div class="yidun_inference <%= \'yidun_inference--\' + i %>" draggable="true">\n            <img class="yidun_inference__img" draggable="false" />\n            <span class="yidun_inference__border"></span>\n          </div>\n          <% } %>\n        <% } %>\n      </div>\n      <div class="yidun_loadbox" style="border-radius: <%= customStyles.imagePanel.borderRadius %>">\n        <div class="yidun_loadbox__inner">\n          <div class="yidun_loadicon"></div>\n          <span class="yidun_loadtext"><%= langPkg[\'loading\'] %></span>\n        </div>\n      </div>\n      <div class="yidun_top">\n        <% if (feedback.enable) { %>\n        <a class="yidun_feedback" href="<%= feedback.url + \'?captchaId=\' + captchaId %>"  target="_blank"></a>\n        <% } %>\n        <div class="yidun_refresh"></div>\n      </div>\n    </div>\n  </div>\n  <div\n    class="yidun_control"\n    style="height: <%= customStyles.controlBar.height %>; border-radius: <%= customStyles.controlBar.borderRadius %>">\n    <div class="yidun_slide_indicator" style="height: <%= customStyles.controlBar.height %>; border-radius: <%= customStyles.controlBar.borderRadius %>"></div>\n    <div class="yidun_slider" style="width: <%= customStyles.controlBar.height %>; border-radius: <%= customStyles.controlBar.borderRadius %>">\n      <!-- 分支二兼容旧接口 -->\n      <% if (customStyles.icon.slider) { %>\n      <img src="<%= customStyles.icon.slider %>" class="yidun_slider__icon" />\n      <% } else if (customStyles.controlBar.slideIcon || customStyles.controlBar.slideIconSuccess || customStyles.controlBar.slideIconError || customStyles.controlBar.slideIconMoving) { %>\n      <span class="yidun_slider__icon"></span>\n      <img src="<%= customStyles.controlBar.slideIcon %>" class="yidun_slider__icon yidun_slider__icon--img" />\n      <% } else { %>\n      <span class="yidun_slider__icon"></span>\n      <% } %>\n    </div>\n    <div class="yidun_tips" style="line-height: <%= customStyles.controlBar.height %>">\n      <span class="yidun_tips__icon"></span>\n      <span class="yidun_tips__text yidun-fallback__tip"></span>\n      <div class="yidun_tips__answer">\n        <span class="yidun_tips__point"></span>\n        <img class="yidun_tips__img" />\n      </div>\n    </div>\n  </div>\n</div>\n'
    }
    , function(e, t) {
        e.exports = '<div class="yidun_intellisense <%= \'yidun_intellisense--\' + theme %>" style="display: none">\n  <div class="yidun_intelli-control">\n    <div class="yidun_intelli-tips">\n      <div class="yidun_intelli-icon">\n        <% if (icon.intellisenseLogo) { %>\n          <img src="<%= icon.intellisenseLogo%>" class="yidun_logo" />\n        <% } else { %>\n          <span class="yidun_logo"></span>\n        <% } %>\n        <span class="yidun_intelli-loading"></span>\n        <div class="yidun_ball-scale-multiple">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n      <span class="yidun_intelli-text"><%= langPkg.intellisense.normal %></span>\n    </div>\n    <div class="yidun_classic-tips">\n      <span class="yidun_tips__icon"></span>\n      <span class="yidun_tips__text yidun-fallback__tip"></span>\n    </div>\n  </div>\n  <div class="yidun_classic-container">\n    <iframe class="yidun_cover-frame"></iframe>\n    <div class="yidun_classic-wrapper" style="display: <%= classicVisible ? \'block\' : \'none\' %>"></div>\n  </div>\n</div>\n'
    }
    , function(e, t) {
        e.exports = '<div\n  class="<%= \'yidun_popup--\' + theme %> yidun_popup <%= topIsNotAuto ? \'\' : \'yidun_popup--auto\' %> <%= appendTo ? \'yidun_popup--append\' : \'\' %>"\n  style="display: none">\n  <!-- iframe用于遮挡页面中object、embed、select等元素 -->\n  <iframe class="yidun_cover-frame"></iframe>\n  <div class="yidun_popup__mask"></div>\n  <div class="yidun_modal__wrap">\n    <div class="yidun_modal__subwrap">\n      <div \n        class="yidun_modal"\n        style="<% if (topIsNotAuto) { %> top: <%= top %>; <% } %> <% if (widthIsNotAuto) { %> width: <%= width %>; <% } %>">\n        <div\n          class="yidun_modal__title"\n          style="height: <%= popupStyles.capBarHeight %>px;line-height: <%= popupStyles.capBarHeight %>px;">\n          <%= langPkg[\'popupTitle\'] %>\n          <% if (!enableClose) { %>\n            <span\n              class="yidun_modal__close"\n              style="top: <%= (popupStyles.capBarHeight - 24) / 2 %>px">\n              <span class="yidun_icon-close"></span>\n            </span>\n          <% } %>\n        </div>\n        <div\n          class="yidun_modal__body"\n          style="padding: <%= popupStyles.capPadding %>px;">\n          <captcha-core :intellisense="intellisense" :autoWidth="widthIsNotAuto" :enableColor="false"></captcha-core>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n'
    }
    , function(e, t) {
        function n(e, t) {
            for (var n in t)
                e.setAttribute(n, t[n])
        }
        function i(e, t) {
            e.onload = function() {
                this.onerror = this.onload = null,
                    t(null, e)
            }
                ,
                e.onerror = function() {
                    this.onerror = this.onload = null,
                        t(new Error("Failed to load " + this.src), e)
                }
        }
        function r(e, t) {
            e.onreadystatechange = function() {
                "complete" != this.readyState && "loaded" != this.readyState || (this.onreadystatechange = null,
                    t(null, e))
            }
        }
        e.exports = function(e, t, o) {
            var a = document.head || document.getElementsByTagName("head")[0]
                , s = document.createElement("script");
            "function" == typeof t && (o = t,
                t = {}),
                t = t || {},
                o = o || function() {}
                ,
                s.type = t.type || "text/javascript",
                s.charset = t.charset || "utf8",
                s.async = !("async"in t) || !!t.async,
                s.src = e,
            t.attrs && n(s, t.attrs),
            t.text && (s.text = "" + t.text);
            var l = "onload"in s ? i : r;
            l(s, o),
            s.onload || i(s, o),
                a.appendChild(s)
        }
    }
]);
