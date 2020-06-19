function SSOController() {
    var undefined, me = this, updateCookieTimer = null, updateCookieTimeHardLimit = 1800, cookieExpireTimeLength = 86400, crossDomainForward = null, crossDomainTimer = null, crossDomainTime = 3, autoLoginCallBack2 = null, ssoCrosssDomainUrl = "https://login.sina.com.cn/sso/crossdomain.php", ssoLoginUrl = "https://login.sina.com.cn/sso/login.php", ssoLogoutUrl = "https://login.sina.com.cn/sso/logout.php", ssoUpdateCookieUrl = "https://login.sina.com.cn/sso/updatetgt.php", ssoPreLoginUrl = "https://login.sina.com.cn/sso/prelogin.php", pincodeUrl = "https://login.sina.com.cn/cgi/pin.php", vfValidUrl = "http://weibo.com/sguide/vdun.php", generateVisitorUrl = "https://passport.weibo.com/visitor/visitor", crossDomainUrlList = null, loginMethod = "", ssoServerTimeTimer = null, ssoLoginTimer = null, loginByConfig = null, loginMethodCheck = null, https = 1, rsa = 2, wsse = 4, pcid = "", tmpData = {}, preloginTimeStart = 0, preloginTime = 0, callbackLogoutStatus;
    this.https = 1;
    this.rsa = 2;
    this.wsse = 4;
    this.name = "sinaSSOController";
    this.loginFormId = "ssoLoginForm";
    this.scriptId = "ssoLoginScript";
    this.ssoCrossDomainScriptId = "ssoCrossDomainScriptId";
    this.loginFrameName = "ssoLoginFrame";
    this.appLoginURL = {
        "weibo.com": "https://passport.weibo.com/wbsso/login"
    };
    this.appDomainService = {
        "weibo.com": "miniblog"
    };
    this.loginExtraQuery = {};
    this.setDomain = !1;
    this.feedBackUrl = "";
    this.service = "sso";
    this.domain = "sina.com.cn";
    this.from = "";
    this.pageCharset = "GB2312";
    this.useTicket = !1;
    this.isCheckLoginState = !1;
    this.isUpdateCookieOnLoad = !0;
    this.useIframe = !0;
    this.noActiveTime = 7200;
    this.autoUpdateCookieTime = 1800;
    this.loginType = rsa;
    this.timeoutEnable = !1;
    this.loginTimeout = 5e3;
    this.crossDomain = !0;
    this.scriptLoginHttps = !1;
    this.allowAutoFoundServerTime = !1;
    this.allowAutoFoundServerTimeError = !0;
    this.calcServerTimeInterval = 2e3;
    this.servertime = null;
    this.nonce = null;
    this.rsaPubkey = null;
    this.rsakv = null;
    this.loginExtraFlag = {};
    this.cdult = !1;
    this.crossDomainTime = 5;
    this.failRedirect = !1;
    this.isGenerateVisitor = !0;
    this.generateVisitorProbability = 1;
    this.generateVisitorDelay = 6;
    this.generateVisitorDomain = ["^.*sina.com.cn$"];
    this.getVersion = function() {
        return "ssologin.js(v1.4.19) 2017-01-09"
    }
    ;
    this.getEntry = function() {
        return me.entry
    }
    ;
    this.getClientType = function() {
        return me.getVersion().split(" ")[0]
    }
    ;
    this.init = function() {
        if (getType(arguments[0]) === "object")
            return customPrepare(arguments[0]);
        me.setLoginType(me.loginType);
        var a = window.sinaSSOConfig;
        typeof a != "object" && (a = {});
        var b;
        for (b in a)
            me[b] = a[b];
        me.entry || (me.entry = me.service);
        me.isUpdateCookieOnLoad && setTimeout(me.name + ".updateCookie()", 1e4);
        me.isGenerateVisitor && self === top && Math.random() < me.generateVisitorProbability && location.protocol !== "https:" && setTimeout(me.name + ".generateVisitor()", me.generateVisitorDelay * 1e3);
        me.isCheckLoginState && addEventListener(window, "load", function() {
            me.checkLoginState()
        });
        me.allowAutoFoundServerTime && ssoLoginServerTime && me.setServerTime(ssoLoginServerTime);
        me.customInit()
    }
    ;
    this.getLoginInfo = function() {
        var a = getCookie("sso_info");
        if (!a)
            return {};
        try {
            return parse_str(sinaSSOEncoder.Cookie.decode(a))
        } catch (b) {
            return {}
        }
    }
    ;
    this.customInit = function() {}
    ;
    this.customUpdateCookieCallBack = function(a) {}
    ;
    this.customLoginCallBack = function(a) {}
    ;
    this.customLogoutCallBack = function(a) {
        me.customLoginCallBack({
            result: !1
        })
    }
    ;
    var customLogin, customPrepare, customLogout;
    (function() {
        var a = function() {}
          , b = {
            username: "",
            password: "",
            savestate: 0,
            vsnf: 0,
            vsnval: "",
            door: "",
            setCookie: 1,
            ssoSimpleLogin: 0,
            onComplete: a,
            onSuccess: a,
            onFailure: a
        }
          , c = {
            onComplete: a,
            onSuccess: a,
            onFailure: a
        }
          , d = {
            vsnf: "vsnf",
            vsnval: "vsnval",
            door: "door",
            setCookie: "s",
            ssoSimpleLogin: "ssosimplelogin"
        }
          , e = {}
          , f = {}
          , g = function(a, b) {
            var c, d = {};
            a = a || {};
            b = b || {};
            objMerge(d, a);
            for (c in b)
                a.hasOwnProperty(c) && (d[c] = b[c]);
            return d
        }
          , h = function(a, b, c) {
            typeof a[b] == "function" && a[b](c)
        };
        this.callbackLoginStatus = function(a) {
            me.customLoginCallBack(a);
            h(e, "onComplete", a);
            a && a.result === !0 ? h(e, "onSuccess", a) : h(e, "onFailure", a)
        }
        ;
        callbackLogoutStatus = function(a) {
            me.customLogoutCallBack(a);
            h(f, "onComplete", a);
            a && a.result === !0 ? h(f, "onSuccess", a) : h(f, "onFailure", a)
        }
        ;
        customPrepare = function(a) {
            var c;
            a = a || {};
            e = objMerge({
                entry: "sso",
                useTicket: !1,
                service: "sso",
                domain: "sina.com.cn",
                feedBackUrl: "",
                setDomain: !1,
                crossDomain: !0,
                name: "sinaSSOController"
            }, b);
            e = g(e, a);
            window[e.name] = window[e.name] || me;
            for (c in e)
                b.hasOwnProperty(c) || (me[c] = e[c]);
            me.loginExtraQuery = {};
            objMerge(me.loginExtraQuery, e.loginExtraQuery);
            for (c in d)
                e.hasOwnProperty(c) && (me.loginExtraQuery[d[c]] = e[c])
        }
        ;
        customLogin = function(a) {
            a = a || {};
            customPrepare(a);
            me.login(e.username, e.password, e.savestate)
        }
        ;
        customLogout = function(a) {
            a = a || {};
            f = objMerge({}, c);
            f = g(f, a);
            me.logout()
        }
    }
    ).apply(this);
    this.login = function(a, b, c) {
        var d = arguments[3] ? arguments[3] : !1;
        if (getType(arguments[0]) === "object")
            return customLogin(arguments[0]);
        ssoLoginTimer ? ssoLoginTimer.clear() : ssoLoginTimer = new prototypeTimer(me.timeoutEnable);
        ssoLoginTimer.start(me.loginTimeout, function() {
            ssoLoginTimer.clear();
            me.callbackLoginStatus({
                result: !1,
                errno: -1,
                reason: unescape("%u767B%u5F55%u8D85%u65F6%uFF0C%u8BF7%u91CD%u8BD5")
            })
        });
        c = c == undefined ? 0 : c;
        tmpData.savestate = c;
        loginByConfig = function() {
            if (!me.feedBackUrl && loginByXMLHttpRequest(a, b, c, d))
                return !0;
            if (me.useIframe && (me.setDomain || me.feedBackUrl)) {
                if (me.setDomain) {
                    document.domain = me.domain;
                    !me.feedBackUrl && me.domain != "sina.com.cn" && (me.feedBackUrl = makeURL(me.appLoginURL[me.domain], {
                        domain: 1
                    }))
                }
                loginMethod = "post";
                var e = loginByIframe(a, b, c, d);
                if (!e) {
                    loginMethod = "get";
                    me.scriptLoginHttps ? me.setLoginType(me.loginType | https) : me.setLoginType(me.loginType | rsa);
                    loginByScript(a, b, c, d)
                }
            } else {
                loginMethod = "get";
                loginByScript(a, b, c, d)
            }
            me.nonce = null
        }
        ;
        loginMethodCheck = function() {
            if (me.loginType & wsse || me.loginType & rsa) {
                if (me.servertime) {
                    me.nonce || (me.nonce = makeNonce(6));
                    loginByConfig();
                    return !0
                }
                me.getServerTime(a, loginByConfig)
            } else
                loginByConfig()
        }
        ;
        loginMethodCheck();
        return !0
    }
    ;
    this.prelogin = function(a, b) {
        var c = ssoPreLoginUrl
          , d = a.username || "";
        d = sinaSSOEncoder.base64.encode(urlencode(d));
        delete a.username;
        var e = {
            entry: me.entry,
            callback: me.name + ".preloginCallBack",
            su: d,
            rsakt: "mod"
        };
        c = makeURL(c, objMerge(e, a));
        me.preloginCallBack = function(a) {
            if (a && a.retcode == 0) {
                me.setServerTime(a.servertime);
                me.nonce = a.nonce;
                me.rsaPubkey = a.pubkey;
                me.rsakv = a.rsakv;
                pcid = a.pcid;
                preloginTime = (new Date).getTime() - preloginTimeStart - (parseInt(a.exectime, 10) || 0)
            }
            typeof b == "function" && b(a)
        }
        ;
        preloginTimeStart = (new Date).getTime();
        excuteScript(me.scriptId, c)
    }
    ;
    this.getServerTime = function(a, b) {
        if (me.servertime) {
            typeof b == "function" && b({
                retcode: 0,
                servertime: me.servertime
            });
            return !0
        }
        me.prelogin({
            username: a
        }, b)
    }
    ;
    this.logout = function() {
        try {
            if (getType(arguments[0]) === "object")
                return customLogout(arguments[0]);
            var a = {
                entry: me.getEntry(),
                callback: me.name + ".ssoLogoutCallBack"
            };
            try {
                a.sr = window.screen.width + "*" + window.screen.height
            } catch (b) {}
            var c = makeURL(ssoLogoutUrl, a);
            excuteScript(me.scriptId, c)
        } catch (b) {}
        return !0
    }
    ;
    this.ssoLogoutCallBack = function(a) {
        a.arrURL && me.setCrossDomainUrlList(a);
        me.crossDomainAction("logout", function() {
            callbackLogoutStatus({
                result: !0
            })
        })
    }
    ;
    this.updateCookie = function() {
        try {
            if (me.autoUpdateCookieTime > 5) {
                updateCookieTimer != null && clearTimeout(updateCookieTimer);
                updateCookieTimer = setTimeout(me.name + ".updateCookie()", me.autoUpdateCookieTime * 1e3)
            }
            var a = me.getCookieExpireTime()
              , b = (new Date).getTime() / 1e3
              , c = {};
            a == null ? c = {
                retcode: 6102
            } : a < b ? c = {
                retcode: 6203
            } : a - cookieExpireTimeLength + updateCookieTimeHardLimit > b ? c = {
                retcode: 6110
            } : a - b > me.noActiveTime && (c = {
                retcode: 6111
            });
            if (c.retcode !== undefined) {
                me.customUpdateCookieCallBack(c);
                return !1
            }
            var d = makeURL(ssoUpdateCookieUrl, {
                entry: me.getEntry(),
                callback: me.name + ".updateCookieCallBack"
            });
            excuteScript(me.scriptId, d)
        } catch (e) {}
        return !0
    }
    ;
    this.setCrossDomainUrlList = function(a) {
        crossDomainUrlList = a
    }
    ;
    this.checkAltLoginName = function() {
        return !0
    }
    ;
    this.callFeedBackUrl = function(a) {
        try {
            var b = {
                callback: me.name + ".feedBackUrlCallBack"
            };
            a.ticket && (b.ticket = a.ticket);
            a.retcode !== undefined && (b.retcode = a.retcode);
            var c = makeURL(me.feedBackUrl, b);
            excuteScript(me.scriptId, c)
        } catch (d) {}
        return !0
    }
    ;
    this.loginCallBack = function(a) {
        try {
            if (me.timeoutEnable && !ssoLoginTimer.isset())
                return;
            ssoLoginTimer.clear();
            me.loginExtraFlag = {};
            var b = {}
              , c = a.ticket
              , d = a.uid;
            if (d) {
                b.result = !0;
                b.retcode = 0;
                b.userinfo = {
                    uniqueid: a.uid
                };
                c && (b.ticket = c);
                a.cookie && (b.cookie = a.cookie);
                if (me.feedBackUrl)
                    me.crossDomain ? me.crossDomainAction("login", function() {
                        me.callFeedBackUrl(b)
                    }) : me.callFeedBackUrl(b);
                else if (me.crossDomain) {
                    a.crossDomainUrlList && me.setCrossDomainUrlList({
                        retcode: 0,
                        arrURL: a.crossDomainUrlList
                    });
                    me.crossDomainAction("login", function() {
                        if (c && me.appLoginURL[me.domain])
                            me.appLogin(c, me.domain, me.name + ".callbackLoginStatus");
                        else {
                            b.userinfo = objMerge(b.userinfo, me.getSinaCookie());
                            me.callbackLoginStatus(b)
                        }
                    })
                } else
                    me.callbackLoginStatus(b)
            } else {
                if (loginMethodCheck && a.retcode == "2092" && me.allowAutoFoundServerTimeError) {
                    me.setServerTime(0);
                    me.loginExtraFlag = objMerge(me.loginExtraFlag, {
                        wsseretry: "servertime_error"
                    });
                    loginMethodCheck();
                    loginMethodCheck = null;
                    return !1
                }
                b.result = !1;
                b.errno = a.retcode;
                if (b.errno == "4069") {
                    var e = a.reason.split("|");
                    b.reason = e[0];
                    e.length == 2 && (b.rurl = e[1]);
                    if (b.rurl)
                        try {
                            top.location.href = b.rurl;
                            return
                        } catch (f) {}
                } else
                    b.reason = a.reason;
                me.callbackLoginStatus(b)
            }
        } catch (f) {}
        return !0
    }
    ;
    this.updateCookieCallBack = function(a) {
        a.retcode == 0 ? me.crossDomainAction("update", function() {
            me.customUpdateCookieCallBack(a)
        }) : me.customUpdateCookieCallBack(a)
    }
    ;
    this.feedBackUrlCallBack = function(a) {
        if (loginMethod != "post" || !me.timeoutEnable || !!ssoLoginTimer.isset()) {
            a.errno == "2092" && me.setServerTime(0);
            if (loginMethodCheck && a.errno == "2092" && me.allowAutoFoundServerTimeError) {
                me.loginExtraFlag = objMerge(me.loginExtraFlag, {
                    wsseretry: "servertime_error"
                });
                loginMethodCheck();
                loginMethodCheck = null;
                return !1
            }
            ssoLoginTimer && ssoLoginTimer.clear();
            if (a.errno == "4069") {
                var b = a.reason.split("|");
                a.reason = b[0];
                if (b.length == 2) {
                    a.rurl = b[1];
                    try {
                        top.location.href = a.rurl;
                        return
                    } catch (c) {}
                }
            }
            me.callbackLoginStatus(a);
            removeNode(me.loginFrameName)
        }
    }
    ;
    this.doCrossDomainCallBack = function(a) {
        me.crossDomainCounter++;
        a && removeNode(a.scriptId);
        if (me.crossDomainCounter == me.crossDomainCount) {
            clearTimeout(crossDomainTimer);
            me.crossDomainResult()
        }
    }
    ;
    this.crossDomainCallBack = function(a) {
        removeNode(me.ssoCrossDomainScriptId);
        if (!a || a.retcode != 0)
            return !1;
        var b = a.arrURL, c, d, e = {
            callback: me.name + ".doCrossDomainCallBack"
        };
        me.crossDomainCount = b.length;
        me.crossDomainCounter = 0;
        if (b.length == 0) {
            clearTimeout(crossDomainTimer);
            me.crossDomainResult();
            return !0
        }
        for (var f = 0; f < b.length; f++) {
            c = b[f];
            d = "ssoscript" + f;
            e.scriptId = d;
            c = makeURL(c, e);
            isSafari() ? excuteIframe(d, c) : excuteScript(d, c)
        }
    }
    ;
    this.crossDomainResult = function() {
        crossDomainUrlList = null;
        typeof crossDomainForward == "function" && crossDomainForward()
    }
    ;
    this.crossDomainAction = function(a, b) {
        crossDomainTimer = setTimeout(me.name + ".crossDomainResult()", crossDomainTime * 1e3);
        typeof b == "function" ? crossDomainForward = b : crossDomainForward = null;
        if (crossDomainUrlList) {
            me.crossDomainCallBack(crossDomainUrlList);
            return !1
        }
        var c = me.domain;
        if (a == "update") {
            a = "login";
            c = "sina.com.cn"
        }
        var d = {
            scriptId: me.ssoCrossDomainScriptId,
            callback: me.name + ".crossDomainCallBack",
            action: a,
            domain: c,
            sr: window.screen.width + "*" + window.screen.height
        }
          , e = makeURL(ssoCrosssDomainUrl, d);
        excuteScript(me.ssoCrossDomainScriptId, e)
    }
    ;
    this.checkLoginState = function(a) {
        a ? me.autoLogin(a) : me.autoLogin(function(a) {
            var b = {};
            if (a !== null) {
                var c = {
                    displayname: a.nick,
                    uniqueid: a.uid,
                    userid: a.user
                };
                b.result = !0;
                b.userinfo = c
            } else {
                b.result = !1;
                b.reason = ""
            }
            me.callbackLoginStatus(b)
        })
    }
    ;
    this.getCookieExpireTime = function() {
        return getCookieExpireTimeByDomain(me.domain)
    }
    ;
    this.getSinaCookie = function(a) {
        var b = getCookie("SUBP");
        if (!b)
            return null;
        var c = sinaSSOEncoder.getSUBPCookie.decode(b);
        try {
            c.uid = c.uid.replace(/(^\s*)|(\s*$)/g, "");
            c.nick = decodeURIComponent(c.nick.replace(/(^\s*)|(\s*$)/g, ""))
        } catch (d) {
            return null
        }
        return c
    }
    ;
    this.get51UCCookie = function() {
        return me.getSinaCookie()
    }
    ;
    this.isPreLoginState = function() {
        var a = getCookie("SUBP");
        if (!a)
            return !1;
        var b = sinaSSOEncoder.getSUBPCookie.decode(a);
        return b && b.status == "40" ? !0 : !1
    }
    ;
    this.isVisitor = function() {
        var a = getCookie("SUBP");
        if (!a)
            return !1;
        var b = sinaSSOEncoder.getSUBPCookie.decode(a);
        return b && b.status == "20" ? !0 : !1
    }
    ;
    this.autoLogin = function(a, b) {
        if (me.domain == "sina.com.cn") {
            if (getCookie("SUBP") === null && getCookie("ALF") !== null) {
                sinaAutoLogin(a);
                return !0
            }
        } else if (getCookie("SUBP") === null && (b || getCookie("SSOLoginState") !== null || getCookie("ALF") !== null)) {
            sinaAutoLogin(a);
            return !0
        }
        a(me.getSinaCookie());
        return !0
    }
    ;
    this.autoLoginCallBack2 = function(a) {
        try {
            autoLoginCallBack2(me.getSinaCookie())
        } catch (b) {}
        return !0
    }
    ;
    this.appLogin = function(a, b, c) {
        var d = tmpData.savestate ? parseInt((new Date).getTime() / 1e3 + tmpData.savestate * 86400) : 0
          , e = getCookie("ALF") ? getCookie("ALF") : 0
          , f = {
            callback: c,
            ticket: a,
            ssosavestate: d || e
        }
          , g = me.appLoginURL[b]
          , h = makeURL(g, f);
        excuteScript(me.scriptId, h, "gb2312");
        return !0
    }
    ;
    this.autoLoginCallBack3 = function(a) {
        if (a.retcode != 0) {
            me.autoLoginCallBack2(a);
            return !1
        }
        var b = me.domain == "sina.com.cn" ? "weibo.com" : me.domain;
        me.appLogin(a.ticket, b, me.name + ".autoLoginCallBack2");
        return !0
    }
    ;
    this.setLoginType = function(a) {
        var b = location.protocol == "https:" ? me.https : 0;
        b && (me.crossDomain = !1);
        me.loginType = a | b;
        return !0
    }
    ;
    this.setServerTime = function(a) {
        ssoServerTimeTimer || (ssoServerTimeTimer = new prototypeTimer(!0));
        if (a == 0) {
            ssoServerTimeTimer.clear();
            me.servertime = a;
            return !0
        }
        if (a < 1294935546)
            return !1;
        var b = function() {
            if (me.servertime) {
                me.servertime += me.calcServerTimeInterval / 1e3;
                ssoServerTimeTimer.start(me.calcServerTimeInterval, b)
            }
        };
        me.servertime = a;
        ssoServerTimeTimer.start(me.calcServerTimeInterval, b)
    }
    ;
    this.getPinCodeUrl = function(a) {
        a == undefined && (a = 0);
        pcid && (me.loginExtraQuery.pcid = pcid);
        return pincodeUrl + "?r=" + Math.floor(Math.random() * 1e8) + "&s=" + a + (pcid.length > 0 ? "&p=" + pcid : "")
    }
    ;
    this.showPinCode = function(a) {
        me.$(a).src = me.getPinCodeUrl()
    }
    ;
    this.isVfValid = function() {
        return me.getSinaCookie(!0).vf != 1
    }
    ;
    this.getVfValidUrl = function() {
        return vfValidUrl
    }
    ;
    this.enableFailRedirect = function() {
        me.failRedirect = !0
    }
    ;
    var makeNonce = function(a) {
        var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          , c = "";
        for (var d = 0; d < a; d++)
            c += b.charAt(Math.ceil(Math.random() * 1e6) % b.length);
        return c
    }
      , sinaAutoLogin = function(a) {
        autoLoginCallBack2 = a;
        var b = {
            entry: me.getEntry(),
            service: me.service,
            encoding: "UTF-8",
            gateway: 1,
            returntype: "TEXT",
            from: me.from
        };
        if (me.domain == "sina.com.cn") {
            b.callback = me.name + ".autoLoginCallBack3";
            b.service = "miniblog";
            b.useticket = 1
        } else {
            b.callback = me.name + ".autoLoginCallBack3";
            b.useticket = 1
        }
        var c = makeURL(ssoLoginUrl, b);
        excuteScript(me.scriptId, c, "gb2312");
        return !0
    }
      , getCookieExpireTimeByDomain = function(a) {
        var b = null
          , c = null;
        c = me.getSinaCookie();
        c && (b = c.et);
        return b
    }
      , addEventListener = function(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
    }
      , prototypeTimer = function(a) {
        var b = !1;
        this.start = function(c, d) {
            a && (b = setTimeout(d, c))
        }
        ;
        this.clear = function(c) {
            if (a) {
                clearTimeout(b);
                b = !1
            }
        }
        ;
        this.isset = function() {
            return b !== !1
        }
    }
      , excuteScript = function(a, b, c) {
        removeNode(a);
        var d = document.getElementsByTagName("head")[0]
          , e = document.createElement("script");
        e.charset = c || "gb2312";
        e.id = a;
        e.type = "text/javascript";
        e.src = makeURL(b, {
            client: me.getClientType(),
            _: (new Date).getTime()
        });
        d.appendChild(e)
    }
      , excuteIframe = function(a, b) {
        removeNode(a);
        var c = document.getElementsByTagName("body")[0]
          , d = document.createElement("iframe");
        d.style.display = "none";
        d.src = makeURL(b, {
            client: me.getClientType(),
            _: (new Date).getTime()
        });
        d.isReady = !1;
        addEventListener(d, "load", function() {
            if (!d.isReady) {
                d.isReady = !0;
                me.doCrossDomainCallBack({
                    scriptId: a
                })
            }
        });
        c.appendChild(d)
    }
      , makeRequest = function(a, b, c, d) {
        var e = {
            entry: me.getEntry(),
            gateway: 1,
            from: me.from,
            savestate: c,
            qrcode_flag: d,
            useticket: me.useTicket ? 1 : 0
        };
        me.failRedirect && (me.loginExtraQuery.frd = 1);
        e = objMerge(e, {
            pagerefer: document.referrer || ""
        });
        e = objMerge(e, me.loginExtraFlag);
        e = objMerge(e, me.loginExtraQuery);
        e.su = sinaSSOEncoder.base64.encode(urlencode(a));
        me.service && (e.service = me.service);
        if (me.loginType & rsa && me.servertime && sinaSSOEncoder && sinaSSOEncoder.RSAKey) {
            e.servertime = me.servertime;
            e.nonce = me.nonce;
            e.pwencode = "rsa2";
            e.rsakv = me.rsakv;
            var f = new sinaSSOEncoder.RSAKey;
            f.setPublic(me.rsaPubkey, "10001");
            b = f.encrypt([me.servertime, me.nonce].join("\t") + "\n" + b)
        } else if (me.loginType & wsse && me.servertime && sinaSSOEncoder && sinaSSOEncoder.hex_sha1) {
            e.servertime = me.servertime;
            e.nonce = me.nonce;
            e.pwencode = "wsse";
            b = sinaSSOEncoder.hex_sha1("" + sinaSSOEncoder.hex_sha1(sinaSSOEncoder.hex_sha1(b)) + me.servertime + me.nonce)
        }
        e.sp = b;
        try {
            e.sr = window.screen.width + "*" + window.screen.height
        } catch (g) {}
        return e
    }
      , loginByXMLHttpRequest = function(a, b, c, d) {
        if (typeof XMLHttpRequest == "undefined")
            return !1;
        var e = new XMLHttpRequest;
        if (!1 in e)
            return !1;
        var f = makeXMLRequestQuery(a, b, c, d)
          , g = makeURL(ssoLoginUrl, {
            client: me.getClientType(),
            _: (new Date).getTime()
        });
        try {
            e.open("POST", g, !0);
            e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            e.withCredentials = !0;
            e.onreadystatechange = function() {
                e.readyState == 4 && e.status == 200 && me.loginCallBack(parseJSON(e.responseText))
            }
            ;
            e.send(httpBuildQuery(f))
        } catch (h) {
            return !1
        }
        return !0
    }
      , makeXMLRequestQuery = function(a, b, c, d) {
        if (me.appLoginURL[me.domain]) {
            me.useTicket = 1;
            me.service = me.appDomainService[me.domain] || me.service
        }
        var e = 0;
        me.domain && (e = 2);
        me.appLoginURL[me.domain] || (e = 3);
        me.cdult !== !1 && (e = me.cdult);
        if (e == 3) {
            crossDomainTime = me.crossDomainTime;
            delete me.appLoginURL[me.domain]
        }
        var f = makeRequest(a, b, c, d);
        return objMerge(f, {
            encoding: "UTF-8",
            cdult: e,
            domain: me.domain,
            useticket: me.appLoginURL[me.domain] ? 1 : 0,
            prelt: preloginTime,
            returntype: "TEXT"
        })
    }
      , loginByScript = function(a, b, c, d) {
        var e = makeXMLRequestQuery(a, b, c, d);
        e = objMerge(e, {
            callback: me.name + ".loginCallBack"
        });
        var f = makeURL(ssoLoginUrl, e);
        excuteScript(me.scriptId, f, "gb2312")
    }
      , loginByIframe = function(a, b, c, d) {
        createIFrame(me.loginFrameName);
        var e = createForm(me.loginFormId)
          , f = makeRequest(a, b, c, d);
        f.encoding = "UTF-8";
        me.crossDomain == !1 && (f.crossdomain = 0);
        f.prelt = preloginTime;
        if (me.feedBackUrl) {
            f.url = makeURL(me.feedBackUrl, {
                framelogin: 1,
                callback: "parent." + me.name + ".feedBackUrlCallBack"
            });
            f.returntype = "META"
        } else {
            f.callback = "parent." + me.name + ".loginCallBack";
            f.returntype = "IFRAME";
            f.setdomain = me.setDomain ? 1 : 0
        }
        for (var g in me.loginExtraQuery) {
            if (typeof me.loginExtraQuery[g] == "function")
                continue;
            f[g] = me.loginExtraQuery[g]
        }
        for (var h in f)
            e.addInput(h, f[h]);
        var i = makeURL(ssoLoginUrl, objMerge({
            client: me.getClientType()
        }, me.loginExtraFlag));
        e.method = "post";
        e.action = i;
        e.target = me.loginFrameName;
        var j = !0;
        try {
            e.submit()
        } catch (k) {
            removeNode(me.loginFrameName);
            j = !1
        }
        setTimeout(function() {
            removeNode(e)
        }, 10);
        return j
    }
      , createIFrame = function(a, b) {
        b == null && (b = "javascript:false;");
        removeNode(a);
        var c = document.createElement("iframe");
        c.height = 0;
        c.width = 0;
        c.style.display = "none";
        c.name = a;
        c.id = a;
        c.src = b;
        appendChild(document.body, c);
        window.frames[a].name = a;
        return c
    }
      , createForm = function(a, b) {
        b == null && (b = "none");
        removeNode(a);
        var c = document.createElement("form");
        c.height = 0;
        c.width = 0;
        c.style.display = b;
        c.name = a;
        c.id = a;
        appendChild(document.body, c);
        document.forms[a].name = a;
        c.addInput = function(a, b, c) {
            c == null && (c = "text");
            var d = this.getElementsByTagName("input")[a];
            d && this.removeChild(d);
            d = document.createElement("input");
            this.appendChild(d);
            d.id = a;
            d.name = a;
            d.type = c;
            d.value = b
        }
        ;
        return c
    }
      , removeNode = function(a) {
        try {
            typeof a == "string" && (a = me.$(a));
            a.parentNode.removeChild(a)
        } catch (b) {}
    }
      , getType = function(a) {
        return typeof a == "undefined" ? "undefined" : a === null ? "null" : Object.prototype.toString.call(a).replace(/^\[object\s|\]$/gi, "").toLowerCase()
    }
      , isSafari = function() {
        var a = navigator.userAgent.toLowerCase();
        return /webkit/i.test(a) && !/chrome/i.test(a)
    }
      , appendChild = function(a, b) {
        a.appendChild(b)
    }
      , getCookie = function(a) {
        var b = (new RegExp(a + "=([^;]+)")).exec(document.cookie);
        return b == null ? null : b[1]
    }
      , makeURL = function(a, b) {
        return a + urlAndChar(a) + httpBuildQuery(b)
    }
      , urlAndChar = function(a) {
        return /\?/.test(a) ? "&" : "?"
    }
      , urlencode = function(a) {
        return encodeURIComponent(a)
    }
      , urldecode = function(a) {
        if (a == null)
            return "";
        try {
            return decodeURIComponent(a)
        } catch (b) {
            return ""
        }
    }
      , httpBuildQuery = function(a) {
        if (typeof a != "object")
            return "";
        var b = [];
        for (var c in a) {
            if (typeof a[c] == "function")
                continue;
            b.push(c + "=" + urlencode(a[c]))
        }
        return b.join("&")
    }
      , parse_str = function(a) {
        var b = a.split("&"), c, d = {};
        for (var e = 0; e < b.length; e++) {
            c = b[e].split("=");
            d[c[0]] = urldecode(c[1])
        }
        return d
    }
      , parseJSON = function(str) {
        return typeof str == "object" ? str : window.JSON ? JSON.parse(str) : eval("(" + str + ")")
    }
      , objMerge = function(a, b) {
        for (var c in b)
            a[c] = b[c];
        return a
    };
    this.$ = function(a) {
        return document.getElementById(a)
    }
    ;
    this.generateVisitor = function() {
        var a, b = !1;
        for (var c = 0; c < this.generateVisitorDomain.length; c++) {
            a = new RegExp(this.generateVisitorDomain[c]);
            if (a.test(document.domain)) {
                b = !0;
                break
            }
        }
        if (!b)
            return !1;
        try {
            if (me.shouldGenerateVisitor() && !me.$("visitorfrm84747h4784")) {
                document.body.insertAdjacentHTML("beforeEnd", "<iframe id='visitorfrm84747h4784' style='position:absolute;left:0;top:0;border:none;width:1px;height:1px' src='" + generateVisitorUrl + "?from=iframe'/>");
                setTimeout(function() {
                    try {
                        var a = me.$("visitorfrm84747h4784");
                        a && a.parentNode.removeChild(a)
                    } catch (b) {}
                }, 3e4)
            }
        } catch (d) {
            return !1
        }
        return !0
    }
    ;
    this.shouldGenerateVisitor = function() {
        var a = !1
          , b = !1
          , c = getCookie("SUBP");
        c && (a = !0);
        var d = getCookie("SUP");
        d && (b = !0);
        return !a && !b ? !0 : !1
    }
}
var sinaSSOEncoder = sinaSSOEncoder || {};
(function() {
    var a = 0
      , b = 8;
    this.hex_sha1 = function(a) {
        return i(c(h(a), a.length * b))
    }
    ;
    var c = function(a, b) {
        a[b >> 5] |= 128 << 24 - b % 32;
        a[(b + 64 >> 9 << 4) + 15] = b;
        var c = Array(80)
          , h = 1732584193
          , i = -271733879
          , j = -1732584194
          , k = 271733878
          , l = -1009589776;
        for (var m = 0; m < a.length; m += 16) {
            var n = h
              , o = i
              , p = j
              , q = k
              , r = l;
            for (var s = 0; s < 80; s++) {
                s < 16 ? c[s] = a[m + s] : c[s] = g(c[s - 3] ^ c[s - 8] ^ c[s - 14] ^ c[s - 16], 1);
                var t = f(f(g(h, 5), d(s, i, j, k)), f(f(l, c[s]), e(s)));
                l = k;
                k = j;
                j = g(i, 30);
                i = h;
                h = t
            }
            h = f(h, n);
            i = f(i, o);
            j = f(j, p);
            k = f(k, q);
            l = f(l, r)
        }
        return [h, i, j, k, l]
    }
      , d = function(a, b, c, d) {
        return a < 20 ? b & c | ~b & d : a < 40 ? b ^ c ^ d : a < 60 ? b & c | b & d | c & d : b ^ c ^ d
    }
      , e = function(a) {
        return a < 20 ? 1518500249 : a < 40 ? 1859775393 : a < 60 ? -1894007588 : -899497514
    }
      , f = function(a, b) {
        var c = (a & 65535) + (b & 65535)
          , d = (a >> 16) + (b >> 16) + (c >> 16);
        return d << 16 | c & 65535
    }
      , g = function(a, b) {
        return a << b | a >>> 32 - b
    }
      , h = function(a) {
        var c = []
          , d = (1 << b) - 1;
        for (var e = 0; e < a.length * b; e += b)
            c[e >> 5] |= (a.charCodeAt(e / b) & d) << 24 - e % 32;
        return c
    }
      , i = function(b) {
        var c = a ? "0123456789ABCDEF" : "0123456789abcdef"
          , d = "";
        for (var e = 0; e < b.length * 4; e++)
            d += c.charAt(b[e >> 2] >> (3 - e % 4) * 8 + 4 & 15) + c.charAt(b[e >> 2] >> (3 - e % 4) * 8 & 15);
        return d
    }
      , j = function(a) {
        var b = ""
          , c = 0;
        for (; c < a.length; c++)
            b += "%" + k(a[c]);
        return decodeURIComponent(b)
    }
      , k = function(a) {
        var b = "0" + a.toString(16);
        return b.length <= 2 ? b : b.substr(1)
    };
    this.base64 = {
        encode: function(a) {
            a = "" + a;
            if (a == "")
                return "";
            var b = "", c, d, e = "", f, g, h, i = "", j = 0;
            do {
                c = a.charCodeAt(j++);
                d = a.charCodeAt(j++);
                e = a.charCodeAt(j++);
                f = c >> 2;
                g = (c & 3) << 4 | d >> 4;
                h = (d & 15) << 2 | e >> 6;
                i = e & 63;
                isNaN(d) ? h = i = 64 : isNaN(e) && (i = 64);
                b = b + this._keys.charAt(f) + this._keys.charAt(g) + this._keys.charAt(h) + this._keys.charAt(i);
                c = d = e = "";
                f = g = h = i = ""
            } while (j < a.length);return b
        },
        decode: function(a, b, c) {
            var d = function(a, b) {
                for (var c = 0; c < a.length; c++)
                    if (a[c] === b)
                        return c;
                return -1
            };
            typeof a == "string" && (a = a.split(""));
            var e = [], f, g, h = "", i, j, k, l = "";
            a.length % 4 == 0;
            var m = /[^A-Za-z0-9+\/=]/
              , n = this._keys.split("");
            if (b == "urlsafe") {
                m = /[^A-Za-z0-9-_=]/;
                n = this._keys_urlsafe.split("")
            }
            if (b == "subp_v2") {
                m = /[^A-Za-z0-9_=-]/;
                n = this._subp_v2_keys.split("")
            }
            if (b == "subp_v3_3") {
                m = /[^A-Za-z0-9-_.-]/;
                n = this._subp_v3_keys_3.split("")
            }
            var o = 0;
            if (b == "binnary") {
                n = [];
                for (o = 0; o <= 64; o++)
                    n[o] = o + 128
            }
            if (b != "binnary" && m.test(a.join("")))
                return c == "array" ? [] : "";
            o = 0;
            do {
                i = d(n, a[o++]);
                j = d(n, a[o++]);
                k = d(n, a[o++]);
                l = d(n, a[o++]);
                f = i << 2 | j >> 4;
                g = (j & 15) << 4 | k >> 2;
                h = (k & 3) << 6 | l;
                e.push(f);
                k != 64 && k != -1 && e.push(g);
                l != 64 && l != -1 && e.push(h);
                f = g = h = "";
                i = j = k = l = ""
            } while (o < a.length);if (c == "array")
                return e;
            var p = ""
              , q = 0;
            for (; q < e.lenth; q++)
                p += String.fromCharCode(e[q]);
            return p
        },
        _keys: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        _keys_urlsafe: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
        _subp_v2_keys: "uAL715W8e3jJCcNU0lT_FSXVgxpbEDdQ4vKaIOH2GBPtfzqsmYZo-wRM9i6hynrk=",
        _subp_v3_keys_3: "5WFh28sGziZTeS1lBxCK-HgPq9IdMUwknybo.LJrQD3uj_Va7pE0XfcNR4AOYvm6t"
    };
    this.Cookie = {
        decode: function(a) {
            var b = []
              , c = a.substr(0, 3)
              , d = a.substr(3);
            switch (c) {
            case "v01":
                for (var e = 0; e < d.length; e += 2)
                    b.push(parseInt(d.substr(e, 2), 16));
                return decodeURIComponent(j(sinaSSOEncoder.base64.decode(b, "binnary", "array")));
            case "v02":
                d = d.replace(/\./g, "=");
                b = sinaSSOEncoder.base64.decode(d, "urlsafe", "array");
                return j(sinaSSOEncoder.base64.decode(b, "binnary", "array"));
            default:
                return decodeURIComponent(a)
            }
        }
    };
    this.getSUBPCookie = {
        __parse: function(a) {
            var b, c, d, e, f, g = 0, h, i = {}, k = "", l = "";
            if (!a)
                return i;
            do {
                c = a[g];
                b = ++g;
                for (h = g; h < c + b; h++,
                g++)
                    k += String.fromCharCode(a[h]);
                e = a[g];
                b = ++g;
                if (k == "status" || k == "flag")
                    for (h = g; h < e + b; h++,
                    g++)
                        l += a[h];
                else {
                    l = a.slice(b, e + b);
                    try {
                        l = j(l)
                    } catch (m) {
                        l = ""
                    }
                    g += e
                }
                i[k] = l;
                k = "";
                l = ""
            } while (g < a.length);return i
        },
        decode: function(a) {
            var b = [], c, d = a.substr(0, 3), e = decodeURIComponent(a.substr(3));
            switch (d) {
            case "002":
                b = sinaSSOEncoder.base64.decode(e, "subp_v2", "array");
                return sinaSSOEncoder.getSUBPCookie.__parse(b);
            case "003":
                c = e.substr(0, 1);
                e = e.substr(1);
                b = sinaSSOEncoder.base64.decode(e, "subp_v3_" + c, "array");
                return sinaSSOEncoder.getSUBPCookie.__parse(b);
            default:
                return decodeURIComponent(a)
            }
        }
    }
}
).call(sinaSSOEncoder);
(function() {
    function bt(a) {
        var b = bp(a, this.n.bitLength() + 7 >> 3);
        if (b == null)
            return null;
        var c = this.doPublic(b);
        if (c == null)
            return null;
        var d = c.toString(16);
        return (d.length & 1) == 0 ? d : "0" + d
    }
    function bs(a) {
        return a.modPowInt(this.e, this.n)
    }
    function br(a, b) {
        if (a != null && b != null && a.length > 0 && b.length > 0) {
            this.n = bm(a, 16);
            this.e = parseInt(b, 16)
        } else
            alert("Invalid RSA public key")
    }
    function bq() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null
    }
    function bp(a, b) {
        if (b < a.length + 11) {
            alert("Message too long for RSA");
            return null
        }
        var c = []
          , e = a.length - 1;
        while (e >= 0 && b > 0) {
            var f = a.charCodeAt(e--);
            if (f < 128)
                c[--b] = f;
            else if (f > 127 && f < 2048) {
                c[--b] = f & 63 | 128;
                c[--b] = f >> 6 | 192
            } else {
                c[--b] = f & 63 | 128;
                c[--b] = f >> 6 & 63 | 128;
                c[--b] = f >> 12 | 224
            }
        }
        c[--b] = 0;
        var g = new bl
          , h = [];
        while (b > 2) {
            h[0] = 0;
            while (h[0] == 0)
                g.nextBytes(h);
            c[--b] = h[0]
        }
        c[--b] = 2;
        c[--b] = 0;
        return new d(c)
    }
    function bo(a) {
        return a < 16 ? "0" + a.toString(16) : a.toString(16)
    }
    function bn(a, b) {
        var c = ""
          , d = 0;
        while (d + b < a.length) {
            c += a.substring(d, d + b) + "\n";
            d += b
        }
        return c + a.substring(d, a.length)
    }
    function bm(a, b) {
        return new d(a,b)
    }
    function bl() {}
    function bk(a) {
        var b;
        for (b = 0; b < a.length; ++b)
            a[b] = bj()
    }
    function bj() {
        if (bc == null) {
            bg();
            bc = ba();
            bc.init(bd);
            for (be = 0; be < bd.length; ++be)
                bd[be] = 0;
            be = 0
        }
        return bc.next()
    }
    function bg() {
        bf((new Date).getTime())
    }
    function bf(a) {
        bd[be++] ^= a & 255;
        bd[be++] ^= a >> 8 & 255;
        bd[be++] ^= a >> 16 & 255;
        bd[be++] ^= a >> 24 & 255;
        be >= bb && (be -= bb)
    }
    function ba() {
        return new Z
    }
    function _() {
        var a;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        a = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = a;
        return this.S[a + this.S[this.i] & 255]
    }
    function $(a) {
        var b, c, d;
        for (b = 0; b < 256; ++b)
            this.S[b] = b;
        c = 0;
        for (b = 0; b < 256; ++b) {
            c = c + this.S[b] + a[b % a.length] & 255;
            d = this.S[b];
            this.S[b] = this.S[c];
            this.S[c] = d
        }
        this.i = 0;
        this.j = 0
    }
    function Z() {
        this.i = 0;
        this.j = 0;
        this.S = []
    }
    function Y(a, b) {
        var c;
        a < 256 || b.isEven() ? c = new J(b) : c = new Q(b);
        return this.exp(a, c)
    }
    function X(a, b) {
        if (a > 4294967295 || a < 1)
            return d.ONE;
        var c = e()
          , f = e()
          , g = b.convert(this)
          , h = y(a) - 1;
        g.copyTo(c);
        while (--h >= 0) {
            b.sqrTo(c, f);
            if ((a & 1 << h) > 0)
                b.mulTo(f, g, c);
            else {
                var i = c;
                c = f;
                f = i
            }
        }
        return b.revert(c)
    }
    function W() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0
    }
    function V(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c)
    }
    function U(a, b) {
        a.squareTo(b);
        this.reduce(b)
    }
    function T(a) {
        while (a.t <= this.mt2)
            a[a.t++] = 0;
        for (var b = 0; b < this.m.t; ++b) {
            var c = a[b] & 32767
              , d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
            c = b + this.m.t;
            a[c] += this.m.am(0, d, a, b, 0, this.m.t);
            while (a[c] >= a.DV) {
                a[c] -= a.DV;
                a[++c]++
            }
        }
        a.clamp();
        a.drShiftTo(this.m.t, a);
        a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
    }
    function S(a) {
        var b = e();
        a.copyTo(b);
        this.reduce(b);
        return b
    }
    function R(a) {
        var b = e();
        a.abs().dlShiftTo(this.m.t, b);
        b.divRemTo(this.m, null, b);
        a.s < 0 && b.compareTo(d.ZERO) > 0 && this.m.subTo(b, b);
        return b
    }
    function Q(a) {
        this.m = a;
        this.mp = a.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << a.DB - 15) - 1;
        this.mt2 = 2 * a.t
    }
    function P() {
        if (this.t < 1)
            return 0;
        var a = this[0];
        if ((a & 1) == 0)
            return 0;
        var b = a & 3;
        b = b * (2 - (a & 15) * b) & 15;
        b = b * (2 - (a & 255) * b) & 255;
        b = b * (2 - ((a & 65535) * b & 65535)) & 65535;
        b = b * (2 - a * b % this.DV) % this.DV;
        return b > 0 ? this.DV - b : -b
    }
    function O(a, b) {
        a.squareTo(b);
        this.reduce(b)
    }
    function N(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c)
    }
    function M(a) {
        a.divRemTo(this.m, null, a)
    }
    function L(a) {
        return a
    }
    function K(a) {
        return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
    }
    function J(a) {
        this.m = a
    }
    function I(a) {
        var b = e();
        this.abs().divRemTo(a, null, b);
        this.s < 0 && b.compareTo(d.ZERO) > 0 && a.subTo(b, b);
        return b
    }
    function H(a, b, c) {
        var f = a.abs();
        if (!(f.t <= 0)) {
            var g = this.abs();
            if (g.t < f.t) {
                b != null && b.fromInt(0);
                c != null && this.copyTo(c);
                return
            }
            c == null && (c = e());
            var h = e()
              , i = this.s
              , j = a.s
              , k = this.DB - y(f[f.t - 1]);
            if (k > 0) {
                f.lShiftTo(k, h);
                g.lShiftTo(k, c)
            } else {
                f.copyTo(h);
                g.copyTo(c)
            }
            var l = h.t
              , m = h[l - 1];
            if (m == 0)
                return;
            var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0)
              , o = this.FV / n
              , p = (1 << this.F1) / n
              , q = 1 << this.F2
              , r = c.t
              , s = r - l
              , t = b == null ? e() : b;
            h.dlShiftTo(s, t);
            if (c.compareTo(t) >= 0) {
                c[c.t++] = 1;
                c.subTo(t, c)
            }
            d.ONE.dlShiftTo(l, t);
            t.subTo(h, h);
            while (h.t < l)
                h[h.t++] = 0;
            while (--s >= 0) {
                var u = c[--r] == m ? this.DM : Math.floor(c[r] * o + (c[r - 1] + q) * p);
                if ((c[r] += h.am(0, u, c, s, 0, l)) < u) {
                    h.dlShiftTo(s, t);
                    c.subTo(t, c);
                    while (c[r] < --u)
                        c.subTo(t, c)
                }
            }
            if (b != null) {
                c.drShiftTo(l, b);
                i != j && d.ZERO.subTo(b, b)
            }
            c.t = l;
            c.clamp();
            k > 0 && c.rShiftTo(k, c);
            i < 0 && d.ZERO.subTo(c, c)
        }
    }
    function G(a) {
        var b = this.abs()
          , c = a.t = 2 * b.t;
        while (--c >= 0)
            a[c] = 0;
        for (c = 0; c < b.t - 1; ++c) {
            var d = b.am(c, b[c], a, 2 * c, 0, 1);
            if ((a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV) {
                a[c + b.t] -= b.DV;
                a[c + b.t + 1] = 1
            }
        }
        a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1));
        a.s = 0;
        a.clamp()
    }
    function F(a, b) {
        var c = this.abs()
          , e = a.abs()
          , f = c.t;
        b.t = f + e.t;
        while (--f >= 0)
            b[f] = 0;
        for (f = 0; f < e.t; ++f)
            b[f + c.t] = c.am(0, e[f], b, f, 0, c.t);
        b.s = 0;
        b.clamp();
        this.s != a.s && d.ZERO.subTo(b, b)
    }
    function E(a, b) {
        var c = 0
          , d = 0
          , e = Math.min(a.t, this.t);
        while (c < e) {
            d += this[c] - a[c];
            b[c++] = d & this.DM;
            d >>= this.DB
        }
        if (a.t < this.t) {
            d -= a.s;
            while (c < this.t) {
                d += this[c];
                b[c++] = d & this.DM;
                d >>= this.DB
            }
            d += this.s
        } else {
            d += this.s;
            while (c < a.t) {
                d -= a[c];
                b[c++] = d & this.DM;
                d >>= this.DB
            }
            d -= a.s
        }
        b.s = d < 0 ? -1 : 0;
        d < -1 ? b[c++] = this.DV + d : d > 0 && (b[c++] = d);
        b.t = c;
        b.clamp()
    }
    function D(a, b) {
        b.s = this.s;
        var c = Math.floor(a / this.DB);
        if (c >= this.t)
            b.t = 0;
        else {
            var d = a % this.DB
              , e = this.DB - d
              , f = (1 << d) - 1;
            b[0] = this[c] >> d;
            for (var g = c + 1; g < this.t; ++g) {
                b[g - c - 1] |= (this[g] & f) << e;
                b[g - c] = this[g] >> d
            }
            d > 0 && (b[this.t - c - 1] |= (this.s & f) << e);
            b.t = this.t - c;
            b.clamp()
        }
    }
    function C(a, b) {
        var c = a % this.DB, d = this.DB - c, e = (1 << d) - 1, f = Math.floor(a / this.DB), g = this.s << c & this.DM, h;
        for (h = this.t - 1; h >= 0; --h) {
            b[h + f + 1] = this[h] >> d | g;
            g = (this[h] & e) << c
        }
        for (h = f - 1; h >= 0; --h)
            b[h] = 0;
        b[f] = g;
        b.t = this.t + f + 1;
        b.s = this.s;
        b.clamp()
    }
    function B(a, b) {
        for (var c = a; c < this.t; ++c)
            b[c - a] = this[c];
        b.t = Math.max(this.t - a, 0);
        b.s = this.s
    }
    function A(a, b) {
        var c;
        for (c = this.t - 1; c >= 0; --c)
            b[c + a] = this[c];
        for (c = a - 1; c >= 0; --c)
            b[c] = 0;
        b.t = this.t + a;
        b.s = this.s
    }
    function z() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + y(this[this.t - 1] ^ this.s & this.DM)
    }
    function y(a) {
        var b = 1, c;
        if ((c = a >>> 16) != 0) {
            a = c;
            b += 16
        }
        if ((c = a >> 8) != 0) {
            a = c;
            b += 8
        }
        if ((c = a >> 4) != 0) {
            a = c;
            b += 4
        }
        if ((c = a >> 2) != 0) {
            a = c;
            b += 2
        }
        if ((c = a >> 1) != 0) {
            a = c;
            b += 1
        }
        return b
    }
    function x(a) {
        var b = this.s - a.s;
        if (b != 0)
            return b;
        var c = this.t;
        b = c - a.t;
        if (b != 0)
            return b;
        while (--c >= 0)
            if ((b = this[c] - a[c]) != 0)
                return b;
        return 0
    }
    function w() {
        return this.s < 0 ? this.negate() : this
    }
    function v() {
        var a = e();
        d.ZERO.subTo(this, a);
        return a
    }
    function u(a) {
        if (this.s < 0)
            return "-" + this.negate().toString(a);
        var b;
        if (a == 16)
            b = 4;
        else if (a == 8)
            b = 3;
        else if (a == 2)
            b = 1;
        else if (a == 32)
            b = 5;
        else if (a == 4)
            b = 2;
        else
            return this.toRadix(a);
        var c = (1 << b) - 1, d, e = !1, f = "", g = this.t, h = this.DB - g * this.DB % b;
        if (g-- > 0) {
            if (h < this.DB && (d = this[g] >> h) > 0) {
                e = !0;
                f = n(d)
            }
            while (g >= 0) {
                if (h < b) {
                    d = (this[g] & (1 << h) - 1) << b - h;
                    d |= this[--g] >> (h += this.DB - b)
                } else {
                    d = this[g] >> (h -= b) & c;
                    if (h <= 0) {
                        h += this.DB;
                        --g
                    }
                }
                d > 0 && (e = !0);
                e && (f += n(d))
            }
        }
        return e ? f : "0"
    }
    function t() {
        var a = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == a)
            --this.t
    }
    function s(a, b) {
        var c;
        if (b == 16)
            c = 4;
        else if (b == 8)
            c = 3;
        else if (b == 256)
            c = 8;
        else if (b == 2)
            c = 1;
        else if (b == 32)
            c = 5;
        else if (b == 4)
            c = 2;
        else {
            this.fromRadix(a, b);
            return
        }
        this.t = 0;
        this.s = 0;
        var e = a.length
          , f = !1
          , g = 0;
        while (--e >= 0) {
            var h = c == 8 ? a[e] & 255 : o(a, e);
            if (h < 0) {
                a.charAt(e) == "-" && (f = !0);
                continue
            }
            f = !1;
            if (g == 0)
                this[this.t++] = h;
            else if (g + c > this.DB) {
                this[this.t - 1] |= (h & (1 << this.DB - g) - 1) << g;
                this[this.t++] = h >> this.DB - g
            } else
                this[this.t - 1] |= h << g;
            g += c;
            g >= this.DB && (g -= this.DB)
        }
        if (c == 8 && (a[0] & 128) != 0) {
            this.s = -1;
            g > 0 && (this[this.t - 1] |= (1 << this.DB - g) - 1 << g)
        }
        this.clamp();
        f && d.ZERO.subTo(this, this)
    }
    function r(a) {
        var b = e();
        b.fromInt(a);
        return b
    }
    function q(a) {
        this.t = 1;
        this.s = a < 0 ? -1 : 0;
        a > 0 ? this[0] = a : a < -1 ? this[0] = a + DV : this.t = 0
    }
    function p(a) {
        for (var b = this.t - 1; b >= 0; --b)
            a[b] = this[b];
        a.t = this.t;
        a.s = this.s
    }
    function o(a, b) {
        var c = k[a.charCodeAt(b)];
        return c == null ? -1 : c
    }
    function n(a) {
        return j.charAt(a)
    }
    function h(a, b, c, d, e, f) {
        var g = b & 16383
          , h = b >> 14;
        while (--f >= 0) {
            var i = this[a] & 16383
              , j = this[a++] >> 14
              , k = h * i + j * g;
            i = g * i + ((k & 16383) << 14) + c[d] + e;
            e = (i >> 28) + (k >> 14) + h * j;
            c[d++] = i & 268435455
        }
        return e
    }
    function g(a, b, c, d, e, f) {
        var g = b & 32767
          , h = b >> 15;
        while (--f >= 0) {
            var i = this[a] & 32767
              , j = this[a++] >> 15
              , k = h * i + j * g;
            i = g * i + ((k & 32767) << 15) + c[d] + (e & 1073741823);
            e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30);
            c[d++] = i & 1073741823
        }
        return e
    }
    function f(a, b, c, d, e, f) {
        while (--f >= 0) {
            var g = b * this[a++] + c[d] + e;
            e = Math.floor(g / 67108864);
            c[d++] = g & 67108863
        }
        return e
    }
    function e() {
        return new d(null)
    }
    function d(a, b, c) {
        a != null && ("number" == typeof a ? this.fromNumber(a, b, c) : b == null && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
    }
    var a, b = 0xdeadbeefcafe, c = (b & 16777215) == 15715070;
    if (c && navigator.appName == "Microsoft Internet Explorer") {
        d.prototype.am = g;
        a = 30
    } else if (c && navigator.appName != "Netscape") {
        d.prototype.am = f;
        a = 26
    } else {
        d.prototype.am = h;
        a = 28
    }
    d.prototype.DB = a;
    d.prototype.DM = (1 << a) - 1;
    d.prototype.DV = 1 << a;
    var i = 52;
    d.prototype.FV = Math.pow(2, i);
    d.prototype.F1 = i - a;
    d.prototype.F2 = 2 * a - i;
    var j = "0123456789abcdefghijklmnopqrstuvwxyz", k = [], l, m;
    l = "0".charCodeAt(0);
    for (m = 0; m <= 9; ++m)
        k[l++] = m;
    l = "a".charCodeAt(0);
    for (m = 10; m < 36; ++m)
        k[l++] = m;
    l = "A".charCodeAt(0);
    for (m = 10; m < 36; ++m)
        k[l++] = m;
    J.prototype.convert = K;
    J.prototype.revert = L;
    J.prototype.reduce = M;
    J.prototype.mulTo = N;
    J.prototype.sqrTo = O;
    Q.prototype.convert = R;
    Q.prototype.revert = S;
    Q.prototype.reduce = T;
    Q.prototype.mulTo = V;
    Q.prototype.sqrTo = U;
    d.prototype.copyTo = p;
    d.prototype.fromInt = q;
    d.prototype.fromString = s;
    d.prototype.clamp = t;
    d.prototype.dlShiftTo = A;
    d.prototype.drShiftTo = B;
    d.prototype.lShiftTo = C;
    d.prototype.rShiftTo = D;
    d.prototype.subTo = E;
    d.prototype.multiplyTo = F;
    d.prototype.squareTo = G;
    d.prototype.divRemTo = H;
    d.prototype.invDigit = P;
    d.prototype.isEven = W;
    d.prototype.exp = X;
    d.prototype.toString = u;
    d.prototype.negate = v;
    d.prototype.abs = w;
    d.prototype.compareTo = x;
    d.prototype.bitLength = z;
    d.prototype.mod = I;
    d.prototype.modPowInt = Y;
    d.ZERO = r(0);
    d.ONE = r(1);
    Z.prototype.init = $;
    Z.prototype.next = _;
    var bb = 256, bc, bd, be;
    if (bd == null) {
        bd = [];
        be = 0;
        var bh;
        if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto && typeof window.crypto.random == "function") {
            var bi = window.crypto.random(32);
            for (bh = 0; bh < bi.length; ++bh)
                bd[be++] = bi.charCodeAt(bh) & 255
        }
        while (be < bb) {
            bh = Math.floor(65536 * Math.random());
            bd[be++] = bh >>> 8;
            bd[be++] = bh & 255
        }
        be = 0;
        bg()
    }
    bl.prototype.nextBytes = bk;
    bq.prototype.doPublic = bs;
    bq.prototype.setPublic = br;
    bq.prototype.encrypt = bt;
    this.RSAKey = bq
}
).call(sinaSSOEncoder);
sinaSSOController = new SSOController;
sinaSSOController.init();
STK.register("common.listener", function(a) {
    var b = {}
      , c = {};
    c.define = function(c, d) {
        if (b[c] != null)
            throw "common.listener.define: 频道已被占用";
        b[c] = d;
        var e = {};
        e.register = function(d, e) {
            if (b[c] == null)
                throw "common.listener.define: 频道未定义";
            a.listener.register(c, d, e)
        }
        ;
        e.fire = function(d, e) {
            if (b[c] == null)
                throw "commonlistener.define: 频道未定义";
            a.listener.fire(c, d, e)
        }
        ;
        e.remove = function(b, d) {
            a.listener.remove(c, b, d)
        }
        ;
        e.cache = function(b) {
            return a.listener.cache(c, b)
        }
        ;
        return e
    }
    ;
    return c
});
STK.register("common.channel.sso.login", function(a) {
    var b = ["login", "logout", "verify.extra", "verify.username", "pincode", "pincode.create", "login.complete", "login.success", "login.failure", "logout.complete", "logout.success", "logout.failure", "verify.update", "verify.failure", "verify.complete", "pincode.update", "yalogin.verify", "yalogin.active", "yalogin.deny"];
    return a.common.listener.define("common.channel.sso.login", b)
});
STK.register("common.login.sso.loginbridge", function(a) {
    var b = window.sinaSSOController
      , c = a.common.channel.sso.login
      , d = {
        savestate: 0,
        vsnf: 0,
        hold_login_state: !1,
        cookie_timeout: 0,
        extraTypes: ["verifycode", "vsncode"],
        extraConf: {
            verifycode: [1, 4049, 2070],
            vsncode: [2, 5024, 5025],
            password: [80]
        }
    }
      , e = {
        entry: "sinaoauth",
        domain: "sina.com.cn",
        service: "sinaoauth",
        useTicket: !0,
        crossDomain: !1,
        feedBackUrl: ""
    }
      , f = !1;
    return function(g) {
        var h = {
            param: {},
            extra: !1
        }
          , i = {
            init: function() {
                if (!f) {
                    i.setOptions(g);
                    i.bind();
                    i.getUniqueKey();
                    f = !0
                }
            },
            setOptions: function(b) {
                b = b || {};
                d = a.core.json.merge(d, b);
                e = a.core.obj.parseParam(e, b);
                i.setSSO(b)
            },
            setSSO: function(c) {
                var d = a.core.json.merge(e, c || {});
                for (var f in d)
                    d[f] !== undefined && (b[f] = d[f])
            },
            cleanExtra: function() {
                b.loginExtraQuery || (b.loginExtraQuery = {});
                var a = b.loginExtraQuery.pcid;
                b.loginExtraQuery = {};
                a && (b.loginExtraQuery.pcid = a)
            },
            setExtra: function(c) {
                c = c || {};
                i.cleanExtra();
                if (c.door)
                    delete b.loginExtraQuery.vsnval;
                else if (c.vsnval) {
                    delete b.loginExtraQuery.door;
                    delete b.loginExtraQuery.pcid
                } else {
                    delete b.loginExtraQuery.door;
                    delete b.loginExtraQuery.pcid;
                    delete b.loginExtraQuery.vsnval
                }
                d.cookie_timeout && (c.ct = conf.cookie_timeout);
                d.hold_login_state && (c.s = 1);
                c.vsnf = d.vsnf;
                c.hasOwnProperty("username") && delete c.username;
                c.hasOwnProperty("password") && delete c.password;
                c.hasOwnProperty("savestate") && delete c.savestate;
                b.loginExtraQuery = a.core.json.merge(b.loginExtraQuery, c)
            },
            login: function(a, c, e, f) {
                e = e || {};
                if (f.verifycode) {
                    f.door = "" + f.verifycode;
                    h.extra = "verifycode";
                    delete f.verifycode
                } else if (f.vsncode) {
                    f.vsnval = f.vsncode;
                    h.extra = "vsncode";
                    delete f.vsncode
                } else
                    h.extra = !1;
                i.setSSO(e);
                h.param.userid = a;
                h.param.password = c;
                var g = e.savestate || d.savestate;
                g && (h.param.savestate = g);
                i.setExtra(f);
                b.login(h.param.userid, h.param.password, h.param.savestate)
            },
            logout: function() {
                b.logout()
            },
            verify: {
                extra: function(a, c, d) {
                    switch (a) {
                    case "vsn":
                        i.setExtra({
                            vsnval: c
                        });
                        break;
                    case "code":
                        i.setExtra({
                            door: c
                        })
                    }
                    i.setSSO(d || {});
                    d.savestate > -1 && (h.param.savestate = d.savestate);
                    b.login(h.param.userid, h.param.password, h.param.savestate)
                },
                username: function(a) {
                    b.prelogin({
                        username: a,
                        checkpin: 1
                    }, i.callback.verify.username)
                },
                yalogin: function() {
                    b.prelogin({}, i.callback.verify.yalogin)
                }
            },
            callback: {
                login: function(b) {
                    c.fire("login.complete", b);
                    if (b.result) {
                        typeof d.loginSuccessUrl != "undefined" && d.loginSuccessUrl != "" && (b.redirect = d.loginSuccessUrl);
                        c.fire("login.success", b)
                    } else {
                        var e = i.extraType(b.errno);
                        a.inArray(e, d.extraTypes) ? c.fire("verify.failure", e) : h.extra && c.fire("verify.update", h.extra);
                        var f = {
                            code: b.errno,
                            reason: b.reason,
                            type: e || "username"
                        };
                        f.code == "2071" && "protection_url"in b && b.protection_url && (f.protection_url = b.protection_url);
                        f.code == "8120" && "logout_confirm_url"in b && b.logout_confirm_url && (f.logout_confirm_url = b.logout_confirm_url);
                        c.fire("login.failure", f)
                    }
                },
                logout: function(a) {
                    c.fire("logout.complete", a);
                    a.result ? c.fire("logout.success", a) : c.fire("logout.failure", a)
                },
                verify: {
                    username: function(a) {
                        if (a.nopwd && a.nopwd == 1) {
                            a.code = 4098;
                            a.type = i.extraType(4098) || "username"
                        }
                        c.fire("verify.complete", a);
                        if (a && a.showpin > 0) {
                            var b = i.extraType(a.showpin);
                            b && c.fire("verify.update", b)
                        }
                    },
                    yalogin: function(a) {
                        a.hasOwnProperty("uid") ? c.fire("yalogin.active", a.uid) : c.fire("yalogin.deny")
                    }
                }
            },
            bind: function() {
                b.customLoginCallBack = i.callback.login;
                b.customLogoutCallBack = i.callback.logout;
                c.register("login", i.login);
                c.register("logout", i.logout);
                c.register("verify.username", i.verify.username);
                c.register("pincode.create", i.getUniqueKey);
                c.register("pincode", i.getPincodeUrl);
                c.register("yalogin.verify", i.verify.yalogin)
            },
            getUniqueKey: function() {
                b.getServerTime()
            },
            getPincodeUrl: function() {
                var a = b.getPinCodeUrl();
                c.fire("pincode.update", a)
            },
            extraType: function(a) {
                if (!d.extraRule) {
                    d.extraRule = {};
                    var b, c;
                    for (b in d.extraConf)
                        for (c in d.extraConf[b])
                            d.extraRule["" + d.extraConf[b][c]] = b
                }
                return d.extraRule["" + a] || !1
            }
        };
        i.init();
        var j = {};
        return j
    }
});
(function() {
    if (!a)
        var a = function() {
            var a = {}, b = "theia", c = [], d = 200, e;
            a[b] = {
                IE: /msie/i.test(navigator.userAgent),
                E: function(a) {
                    return typeof a == "string" ? document.getElementById(a) : a
                },
                C: function(a) {
                    var b;
                    a = a.toUpperCase();
                    a == "TEXT" ? b = document.createTextNode("") : a == "BUFFER" ? b = document.createDocumentFragment() : b = document.createElement(a);
                    return b
                },
                log: function() {
                    var a, b = arguments, f = b.length, g = [].slice.apply(b, [0, f]), h = "error", i;
                    while (g[--f])
                        if (g[f]instanceof Error) {
                            a = g.splice(f, 1)[0];
                            break
                        }
                    if (!a) {
                        a = new Error;
                        h = "log"
                    }
                    i = [g, h, (new Date).getTime(), a.message, a.stack];
                    if (e)
                        try {
                            e.apply(null, i)
                        } catch (j) {}
                    else {
                        c.length >= d && c.shift();
                        c.push(i)
                    }
                },
                _regLogFn: function(a) {
                    e = a
                },
                _clearLogList: function() {
                    return c.splice(0, c.length)
                }
            };
            var f = a[b];
            f.register = function(c, d, e) {
                if (!e || typeof e != "string")
                    e = b;
                a[e] || (a[e] = {});
                var f = a[e]
                  , h = c.split(".")
                  , i = f
                  , j = null;
                while (j = h.shift())
                    if (h.length) {
                        i[j] === undefined && (i[j] = {});
                        i = i[j]
                    } else if (i[j] === undefined)
                        try {
                            if (e && e !== b) {
                                if (c === "core.util.listener") {
                                    i[j] = a[b].core.util.listener;
                                    return !0
                                }
                                if (c === "core.util.connect") {
                                    i[j] = a[b].core.util.connect;
                                    return !0
                                }
                            }
                            i[j] = d(f);
                            return !0
                        } catch (k) {
                            setTimeout(function() {
                                console.log(k)
                            }, 0)
                        }
                return !1
            }
            ;
            f.unRegister = function(c, d) {
                if (!d || typeof d != "string")
                    d = b;
                var e = a[d]
                  , f = c.split(".")
                  , h = e
                  , i = null;
                while (i = f.shift())
                    if (f.length) {
                        if (h[i] === undefined)
                            return !1;
                        h = h[i]
                    } else if (h[i] !== undefined) {
                        delete h[i];
                        return !0
                    }
                return !1
            }
            ;
            f.regShort = function(a, b) {
                if (f[a] !== undefined)
                    throw "[" + a + "] : short : has been register";
                f[a] = b
            }
            ;
            f.shortRegister = function(c, d, e) {
                if (!e || typeof e != "string")
                    e = b;
                var f = a[e]
                  , h = c.split(".");
                if (!d)
                    return !1;
                if (f[d])
                    return !1;
                var i = f
                  , j = null;
                while (j = h.shift())
                    if (h.length) {
                        if (i[j] === undefined)
                            return !1;
                        i = i[j]
                    } else if (i[j] !== undefined) {
                        if (f[d])
                            return !1;
                        f[d] = i[j];
                        return !0
                    }
                return !1
            }
            ;
            f.getPKG = function(c) {
                if (!c || typeof c != "string")
                    c = b;
                return a[c]
            }
            ;
            return f
        }();
    a.register("core.util.listener", function(a) {
        return function() {
            var a = {}, b = [], c, d = function() {
                if (b.length != 0) {
                    clearTimeout(c);
                    var a = b.splice(0, 1)[0];
                    try {
                        a.func.apply(a.func, [].concat(a.data))
                    } catch (g) {}
                    c = setTimeout(d, 25)
                }
            };
            return {
                register: function(b, c, d) {
                    a[b] = a[b] || {};
                    a[b][c] = a[b][c] || [];
                    a[b][c].push(d)
                },
                fire: function(c, g, h) {
                    var i, j, k;
                    if (a[c] && a[c][g] && a[c][g].length > 0) {
                        i = a[c][g];
                        i.data_cache = h;
                        for (j = 0,
                        k = i.length; j < k; j++)
                            b.push({
                                channel: c,
                                evt: g,
                                func: i[j],
                                data: h
                            });
                        d()
                    }
                },
                remove: function(b, c, d) {
                    if (a[b] && a[b][c])
                        for (var e = 0, f = a[b][c].length; e < f; e++)
                            if (a[b][c][e] === d) {
                                a[b][c].splice(e, 1);
                                break
                            }
                },
                list: function() {
                    return a
                },
                cache: function(b, c) {
                    if (a[b] && a[b][c])
                        return a[b][c].data_cache
                }
            }
        }()
    });
    a.register("core.obj.parseParam", function(a) {
        return function(a, b, c) {
            var d, e = {};
            b = b || {};
            for (d in a) {
                e[d] = a[d];
                b[d] != null && (c ? a.hasOwnProperty(d) && (e[d] = b[d]) : e[d] = b[d])
            }
            return e
        }
    });
    a.register("core.dom.removeNode", function(a) {
        return function(c) {
            c = a.E(c) || c;
            try {
                c.parentNode.removeChild(c)
            } catch (d) {}
        }
    });
    a.register("core.util.getUniqueKey", function(a) {
        var b = (new Date).getTime().toString()
          , c = 1;
        return function() {
            return b + c++
        }
    });
    a.register("core.func.empty", function() {
        return function() {}
    });
    a.register("core.str.parseURL", function(a) {
        return function(a) {
            var b = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
              , c = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"]
              , d = b.exec(a)
              , e = {};
            for (var f = 0, g = c.length; f < g; f += 1)
                e[c[f]] = d[f] || "";
            return e
        }
    });
    a.register("core.arr.isArray", function(a) {
        return function(a) {
            return Object.prototype.toString.call(a) === "[object Array]"
        }
    });
    a.register("core.str.trim", function(a) {
        return function(a) {
            if (typeof a != "string")
                throw "trim need a string as parameter";
            var b = a.length
              , c = 0
              , d = /(\u3000|\s|\t|\u00A0)/;
            while (c < b) {
                if (!d.test(a.charAt(c)))
                    break;
                c += 1
            }
            while (b > c) {
                if (!d.test(a.charAt(b - 1)))
                    break;
                b -= 1
            }
            return a.slice(c, b)
        }
    });
    a.register("core.json.queryToJson", function(a) {
        return function(c, d) {
            var e = a.core.str.trim(c).split("&")
              , f = {}
              , g = function(a) {
                return d ? decodeURIComponent(a) : a
            };
            for (var h = 0, i = e.length; h < i; h++)
                if (e[h]) {
                    var j = e[h].split("=")
                      , k = j[0]
                      , l = j[1];
                    if (j.length < 2) {
                        l = k;
                        k = "$nullName"
                    }
                    if (!f[k])
                        f[k] = g(l);
                    else {
                        a.core.arr.isArray(f[k]) != !0 && (f[k] = [f[k]]);
                        f[k].push(g(l))
                    }
                }
            return f
        }
    });
    a.register("core.json.jsonToQuery", function(a) {
        var b = function(b, c) {
            b = b == null ? "" : b;
            b = a.core.str.trim(b.toString());
            return c ? encodeURIComponent(b) : b
        };
        return function(a, d) {
            var e = [];
            if (typeof a == "object")
                for (var f in a) {
                    if (f === "$nullName") {
                        e = e.concat(a[f]);
                        continue
                    }
                    if (a[f]instanceof Array)
                        for (var g = 0, h = a[f].length; g < h; g++)
                            e.push(f + "=" + b(a[f][g], d));
                    else
                        typeof a[f] != "function" && e.push(f + "=" + b(a[f], d))
                }
            return e.length ? e.join("&") : ""
        }
    });
    a.register("core.util.URL", function(a) {
        return function(c, d) {
            var e = a.core.obj.parseParam({
                isEncodeQuery: !1,
                isEncodeHash: !1
            }, d || {})
              , f = {}
              , g = a.core.str.parseURL(c)
              , h = a.core.json.queryToJson(g.query)
              , i = a.core.json.queryToJson(g.hash);
            f.setParam = function(a, b) {
                h[a] = b;
                return this
            }
            ;
            f.getParam = function(a) {
                return h[a]
            }
            ;
            f.setParams = function(a) {
                for (var b in a)
                    f.setParam(b, a[b]);
                return this
            }
            ;
            f.setHash = function(a, b) {
                i[a] = b;
                return this
            }
            ;
            f.getHash = function(a) {
                return i[a]
            }
            ;
            f.valueOf = f.toString = function() {
                var c = []
                  , d = a.core.json.jsonToQuery(h, e.isEncodeQuery)
                  , f = a.core.json.jsonToQuery(i, e.isEncodeQuery);
                if (g.scheme != "") {
                    c.push(g.scheme + ":");
                    c.push(g.slash)
                }
                if (g.host != "") {
                    c.push(g.host);
                    if (g.port != "") {
                        c.push(":");
                        c.push(g.port)
                    }
                }
                c.push("/");
                c.push(g.path);
                d != "" && c.push("?" + d);
                f != "" && c.push("#" + f);
                return c.join("")
            }
            ;
            return f
        }
    });
    a.register("core.io.scriptLoader", function(a) {
        var b = {}
          , c = {
            url: "",
            charset: "UTF-8",
            timeout: 3e4,
            args: {},
            onComplete: a.core.func.empty,
            onTimeout: a.core.func.empty,
            isEncode: !1,
            uniqueID: null
        };
        return function(e) {
            var f, g, h = a.core.obj.parseParam(c, e);
            if (h.url == "")
                throw "scriptLoader: url is null";
            var i = h.uniqueID || a.core.util.getUniqueKey();
            f = b[i];
            if (f != null && a.IE != !0) {
                a.core.dom.removeNode(f);
                f = null
            }
            f == null && (f = b[i] = a.C("script"));
            f.charset = h.charset;
            f.id = "scriptRequest_script_" + i;
            f.type = "text/javascript";
            h.onComplete != null && (a.IE ? f.onreadystatechange = function() {
                if (f.readyState.toLowerCase() == "loaded" || f.readyState.toLowerCase() == "complete") {
                    try {
                        clearTimeout(g);
                        document.getElementsByTagName("head")[0].removeChild(f);
                        f.onreadystatechange = null
                    } catch (a) {}
                    h.onComplete()
                }
            }
            : f.onload = function() {
                try {
                    clearTimeout(g);
                    a.core.dom.removeNode(f)
                } catch (b) {}
                h.onComplete()
            }
            );
            f.src = a.core.util.URL(h.url, {
                isEncodeQuery: h.isEncode
            }).setParams(h.args).toString();
            document.getElementsByTagName("head")[0].appendChild(f);
            h.timeout > 0 && (g = setTimeout(function() {
                try {
                    document.getElementsByTagName("head")[0].removeChild(f)
                } catch (a) {}
                h.onTimeout()
            }, h.timeout));
            return f
        }
    });
    a.register("core.io.jsonp", function(a) {
        return function(c) {
            var d = a.core.obj.parseParam({
                url: "",
                charset: "UTF-8",
                timeout: 3e4,
                args: {},
                onComplete: null,
                onTimeout: null,
                responseName: null,
                isEncode: !1,
                varkey: "callback"
            }, c)
              , e = -1
              , f = d.responseName || "STK_" + a.core.util.getUniqueKey();
            d.args[d.varkey] = f;
            var g = d.onComplete
              , h = d.onTimeout;
            window[f] = function(a) {
                if (e != 2 && g != null) {
                    e = 1;
                    g(a)
                }
            }
            ;
            d.onComplete = null;
            d.onTimeout = function() {
                if (e != 1 && h != null) {
                    e = 2;
                    h()
                }
            }
            ;
            return a.core.io.scriptLoader(d)
        }
    });
    a.register("common.listener", function(a) {
        var b = {}
          , c = {};
        c.define = function(c, e) {
            if (b[c] != null)
                throw "common.listener.define: 频道已被占用";
            b[c] = e;
            var f = {};
            f.register = function(e, f) {
                if (b[c] == null)
                    throw "common.listener.define: 频道未定义";
                a.core.util.listener.register(c, e, f)
            }
            ;
            f.fire = function(e, f) {
                if (b[c] == null)
                    throw "commonlistener.define: 频道未定义";
                a.core.util.listener.fire(c, e, f)
            }
            ;
            f.remove = function(b, d) {
                a.core.util.listener.remove(c, b, d)
            }
            ;
            return f
        }
        ;
        return c
    });
    a.register("common.channel.qrcode_login", function(a) {
        return a.common.listener.define("common.channel.qrcode_login", ["qrcode_scanned", "qrcode_used", "qrcode_timeout", "qrcode_exception", "login_failure", "login_success"])
    });
    a.register("jobs.qrcode_login", function(a) {
        var b = {}, c = a.common.channel.qrcode_login, d = {
            entry: "sso",
            domain: "weibo.com",
            get_image_timeout: 1e4,
            check_request_timeout: 1e4,
            qrcode_size: 180,
            crossdomain_timeout: 3e3,
            savestate: 30
        }, e = {
            qrcode_image: "https://login.sina.com.cn/sso/qrcode/image",
            qrcode_check: "https://login.sina.com.cn/sso/qrcode/check",
            qrcode_login: "https://login.sina.com.cn/sso/login.php"
        }, f, g = 0, h = 3e3, i;
        b.set = function(a) {
            for (var c in a)
                d[c] = a[c];
            return b
        }
        ;
        b.getQRcode = function(a) {
            return j(function(b) {
                a(b)
            })
        }
        ;
        b.getQRcodeId = function() {
            return f
        }
        ;
        b.start = function() {
            i = !1;
            g++;
            k(g)
        }
        ;
        b.cancel = function() {
            i = !0
        }
        ;
        b.register = function(a, d) {
            c.register(a, d);
            return b
        }
        ;
        b.remove = function(a, d) {
            c.remove(a, d);
            return b
        }
        ;
        var j = function(g) {
            a.core.io.jsonp({
                url: e.qrcode_image,
                timeout: d.get_image_timeout,
                args: {
                    entry: d.entry,
                    size: d.qrcode_size
                },
                onComplete: function(a) {
                    if (!a || a.retcode != 2e7)
                        g(a);
                    else {
                        var b = a.data;
                        b.interval && (h = b.interval);
                        f = b.qrid;
                        g(a)
                    }
                },
                onTimeout: function() {
                    c.fire("get_image_timeout")
                },
                isEncode: !0,
                varkey: "callback"
            });
            return b
        }
          , k = function(a) {
            var b = function(d) {
                d.retcode == 2e7 ? m(d) : d.retcode == 50114002 ? c.fire("qrcode_scanned", [d]) : d.retcode == 50114003 ? c.fire("qrcode_timeout", [d]) : d.retcode == 50114004 && c.fire("qrcode_used", [d]);
                (d.retcode == 50114001 || d.retcode == 50114002) && setTimeout(function() {
                    if (!(a < g)) {
                        if (i)
                            return;
                        l(b)
                    }
                }, h)
            };
            l(b)
        }
          , l = function(b) {
            a.core.io.jsonp({
                url: e.qrcode_check,
                timeout: d.check_request_timeout,
                args: {
                    entry: d.entry,
                    qrid: f
                },
                onComplete: function(a) {
                    a ? b(a) : b({
                        retcode: -1
                    })
                },
                onTimeout: function() {
                    c.fire("check_timeout")
                },
                isEncode: !0,
                varkey: "callback"
            })
        }
          , m = function(b) {
            a.core.io.jsonp({
                url: e.qrcode_login,
                timeout: d.login_request_timeout,
                args: {
                    entry: d.entry,
                    returntype: "TEXT",
                    crossdomain: 1,
                    cdult: 3,
                    domain: d.domain,
                    alt: b.data.alt,
                    savestate: d.savestate
                },
                onComplete: function(a) {
                    a.retcode != 0 ? c.fire("login_failure", {
                        retcode: a.retcode,
                        msg: a.reason
                    }) : n(a, function(b) {
                        b.result === !1 ? c.fire("login_failure", {
                            retcode: -2,
                            msg: "登录失败"
                        }) : c.fire("login_success", a)
                    })
                },
                onTimeout: function() {
                    c.fire("login_failure", {
                        retcode: -1,
                        msg: "登录超时"
                    })
                },
                isEncode: !0,
                varkey: "callback"
            })
        }
          , n = function(b, c) {
            var e = b.crossDomainUrlList.length;
            if (e == 0)
                c({
                    result: !0
                });
            else {
                var f = setTimeout(function() {
                    e = -1;
                    c({
                        result: !1
                    })
                }, d.crossdomain_timeout);
                for (var g in b.crossDomainUrlList)
                    a.core.io.scriptLoader({
                        url: b.crossDomainUrlList[g],
                        charset: "UTF-8",
                        args: {
                            action: "login"
                        },
                        onComplete: function() {
                            e--;
                            if (e == 0) {
                                clearTimeout(f);
                                c({
                                    result: !0
                                })
                            }
                        }
                    })
            }
        };
        return b
    });
    (function(a) {
        var b = a.jobs.qrcode_login;
        b.getVersion = function() {
            return "qrcode_login.js(v1.0.1) 2013-12-02"
        }
        ;
        b.STK = a;
        this.SINA_QRCODE_LOGIN = b
    }
    ).call(this, a)
}
).call(this);
STK.register("common.channel.sso.qrcode", function(a) {
    var b = ["qrcode_scanned", "qrcode_used", "qrcode_timeout", "qrcode_exception", "login_success", "login_failure", "getQRcode", "getQRcode_success", "start", "cancel", "set"];
    return a.common.listener.define("common.channel.sso.qrcode", b)
});
STK.register("common.login.sso.qrcodebridge", function(a) {
    var b = window.SINA_QRCODE_LOGIN
      , c = a.common.channel.sso.qrcode;
    return function(a) {
        var d = !1
          , e = {
            init: function() {
                if (!d) {
                    e.bind();
                    d = !0
                }
            },
            bind: function() {
                for (var a in e.send)
                    b.register(a, e.send[a]);
                for (var a in e.handle)
                    c.register(a, e.handle[a])
            },
            unbind: function() {},
            send: {
                qrcode_scanned: function(a) {
                    c.fire("qrcode_scanned", a)
                },
                qrcode_used: function(a) {
                    c.fire("qrcode_used", a)
                },
                qrcode_timeout: function(a) {
                    c.fire("qrcode_timeout", a)
                },
                qrcode_exception: function(a) {
                    c.fire("qrcode_exception", a)
                },
                login_success: function(a) {
                    c.fire("login_success", a)
                },
                login_failure: function(a) {
                    c.fire("login_failure", a)
                }
            },
            handle: {
                getQRcode: function() {
                    b.getQRcode(function(a) {
                        if (a.retcode == "20000000") {
                            c.fire("getQRcode_success", a);
                            b.start()
                        }
                    })
                },
                cancel: function() {
                    b.cancel()
                },
                start: function() {
                    b.start()
                },
                set: function(a) {
                    b.set(a)
                }
            }
        }
          , f = {};
        e.init();
        return f
    }
});
STK.register("kit.dom.parseDOM", function(a) {
    return function(a) {
        for (var b in a)
            a[b] && a[b].length == 1 && (a[b] = a[b][0]);
        return a
    }
});
STK.register("kit.dom.layoutPos", function(a) {
    return function(b, c, d) {
        if (!a.isNode(c))
            throw "kit.dom.layerOutElement need element as first parameter";
        if (c === document.body)
            return !1;
        if (!c.parentNode)
            return !1;
        if (c.style.display === "none")
            return !1;
        var e, f, g, h, i, j, k;
        e = a.parseParam({
            pos: "left-bottom",
            offsetX: 0,
            offsetY: 0
        }, d);
        f = c;
        if (!f)
            return !1;
        while (f !== document.body) {
            f = f.parentNode;
            if (f.style.display === "none")
                return !1;
            j = a.getStyle(f, "position");
            k = f.getAttribute("layout-shell");
            if (j === "absolute" || j === "fixed")
                break;
            if (k === "true" && j === "relative")
                break
        }
        f.appendChild(b);
        g = a.position(c, {
            parent: f
        });
        h = {
            w: c.offsetWidth,
            h: c.offsetHeight
        };
        i = e.pos.split("-");
        i[0] === "left" ? b.style.left = g.l + e.offsetX + "px" : i[0] === "right" ? b.style.left = g.l + h.w + e.offsetX + "px" : i[0] === "center" && (b.style.left = g.l + h.w / 2 + e.offsetX + "px");
        i[1] === "top" ? b.style.top = g.t + e.offsetY + "px" : i[1] === "bottom" ? b.style.top = g.t + h.h + e.offsetY + "px" : i[1] === "middle" && (b.style.top = g.t + h.h / 2 + e.offsetY + "px");
        return !0
    }
});
STK.register("kit.dom.firstChild", function(a) {
    var b = a.core.dom.next;
    return function(a) {
        var c = a.firstChild;
        c && c.nodeType != 1 && (c = b(c));
        return c
    }
});
STK.register("kit.extra.textareaUtils", function(a) {
    var b = {}
      , c = document.selection;
    b.selectionStart = function(a) {
        if (!c)
            try {
                return a.selectionStart
            } catch (b) {
                return 0
            }
        var d = c.createRange(), e, f, g = 0, h = document.body.createTextRange();
        try {
            h.moveToElementText(a)
        } catch (b) {}
        for (g; h.compareEndPoints("StartToStart", d) < 0; g++)
            h.moveStart("character", 1);
        return g
    }
    ;
    b.selectionBefore = function(a) {
        return a.value.slice(0, b.selectionStart(a))
    }
    ;
    b.selectText = function(a, b, d) {
        a.focus();
        if (!c)
            a.setSelectionRange(b, d);
        else {
            var e = a.createTextRange();
            e.collapse(1);
            e.moveStart("character", b);
            e.moveEnd("character", d - b);
            e.select()
        }
    }
    ;
    b.insertText = function(a, d, e, f) {
        a.focus();
        f = f || 0;
        if (!c) {
            var g = a.value
              , h = e - f
              , i = h + d.length;
            a.value = g.slice(0, h) + d + g.slice(e, g.length);
            b.selectText(a, i, i)
        } else {
            var j = c.createRange();
            j.moveStart("character", -f);
            j.text = d
        }
    }
    ;
    b.replaceText = function(a, d) {
        a.focus();
        var e = a.value
          , f = b.getSelectedText(a)
          , g = f.length;
        if (f.length == 0)
            b.insertText(a, d, b.getCursorPos(a));
        else {
            var h = b.getCursorPos(a);
            if (!c) {
                var j = h + f.length;
                a.value = e.slice(0, h) + d + e.slice(h + g, e.length);
                b.setCursor(a, h + d.length);
                return
            }
            var i = c.createRange();
            i.text = d;
            b.setCursor(a, h + d.length)
        }
    }
    ;
    b.getCursorPos = function(a) {
        var b = 0;
        if (STK.core.util.browser.IE) {
            a.focus();
            var d = null;
            d = c.createRange();
            var e = d.duplicate();
            e.moveToElementText(a);
            e.setEndPoint("EndToEnd", d);
            a.selectionStartIE = e.text.length - d.text.length;
            a.selectionEndIE = a.selectionStartIE + d.text.length;
            b = a.selectionStartIE
        } else if (a.selectionStart || a.selectionStart == "0")
            b = a.selectionStart;
        return b
    }
    ;
    b.getSelectedText = function(a) {
        var b = ""
          , d = function(a) {
            return a.selectionStart != undefined && a.selectionEnd != undefined ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
        };
        window.getSelection ? b = d(a) : b = c.createRange().text;
        return b
    }
    ;
    b.setCursor = function(a, b, c) {
        b = b == null ? a.value.length : b;
        c = c == null ? 0 : c;
        a.focus();
        if (a.createTextRange) {
            var d = a.createTextRange();
            d.move("character", b);
            d.moveEnd("character", c);
            d.select()
        } else
            a.setSelectionRange(b, b + c)
    }
    ;
    b.unCoverInsertText = function(a, b, c) {
        c = c == null ? {} : c;
        c.rcs = c.rcs == null ? a.value.length : c.rcs * 1;
        c.rccl = c.rccl == null ? 0 : c.rccl * 1;
        var d = a.value
          , e = d.slice(0, c.rcs)
          , f = d.slice(c.rcs + c.rccl, d == "" ? 0 : d.length);
        a.value = e + b + f;
        this.setCursor(a, c.rcs + (b == null ? 0 : b.length))
    }
    ;
    return b
});
STK.register("kit.io.jsonp", function(a) {
    return function(b) {
        var c = a.parseParam({
            url: "",
            method: "get",
            responseType: "json",
            varkey: "_v",
            timeout: 3e4,
            onComplete: a.funcEmpty,
            onTraning: a.funcEmpty,
            onFail: a.funcEmpty,
            isEncode: !0
        }, b)
          , d = []
          , e = {}
          , f = !1
          , g = function() {
            if (!!d.length) {
                if (f === !0)
                    return;
                f = !0;
                e.args = d.shift();
                e.onComplete = function(a) {
                    f = !1;
                    c.onComplete(a, e.args);
                    setTimeout(g, 0)
                }
                ;
                e.onFail = function(a) {
                    f = !1;
                    c.onFail(a);
                    setTimeout(g, 0)
                }
                ;
                a.jsonp(a.core.json.merge(c, {
                    args: e.args,
                    onComplete: function(a) {
                        e.onComplete(a)
                    },
                    onFail: function(a) {
                        try {
                            e.onFail(a)
                        } catch (b) {}
                    }
                }))
            }
        }
          , h = {};
        h.request = function(a) {
            a || (a = {});
            d.push(a);
            a._t = 1;
            g()
        }
        ;
        h.abort = function(a) {
            while (d.length)
                d.shift();
            f = !1;
            e = null
        }
        ;
        return h
    }
});
STK.register("common.extra.parseLanguage", function(a) {
    var b, c = function(d) {
        if (typeof d == "string")
            return a.core.util.language(d, b);
        for (var e in d)
            d[e] = c(d[e]);
        return d
    };
    return function(a, d) {
        b = d || window.$LANG || {};
        return c(a)
    }
});
STK.register("ui.mod.layer", function(a) {
    var b = function(a) {
        var b = {};
        if (a.style.display == "none") {
            a.style.visibility = "hidden";
            a.style.display = "";
            b.w = a.offsetWidth;
            b.h = a.offsetHeight;
            a.style.display = "none";
            a.style.visibility = "visible"
        } else {
            b.w = a.offsetWidth;
            b.h = a.offsetHeight
        }
        return b
    }
      , c = function(c, d) {
        d = d || "topleft";
        var e = null;
        if (c.style.display == "none") {
            c.style.visibility = "hidden";
            c.style.display = "";
            e = a.core.dom.position(c);
            c.style.display = "none";
            c.style.visibility = "visible"
        } else
            e = a.core.dom.position(c);
        if (d !== "topleft") {
            var f = b(c);
            if (d === "topright")
                e.l = e.l + f.w;
            else if (d === "bottomleft")
                e.t = e.t + f.h;
            else if (d === "bottomright") {
                e.l = e.l + f.w;
                e.t = e.t + f.h
            }
        }
        return e
    };
    return function(d) {
        var e = a.core.dom.builder(d)
          , f = e.list.outer[0]
          , g = e.list.inner[0]
          , h = a.core.dom.uniqueID(f)
          , i = {}
          , j = a.core.evt.custEvent.define(i, "show");
        a.core.evt.custEvent.define(j, "hide");
        var k = null;
        i.show = function() {
            f.style.display = "";
            a.core.evt.custEvent.fire(j, "show");
            return i
        }
        ;
        i.hide = function() {
            f.style.display = "none";
            a.custEvent.fire(j, "hide");
            return i
        }
        ;
        i.getPosition = function(a) {
            return c(f, a)
        }
        ;
        i.getSize = function(a) {
            if (a || !k)
                k = b.apply(i, [f]);
            return k
        }
        ;
        i.html = function(a) {
            a !== undefined && (g.innerHTML = a);
            return g.innerHTML
        }
        ;
        i.text = function(b) {
            b !== undefined && (g.innerHTML = a.core.str.encodeHTML(b));
            return a.core.str.decodeHTML(g.innerHTML)
        }
        ;
        i.appendChild = function(a) {
            g.appendChild(a);
            return i
        }
        ;
        i.getUniqueID = function() {
            return h
        }
        ;
        i.getOuter = function() {
            return f
        }
        ;
        i.getInner = function() {
            return g
        }
        ;
        i.getParentNode = function() {
            return f.parentNode
        }
        ;
        i.getDomList = function() {
            return e.list
        }
        ;
        i.getDomListByKey = function(a) {
            return e.list[a]
        }
        ;
        i.getDom = function(a, b) {
            return e.list[a] ? e.list[a][b || 0] : !1
        }
        ;
        i.getCascadeDom = function(b, c) {
            return e.list[b] ? a.core.dom.cascadeNode(e.list[b][c || 0]) : !1
        }
        ;
        return i
    }
});
STK.register("common.form.bubbleTip", function(a) {
    var b = {
        FRAME: '<div node-type="outer" class="layer_form_tips" style="width:216px"><div class="bg"><div node-type="inner" class="content"><a href="javascript:void(0)" action-type="common_layer_errtip_close" node-type="close" onclick="return false;" class="W_ico12 icon_close"></a><p node-type="msg" class="tips"></p></div><div node-type="arrow" class="arrow arrow_tips"></div></div></div>',
        CONTENT: '<span class="icon_rederrorS"></span>'
    };
    return function(c) {
        var d, e, f, g, h = {
            init: function() {
                h.parseParam();
                h.build();
                h.bind()
            },
            parseParam: function() {
                d = a.parseParam({
                    template: b.FRAME
                }, c || {})
            },
            build: function() {
                e = a.ui.mod.layer(d.template);
                f = a.kit.dom.parseDOM(e.getDomList())
            },
            bind: function() {
                g = a.core.evt.delegatedEvent(f.outer);
                for (var b in i)
                    g.add(b, "click", i[b])
            },
            show: function(c, d) {
                d = a.parseParam({
                    el: null,
                    box: null
                }, d || {});
                if (!!d.el && !!a.isNode(d.el)) {
                    a.isNode(d.box) || (d.box = d.el);
                    f.msg.innerHTML = b.CONTENT + c;
                    e.show();
                    a.kit.dom.layoutPos(f.outer, d.box, {
                        pos: "left-top"
                    });
                    d.layerPos = a.core.json.merge(a.core.dom.position(d.box), a.core.dom.getSize(f.outer));
                    d.elPos = a.core.json.merge(a.core.dom.position(d.el), a.core.dom.getSize(d.el));
                    if (d.elPos.l < 0 || d.elPos.width <= 0) {
                        d.elPos.l = d.layerPos.l;
                        d.elPos.width = d.layerPos.width
                    }
                    a.core.dom.setStyle(f.arrow, "left", Math.abs(d.layerPos.l - d.elPos.l) + d.elPos.width / 2 + "px");
                    a.core.dom.setXY(f.outer, {
                        t: d.layerPos.t - d.layerPos.height - 3,
                        l: d.layerPos.l - 2
                    })
                }
            },
            hide: function() {
                e.hide()
            },
            destroy: function() {
                e.hide();
                e = null;
                a.core.dom.removeNode(f.outer)
            }
        }, i = {
            common_layer_errtip_close: function() {
                e.hide()
            }
        };
        h.init();
        var j = {
            layer: e,
            show: h.show,
            hide: h.hide,
            domList: f,
            destroy: h.destroy
        };
        return j
    }
});
STK.register("common.extra.keyboardCapture", function(a) {
    var b = {
        13: "enter",
        27: "esc",
        32: "space",
        38: "up",
        40: "down",
        9: "tab"
    };
    return function(c, d) {
        d = d || {};
        var e = {}, f, g = {
            keydown: function(c) {
                d.stopScroll && a.stopEvent();
                var f, g;
                !!(f = c) && !!(g = f.keyCode) && b[g] && a.custEvent.fire(e, b[g])
            }
        }, h = {
            init: function() {
                h.pars();
                h.bind()
            },
            pars: function() {},
            bind: function() {
                for (var b in g)
                    a.addEvent(c, b, g[b])
            },
            getKey: function(a) {
                return b[a]
            },
            destroy: function() {
                for (var b in g)
                    a.removeEvent(c, b, g[b])
            }
        };
        h.init();
        e.getKey = h.getKey;
        e.destroy = h.destroy;
        return e
    }
});
STK.register("kit.extra.language", function(a) {
    window.$LANG || (window.$LANG = {});
    return function(b) {
        var c = [].splice.call(arguments, 1, arguments.length)
          , d = [b, $LANG].concat(c)
          , e = a.core.util.language.apply(this, d);
        return e
    }
});
STK.register("common.layer.emailAutocomplete", function(a) {
    var b = a.kit.extra.textareaUtils
      , c = a.kit.extra.language
      , d = ["sina.com", "163.com", "qq.com", "126.com", "vip.sina.com", "sina.cn", "hotmail.com", "gmail.com", "sohu.com", "139.com", "wo.com.cn", "189.cn", "21cn.com"]
      , e = {
        panel: ['<div node-type="layer" class="layer_menu_list" style="display:none;">', '<ul><li class="note">#L{请选择邮箱类型}</li></ul>', '<ul node-type="panel"></ul>', "</div>"].join(""),
        item: ["<#et userlist data>", "<#list data.data as item>", '<li action-type="item" action-data="value=${data.key}@${item}" ><a href="#">${data.key}@${item}</a></li>', "</#list>", "</#et>"].join("")
    }
      , f = ["enter", "esc", "up", "down"]
      , g = [/^[0-9a-z_][_.0-9a-z-]{0,31}$/, /^[0-9a-zA-Z_][_.0-9a-zA-Z-]{0,31}$/]
      , h = {};
    return function(b, i) {
        var j, k, l, m, n, o, p, q = !1, r = {
            get: function(a) {
                var b = a.split("@")
                  , c = b.length;
                if (c == 2) {
                    var e = b[1].toLowerCase();
                    if (!!e && !/^[0-9a-z]+[0-9a-z-.]*$/.test(e))
                        return null;
                    if (e) {
                        !h[e] && r.run(e);
                        return h[e]
                    }
                    return d
                }
                return null
            },
            run: function(a) {
                var b = new RegExp("^" + a + "");
                h[a] = [];
                for (var c in d) {
                    c = d[c];
                    !!b.exec(c) && h[a].push(c)
                }
            },
            checkFormat: function(a, b) {
                b = !b ? 0 : 1;
                return g[b].test(a)
            }
        }, s, t = {
            build: function() {
                var b = a.builder(c(j.template.panel));
                k = b.list.layer[0];
                l = b.list.panel[0];
                document.body.appendChild(b.box)
            },
            show: function() {
                var c = a.core.dom.position(b)
                  , d = a.core.dom.getSize(b)
                  , e = ["position:absolute", "display:inline-block", "z-index:10010", "left:" + (c.l + j.offsetX) + "px", "top:" + (c.t + d.height + j.offsetY) + "px"];
                if (j.width > 0) {
                    e.push("width:" + j.width + "px");
                    e.push("overflow:hidden")
                }
                k.style.cssText = e.join(";");
                q = !0
            },
            hide: function() {
                setTimeout(function() {
                    k.style.display = "none";
                    q = !1
                }, 300)
            },
            refresh: function(b, c, d) {
                l.innerHTML = a.core.util.easyTemplate(j.template.item, {
                    key: encodeURIComponent(b),
                    domain: c,
                    data: d
                }).toString();
                s = null
            },
            indexChange: function(b) {
                var c = p.length;
                if (!(c < 1)) {
                    var d = a.sizzle("li.cur", l)[0];
                    if (d) {
                        var e = a.core.dom[b > 0 ? "next" : "prev"](d);
                        e ? s = e : s = a.core.dom[(b > 0 ? "first" : "last") + "Child"](l);
                        s && a.removeClassName(d, "cur")
                    } else {
                        var f = a.sizzle("li", l);
                        s = a.sizzle("li", l)[0]
                    }
                    a.addClassName(s, "cur")
                }
            },
            onShown: function() {
                return q
            },
            hasCurrent: function() {
                var b = a.sizzle("li.cur", l)[0];
                return b ? !0 : !1
            }
        }, u = {
            enter: function() {
                var c = b.value;
                j.autoTrim && (c = c.replace(/^\s+/g, ""));
                var d = a.queryToJson(s.getAttribute("action-data"));
                if (d.value.indexOf(c) === 0 && c !== "") {
                    b.value = d.value;
                    b.blur()
                }
            },
            esc: function() {
                x.hide()
            },
            up: function() {
                t.indexChange(-1);
                a.preventDefault()
            },
            down: function() {
                t.indexChange(1);
                a.preventDefault()
            }
        }, v = {
            focus: function() {
                x.show()
            },
            blur: function() {
                x.hide()
            },
            keyup: function(a) {
                var b = a.keyCode;
                !u[n.getKey(b)] && !m && (m = setTimeout(function() {
                    x.show();
                    clearTimeout(m);
                    m = null
                }, 500))
            }
        }, w = {
            mousedown: {
                item: function(a) {
                    b.value = a.data.value
                }
            },
            click: {
                item: function(b) {
                    a.preventDefault();
                    x.hide()
                }
            }
        }, x = {
            init: function() {
                if (!a.isNode(b))
                    throw "input is undefined";
                x.pars();
                x.build();
                x.bind()
            },
            pars: function() {
                j = a.parseParam({
                    template: e,
                    autoTrim: !1,
                    autoCase: !1,
                    width: -1,
                    offsetX: 0,
                    offsetY: 0
                }, i || {});
                d = $CONFIG.emailDomains || i && i.domains || d
            },
            build: function() {
                t.build();
                n = a.common.extra.keyboardCapture(b)
            },
            bind: function() {
                a.custEvent.define(n, f);
                for (var c = 0, d = f.length; c < d; c++)
                    a.custEvent.add(n, f[c], u[f[c]]);
                for (var e in v)
                    a.addEvent(b, e, v[e]);
                o = a.delegatedEvent(l);
                for (var e in w) {
                    var g = w[e];
                    for (var h in g)
                        o.add(h, e, g[h])
                }
            },
            show: function() {
                p = r.get(b.value);
                var a = b.value.split("@")
                  , c = a[0]
                  , d = a[1];
                j.autoTrim && (c = c.replace(/^\s+/g, ""));
                if (p && p[0] && r.checkFormat(c, j.autoCase)) {
                    if (p.length == 1 && d == p[0])
                        return;
                    t.refresh(c, d, p);
                    t.show()
                } else
                    t.hide()
            },
            hide: function() {
                t.hide()
            },
            destroy: function() {
                for (var c in v)
                    a.removeEvent(b, c, v[c]);
                a.custEvent.undefine(n, f);
                o.destroy();
                n.destroy()
            },
            onShown: t.onShown,
            onActive: function() {
                return t.onShown() && t.hasCurrent()
            }
        };
        x.init();
        var y = {};
        y.show = x.show;
        y.hide = x.hide;
        y.onShown = x.onShown;
        y.onActive = x.onActive;
        y.destroy = x.destroy;
        return y
    }
});
STK.register("common.extra.inputMonitor", function(a) {
    var b = {
        m: 100,
        s: 1e3,
        f: 5e3
    };
    return function(c, d) {
        var e, f, g = {}, h = {}, i = !1, j = {
            init: function() {
                j.parseParam();
                j.bind()
            },
            parseParam: function() {
                d = a.parseParam(b, d || {})
            },
            bind: function() {
                a.custEvent.define(h, ["change"]);
                a.addEvent(c, "focus", j.start);
                a.addEvent(c, "blur", j.stop)
            },
            start: function() {
                g.f && clearTimeout(g.f);
                !g.m && (g.m = setInterval(j.check, d.m))
            },
            stop: function() {
                g.f && clearTimeout(g.f);
                g.f = setTimeout(function() {
                    if (g.m) {
                        clearInterval(g.m);
                        g.m = null
                    }
                }, d.f)
            },
            check: function() {
                e = c.value;
                if (!j.isSame(e)) {
                    if (!i) {
                        i = !0;
                        a.custEvent.fire(h, "change")
                    }
                    f = e;
                    j.inputing()
                }
            },
            inputing: function() {
                g.s && clearTimeout(g.s);
                g.s = setTimeout(function() {
                    i = !1
                }, d.s)
            },
            isSame: function(a) {
                return a === f
            },
            destroy: function() {
                for (var b in g)
                    g[b] && clearTimeout(g[b]);
                a.removeEvent(c, "focus", j.start);
                a.removeEvent(c, "blur", j.stop);
                a.custEvent.undefine(h);
                f = g = d = e = h = j = null
            }
        };
        j.init();
        h.destroy = j.destroy;
        return h
    }
});
STK.register("kit.extra.orderStr", function(a) {
    return function(a, b) {
        if (!a || !b)
            throw "orderStr error!";
        typeof a != "string" && (a = a + "");
        typeof b != "string" && (b = b + "");
        var c = a.charCodeAt(0)
          , d = b.charCodeAt(0)
          , e = c > d;
        if (e) {
            var f = c;
            c = d;
            d = f
        }
        var g = [];
        for (var h = c; h <= d; h++)
            g.push(String.fromCharCode(h));
        e && g.reverse();
        return g.join("")
    }
});
STK.register("common.setting.rule", function(a) {
    var b = a.kit.extra.orderStr
      , c = {};
    c.isEmpty = function(a) {
        return /^\s*$/g.test(a.replace(/^\s+|\s+$/g, ""))
    }
    ;
    c.isNumber = function(a) {
        return /^[+\-]?\d+(\.\d+)?$/.test(a)
    }
    ;
    c.isName = function(a) {
        return /^[0-9a-zA-Z\u4e00-\u9fa5_-]+$/.test(a)
    }
    ;
    c.isRealName = function(a) {
        return /^[\u4e00-\u9fa5]{2,6}$/.test(a) ? !0 : /^[a-zA-Z]{2,20}$/.test(a) ? !0 : /[a-zA-Z0-9\u3000|\s|\t|\uff00-\uffff～！@#￥%……&×（）——『』【】、。‘“《》\?\~\!\@\#\$\%\^\&\*\\\+\`\=\[\]\(\)\{\}\|\;\'\:\"\,\/\<\>]+/.test(a) ? !1 : !0
    }
    ;
    c.isCompany = function(a) {
        return /^[^"'<>]+$/.test(a)
    }
    ;
    c.isChinese = function(a) {
        return /[\u4e00-\u9fa5]+$/.test(a)
    }
    ;
    c.isCName = function(a) {
        return /^[\u4e00-\u9fa5]+[\u00b7\.]?[\u4e00-\u9fa5]+$/.test(a)
    }
    ;
    c.isEmail = function(a) {
        if (!/^[0-9a-z_][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}\.){1,4}[a-z]{2,4}$/.test(a))
            return !1;
        if (a && a != "" && a.indexOf("@") != -1) {
            var b = a.indexOf("@")
              , c = a.substring(0, b);
            return c.length > 64 || a.length > 256 ? !1 : !0
        }
        return !1
    }
    ;
    c.isYahoo = function(a) {
        return /^.*@((yahoo\.com\.cn)||(yahoo\.cn))$/.test(a)
    }
    ;
    c.isEmailName = function(a) {
        return /^[0-9a-z_][_.0-9a-z-]{0,31}$/.test(a)
    }
    ;
    c.isIDNumber = function(a) {
        return /^[\d]{15}$/.test(a) || /^[\d]{17}([Xx\d]{1}$)$/.test(a)
    }
    ;
    c.isMobile = function(a) {
        return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(a)
    }
    ;
    c.isWeird = function(a) {
        return !/^[0-9a-zA-Z~!@#$%^&*()_+`\-={}|\[\]\\\:\";'<\>?,.\/]+$/i.test(a)
    }
    ;
    c.isPassportID = function(a) {
        return /^[a-zA-Z0-9]{8,20}$/.test(a)
    }
    ;
    c.isAbroadName = function(a) {
        return /^[a-zA-Z\u4e00-\u9fa5]+([\u00b7\.\- ]?[a-zA-Z\u4e00-\u9fa5]+)*$/.test(a)
    }
    ;
    c.lenLimit = function(b, c, d) {
        var e = a.bLength(b);
        return !(e < c || e > d)
    }
    ;
    c.isUrl = function(a) {
        return /^http:\/\/([\w-]+(\.[\w-]+)+(\/[\w-   .\/\?%@&+=\u4e00-\u9fa5]*)?)?$/i.test(a)
    }
    ;
    c.turnBoolean = function(a) {
        switch (typeof a) {
        case "boolean":
            return a;
        case "number":
            return !!a;
        case "string":
            return a == "true" || a == "1"
        }
    }
    ;
    c.reNullChar = function(a) {
        return a.replace(/^\s+|\s+$/g, "")
    }
    ;
    var d = [b("a", "z"), b("z", "a"), b("0", "9"), b("9", "0")];
    c.isOrder = function(a) {
        return a && a.length && a.length > 1 && function() {
            for (var b = 0; b < d.length; b++)
                if (d[b].indexOf(a) >= 0)
                    return !0;
            return !1
        }()
    }
    ;
    c.isWeakPasswd = function(b) {
        var d = ["000000", "111111", "11111111", "112233", "123123", "123321", "123456", "12345678", "654321", "666666", "888888", "abcdef", "abcabc", "abc123", "a1b2c3", "aaa111", "123qwe", "qwerty", "qweasd", "admin", "password", "p@ssword", "passwd", "iloveyou", "5201314"];
        if (a.inArray(b, d))
            return !0;
        if (/^([a-zA-Z0-9])\1+$/.test(b))
            return !0;
        if (c.isOrder(b))
            return !0;
        if (/^([a-zA-Z]+)([0-9]+)$/.test(b) || /^([0-9]+)([a-zA-Z]+)$/.test(b)) {
            var e = RegExp.$1
              , f = RegExp.$2;
            if (c.isOrder(e) && c.isOrder(f))
                return !0
        }
        return !1
    }
    ;
    c.isStrongPasswd = function(a) {
        var b = a.match(/[a-z]/ig)
          , c = a.match(/[0-9]/ig)
          , d = a.match(/([^a-z0-9])/ig);
        if (b && c && d)
            return !0;
        if (b && c)
            return b.length + c.length >= 11;
        if (b && d)
            return b.length + d.length >= 11;
        if (c && d)
            return c.length + d.length >= 11
    }
    ;
    c.isMobileSea = function(a, b) {
        switch (b) {
        case "0086":
            return c.isMobile(a);
        case "00852":
            return /^[569]\d{7}$/.test(a);
        case "00853":
            return /^6\d{7}$/.test(a);
        case "00886":
            return /^9\d{8}$/.test(a);
        case "001":
            return /^\d{10}$/.test(a);
        case "0060":
            return /^1\d{8,9}$/.test(a);
        case "0061":
            return /^4\d{8}$/.test(a);
        case "0081":
            return /^[789]0\d{8}$/.test(a);
        case "0082":
            return /^1[016789]\d{8}$/.test(a);
        case "0065":
            return /^[89]\d{7}$/.test(a);
        case "0044":
            return /^(7[45789]\d{8})|7624\d{6}$/.test(a);
        case "0033":
            return /^((6\d{8})|(7[345678]\d{7}))$/.test(a);
        case "007":
            return /^((90[12345689]\d{7})|(9[1236]\d{8})|(95[0123]\d{7}))$/.test(a);
        case "0091":
            return /^[987]\d{9}$/.test(a);
        case "0066":
            return /^0[986]\d{8}$/.test(a);
        case "0049":
            return /^(15[12579]\d{7}|16[023]\d{7}|160\d{8}|17[012345789]\d{7}|176\d{8}|700\d{8})$/.test(a);
        case "0055":
            return /^(\d{2}[6789]\d{7,8})$/.test(a);
        case "0062":
            return /^(8\d{8,10})$/.test(a);
        case "00855":
            return /^([19]\d{7,9})$/.test(a);
        case "0095":
            return /^((9\d{7,9})|((64|69|80)\d{6,8}))$/.test(a);
        case "00673":
            return /^((85|86|87|88)\d{5,6})$/.test(a);
        case "0063":
            return /^(9\d{9})$/.test(a);
        case "0084":
            return /^(9\d{8,9})$/.test(a);
        case "00856":
            return /^(20\d{7,8})$/.test(a);
        case "0039":
            return /^(3\d{8,9})$/.test(a);
        case "0034":
            return /^([67]\d{8})$/.test(a);
        default:
            return !0
        }
    }
    ;
    return c
});
STK.register("common.setting.textCopy", function(a) {
    var b = a.common.setting.rule
      , c = a.core.dom.uniqueID
      , d = {
        text: "text"
    }
      , e = function(a) {
        var b = [];
        for (var c in a)
            b.push(a[c]);
        return b
    };
    return function(e, f) {
        var g, h = {
            blur: function(b) {
                var c = a.fixEvent(b).target;
                i.text.reset(c);
                a.custEvent.fire(o, "blur", {
                    type: options.actionType,
                    el: c
                });
                var d = c.getAttribute("no_cls");
                d != "true" && a.removeClassName(c, options.focusCS)
            },
            focus: function(b) {
                var c = a.fixEvent(b).target;
                i.text.place(c);
                a.custEvent.fire(o, "focus", {
                    type: options.actionType,
                    el: c
                });
                var d = c.getAttribute("no_cls");
                d != "true" && a.addClassName(c, options.focusCS)
            },
            keyup: function(b) {
                var c = a.fixEvent(b).target;
                a.custEvent.fire(o, "keyup", {
                    type: options.actionType,
                    el: c
                })
            }
        }, i = {
            text: {
                place: function(a) {
                    a.value.replace(/^\s+|\s+$/g, "") == k[c(a)].data[d.text] && (a.value = "")
                },
                reset: function(a) {
                    b.isEmpty(a.value) && (a.value = k[c(a)].data[d.text] || "")
                }
            }
        }, j = function(a) {
            m.buildItem(a);
            m.active(a.el)
        }, k = {}, l = {
            click: j,
            focusin: j
        }, m = {
            init: function() {
                m.parseParam();
                m.bind()
            },
            parseParam: function() {
                options = a.parseParam({
                    actionType: "text_copy",
                    focusCS: "W_input_focus"
                }, f);
                d = a.parseParam(d, f)
            },
            bind: function() {
                g = a.core.evt.delegatedEvent(e);
                for (var b in l)
                    g.add(options.actionType, b, l[b])
            },
            destroy: function() {
                g.destroy();
                for (var b in k)
                    for (var c in h)
                        a.removeEvent(b.el, c, h[c])
            },
            buildItem: function(b) {
                var e = c(b.el);
                if (!k[e]) {
                    k[e] = {
                        el: b.el || "",
                        data: {}
                    };
                    for (var f in d)
                        k[e].data[d[f]] = b.data[d[f]] || "";
                    for (var g in h)
                        a.addEvent(b.el, g, h[g])
                }
            },
            active: function(b) {
                i.text.place(b);
                var c = b.getAttribute("no_cls");
                c != "true" && a.addClassName(b, options.focusCS)
            }
        }, n = {
            isCopyText: function(b) {
                var c = b.getAttribute("action-type")
                  , d = a.queryToJson(b.getAttribute("action-data"));
                return b.value.replace(/^\s+|\s+$/g, "") == (d[c].replace(/^\s+|\s+$/g, "") || "")
            },
            build: m.buildItem
        };
        m.init();
        var o = {};
        o.API = n;
        o.destroy = m.destroy;
        return o
    }
});
STK.register("common.setting.form", function(a) {
    var b = ["input", "textarea", "select", "a", "div", "ul", "li", "em"];
    return function(c, d) {
        var e = {}, f, g = "form", h = {
            ctls: {},
            states: {}
        }, i = {
            reset: function(a) {
                for (var b in a)
                    h.states[b] = a[b]
            }
        }, j = {
            init: function() {
                j.pars();
                j.build();
                j.bind()
            },
            pars: function() {
                if (!c)
                    throw "from is undefined";
                f = a.parseParam({
                    proxy: null
                }, d)
            },
            build: function() {
                e.domList = a.builder(c).list
            },
            bind: function() {
                a.custEvent.define(e, ["reset"]);
                a.custEvent.add(e, "reset", i.reset)
            },
            add: function(a, b) {
                h.ctls[a] = b
            },
            getData: function() {
                var d = {};
                for (var e in h.ctls) {
                    var f = h.ctls[e];
                    d[f.name()] = f.value()
                }
                return a.parseParam(a.htmlToJson(c, b), d)
            },
            check: function(a) {
                if (a) {
                    var b = h.ctls[a];
                    h.states[a] = b.check();
                    return h.states[a].type
                }
                var c = !0;
                for (var d in h.ctls) {
                    var b = h.ctls[d];
                    b.pars.iorecords ? h.states[d] = b.msg : h.states[d] = b.check();
                    c = c && h.states[d].state
                }
                return c
            },
            reset: function() {
                for (var a in h.ctls)
                    h.states[a].reset()
            },
            states: function() {
                for (var a in h.ctls)
                    h.states[a] = h.ctls[a].msg;
                return h.states
            },
            destroy: function() {
                for (var a in h.ctls)
                    h.ctls[a].destroy()
            }
        };
        j.init();
        e.ctls = function() {
            return h.ctls
        }();
        e.states = j.states;
        e.add = j.add;
        e.getData = j.getData;
        e.check = j.check;
        e.reset = j.reset;
        e.destroy = j.destroy;
        return e
    }
});
STK.register("common.setting.base", function(a) {
    return function() {
        var b = {};
        b.frame = ["id", "preInit", "init", "initPars", "build", "bind", "errText", "setMust", "setMsg", "disabled", "check", "name", "value", "reset", "fire", "destroy"];
        for (var c in b.frame)
            b[b.frame[c]] = a.core.func.empty;
        return b
    }
});
STK.register("common.setting.dataType", function(a) {
    var b = a.kit.extra.language
      , c = {
        msg: {
            id: "",
            state: !0,
            type: "empty",
            code: "",
            action: "",
            msg: "",
            iodata: null,
            iorecords: !1
        },
        initPars: {
            text: "",
            hook: null,
            type: "",
            proxy: null,
            iokey: null,
            disabled: !1,
            iodelay: 0,
            must: !0,
            auto: !0
        },
        errText: {
            E00: b("#L{系统繁忙}")
        }
    }
      , d = {};
    d.get = function(b) {
        return a.core.json.clone(c[b]) || {}
    }
    ;
    return d
});
STK.register("common.setting.control", function(a) {
    return function(b, c, d) {
        var e = a.common.setting.base();
        e.preInit = function() {
            e.id = a.core.dom.uniqueID(b);
            e.dataType = a.common.setting.dataType;
            e.rule = a.common.setting.rule;
            e.pars = a.parseParam(e.dataType.get("initPars"), c)
        }
        ;
        e.init = function() {
            e.initPars();
            e.build();
            e.bind()
        }
        ;
        e.initPars = function() {
            e.check();
            e.msg.msg = e.errText[e.msg.code] || "";
            e.msg.action = "init";
            e.cache_value = null;
            e.old_value = e.value();
            var a = ["must", "disabled"];
            for (var b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                e.pars[d] = e.rule.turnBoolean(e.pars[d])
            }
        }
        ;
        e.build = function() {
            e.rule.isEmpty(b.defaultValue) && (e.pars.text ? b.value = e.pars.text : b.value = "");
            e.pars.disabled && e.disabled(e.pars.disabled);
            e.node = b
        }
        ;
        e.bind = function() {
            for (var c in d.evtAct)
                a.addEvent(b, c, d.evtAct[c]);
            if (e.pars.iokey) {
                var f = function() {
                    e.pars.iorecords = !1
                };
                a.addEvent(b, "change", f)
            }
        }
        ;
        e.check = function() {
            e.msg = e.dataType.get("msg");
            e.msg.id = e.id;
            e.msg.action = "check";
            if (e.pars.disabled) {
                e.msg.state = !0;
                e.msg.type = "empty";
                e.msg.code = "E01"
            } else
                d.check && d.check();
            e.msg.msg = e.errText[e.msg.code];
            return e.msg
        }
        ;
        e.setMust = function(a) {
            a = e.rule.turnBoolean(a);
            a != undefined && (e.pars.disabled = a)
        }
        ;
        e.setMsg = function(b) {
            e.pars.iokey && (e.pars.iorecords = !1);
            e.msg = a.parseParam(e.dataType.get("msg"), b)
        }
        ;
        e.fire = function() {
            e.errText[e.msg.code] && (e.msg.msg = e.errText[e.msg.code]);
            var b = {};
            b[e.type] = e.msg;
            e.pars.hook && a.custEvent.fire(e.pars.hook, "check", b)
        }
        ;
        e.disabled = function(a) {
            a = e.rule.turnBoolean(a);
            if (a != undefined) {
                e.pars.disabled = a;
                a ? b.disabled = !0 : b.disabled = !1
            }
        }
        ;
        e.name = function() {
            return b.getAttribute("name") || e.id
        }
        ;
        e.value = function(a) {
            if (typeof a != "undefined")
                b.value = a;
            else
                return b.value === e.pars.text ? "" : b.value.replace(/^\s+|\s+$/g, "")
        }
        ;
        e.reset = function(b) {
            e.value(e.old_value);
            e.pars = a.parseParam(e.dataType.get("initPars"), c);
            e.check();
            e.msg.action = "reset";
            !b && e.fire()
        }
        ;
        e.destroy = function() {
            for (var c in d.evtAct)
                a.removeEvent(b, c, d.evtAct[c])
        }
        ;
        e.preInit();
        return e
    }
});
STK.register("common.setting.verifycode", function(a) {
    var b = {
        E01: "",
        E02: "#L{请输入验证码}",
        E03: "#L{验证码输入有误}"
    };
    return function(c, d) {
        var e = function() {
            var a = g.value().replace(/^\s+|\s+$/g, "")
              , b = !1;
            if (!g.pars.must && g.rule.isEmpty(a)) {
                g.msg.state = !0;
                g.msg.type = "empty";
                g.msg.code = "E01"
            } else {
                if (!b && g.rule.isEmpty(a)) {
                    b = !0;
                    g.msg.type = "empty";
                    g.msg.code = "E02"
                }
                if (!b && !g.rule.lenLimit(a, 1, 6)) {
                    b = !0;
                    g.msg.type = "err";
                    g.msg.code = "E03"
                }
                if (!b) {
                    g.msg.state = !0;
                    g.msg.type = "empty";
                    g.msg.code = "E01"
                } else
                    g.msg.state = !1
            }
        }
          , f = {
            focus: function() {
                g.cache_value = g.value();
                if (g.rule.isEmpty(g.cache_value)) {
                    g.msg.state = !1;
                    g.msg.action = "focus";
                    g.msg.type = "tip";
                    g.msg.code = "E02";
                    g.fire()
                }
            },
            blur: function() {
                c.value = g.rule.reNullChar(c.value);
                g.msg.action = "focus";
                e();
                g.fire()
            }
        }
          , g = a.common.setting.control(c, d, {
            evtAct: f,
            check: e
        })
          , h = a.core.obj.sup(g, ["initPars"]);
        g.initPars = function() {
            h.initPars();
            g.errText = a.common.extra.parseLanguage(b);
            g.type = "verifycode"
        }
        ;
        g.pars.auto && g.init();
        return g
    }
});
STK.register("common.setting.vsncode", function(a) {
    var b = {
        E01: "",
        E02: "#L{请输入微盾动态码}",
        E03: "#L{动态码有误，请重新输入}"
    };
    return function(c, d) {
        var e = function() {
            var a = g.value().replace(/^\s+|\s+$/g, "")
              , b = !1;
            if (!g.pars.must && g.rule.isEmpty(a)) {
                g.msg.state = !0;
                g.msg.type = "empty";
                g.msg.code = "E02"
            } else {
                if (!b && g.rule.isEmpty(a)) {
                    b = !0;
                    g.msg.type = "empty";
                    g.msg.code = "E02"
                }
                if (!b && !g.rule.lenLimit(a, 1, 6)) {
                    b = !0;
                    g.msg.type = "err";
                    g.msg.code = "E03"
                }
                if (!b) {
                    g.msg.state = !0;
                    g.msg.type = "empty";
                    g.msg.code = "E01"
                } else
                    g.msg.state = !1
            }
        }
          , f = {
            focus: function() {
                g.cache_value = g.value();
                if (g.rule.isEmpty(g.cache_value)) {
                    g.msg.state = !1;
                    g.msg.action = "focus";
                    g.msg.type = "tip";
                    g.msg.code = "E02";
                    g.fire()
                }
            },
            blur: function() {
                c.value = g.rule.reNullChar(c.value);
                g.msg.action = "blur";
                e();
                g.fire()
            }
        }
          , g = a.common.setting.control(c, d, {
            evtAct: f,
            check: e
        })
          , h = a.core.obj.sup(g, ["initPars"]);
        g.initPars = function() {
            h.initPars();
            g.errText = a.common.extra.parseLanguage(b);
            g.type = "vsncode"
        }
        ;
        g.pars.auto && g.init();
        return g
    }
});
STK.register("common.setting.username", function(a) {
    var b = {
        E01: "",
        E02: "#L{请输入登录名}",
        E03: "#L{请输入正确的登录名}"
    };
    return function(c, d) {
        var e, f = function() {
            var a = h.value()
              , b = !1;
            if (!h.pars.must && h.rule.isEmpty(a)) {
                h.msg.state = !0;
                h.msg.type = "empty";
                h.msg.code = "E01"
            } else {
                if (!b && h.rule.isEmpty(a)) {
                    b = !0;
                    h.msg.type = "empty";
                    h.msg.code = "E02"
                }
                if (!b && !h.rule.lenLimit(a, 1, 128)) {
                    b = !0;
                    h.msg.type = "err";
                    h.msg.code = "E03"
                }
                if (!b) {
                    h.msg.state = !0;
                    h.msg.type = "ok";
                    h.msg.code = "E01"
                } else
                    h.msg.state = !1
            }
        }, g = {}, h = a.common.setting.control(c, d, {
            evtAct: g,
            check: f
        }), i = a.core.obj.sup(h, ["initPars"]);
        h.initPars = function() {
            i.initPars();
            h.errText = a.common.extra.parseLanguage(b);
            h.type = "username"
        }
        ;
        h.pars.auto && h.init();
        return h
    }
});
STK.register("common.setting.passwordlite", function(a) {
    var b = {
        E01: "",
        E02: "#L{请输入密码}",
        E03: "#L{请输入正确的密码}"
    }, c;
    return function(d, e) {
        var f = function() {
            var a = j.value()
              , b = !1;
            if (!j.pars.must && j.rule.isEmpty(a)) {
                j.msg.state = !0;
                j.msg.type = "empty";
                j.msg.code = "E01"
            } else {
                if (!b && j.rule.isEmpty(a)) {
                    b = !0;
                    j.msg.type = "empty";
                    j.msg.code = "E02"
                }
                if (!b && !j.rule.lenLimit(a, 1, 24)) {
                    b = !0;
                    j.msg.type = "err";
                    j.msg.code = "E03"
                }
                if (!b) {
                    j.msg.state = !0;
                    j.msg.type = "ok";
                    j.msg.code = "E01"
                } else
                    j.msg.state = !1
            }
        }
          , g = a.core.dom.next(d)
          , h = {
            init: function() {
                h.auto()
            },
            auto: function() {
                j.rule.isEmpty(j.value()) ? h.show() : h.hide()
            },
            show: function() {
                if (g) {
                    g.style.display = "";
                    a.addEvent(g, "click", function() {
                        d.focus();
                        a.removeEvent(g, "click", arguments.callee)
                    })
                }
            },
            hide: function() {
                g && (g.style.display = "none")
            }
        }
          , i = {
            focus: function() {
                j.cache_value = j.value();
                if (j.rule.isEmpty(j.cache_value)) {
                    j.msg.state = !1;
                    j.msg.action = "focus";
                    j.msg.type = "tip";
                    j.msg.code = "E02";
                    j.fire()
                }
                h.hide()
            },
            blur: function() {
                c && clearTimeout(c);
                d.value = j.rule.reNullChar(d.value);
                j.msg.action = "blur";
                f();
                j.fire();
                h.auto()
            }
        }
          , j = a.common.setting.control(d, e, {
            evtAct: i,
            check: f
        })
          , k = a.core.obj.sup(j, ["initPars"]);
        j.initPars = function() {
            k.initPars();
            j.errText = a.common.extra.parseLanguage(b);
            j.type = "password"
        }
        ;
        j.pars.auto && j.init();
        h.init();
        return j
    }
});
STK.register("common.form.verifycodeSSO", function(a) {
    var b = a.common.channel.sso.login;
    return function(c) {
        var d = {
            init: function() {
                if (!a.core.dom.isNode(c))
                    throw "Node of verify photo is necessary!";
                d.bind();
                b.fire("pincode")
            },
            bind: function() {
                b.register("pincode.update", d.callback)
            },
            callback: function(a) {
                c.src = a;
                d.destroy()
            },
            destroy: function() {
                b.remove("pincode.update", d.callback)
            }
        };
        d.init();
        return {}
    }
});
STK.register("common.form.ssoErrCode", function(a) {
    var b = window.top == window.self;
    return {
        4038: '#L{登录次数过于频繁，}<a href="http://help.weibo.com/faq/q/85/12699#12699" target="_blank">#L{查看帮助}</a>',
        4049: "#L{请填写验证码}",
        4010: '#L{帐号尚未激活。}<a target="_blank" href="http://weibo.com/signup/v5/resend?username=#{USERNAME}">#L{重发激活邮件}</a>',
        4090: "#L{此帐号未激活，请登录原帐号}",
        5024: "#L{请填写正确的微盾动态码}",
        5025: "#L{动态码有误，请重新输入}",
        5: '#L{尚未注册微博，}<a href="http://weibo.com/logout.php?backurl=' + encodeURIComponent("//weibo.com/signup/signup.php") + '"' + (b ? "" : ' target="_blank"') + ">#L{马上注册}</a>",
        101: '#L{用户名或密码错误。}<a href="http://help.weibo.com/faq/q/85/12606#12606" target="_blank">#L{查看帮助}</a>',
        4098: '#L{您的帐号还没有设置密码，为方便登录请}<a href="https://login.sina.com.cn/getpass.html?entry=weibo" target="_blank">#L{重置密码}</a>',
        9999: "#L{当前网络超时，请稍后再试}",
        2071: "#L{您已开启登录保护，请扫码登录}"
    }
});
STK.register("common.login.form_new", function(a) {
    var b = ["username", "password", "verifycode", "vsncode"], c = a.core.util.templet, d = a.common.channel.sso.login, e = a.common.form.verifycodeSSO, f = a.core.evt.hotKey, g = a.kit.extra.textareaUtils, h = $CONFIG && $CONFIG.register_url || "//weibo.com/signup/signup.php" + (Boolean(a.URL(window.location.href).getParam("c")) ? "?backurl=" + encodeURI(window.location.href) : ""), i = {
        CAPSLOCK: "#L{键盘大写锁定已打开，请注意}",
        ERRTIP: {
            CODE: a.common.form.ssoErrCode
        },
        SAVE_STATE_LAYER: '<div class="layer_pop" node-type="outer" style="position:absolute;"><p node-type="content"></p></div>',
        MAIN: '<div node-type="prename_box" class="info_list pre_info clearfix"></div><div node-type="username_box" class="info_list"><div class="inp username"><input autocomplete="off" maxlength="128" tabindex="1" node-type="username" name="username" type="text" class="W_input" action-type="text_copy" action-data="text=#L{邮箱/会员帐号/手机号}" value="" /></div></div><div node-type="password_box" class="info_list"><div class="inp password"><input maxlength="24" tabindex="2" node-type="password" name="password" type="password" class="W_input" action-type="text_copy" value="" /><span class="enter_psw">#L{请输入密码}</span></div></div><div node-type="verifycode_box" class="info_list" style="display: none;"><div class="inp verify"><input maxlength="6" tabindex="3" node-type="verifycode" name="verifycode" type="text" class="W_input" value="" action-type="text_copy" action-data="text=#L{请输入验证码}" /><a class="code" href="javascript:void(0);" onclick="return false;"><img src="" node-type="verifycode_image" action-type="btn_change_verifycode" width="100" height="40"></a><a node-type="btn_change_verifycode" action-type="btn_change_verifycode" class="verify_refresh" href="javascript:void(0);" onclick="return false;">#L{换一换}</a></div></div><div node-type="vsncode_box" class="info_list" style="display: none;"><div class="inp wei_dun"><input maxlength="6" tabindex="4" node-type="vsncode" name="vsncode" type="text" class="W_input" action-type="text_copy" action-data="text=#L{请输入微盾动态码}" value="" /><a node-type="btn_vsncode_recover" href="http://account.weibo.com/forgot/vdun">#L{微盾挂失}</a></div></div><div class="info_list"><div class="inp automatic clearfix"><div class="right"><a suda-data="key=tblog_weibologin3&value=click_forgetpwd" target="_blank" node-type="btn_password_recover" href="https://login.sina.com.cn/getpass.html?entry=weibo">#L{忘记密码}</a></div><label action-type="customTip" action-data="content=#L{建议在网吧或公共电脑上取消该选项。}" title="#L{建议在网吧或公共电脑上取消该选项。}" for="login_form_savestate"><input tabindex="5" id="login_form_savestate" checked="checked" node-type="savestate" type="checkbox" class="W_checkbox" />#L{下次自动登录}</label><a suda-data="key=tblog_weibologin3&value=click_help" action-type="customTip" action-data="content=#L{记不住登录状态，怎么办？}" title="#L{记不住登录状态，怎么办？}" target="_blank" class="icon_ask" href="http://help.weibo.com/faq/q/85/12524#12524"></a></div></div><div class="info_list no_reg"><a tabindex="6" suda-data="key=tblog_weibologin3&value=click_sign" node-type="submitBtn" action-type="btn_submit" class="W_btn_g" href="javascript:void(0)"><span node-type="submitStates">#L{登录}</span></a></div>',
        SUBMIT: {
            NORMAL: "#L{登录}",
            ONSUBMIT: '<b class="loading"></b>#L{登录}'
        },
        PRENAME_BOX: '<div class="W_fl"><img class="W_face_radius" width="50" height="50" src="#{AVATAR}"></div><div class="info_detail"><p class="W_autocut W_f14 W_fb">#{NICKNAME}</p><p class="sub_title W_autocut S_txt2">#{LOGIN_NAME_HAZY}</p><p class="sub_txt"><a href="javascript:void(0)" action-type="use_username">#L{换个账号登录}</a></p></div>'
    }, j = {
        username: a.common.setting.username,
        password: a.common.setting.passwordlite,
        verifycode: a.common.setting.verifycode,
        vsncode: a.common.setting.vsncode
    }, k = function() {
        var a, b = {
            save: function(b) {
                a = b
            },
            load: function() {
                return a
            },
            reset: function() {
                b.save("")
            },
            cached: function(b) {
                return a === b
            }
        };
        return b
    }(), l = {
        cookie: {
            name: "un",
            conf: {
                expire: 240,
                path: "/",
                domain: window.location.hostname,
                encode: !0
            }
        },
        verifyCodeDelay: 3e5,
        savestateDelay: 600,
        errtipDelay: 5e3
    }, m, n = function(b) {
        if (!m) {
            m = [];
            for (var c in i.ERRTIP.CODE)
                m.push(c)
        }
        return a.inArray("" + b, m)
    };
    return function(f, h) {
        var m, o, p, q, r = {}, s, t, u, v = {
            yalogin: !1,
            nopwd: !1,
            unChecked: !1
        }, w = {
            init: function() {
                w.parseParam();
                w.parseDOM();
                w.initPlugin();
                w.bind()
            },
            initPlugin: function() {
                x.init();
                u = function() {
                    var b = '<div class="W_layer W_layer_pop">\n\t<div class="content layer_mini_info">\n\t\t<p class="main_txt">\n\t\t\t<span node-type="icon" class="W_icon icon_warnS"></span>\n\t\t\t<span node-type="text"></span>\n\t<a action-type="close" href="javascript:void(0);" class="W_ficon ficon_close S_ficon">X</a>\t</p>\n\t<div class="W_layer_arrow">\n\t\t\t<span node-type="arrow" class="W_arrow_bor"><i class="S_line3"></i><em class="S_bg2_br"></em></span>\n\t\t<div>\n\t</div>\n</div>'
                      , c = a.v6.conf.core.ui.bubble(b, {
                        showWithAni: !1,
                        hideWithAni: !1,
                        showWithSetWidth: !1
                    });
                    c.on("close", "click", function() {
                        c.hide()
                    });
                    return {
                        show: function(a, b) {
                            setTimeout(function() {
                                if (b.box.offsetWidth) {
                                    c.getDomList().text.innerHTML = a;
                                    c.show().beside(b.box, {
                                        offsetY: 10
                                    })
                                }
                            }, 10)
                        },
                        hide: function() {
                            c.hide()
                        },
                        destroy: function() {
                            c.destroy()
                        }
                    }
                }()
            },
            parseParam: function() {
                h = a.parseParam(l, h || {});
                i = a.common.extra.parseLanguage(i)
            },
            parseDOM: function() {
                if (!a.core.dom.isNode(f))
                    throw "Login form node is necessary";
                a.core.dom.isNode(a.kit.dom.firstChild(f)) || (f.innerHTML = i.MAIN)
            },
            bind: function() {
                m = a.core.evt.delegatedEvent(f);
                m.add("btn_submit", "click", x.submit.active);
                m.add("btn_change_verifycode", "click", x.resetVerifycode);
                m.add("use_username", "click", y.use_username);
                a.addEvent(p.username, "focus", y.stopCheckUsername);
                a.addEvent(p.username, "blur", y.checkUsername);
                a.addEvent(p.submitBtn, "focus", x.submit.focus);
                a.addEvent(p.submitBtn, "blur", x.submit.blur);
                a.foreach(o.ctls, function(b) {
                    b.pars.disabled || a.addEvent(b.node, "keydown", z.enter)
                });
                a.addEvent(p.submitBtn, "keydown", z.enter);
                a.addEvent(p.password, "keypress", z.capslock);
                a.custEvent.define(C, ["closeTip"]);
                a.custEvent.add(C, "closeTip", x.errTip.hide);
                d.register("verify.update", A.verify.update);
                d.register("verify.failure", A.verify.failure);
                d.register("verify.complete", A.verify.complete);
                d.register("login.success", A.login.success);
                d.register("login.failure", A.login.failure);
                d.register("login.complete", A.login.complete);
                d.register("logout.success", A.logout.success);
                d.register("logout.failure", A.logout.failure);
                d.register("logout.complete", A.logout.complete);
                d.register("yalogin.active", A.yalogin.active);
                d.register("yalogin.deny", A.yalogin.deny)
            },
            unbind: function() {
                m.remove("btn_submit", "click", x.submit.active);
                m.remove("btn_change_verifycode", "click", x.resetVerifycode);
                m.remove("use_username", "click", y.use_username);
                m.destroy();
                a.removeEvent(p.username, "focus", y.stopCheckUsername);
                a.removeEvent(p.username, "blur", y.checkUsername);
                a.removeEvent(p.submitBtn, "focus", x.submit.focus);
                a.removeEvent(p.submitBtn, "blur", x.submit.blur);
                a.foreach(o.ctls, function(b) {
                    a.removeEvent(b.node, "keydown", z.enter)
                });
                a.removeEvent(p.submitBtn, "keydown", z.enter);
                a.removeEvent(p.password, "keypress", z.capslock);
                a.custEvent.remove(C, "closeTip", x.errTip.hide);
                a.custEvent.undefine(C, ["closeTip"]);
                d.remove("verify.update", A.verify.update);
                d.remove("verify.failure", A.verify.failure);
                d.remove("verify.complete", A.verify.complete);
                d.remove("login.success", A.login.success);
                d.remove("login.failure", A.login.failure);
                d.remove("login.complete", A.login.complete);
                d.remove("logout.success", A.logout.success);
                d.remove("logout.failure", A.logout.failure);
                d.remove("logout.complete", A.logout.complete);
                d.remove("yalogin.active", A.yalogin.active);
                d.remove("yalogin.deny", A.yalogin.deny)
            },
            destroy: function() {
                w.unbind();
                x.destroy();
                u.destroy();
                for (var a in r)
                    r[a] && clearTimeout(r[a]);
                m = r = x = z = B = A = C = w = u = customTip = v = null
            }
        }, x = {
            init: function() {
                q = a.common.setting.textCopy(f);
                a.custEvent.define(q, ["focus", "blur", "keyup"]);
                a.custEvent.add(q, "focus", x.textCopyHandle);
                a.custEvent.add(q, "blur", x.textCopyHandle);
                o = a.common.setting.form(f);
                p = a.kit.dom.parseDOM(o.domList);
                var c;
                for (var d in p)
                    a.inArray(d, b) && j[d] && x.item(d);
                B.verifycode.disable();
                B.vsncode.disable();
                t = a.common.layer.emailAutocomplete(p.username, {
                    autoTrim: !0,
                    autoCase: !0,
                    offsetX: -35,
                    offsetY: 4,
                    width: a.core.dom.getSize(p.username.parentNode).width - 4
                });
                s = a.common.extra.inputMonitor(p.username);
                a.custEvent.add(s, "change", function() {
                    x.changeExtra();
                    k.reset();
                    v.nopwd = !1;
                    v.unChecked = !1
                });
                x.prenameBox()
            },
            item: function(b) {
                _data = a.queryToJson(p[b].getAttribute("action-data") || "");
                o.add(b, j[b](p[b], a.core.json.merge({
                    hook: o
                }, _data)));
                a.core.util.browser.MOZ && q.API.build({
                    el: p[b],
                    data: _data
                })
            },
            textCopyHandle: function(b, c) {
                b.type == "focus" && x.errTip.hide();
                a.inArray(c.el, [p.username, p.password, p.vsncode, p.verifycode]) && (b.type == "focus" ? a.addClassName(c.el.parentNode, "W_input_focus") : b.type == "blur" && a.removeClassName(c.el.parentNode, "W_input_focus"))
            },
            getData: function() {
                var a = o.states();
                if (o.check()) {
                    var b = o.getData();
                    p.savestate.checked && (b.savestate = 7);
                    if (v.yalogin !== !1) {
                        b.username = "" + v.yalogin;
                        b.logintype = "sub"
                    }
                    return b
                }
                for (var c in B)
                    if (B[c].isVisible()) {
                        B[c].reset();
                        break
                    }
                if (!a.password.state) {
                    v.unChecked || x.checkUsername();
                    if (v.nopwd) {
                        a.password.state = !0;
                        a.username.state = !1;
                        a.username.msg = i.ERRTIP.CODE[4098]
                    }
                }
                x.errTip.show(a, 1);
                return !1
            },
            prenameBox: function() {
                if (!p.prename_box)
                    x.usernameBox();
                else if (a.isNode(a.kit.dom.firstChild(p.prename_box))) {
                    v.yalogin = p.preuid.value;
                    o.ctls.username.value(p.prename.value);
                    a.setStyle(p.prename_box, "display", "");
                    x.checkUsername()
                } else
                    d.fire("yalogin.verify")
            },
            usernameBox: function() {
                v.yalogin = !1;
                p.prename_box && a.core.dom.removeNode(p.prename_box);
                a.setStyle(p.username_box, "display", "");
                x.remember.place()
            },
            checkUsername: function() {
                r.checkUsername && clearTimeout(r.checkUsername);
                r.checkUsername = setTimeout(function() {
                    var a = o.ctls.username;
                    if (a.check().state) {
                        a.value(a.value());
                        var b = a.value();
                        if (!k.cached(b)) {
                            x.lock("username");
                            d.fire("verify.username", b);
                            k.save(b)
                        }
                    }
                }, 200)
            },
            stopCheckUsername: function() {
                r.checkUsername && clearTimeout(r.checkUsername);
                r.checkUsername = null
            },
            errTip: {
                show: function(b, c) {
                    for (var d in b)
                        if (!b[d].state) {
                            var e = "" + b[d].msg;
                            if (typeof c != "undefined" && a.getStyle(p[d + "_box"], "display") != "none") {
                                p[d].blur();
                                g.setCursor(p[d])
                            }
                            d == "username" && a.getStyle(p[d + "_box"], "display") == "none" && (d = "password");
                            u.show(e, {
                                el: p[d],
                                box: p[d + "_box"]
                            });
                            break
                        }
                },
                hide: function() {
                    u.hide()
                }
            },
            changeExtra: function(a) {
                for (var b in B)
                    typeof a != "undefined" && a == b ? B[b].isVisible() ? B[b].reset() : B[b].enable() : B[b].isVisible() && B[b].disable()
            },
            resetVerifycode: function(b) {
                b && a.preventDefault(b.evt);
                B.verifycode.reset();
                return !1
            },
            lock: function(b) {
                if (typeof b != "undefined" && o.ctls[b])
                    a.getStyle(p[b + "_box"], "display") != "none" && !o.ctls[b].pars.disabled && o.ctls[b].disabled(1);
                else
                    for (var b in o.ctls)
                        a.getStyle(p[b + "_box"], "display") != "none" && !o.ctls[b].pars.disabled && o.ctls[b].disabled(1)
            },
            unlock: function() {
                for (var b in o.ctls)
                    a.getStyle(p[b + "_box"], "display") != "none" && o.ctls[b].pars.disabled && o.ctls[b].disabled(0)
            },
            remember: {
                mark: function() {
                    var b = o.ctls.username.value();
                    b && a.cookie.set(h.cookie.name, b, h.cookie.conf)
                },
                place: function() {
                    var b = o.ctls.username.value();
                    if (!b) {
                        var c = a.cookie.get(h.cookie.name);
                        c = unescape(c);
                        c && o.ctls.username.value(c)
                    }
                },
                clear: function() {
                    a.cookie.remove(h.cookie.name, h.cookie.conf)
                }
            },
            customTip: {
                show: function(a) {
                    customTip.show(a.el, a.data.content)
                },
                hide: function() {
                    customTip.hide()
                }
            },
            reset: function() {
                x.errTip.hide()
            },
            submit: {
                active: function() {
                    document.location.protocol == "http:" && STK.core.util.cookie.remove("httpsupgrade_ab", {
                        domain: ".weibo.com",
                        path: "/"
                    });
                    r.checkUsername && clearTimeout(r.checkUsername);
                    a.preventDefault();
                    x.errTip.hide();
                    t.hide();
                    var b = x.getData();
                    if (b) {
                        x.submit.start();
                        x.lock();
                        d.fire("login", [b.username, b.password, b, b])
                    }
                    return !1
                },
                start: function() {
                    p.submitStates.innerHTML = i.SUBMIT.ONSUBMIT
                },
                stop: function() {
                    p.submitStates.innerHTML = i.SUBMIT.NORMAL
                },
                focus: function(b) {
                    b = a.fixEvent(b);
                    a.addClassName(b.target, "W_btn_g_current")
                },
                blur: function(b) {
                    b = a.fixEvent(b);
                    a.removeClassName(b.target, "W_btn_g_current")
                }
            },
            destroy: function() {
                x.stopCheckUsername();
                x.errTip.hide();
                a.custEvent.undefine(q);
                q.destroy();
                s.destroy();
                o.destroy();
                t.destroy();
                s = o = q = t = null
            }
        }, y = {
            use_username: function(b) {
                a.preventDefault(b.evt);
                o.ctls.username.value("");
                o.ctls.password.value("");
                p.password.focus();
                p.password.blur();
                x.usernameBox();
                g.setCursor(p.username);
                return !1
            },
            checkUsername: function(b) {
                a.preventDefault(b);
                x.checkUsername();
                return !1
            },
            stopCheckUsername: function(b) {
                a.preventDefault(b);
                x.stopCheckUsername();
                return !1
            }
        }, z = {
            enter: function(b) {
                b = a.fixEvent(b);
                x.errTip.hide();
                if (b.keyCode === 13) {
                    if (t.onActive())
                        return;
                    o.check();
                    var c = o.states()
                      , d = b.target.getAttribute("node-type");
                    if (d == "password" && v.nopwd) {
                        x.errTip.show({
                            username: {
                                state: !1,
                                msg: i.ERRTIP.CODE[4098]
                            }
                        });
                        return
                    }
                    d == "username" && !v.unChecked && x.checkUsername();
                    if (c[d].state == !1 && c[d].type == "empty")
                        return;
                    for (var e in o.ctls)
                        if (e != d && !o.ctls[e].pars.disabled && c[e].state == !1) {
                            setTimeout(function() {
                                g.setCursor(p[e])
                            }, 0);
                            return
                        }
                    x.submit.active()
                }
            },
            capslock: function(b) {
                b = a.fixEvent(b);
                var c = b.keyCode || b.which
                  , d = b.shiftKey || c == 16 || !1;
                (c >= 65 && c <= 90 && !d || c >= 97 && c <= 122 && d) && x.errTip.show({
                    password: {
                        msg: i.CAPSLOCK
                    }
                })
            }
        }, A = {
            login: {
                complete: function() {
                    x.unlock();
                    x.submit.stop()
                },
                success: function(a) {
                    x.remember.mark();
                    if (a.result) {
                        var b;
                        $CONFIG.redirect ? b = $CONFIG.redirect : a.redirect ? b = a.redirect : a.userinfo && a.userinfo.userdomain ? b = "//" + window.location.hostname + "/" + a.userinfo.userdomain : b = "//" + window.location.hostname;
                        window.location.replace(b)
                    }
                },
                failure: function(a) {
                    var b;
                    a.code == "50113021" && x.usernameBox();
                    if (a.code == "8120" && a.logout_confirm_url)
                        window.open(a.logout_confirm_url, "_self");
                    else {
                        n(a.code) ? b = c(i.ERRTIP.CODE["" + a.code], {
                            USERNAME: o.ctls.username.value()
                        }) : b = !a.reason || a.reason === "" ? i.ERRTIP.CODE[9999] + "(" + a.code + ")" : a.reason;
                        var d = {};
                        d[a.type] = {
                            msg: b,
                            state: !1
                        };
                        x.errTip.show(d, 1)
                    }
                }
            },
            logout: {
                complete: function() {},
                success: function() {},
                failure: function() {}
            },
            verify: {
                complete: function(a) {
                    x.unlock();
                    if (a.code && a.code == 4098) {
                        var b = {};
                        b[a.type] = {
                            msg: i.ERRTIP.CODE["" + a.code],
                            state: !1
                        };
                        x.errTip.show(b);
                        v.nopwd = !0
                    }
                    v.unChecked = !0
                },
                update: function(a) {
                    x.changeExtra(a);
                    v.unChecked = !0
                },
                failure: function(a) {
                    x.changeExtra(a);
                    p[a].value = ""
                }
            },
            yalogin: {
                active: function(b) {
                    var d = !1
                      , e = setTimeout(function() {
                        d = !0;
                        x.usernameBox()
                    }, 2500);
                    a.kit.io.jsonp({
                        url: "//" + (window.location.host == "www.weibo.com" ? "www.weibo.com" : "weibo.com") + "/a/aj/prelogin/status",
                        onComplete: function(f) {
                            if (!d) {
                                e && clearTimeout(e);
                                if (f.code == "100000") {
                                    var g = f.data;
                                    if (g.uid == b) {
                                        p.prename_box.innerHTML = c(i.PRENAME_BOX, {
                                            AVATAR: g.avatar,
                                            LOGIN_NAME_HAZY: g.account,
                                            NICKNAME: g.nickname
                                        });
                                        v.yalogin = g.uid;
                                        o.ctls.username.value(g.loginname);
                                        a.setStyle(p.username_box, "display", "none");
                                        a.setStyle(p.prename_box, "display", "");
                                        x.checkUsername();
                                        return
                                    }
                                }
                                x.usernameBox()
                            }
                        },
                        onFail: function() {
                            x.usernameBox()
                        }
                    }).request()
                },
                deny: function() {
                    x.usernameBox()
                }
            }
        }, B = {
            verifycode: {
                enable: function() {
                    p.verifycode_box.style.display = "";
                    o.ctls.verifycode.disabled(0);
                    B.verifycode.reset();
                    a.addEvent(p.verifycode, "keydown", z.enter)
                },
                disable: function() {
                    r.verifycode_auto && clearTimeout(r.verifycode_auto);
                    p.verifycode_box.style.display = "none";
                    o.ctls.verifycode.disabled(1);
                    a.removeEvent(p.verifycode, "keydown", z.enter)
                },
                reset: function() {
                    r.verifycode_auto && clearTimeout(r.verifycode_auto);
                    r.verifycode_auto = setTimeout(B.verifycode.reset, h.verifyCodeDelay);
                    e(p.verifycode_image);
                    p.verifycode.value = "" + o.ctls.verifycode.pars.text
                },
                isVisible: function() {
                    return !o.ctls.verifycode.pars.disabled
                }
            },
            vsncode: {
                enable: function() {
                    p.vsncode_box.style.display = "";
                    o.ctls.vsncode.disabled(0);
                    B.vsncode.reset();
                    a.addEvent(p.vsncode, "keydown", z.enter)
                },
                disable: function() {
                    p.vsncode_box.style.display = "none";
                    o.ctls.vsncode.disabled(1);
                    a.removeEvent(p.vsncode, "keydown", z.enter)
                },
                reset: function() {
                    p.vsncode.value = "" + o.ctls.vsncode.pars.text
                },
                isVisible: function() {
                    return !o.ctls.vsncode.pars.disabled
                }
            }
        }, C = {
            destroy: w.destroy
        };
        w.init();
        return C
    }
});
STK.register("common.login.qrcode", function(a) {
    var b = '出错了，<a href="javascript:void(0);" action-type="re_scan">重新扫描</a>';
    return function(c) {
        var d, e = null, f = a.kit.extra.language, g = a.common.channel.sso.qrcode, h = {
            init: function() {
                g.fire("set", {
                    entry: "weibo",
                    domain: "weibo.com"
                });
                h.parseDOM();
                h.bind()
            },
            parseDOM: function() {
                d = a.kit.dom.parseDOM(a.builder(c).list);
                e = a.delegatedEvent(c)
            },
            bind: function() {
                for (var b in h.handle)
                    g.register(b, h.handle[b]);
                a.custEvent.define(i, ["enable", "disable"]);
                a.custEvent.add(i, "enable", h.enable);
                a.custEvent.add(i, "disable", h.disable);
                e.add("re_scan", "click", h.re_scan)
            },
            unbind: function() {},
            setTip: function(c) {
                if (c && "type"in c && c.type == "succ") {
                    d.scan_mask.style.display = "";
                    d.scan_success.style.display = "";
                    d.scan_error.style.display = "none";
                    "callback"in c && c.callback()
                } else if (c && "type"in c && c.type == "err") {
                    d.scan_mask.style.display = "";
                    d.scan_success.style.display = "none";
                    d.scan_error.style.display = "";
                    var e = a.sizzle(".res_info", d.scan_error)[0];
                    e.innerHTML = c.msg || b;
                    "callback"in c && c.callback()
                } else {
                    d.scan_mask.style.display = "none";
                    d.scan_success.style.display = "none";
                    d.scan_error.style.display = "none"
                }
            },
            judgeTip: function() {
                var a = d.scan_mask.style.display
                  , b = d.scan_success.style.display
                  , c = d.scan_error.style.display;
                if (d.scan_mask.style.display == "") {
                    if (b == "" && c == "none")
                        return "succ";
                    if (b == "none" && c == "")
                        return "err"
                }
                return ""
            },
            getTipText: function(a) {
                var b = "";
                switch (a) {
                case "-4098":
                    b = "您尚未设置密码，请使用短信验证码登录（-4098）";
                    break;
                case "-4080":
                    b = "请稍后重试或用客户端登录（-4080）";
                    break;
                case "-4079":
                    b = "";
                    break;
                case "-4076":
                    b = "请使用微博官方客户端登录（-4076）";
                    break;
                case "-4071":
                    b = "账号异常，请使用客户端登录微博（-4071）";
                    break;
                case "-4057":
                    b = "网络异常，请稍后再试(-4057)";
                    break;
                case "-1":
                case "-2":
                    b = '抱歉，系统开小差了，<br/>请<a onclick="window.location.reload(true);" href="javascript:void(0);">刷新页面</a>后重试。';
                    break;
                case "1":
                    b = '(1) - 系统异常，请<a onclick="window.location.reload(true);" href="javascript:void(0);">刷新页面</a>后重试。';
                    break;
                case "5":
                    b = "用户不存在，请先<a onclick=\"window.open('https://weibo.com/signup/signup.php', '_self')\" href=\"javascript:void(0);\">注册微博</a>";
                    break;
                case "4038":
                    b = "请使用扫码方式登录，或去客户端登录";
                    break;
                case "50114013":
                    b = "请稍后重试，或使用客户端登录微博（-100）";
                    break;
                case "50114014":
                    b = "请稍后重试，或使用客户端登录微博（-101）";
                    break;
                case "50114015":
                    b = "请稍后重试，或使用客户端登录微博（-102）";
                    break;
                case "50114018":
                    b = '网络超时，请<a onclick="window.location.reload(true);" href="javascript:void(0);">刷新页面</a>后重新扫码';
                    break;
                default:
                    b = '登录失败，<br/>请<a onclick="window.location.reload(true);" href="javascript:void(0);">刷新页面</a>后重试。(' + a + ")"
                }
                return b
            },
            handle: {
                getQRcode_success: function(a) {
                    d.qrcode_src.src = a.data.image.replace("//qr.weibo.cn", "//v2.qr.weibo.cn");
                    d.qrcode_src.hasCode = !0
                },
                qrcode_scanned: function(a) {
                    d.scan_mask.style.display = "";
                    d.scan_success.style.display = ""
                },
                qrcode_used: function(a) {
                    h.getQRcode()
                },
                qrcode_timeout: function(b) {
                    var d = function() {
                        h.getQRcode();
                        h.setTip();
                        a.removeEvent(c, "click", d)
                    };
                    if (h.judgeTip() == "succ")
                        h.setTip({
                            type: "err",
                            msg: "二维码已失效，请点击刷新",
                            callback: function() {
                                a.addEvent(c, "click", d)
                            }
                        });
                    else {
                        h.getQRcode();
                        h.setTip()
                    }
                },
                qrcode_exception: function(a) {
                    h.getQRcode()
                },
                login_success: function(a) {
                    window.location.reload()
                },
                login_failure: function(a) {
                    if (a.retcode == "4069") {
                        var b = a.msg.split("|");
                        if (b.length == 2 && b[1]) {
                            window.location.href = b[1];
                            return
                        }
                    } else {
                        var c = h.getTipText(a.retcode);
                        if (c) {
                            h.setTip({
                                type: "err",
                                msg: c
                            });
                            return
                        }
                    }
                    h.getQRcode()
                }
            },
            getQRcode: function() {
                g.fire("getQRcode")
            },
            enable: function() {
                d.qrcode_src.hasCode ? g.fire("start") : h.getQRcode()
            },
            re_scan: function(a) {
                h.setTip();
                h.getQRcode()
            },
            disable: function() {
                g.fire("cancel")
            },
            destroy: function() {
                e.remove("re_scan", "click", h.re_scan)
            }
        }, i = {
            enable: h.enable,
            disable: h.disable,
            destroy: h.destroy
        };
        h.init();
        return i
    }
});
STK.register("common.channel.sso.desktop", function(a) {
    var b = ["getuserinfo_ready", "getuserinfo_timeout", "getuserticket_ready", "getuserticket_timeout", "init", "login", "login_success", "login_error", "getinfo_error"];
    return a.common.listener.define("common.channel.sso.desktop", b)
});
STK.register("common.login.desktop", function(a) {
    var b = a.kit.extra.language
      , c = a.core.util.templet
      , d = {
        FRAME: b('<div node-type="logged_loading" style="display:none" class="logged_loading"></div><div node-type="logged_tip" style="display:none" class="wrong_tips"></div><div node-type="logged_acc_show" class="logged_acc_show"><p class="logged_tips W_tc S_txt2">#L{点击头像登录你的微博}</p><div class="logged_acc_show_bg"><div class="logged_accs clearfix" node-type="logged_userlist"></div></div><a node-type="arrow" action-type="left" style="display:none" class="acc_arrow l_arrow" href="jsvascript:void(0);"></a><a node-type="arrow" action-type="right" style="display:none" class="acc_arrow r_arrow" href="jsvascript:void(0);"></a></div><div class="register_tips"><em class="S_txt2">#L{还没有微博？}</em><a target="_blank" href="' + ($CONFIG && $CONFIG.register_url || "//weibo.com/signup/signup.php") + '">#L{立即注册}</a>' + "</div>"),
        USER: '<div class="logged_acc"><a action-type="login" action-data="uid=#{UID}" href="jsvascript:void(0);" class="logged_acc_bg"><img class="acc_avatar" src="#{AVATOR}"><div title="#{NICKNAME}" class="acc_name W_autocut">#{NICKNAME}</div></a></div>',
        TIP: b('<div class="W_f14 S_txt2">#{MSG}</div>')
    };
    return function(b) {
        var e = a.common.channel.sso.desktop, f = !1, g, h, i = {
            small_acc_width: 75,
            current_acc: 0,
            on_scroll: !1,
            play_duration: 120
        }, j = ["loading", "tip", "acc_show"], k = !1, l = 0, m = function() {
            l++;
            return l > 5 ? !0 : !1
        }, n = {
            init: function() {
                n.bind();
                n.scan()
            },
            bind: function() {
                h = a.core.evt.delegatedEvent(b);
                for (var c in n.domEvts)
                    h.add(c, "click", n.domEvts[c]);
                a.custEvent.define(o, ["desktop", "refresh"]);
                for (var c in n.castEvts)
                    a.custEvent.add(o, c, n.castEvts[c]);
                for (var c in n.handle)
                    e.register(c, n.handle[c])
            },
            handle: {
                getuserinfo_ready: function(b) {
                    if (b.code == 0) {
                        g = b.data;
                        n.render();
                        if (!k) {
                            a.custEvent.fire(o, "desktop", 1);
                            k = !0
                        }
                    } else
                        a.custEvent.fire(o, "desktop", 0)
                },
                getuserinfo_timeout: function() {
                    a.custEvent.fire(o, "desktop", 0)
                },
                getuserticket_timeout: function() {
                    n.refresh()
                },
                login_success: function(a) {
                    a && a.retcode === "0" && window.location.reload()
                },
                login_failure: function(a) {
                    var b = a.msg;
                    b.indexOf("|") > 0 && (b = b.substr(0, b.indexOf("|")));
                    nodes.logged_tip.innerHTML = c(d.TIP, {
                        MSG: b
                    });
                    n.access("tip")
                },
                getinfo_error: function(b) {
                    a.custEvent.fire(o, "desktop", 0)
                }
            },
            domEvts: {
                back: function(b) {
                    a.preventDefault(b.evt);
                    n.back()
                },
                login: function(b) {
                    a.preventDefault(b.evt);
                    n.access("loading");
                    e.fire("login", b.data.uid)
                },
                left: function(b) {
                    a.preventDefault(b.evt);
                    if (!i.on_scroll) {
                        i.on_scroll = !0;
                        i.current_acc >= 2 ? i.current_acc -= 2 : i.current_acc--;
                        a.core.ani.tween(nodes.logged_userlist, {
                            duration: i.play_duration,
                            end: function() {
                                a.setStyle(nodes.arrow[1], "display", "");
                                i.current_acc <= 0 && a.setStyle(nodes.arrow[0], "display", "none");
                                i.on_scroll = !1
                            }
                        }).finish({
                            marginLeft: i.current_acc * i.small_acc_width * -1
                        })
                    }
                },
                right: function(b) {
                    a.preventDefault(b.evt);
                    if (!i.on_scroll) {
                        i.on_scroll = !0;
                        g.length - 3 - i.current_acc >= 2 ? i.current_acc += 2 : i.current_acc++;
                        a.core.ani.tween(nodes.logged_userlist, {
                            duration: i.play_duration,
                            end: function() {
                                a.setStyle(nodes.arrow[0], "display", "");
                                g.length - i.current_acc <= 3 && a.setStyle(nodes.arrow[1], "display", "none");
                                i.on_scroll = !1
                            }
                        }).finish({
                            marginLeft: i.current_acc * i.small_acc_width * -1
                        })
                    }
                }
            },
            access: function(b) {
                if (!!a.inArray(b, j))
                    for (var c in j)
                        a.setStyle(nodes["logged_" + j[c]], "display", b == j[c] ? "" : "none")
            },
            castEvts: {
                refresh: function() {
                    n.refresh()
                }
            },
            refresh: function() {
                n.access("loading");
                n.scan()
            },
            render: function() {
                b.innerHTML = d.FRAME;
                nodes = a.kit.dom.parseDOM(a.builder(b).list);
                nodes.logged_acc_show.className = "logged_acc_show";
                a.setStyles(nodes.arrow, "display", "none");
                var e = "avator";
                switch (g.length) {
                case 1:
                    e = "avator_middle";
                    break;
                case 2:
                    e = "avator_middle";
                    a.addClassName(nodes.logged_acc_show, "multi_acc_two");
                    break;
                case 3:
                    e = "avator_small";
                    a.addClassName(nodes.logged_acc_show, "multi_acc_three");
                    break;
                default:
                    e = "avator_small";
                    a.addClassName(nodes.logged_acc_show, "multi_acc_three");
                    a.setStyle(nodes.arrow[1], "display", "")
                }
                var f = [];
                for (var h in g)
                    f.push(c(d.USER, {
                        NICKNAME: g[h].name,
                        AVATOR: g[h][e],
                        UID: g[h].uid
                    }));
                nodes.logged_userlist.innerHTML = f.join("")
            },
            scan: function() {
                e.fire("init")
            }
        }, o = {};
        n.init();
        return o
    }
});
STK.register("common.setting.mobile", function(a) {
    var b = {
        E01: "",
        E02: "#L{目前支持大陆、港澳台手机号注册}",
        E03: "#L{请输入手机号码}",
        E04: "#L{手机号长度11位，以13/14/15/16/17/18/19开头}"
    };
    return function(c, d) {
        var e = function() {
            var a = g.value()
              , b = !1;
            if (!g.pars.must && g.rule.isEmpty(a)) {
                g.msg.state = !0;
                g.msg.type = "empty";
                g.msg.code = "E01"
            } else {
                if (!b && g.rule.isEmpty(a)) {
                    b = !0;
                    g.msg.type = "err";
                    g.msg.code = "E03"
                }
                if (!b && !g.rule.isMobile(a)) {
                    b = !0;
                    g.msg.type = "err";
                    g.msg.code = "E04"
                }
                if (!b) {
                    g.msg.state = !0;
                    g.msg.type = "ok";
                    g.msg.code = "E01"
                } else
                    g.msg.state = !1
            }
        }
          , f = {
            focus: function() {
                g.cache_value = g.value();
                if (g.rule.isEmpty(g.cache_value)) {
                    g.msg.state = !1;
                    g.msg.action = "focus";
                    g.msg.type = "tip";
                    g.msg.code = "E02";
                    g.fire()
                }
            },
            blur: function() {
                c.value = g.rule.reNullChar(c.value);
                g.msg.action = "blur";
                var b = g.value();
                if (!(b && g.cache_value == b && g.pars.proxy && g.pars.iokey)) {
                    g.cache_value = null;
                    if (g.pars.iodelay === 0 && !g.pars.proxy && !g.pars.iokey) {
                        e();
                        g.fire()
                    } else
                        ioDelay = setTimeout(function() {
                            e();
                            if (g.msg.state && g.pars.proxy && g.pars.iokey) {
                                g.msg.type = "loading";
                                g.pars.iorecords = !0;
                                g.pars.proxy.request(g.pars.iokey, {
                                    onSuccess: function(b) {
                                        g.msg = a.parseParam(g.msg, b.data || {});
                                        g.msg.state = !0;
                                        g.fire()
                                    },
                                    onError: function(b) {
                                        g.msg = a.parseParam(g.msg, b.data || {});
                                        g.msg.state = !1;
                                        g.fire()
                                    }
                                }, {
                                    type: g.type,
                                    value: encodeURIComponent(g.value())
                                })
                            }
                            g.fire()
                        }, g.pars.iodelay)
                }
            }
        }
          , g = a.common.setting.control(c, d, {
            evtAct: f,
            check: e
        })
          , h = a.core.obj.sup(g, ["initPars"]);
        g.initPars = function() {
            h.initPars();
            g.errText = a.common.extra.parseLanguage(b);
            g.type = "mobile"
        }
        ;
        g.pars.auto && g.init();
        return g
    }
});
STK.register("common.setting.activation", function(a) {
    var b = {
        E01: "",
        E02: "#L{请输入短信激活码}",
        E03: "#L{激活码输入有误}"
    };
    return function(c, d) {
        var e = function() {
            var a = g.value().replace(/^\s+|\s+$/g, "")
              , b = !1;
            if (!g.pars.must && g.rule.isEmpty(a)) {
                g.msg.state = !0;
                g.msg.type = "empty";
                g.msg.code = "E01"
            } else {
                if (!b && g.rule.isEmpty(a)) {
                    b = !0;
                    g.msg.type = "err";
                    g.msg.code = "E02"
                }
                if (!b && !g.rule.lenLimit(a, 0, 6)) {
                    b = !0;
                    g.msg.type = "err";
                    g.msg.code = "E03"
                }
                if (!b) {
                    g.msg.state = !0;
                    g.msg.type = "empty";
                    g.msg.code = "E01"
                } else
                    g.msg.state = !1
            }
        }
          , f = {
            focus: function() {
                g.cache_value = g.value();
                if (g.rule.isEmpty(g.cache_value)) {
                    g.msg.state = !1;
                    g.msg.action = "focus";
                    g.msg.type = "tip";
                    g.msg.code = "E02";
                    g.fire()
                }
            },
            blur: function() {
                c.value = g.rule.reNullChar(c.value);
                g.msg.action = "blur";
                e();
                g.fire()
            }
        }
          , g = a.common.setting.control(c, d, {
            evtAct: f,
            check: e
        })
          , h = a.core.obj.sup(g, ["initPars"]);
        g.initPars = function() {
            h.initPars();
            g.errText = a.common.extra.parseLanguage(b);
            g.type = "activation"
        }
        ;
        g.pars.auto && g.init();
        return g
    }
});
STK.register("common.setting.timer", function(a) {
    var b = {
        ss: 1,
        mm: 60,
        hh: 3600,
        dd: 86400
    };
    return function(c, d) {
        var e = {}, f, g, h = {
            init: function() {
                f = a.parseParam({
                    time: 0,
                    loop: "ss"
                }, c);
                d = d || function() {}
            },
            start: function(a) {
                var a = f.time
                  , c = function() {
                    d({
                        last: a,
                        dd: Math.floor(a / b.dd),
                        hh: Math.floor(a % b.dd / b.hh),
                        mm: Math.floor(a % b.dd % b.hh / b.mm),
                        ss: a % b.mm
                    });
                    a == 0 && clearInterval(g);
                    a -= b[f.loop]
                };
                g = setInterval(c, b[f.loop] * 1e3)
            },
            stop: function() {
                clearInterval(g)
            },
            destroy: function() {}
        };
        h.init();
        e.start = h.start;
        e.stop = h.stop;
        e.destroy = h.destroy;
        return e
    }
});
STK.register("kit.io.ajax", function(a) {
    var b = function(b, c, d) {
        c = c | 0 || 1;
        d = d || "fail";
        var e = b.args;
        e.__rnd && delete e.__rnd;
        (new Image).src = "//weibolog.sinaapp.com/?t=" + c + "&u=" + encodeURIComponent(b.url) + "&p=" + encodeURIComponent(a.core.json.jsonToQuery(e)) + "&m=" + d
    };
    return function(c) {
        var d = {}
          , e = []
          , f = null
          , g = !1
          , h = a.parseParam({
            url: "",
            method: "get",
            responseType: "json",
            timeout: 3e4,
            onTraning: a.funcEmpty,
            isEncode: !0
        }, c);
        h.onComplete = function(a) {
            g = !1;
            c.onComplete(a, h.args);
            setTimeout(i, 0)
        }
        ;
        h.onFail = function(a) {
            g = !1;
            if (typeof c.onFail == "function")
                try {
                    c.onFail(a, h.args)
                } catch (d) {}
            setTimeout(i, 0);
            try {
                b(h)
            } catch (d) {}
        }
        ;
        h.onTimeout = function(a) {
            try {
                b(h);
                c.onTimeout(a)
            } catch (d) {}
        }
        ;
        var i = function() {
            if (!!e.length) {
                if (g === !0)
                    return;
                g = !0;
                h.args = e.shift();
                if (h.method.toLowerCase() == "post") {
                    var b = a.core.util.URL(h.url);
                    b.setParam("__rnd", +(new Date));
                    h.url = b.toString()
                }
                f = a.ajax(h)
            }
        }
          , j = function(a) {
            while (e.length)
                e.shift();
            g = !1;
            if (f)
                try {
                    f.abort()
                } catch (b) {}
            f = null
        };
        d.request = function(a) {
            a || (a = {});
            c.noQueue && j();
            if (!c.uniqueRequest || !f) {
                e.push(a);
                a._t = 0;
                i()
            }
        }
        ;
        d.abort = j;
        return d
    }
});
STK.register("kit.io.ijax", function(a) {
    return function(b) {
        var c = a.parseParam({
            url: "",
            timeout: 3e4,
            isEncode: !0,
            abaurl: null,
            responseName: null,
            varkey: "callback",
            abakey: "callback"
        }, b)
          , d = []
          , e = null
          , f = !1;
        c.onComplete = function(a, d) {
            f = !1;
            b.onComplete(a, c.form, d);
            c.form = null;
            c.args = null;
            setTimeout(g, 0)
        }
        ;
        c.onFail = function(a, d) {
            f = !1;
            b.onFail(a, c.form, d);
            c.form = null;
            c.args = null;
            setTimeout(g, 0)
        }
        ;
        var g = function() {
            var b;
            if (!!d.length) {
                if (f === !0)
                    return;
                f = !0;
                b = d.shift();
                c.args = b.args;
                c.form = b.form;
                e = a.ijax(c)
            }
        }
          , h = function(a) {
            while (d.length)
                d.shift();
            f = !1;
            if (e)
                try {
                    e.abort()
                } catch (b) {}
            e = null
        }
          , i = {};
        i.request = function(c, e) {
            if (!a.isNode(c))
                throw "[kit.io.ijax.request] need a form as first parameter";
            e || (e = {});
            b.noQueue && h();
            d.push({
                form: c,
                args: e
            });
            g()
        }
        ;
        i.abort = h;
        return i
    }
});
STK.register("kit.io.inter", function(a) {
    var b = a.core.json.merge;
    return function() {
        var c = {}
          , d = {}
          , e = {}
          , f = function(a, b) {
            return function(c, d) {
                try {
                    b.onComplete(c, d)
                } catch (f) {}
                try {
                    if (c.code === "100000")
                        b.onSuccess(c, d);
                    else {
                        if (c.code === "100002") {
                            location.href = c.data;
                            return
                        }
                        b.onError(c, d)
                    }
                } catch (f) {}
                for (var g in e[a])
                    try {
                        e[a][g](c, d)
                    } catch (f) {}
            }
        };
        c.register = function(a, b) {
            if (typeof d[a] != "undefined")
                throw a + " registered";
            d[a] = b;
            e[a] = {}
        }
        ;
        c.addHook = function(b, c) {
            var d = a.core.util.getUniqueKey();
            e[b][d] = c;
            return d
        }
        ;
        c.rmHook = function(a, b) {
            e[a] && e[a][b] && delete e[a][b]
        }
        ;
        c.getTrans = function(c, e) {
            var g = b(d[c], e);
            g.onComplete = f(c, e);
            var h = d[c].requestMode
              , i = "ajax";
            if (h === "jsonp" || h === "ijax")
                i = h;
            return a.kit.io[i](g)
        }
        ;
        c.request = function(c, e, g) {
            var h = b(d[c], e);
            h.onComplete = f(c, e);
            h = a.core.obj.cut(h, ["noqueue"]);
            h.args = g;
            var i = d[c].requestMode;
            return i === "jsonp" ? a.jsonp(h) : i === "ijax" ? a.ijax(h) : a.ajax(h)
        }
        ;
        return c
    }
});
STK.register("common.trans.sso.message", function(a) {
    var b = a.kit.io.inter()
      , c = b.register;
    c("send_sms", {
        url: "//login.sina.com.cn/sso/msglogin",
        requestMode: "jsonp",
        varkey: "callback"
    });
    return b
});
STK.register("common.login.message", function(a) {
    var b = ["mobile", "activation"], c = a.core.util.templet, d = a.common.channel.sso.login, e = a.common.trans.sso.message, f = a.kit.extra.textareaUtils, g = {
        TIPS: {
            SEND_SMS_SUCCESS: "#L{验证码发送成功，60秒内未收到请重新获取}",
            SEND_SMS_ERROR: '#L{验证码无法发送，请稍<a href="javascript:window.location.reload()">刷新页面</a>后再试}',
            LOGIN_SMS_ERROR: "#L{验证码输入有误}",
            MOBILE_FORMAT_ERROR: "#L{请输入正确的手机号}",
            SEND_SMS_TOOFAST: "#L{发送验证码过频，请稍后再试}",
            MOBILE_NOT_REGISTER: '#L{该手机号未注册无法登录，请先<a href="http://weibo.com/signup/signup.php">注册</a>}',
            ACTIVATION_EMPTY: "#L{请输入短信验证码}"
        },
        ERRTIP: {
            CODE: a.common.form.ssoErrCode
        },
        SUBMIT: {
            NORMAL: "#L{登录}",
            ONSUBMIT: '<b class="loading"></b>#L{登录}'
        }
    }, h = function() {
        var a, b = {
            save: function(b) {
                a = b
            },
            load: function() {
                return a
            },
            reset: function() {
                b.save("")
            },
            cached: function(b) {
                return a === b
            }
        };
        return b
    }(), i, j = function(b) {
        if (!i) {
            i = [];
            for (var c in g.ERRTIP.CODE)
                i.push(c)
        }
        return a.inArray("" + b, i)
    };
    return function(i, k) {
        var l, m, n, o, p, q, r = {}, s = {
            unChecked: !1
        }, t = null, u = {
            init: function() {
                u.parseParam();
                u.initPlugins();
                u.bind()
            },
            parseParam: function() {
                g = a.common.extra.parseLanguage(g)
            },
            bind: function() {
                o = a.core.evt.delegatedEvent(i);
                for (var b in u.domEvt)
                    o.add(b, "click", u.domEvt[b]);
                a.addEvent(m.mobile, "focus", v.stopCheckUsername);
                a.addEvent(m.mobile, "blur", v.checkUsername);
                a.addEvent(m.submitBtn, "focus", v.submit.focus);
                a.addEvent(m.submitBtn, "blur", v.submit.blur);
                a.custEvent.define(x, ["disable"]);
                a.custEvent.add(x, "disable", u.disable);
                d.register("verify.update", w.verify.update);
                d.register("verify.failure", w.verify.failure);
                d.register("verify.complete", w.verify.complete);
                d.register("login.success", w.login.success);
                d.register("login.failure", w.login.failure);
                d.register("login.complete", w.login.complete);
                d.register("logout.success", w.logout.success);
                d.register("logout.failure", w.logout.failure);
                d.register("logout.complete", w.logout.complete)
            },
            unbind: function() {
                for (var b in u.domEvt)
                    o.remove(b, "click", u.domEvt[b]);
                o.destroy();
                a.removeEvent(m.mobile, "focus", v.stopCheckUsername);
                a.removeEvent(m.mobile, "blur", v.checkUsername);
                a.removeEvent(m.submitBtn, "focus", v.submit.focus);
                a.removeEvent(m.submitBtn, "blur", v.submit.blur);
                a.custEvent.remove(x, "closeTip", v.errTip.hide);
                a.custEvent.undefine(x, ["closeTip"]);
                d.remove("verify.update", w.verify.update);
                d.remove("verify.failure", w.verify.failure);
                d.remove("verify.complete", w.verify.complete);
                d.remove("login.success", w.login.success);
                d.remove("login.failure", w.login.failure);
                d.remove("login.complete", w.login.complete);
                d.remove("logout.success", w.logout.success);
                d.remove("logout.failure", w.logout.failure);
                d.remove("logout.complete", w.logout.complete)
            },
            initPlugins: function() {
                v.init();
                q = function() {
                    var b = '<div class="W_layer W_layer_pop">\n\t<div class="content layer_mini_info">\n\t\t<p class="main_txt">\n\t\t\t<span node-type="icon" class="W_icon icon_warnS"></span>\n\t\t\t<span node-type="text"></span>\n\t<a action-type="close" href="javascript:void(0);" class="W_ficon ficon_close S_ficon">X</a>\t</p>\n\t<div class="W_layer_arrow">\n\t\t\t<span node-type="arrow" class="W_arrow_bor"><i class="S_line3"></i><em class="S_bg2_br"></em></span>\n\t\t<div>\n\t</div>\n</div>'
                      , c = a.v6.conf.core.ui.bubble(b, {
                        showWithAni: !1,
                        hideWithAni: !1,
                        showWithSetWidth: !1
                    });
                    c.on("close", "click", function() {
                        c.hide()
                    });
                    return {
                        show: function(a, b) {
                            c.getDomList().text.innerHTML = a;
                            c.show().beside(b.box, {
                                offsetY: 10
                            })
                        },
                        hide: function() {
                            c.hide()
                        },
                        destroy: function() {
                            c.destroy()
                        }
                    }
                }()
            },
            domEvt: {
                btn_sms_activation: function(b) {
                    a.preventDefault();
                    r.checkUsername && clearTimeout(r.checkUsername);
                    v.errTip.hide();
                    var c = l.ctls.mobile.check();
                    if (!c.state)
                        v.errTip.show({
                            mobile: c
                        });
                    else if (!s.unChecked) {
                        t = v.sendSMS;
                        h.reset();
                        v.checkUsername()
                    } else
                        v.sendSMS()
                },
                btn_submit: function() {
                    a.preventDefault();
                    v.submit.active()
                }
            },
            disable: function() {
                v.errTip.hide();
                p && p.stop();
                for (var a in l.ctls)
                    l.ctls[a].value(l.ctls[a].pars.text)
            },
            destroy: function() {
                u.unbind();
                v.destroy();
                q.destroy();
                p = q = r = s = t = null
            }
        }, v = {
            init: function() {
                n = a.common.setting.textCopy(i);
                a.custEvent.define(n, ["focus", "blur", "keyup"]);
                a.custEvent.add(n, "focus", v.handle.textCopy);
                a.custEvent.add(n, "blur", v.handle.textCopy);
                l = a.common.setting.form(i);
                m = a.kit.dom.parseDOM(l.domList);
                var c, d;
                for (var e in b) {
                    d = b[e];
                    if (a.common.setting[d]) {
                        c = a.queryToJson(m[d].getAttribute("action-data") || "");
                        l.add(d, a.common.setting[d](m[d], a.core.json.merge({
                            hook: l
                        }, c)));
                        a.core.util.browser.MOZ && n.API.build({
                            el: m[d],
                            data: c
                        })
                    }
                }
                monitor = a.common.extra.inputMonitor(m.mobile);
                a.custEvent.add(monitor, "change", function() {
                    h.reset();
                    s.unChecked = !1;
                    typeof t == "function" && (t = null)
                })
            },
            handle: {
                textCopy: function(b, c) {
                    b.type == "focus" && v.errTip.hide();
                    a.inArray(c.el, [m.mobile, m.activation]) && (b.type == "focus" ? a.addClassName(c.el.parentNode, "W_input_focus") : b.type == "blur" && a.removeClassName(c.el.parentNode, "W_input_focus"))
                }
            },
            errTip: {
                show: function(a, b) {
                    for (var c in a)
                        if (!a[c].state) {
                            var d = "" + a[c].msg;
                            c == "username" && (c = "mobile");
                            if (c == "mobile")
                                switch (a[c].code) {
                                case "E04":
                                    d = g.TIPS.MOBILE_FORMAT_ERROR
                                }
                            if (c == "activation")
                                switch (a[c].code) {
                                case "E02":
                                    d = g.TIPS.ACTIVATION_EMPTY
                                }
                            if (typeof b != "undefined") {
                                m[c].blur();
                                f.setCursor(m[c])
                            }
                            setTimeout(function() {
                                q.show(d, {
                                    el: m[c],
                                    box: m[c + "_box"]
                                })
                            }, 0);
                            break
                        }
                },
                hide: function() {
                    q.hide()
                }
            },
            getData: function() {
                var a = l.states();
                if (l.check()) {
                    var b = l.getData();
                    m.savestate.checked && (b.savestate = 7);
                    return b
                }
                v.errTip.show(a, 1);
                return !1
            },
            lock: function(a) {
                if (typeof a != "undefined" && l.ctls[a])
                    l.ctls[a].disabled(1);
                else
                    for (var a in l.ctls)
                        l.ctls[a].disabled(1)
            },
            unlock: function() {
                for (var b in l.ctls)
                    a.getStyle(m[b + "_box"], "display") != "none" && l.ctls[b].pars.disabled && l.ctls[b].disabled(0)
            },
            submit: {
                active: function() {
                    r.checkUsername && clearTimeout(r.checkUsername);
                    v.errTip.hide();
                    var a = v.getData();
                    if (a) {
                        v.submit.start();
                        v.lock();
                        a.cfrom = 1;
                        d.fire("login", [a.username, a.password, a, a])
                    }
                    return !1
                },
                start: function() {
                    m.submitStates.innerHTML = g.SUBMIT.ONSUBMIT
                },
                stop: function() {
                    m.submitStates.innerHTML = g.SUBMIT.NORMAL
                },
                focus: function(b) {
                    b = a.fixEvent(b);
                    a.addClassName(b.target, "W_btn_g_current")
                },
                blur: function(b) {
                    b = a.fixEvent(b);
                    a.removeClassName(b.target, "W_btn_g_current")
                }
            },
            checkUsername: function() {
                a.preventDefault();
                r.checkUsername && clearTimeout(r.checkUsername);
                r.checkUsername = setTimeout(function() {
                    var a = l.ctls.mobile;
                    if (a.check().state) {
                        a.value(a.value());
                        var b = a.value();
                        if (!h.cached(b)) {
                            v.lock("mobile");
                            d.fire("verify.username", b);
                            h.save(b)
                        }
                    }
                }, 200)
            },
            stopCheckUsername: function() {
                a.preventDefault();
                r.checkUsername && clearTimeout(r.checkUsername);
                r.checkUsername = null
            },
            sendSMS: function() {
                if (l.ctls.mobile.msg.state && l.ctls.mobile.msg.type == "ok") {
                    var b = {
                        type: "sendsms"
                    };
                    b.value = l.ctls.mobile.value();
                    p = a.common.setting.timer({
                        time: 59
                    }, function(a) {
                        m.sms_timer.innerHTML = a.last;
                        m.btn_sms_activation_disable.style.display = a.last == 0 ? "none" : "";
                        m.btn_sms_activation.style.display = a.last == 0 ? "" : "none"
                    });
                    p.start();
                    e.getTrans("send_sms", {
                        onComplete: function(a) {
                            var b = {
                                activation: {
                                    state: !1,
                                    msg: a.msg
                                }
                            };
                            if (a.retcode == 2e7) {
                                b = {
                                    activation: {
                                        state: !1,
                                        msg: g.TIPS.SEND_SMS_SUCCESS
                                    }
                                };
                                v.errTip.show(b)
                            } else {
                                a.retcode == 50110801 && (b = {
                                    mobile: {
                                        state: !1,
                                        msg: g.TIPS.MOBILE_NOT_REGISTER
                                    }
                                });
                                a.retcode == 50110810 && (b = {
                                    activation: {
                                        state: !1,
                                        msg: g.TIPS.SEND_SMS_TOOFAST
                                    }
                                });
                                v.errTip.show(b)
                            }
                        },
                        onFailure: function(a) {
                            p.stop()
                        }
                    }).request({
                        entry: "weibo",
                        mobile: b.value,
                        s: s.unChecked
                    })
                } else
                    v.errTip.show({
                        mobile: l.ctls.mobile.msg
                    }, 1);
                typeof t == "function" && (t = null)
            },
            destroy: function() {
                v.stopCheckUsername();
                v.errTip.hide();
                a.custEvent.undefine(n);
                n.destroy();
                monitor.destroy();
                l.destroy();
                monitor = l = n = null
            }
        }, w = {
            login: {
                complete: function() {
                    v.unlock();
                    v.submit.stop()
                },
                success: function(a) {
                    if (a.result) {
                        var b;
                        $CONFIG.redirect ? b = $CONFIG.redirect : a.redirect ? b = a.redirect : a.userinfo && a.userinfo.userdomain ? b = "//" + window.location.hostname + "/" + a.userinfo.userdomain : b = "//" + window.location.hostname;
                        window.location.replace(b)
                    }
                },
                failure: function(a) {
                    var b;
                    j(a.code) ? b = c(g.ERRTIP.CODE["" + a.code], {
                        USERNAME: l.ctls.mobile.value()
                    }) : b = a.reason;
                    if (a.code == "8120")
                        a.logout_confirm_url ? window.open(a.logout_confirm_url, "_self") : setTimeout(function() {
                            var c = a.type == "username" ? "mobile" : a.type;
                            q.show(b, {
                                el: m[c],
                                box: m[c + "_box"],
                                offsetX: -18
                            })
                        }, 0);
                    else {
                        if (a.code == "101") {
                            a.type = "activation";
                            b = g.TIPS.LOGIN_SMS_ERROR;
                            l.ctls.activation.value("")
                        }
                        var d = {};
                        d[a.type] = {
                            msg: b,
                            state: !1
                        };
                        v.errTip.show(d, 1)
                    }
                }
            },
            logout: {
                complete: function() {},
                success: function() {},
                failure: function() {}
            },
            verify: {
                complete: function(b) {
                    v.unlock();
                    b.smsurl && (s.unChecked = a.core.util.URL(b.smsurl).getParam("s"));
                    typeof t == "function" && (s.unChecked ? t() : v.errTip.show({
                        activation: {
                            state: !1,
                            msg: g.TIPS.SEND_SMS_ERROR
                        }
                    }))
                },
                update: function(a) {},
                failure: function(a) {
                    m[a].value = ""
                }
            }
        }, x = {
            destroy: u.destroy
        };
        u.init();
        return x
    }
});
STK.register("pl.login.joker.source.main", function(a) {
    var b = a.v6.conf.core.ui, c = a.core.util.URL(window.location.href).getHash("type"), d = a.common.channel.sso.login, e, f = document.createElement("div");
    f.className = "W_unlogin_v4_hoverbg";
    f.setAttribute("node-type", "qr_help");
    f.style.display = "none";
    return function(c) {
        function o(a) {
            a = a || window.event;
            if (m(a, g.qrcode_src)) {
                clearTimeout(e);
                g.qr_help.style.display = "none"
            }
        }
        function n(a) {
            a = a || window.event;
            if (m(a, g.qrcode_src)) {
                clearTimeout(e);
                g.qr_help.style.display = "block"
            }
        }
        function m(a, b) {
            if (a && a.type != "mouseout" && a.type != "mouseover")
                return !1;
            var c = a.relatedTarget ? a.relatedTarget : a.type == "mouseout" ? a.toElement : a.fromElement;
            while (c && c != b)
                c = c.parentNode;
            return c != b
        }
        c.appendChild(f);
        var g, h, i = {
            normal: null,
            qrcode: null,
            message: null
        }, j = "normal", k = {
            init: function() {
                k.parseDOM();
                k.bind();
                k.checkState()
            },
            parseDOM: function() {
                g = a.kit.dom.parseDOM(a.builder(c).list)
            },
            bind: function() {
                h = a.core.evt.delegatedEvent(c);
                h.add("switchTab", "click", k.domEvts.switchTab);
                d.register("verify.complete", function(c) {
                    if (j !== "message" || c.lm !== 1)
                        if (c.is_openlock === 1 && !("not_tab_qrcode"in c && c.not_tab_qrcode == 1)) {
                            k.handle.form.qrcode();
                            b.tipAlert(a.common.form.ssoErrCode[2071], {
                                icon: "warnS",
                                hideDelay: 3e3
                            }).beside(a.sizzle("img", g.qrcode_form)[0], {
                                appendTo: document.body
                            })
                        }
                });
                d.register("login.failure", function(c) {
                    if (c.code == "2071")
                        if ("protection_url"in c && c.protection_url) {
                            var d = encodeURIComponent(window.location.protocol + "//" + window.location.hostname)
                              , e = a.core.util.URL(c.protection_url).setParam("callback_url", d).toString();
                            window.open(e, "_self")
                        } else {
                            k.handle.form.qrcode();
                            b.tipAlert(a.common.form.ssoErrCode[2071], {
                                icon: "warnS",
                                hideDelay: 3e3
                            }).beside(a.sizzle("img", g.qrcode_form)[0], {
                                appendTo: document.body
                            })
                        }
                })
            },
            checkState: function() {
                function e() {
                    c("tblog_weibologin3", "quick_response_failure")
                }
                function d() {
                    g.qrcode_src.style.display = "";
                    g.qrcode_src.style.visibility = "";
                    a.removeNode(a.core.dom.dir.prev(g.qrcode_src, {
                        expr: ".W_login_loading_v2"
                    })[0]);
                    g.qrcode_src.onload = null;
                    g.qrcode_src.onerror = null;
                    clearTimeout(b);
                    c("tblog_weibologin3", "quick_respose_get");
                    g.qrcode_src.src.indexOf("http") != 0 && a.custEvent.fire(i.qrcode, "enable")
                }
                function c(a, b) {
                    setTimeout(function() {
                        window.SUDA && SUDA.uaTrack && SUDA.uaTrack(a, b)
                    }, 3e3)
                }
                g.module_loading && a.setStyle(g.module_loading, "display", "none");
                var b;
                g.qrcode_src.onload = d;
                g.qrcode_src.onerror = e;
                b = setTimeout(d, 2e3);
                k.handle.form.normal()
            },
            handle: {
                form: {
                    qrcode: function() {
                        k.handle.switchForm("qrcode");
                        i.normal && a.custEvent.fire(i.normal, "closeTip");
                        i.message && a.custEvent.fire(i.message, "disable");
                        i.qrcode || (i.qrcode = a.common.login.qrcode(g.qrcode_form));
                        a.custEvent.fire(i.qrcode, "enable");
                        g.qr_help.style.display = "";
                        e = setTimeout(function() {
                            g.qr_help.style.display = "none"
                        }, 5e3)
                    },
                    normal: function() {
                        g.qr_help.style.display = "none";
                        k.handle.switchForm("normal");
                        i.qrcode && a.custEvent.fire(i.qrcode, "disable");
                        if (i.message) {
                            i.message.destroy();
                            i.message = null
                        }
                        i.normal || (i.normal = a.common.login.form_new(g.normal_form))
                    },
                    message: function() {
                        k.handle.switchForm("message");
                        i.qrcode && a.custEvent.fire(i.qrcode, "disable");
                        if (i.normal) {
                            i.normal.destroy();
                            i.normal = null
                        }
                        i.message || (i.message = a.common.login.message(g.message_form))
                    }
                },
                switchForm: function(b) {
                    var c = {
                        normal: {
                            tab: g.normal_tab,
                            form: g.normal_form
                        },
                        qrcode: {
                            tab: g.qrcode_tab,
                            form: g.qrcode_form
                        },
                        message: {
                            tab: g.message_tab,
                            form: g.message_form
                        }
                    };
                    b in c || (b = "normal");
                    j = b;
                    g.other && (b === "qrcode" ? g.other.style.display = "none" : g.other.style.display = "");
                    a.foreach(c, function(c, d) {
                        if (d == b) {
                            d == "message" ? a.removeClassName(c.tab, "qrcode_phone") : a.addClassName(c.tab, "cur");
                            c.form.style.display = ""
                        } else {
                            d == "message" ? a.addClassName(c.tab, "qrcode_phone") : a.removeClassName(c.tab, "cur");
                            c.form.style.display = "none"
                        }
                    })
                }
            },
            domEvts: {
                switchTab: function(b) {
                    a.preventDefault(b.evt);
                    b.data.type === "message" && !a.core.dom.hasClassName(g.message_tab, "qrcode_phone") ? k.handle.form.qrcode() : k.handle.form[b.data.type]()
                }
            },
            is64IE: function() {
                return /win64;\sx64;/i.test(navigator.userAgent.toLowerCase()) ? !0 : !1
            }
        }, l = {};
        k.init();
        if (g.qr_help) {
            a.addEvent(g.qrcode_src, "mouseover", n);
            a.addEvent(g.qrcode_src, "mouseout", o)
        }
        var p = g.other_login_toggle;
        p && a.addEvent(p, "click", function() {
            var b = a.core.dom.prev(p);
            if (a.core.dom.hasClassName(p, "ficon_arrow_left")) {
                a.addClassName(p, "ficon_arrow_right");
                a.removeClassName(p, "ficon_arrow_left");
                p.innerHTML = "a";
                b.style.width = "80px"
            } else {
                a.removeClassName(p, "ficon_arrow_right");
                a.addClassName(p, "ficon_arrow_left");
                p.innerHTML = "b";
                b.style.width = ""
            }
        });
        return l
    }
});
STK.register("v6.pl.register.loginBox.source.init", function(a) {
    a.common.login.sso.loginbridge({
        vsnf: 1,
        hold_login_state: !1,
        cookie_timeout: 0,
        entry: "weibo",
        domain: "weibo.com",
        service: "miniblog",
        useTicket: !0,
        crossDomain: !0,
        feedBackUrl: $CONFIG && $CONFIG.loginFeedBackUrl ? $CONFIG.loginFeedBackUrl : location.protocol + "//" + window.location.hostname + "/ajaxlogin.php"
    });
    a.common.login.sso.qrcodebridge();
    return function(b) {
        return a.pl.login.joker.source.main(b)
    }
});
STK.pageletM.register("pl_unlogin_home_login", function(a, b) {
    return a.v6.pl.register.loginBox.source.init(a.E(b))
});
