!
    function(t, e, i) {
        function n(t, i) {
            this.wrapper = "string" == typeof t ? e.querySelector(t) : t,
                this.scroller = this.wrapper.children[0],
                this.scrollerStyle = this.scroller.style,
                this.options = {
                    startX: 0,
                    startY: 0,
                    scrollY: !0,
                    directionLockThreshold: 5,
                    momentum: !0,
                    bounce: !0,
                    bounceTime: 600,
                    bounceEasing: "",
                    preventDefault: !0,
                    preventDefaultException: {
                        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                    },
                    HWCompositing: !0,
                    useTransition: !0,
                    useTransform: !0
                };
            for (var n in i) this.options[n] = i[n];
            this.translateZ = this.options.HWCompositing && r.hasPerspective ? " translateZ(0)": "",
                this.options.useTransition = r.hasTransition && this.options.useTransition,
                this.options.useTransform = r.hasTransform && this.options.useTransform,
                this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical": this.options.eventPassthrough,
                this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault,
                this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY,
                this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX,
                this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough,
                this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold,
                this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? r.ease[this.options.bounceEasing] || r.ease.circular: this.options.bounceEasing,
                this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling,
                this.x = 0,
                this.y = 0,
                this.directionX = 0,
                this.directionY = 0,
                this._events = {},
                this._init(),
                this.refresh(),
                this.scrollTo(this.options.startX, this.options.startY),
                this.enable()
        }
        var s = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame ||
                function(e) {
                    t.setTimeout(e, 1e3 / 60)
                },
            r = function() {
                function n(t) {
                    return o + t.charAt(0).toUpperCase() + t.substr(1)
                }
                var s = {},
                    r = e.createElement("div").style,
                    o = "webkit";
                s.getTime = Date.now ||
                    function() {
                        return (new Date).getTime()
                    },
                    s.extend = function(t, e) {
                        for (var i in e) t[i] = e[i]
                    },
                    s.addEvent = function(t, e, i, n) {
                        t.addEventListener(e, i, !!n)
                    },
                    s.removeEvent = function(t, e, i, n) {
                        t.removeEventListener(e, i, !!n)
                    },
                    s.momentum = function(t, e, n, s, r, o) {
                        var a, c, l = t - e,
                            h = i.abs(l) / n;
                        return o = void 0 === o ? 6e-4: o,
                            a = t + h * h / (2 * o) * (0 > l ? -1 : 1),
                            c = h / o,
                            s > a ? (a = r ? s - r / 2.5 * (h / 8) : s, l = i.abs(a - t), c = l / h) : a > 0 && (a = r ? r / 2.5 * (h / 8) : 0, l = i.abs(t) + a, c = l / h),
                        {
                            destination: i.round(a),
                            duration: c
                        }
                    };
                var a = n("transform");
                return s.extend(s, {
                    hasTransform: a !== !1,
                    hasPerspective: n("perspective") in r,
                    hasTouch: "ontouchstart" in t,
                    hasPointer: t.PointerEvent || t.MSPointerEvent,
                    hasTransition: n("transition") in r
                }),
                    s.isBadAndroid = /Android /.test(t.navigator.appVersion) && !/Chrome\/\d/.test(t.navigator.appVersion),
                    s.extend(s.style = {},
                        {
                            transform: a,
                            transitionTimingFunction: n("transitionTimingFunction"),
                            transitionDuration: n("transitionDuration"),
                            transitionDelay: n("transitionDelay"),
                            transformOrigin: n("transformOrigin")
                        }),
                    s.hasClass = function(t, e) {
                        var i = new RegExp("(^|\\s)" + e + "(\\s|$)");
                        return i.test(t.className)
                    },
                    s.addClass = function(t, e) {
                        if (!s.hasClass(t, e)) {
                            var i = t.className.split(" ");
                            i.push(e),
                                t.className = i.join(" ")
                        }
                    },
                    s.removeClass = function(t, e) {
                        if (s.hasClass(t, e)) {
                            var i = new RegExp("(^|\\s)" + e + "(\\s|$)", "g");
                            t.className = t.className.replace(i, " ")
                        }
                    },
                    s.offset = function(t) {
                        for (var e = -t.offsetLeft,
                                 i = -t.offsetTop; t = t.offsetParent;) e -= t.offsetLeft,
                            i -= t.offsetTop;
                        return {
                            left: e,
                            top: i
                        }
                    },
                    s.preventDefaultException = function(t, e) {
                        for (var i in e) if (e[i].test(t[i])) return ! 0;
                        return ! 1
                    },
                    s.extend(s.eventType = {},
                        {
                            touchstart: 1,
                            touchmove: 1,
                            touchend: 1
                        }),
                    s.extend(s.ease = {},
                        {
                            quadratic: {
                                style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                fn: function(t) {
                                    return t * (2 - t)
                                }
                            },
                            circular: {
                                style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                                fn: function(t) {
                                    return i.sqrt(1 - --t * t)
                                }
                            },
                            back: {
                                style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                fn: function(t) {
                                    var e = 4;
                                    return (t -= 1) * t * ((e + 1) * t + e) + 1
                                }
                            },
                            bounce: {
                                style: "",
                                fn: function(t) {
                                    return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t: 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                                }
                            },
                            elastic: {
                                style: "",
                                fn: function(t) {
                                    var e = .22,
                                        n = .4;
                                    return 0 === t ? 0 : 1 == t ? 1 : n * i.pow(2, -10 * t) * i.sin(2 * (t - e / 4) * i.PI / e) + 1
                                }
                            }
                        }),
                    s
            } ();
        n.prototype = {
            version: "5.1.3",
            _init: function() {
                this._initEvents()
            },
            destroy: function() {
                this._initEvents(!0),
                    this._execEvent("destroy")
            },
            _transitionEnd: function(t) {
                t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
            },
            _start: function(t) {
                if (! (1 != r.eventType[t.type] && 0 !== t.button || !this.enabled || this.initiated && r.eventType[t.type] !== this.initiated)) { ! this.options.preventDefault || r.isBadAndroid || r.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                    var e, n = t.touches ? t.touches[0] : t;
                    this.initiated = r.eventType[t.type],
                        this.moved = !1,
                        this.distX = 0,
                        this.distY = 0,
                        this.directionX = 0,
                        this.directionY = 0,
                        this.directionLocked = 0,
                        this._transitionTime(),
                        this.startTime = r.getTime(),
                        this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")),
                        this.startX = this.x,
                        this.startY = this.y,
                        this.absStartX = this.x,
                        this.absStartY = this.y,
                        this.pointX = n.pageX,
                        this.pointY = n.pageY,
                        this._execEvent("beforeScrollStart")
                }
            },
            _move: function(t) {
                if (this.enabled && r.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && t.preventDefault();
                    var e, n, s, o, a = t.touches ? t.touches[0] : t,
                        c = a.pageX - this.pointX,
                        l = a.pageY - this.pointY,
                        h = r.getTime();
                    if (this.pointX = a.pageX, this.pointY = a.pageY, this.distX += c, this.distY += l, s = i.abs(this.distX), o = i.abs(this.distY), !(h - this.endTime > 300 && 10 > s && 10 > o)) {
                        if (this.directionLocked || this.options.freeScroll || (this.directionLocked = s > o + this.options.directionLockThreshold ? "h": o >= s + this.options.directionLockThreshold ? "v": "n"), "h" == this.directionLocked) {
                            if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                            else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                            l = 0
                        } else if ("v" == this.directionLocked) {
                            if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                            else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                            c = 0
                        }
                        c = this.hasHorizontalScroll ? c: 0,
                            e = this.x + c,
                            n = this.y + l,
                        (e > 0 || e < this.maxScrollX) && (e = this.options.bounce ? this.x + c / 3 : e > 0 ? 0 : this.maxScrollX),
                        (n > 0 || n < this.maxScrollY) && (n = this.options.bounce ? this.y + l / 3 : n > 0 ? 0 : this.maxScrollY),
                            this.directionX = c > 0 ? -1 : 0 > c ? 1 : 0,
                            this.directionY = l > 0 ? -1 : 0 > l ? 1 : 0,
                        this.moved || this._execEvent("scrollStart"),
                            this.moved = !0,
                            this._translate(e, n),
                        h - this.startTime > 300 && (this.startTime = h, this.startX = this.x, this.startY = this.y)
                    }
                }
            },
            _end: function(t) {
                if (this.enabled && r.eventType[t.type] === this.initiated) {
                    this.options.preventDefault && !r.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault(),
                        this._execEvent("beforeScrollEnd");
                    var e, n, s = (t.changedTouches ? t.changedTouches[0] : t, r.getTime() - this.startTime),
                        o = i.round(this.x),
                        a = i.round(this.y),
                        c = i.abs(o - this.startX),
                        l = i.abs(a - this.startY),
                        h = 0,
                        u = "";
                    if (this.isInTransition = 0, this.initiated = 0, this.endTime = r.getTime(), !this.resetPosition(this.options.bounceTime)) return this.scrollTo(o, a),
                        this.moved ? this._events.flick && 200 > s && 100 > c && 100 > l ? void this._execEvent("flick") : (this.options.momentum && 300 > s && (e = this.hasHorizontalScroll ? r.momentum(this.x, this.startX, s, this.maxScrollX, this.options.bounce ? this.wrapperWidth: 0, this.options.deceleration) : {
                            destination: o,
                            duration: 0
                        },
                            n = this.hasVerticalScroll ? r.momentum(this.y, this.startY, s, this.maxScrollY, this.options.bounce ? this.wrapperHeight: 0, this.options.deceleration) : {
                                destination: a,
                                duration: 0
                            },
                            o = e.destination, a = n.destination, h = i.max(e.duration, n.duration), this.isInTransition = 1), o != this.x || a != this.y ? ((o > 0 || o < this.maxScrollX || a > 0 || a < this.maxScrollY) && (u = r.ease.quadratic), void this.scrollTo(o, a, h, u)) : void this._execEvent("scrollEnd")) : void this._execEvent("scrollCancel")
                }
            },
            resetPosition: function(t) {
                var e = this.x,
                    i = this.y;
                return t = t || 0,
                    !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX),
                    !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY),
                    e == this.x && i == this.y ? !1 : (this.scrollTo(e, i, t, this.options.bounceEasing), !0)
            },
            disable: function() {
                this.enabled = !1
            },
            enable: function() {
                this.enabled = !0
            },
            refresh: function() {
                this.wrapper.offsetHeight,
                    this.wrapperWidth = this.wrapper.clientWidth,
                    this.wrapperHeight = this.wrapper.clientHeight,
                    this.scrollerWidth = this.scroller.offsetWidth,
                    this.scrollerHeight = this.scroller.offsetHeight,
                    this.maxScrollX = this.wrapperWidth - this.scrollerWidth,
                    this.maxScrollY = this.wrapperHeight - this.scrollerHeight,
                    this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0,
                    this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0,
                this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth),
                this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight),
                    this.endTime = 0,
                    this.directionX = 0,
                    this.directionY = 0,
                    this.wrapperOffset = r.offset(this.wrapper),
                    this._execEvent("refresh"),
                    this.resetPosition()
            },
            on: function(t, e) {
                this._events[t] || (this._events[t] = []),
                    this._events[t].push(e)
            },
            off: function(t, e) {
                if (this._events[t]) {
                    var i = this._events[t].indexOf(e);
                    i > -1 && this._events[t].splice(i, 1)
                }
            },
            _execEvent: function(t) {
                if (this._events[t]) {
                    var e = 0,
                        i = this._events[t].length;
                    if (i) for (; i > e; e++) this._events[t][e].apply(this, [].slice.call(arguments, 1))
                }
            },
            scrollBy: function(t, e, i, n) {
                t = this.x + t,
                    e = this.y + e,
                    i = i || 0,
                    this.scrollTo(t, e, i, n)
            },
            scrollTo: function(t, e, i, n) {
                n = n || r.ease.circular,
                    this.isInTransition = this.options.useTransition && i > 0,
                    !i || this.options.useTransition && n.style ? (this._transitionTimingFunction(n.style), this._transitionTime(i), this._translate(t, e)) : this._animate(t, e, i, n.fn)
            },
            scrollToElement: function(t, e, n, s, o) {
                if (t = t.nodeType ? t: this.scroller.querySelector(t)) {
                    var a = r.offset(t);
                    a.left -= this.wrapperOffset.left,
                        a.top -= this.wrapperOffset.top,
                    n === !0 && (n = i.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)),
                    s === !0 && (s = i.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)),
                        a.left -= n || 0,
                        a.top -= s || 0,
                        a.left = a.left > 0 ? 0 : a.left < this.maxScrollX ? this.maxScrollX: a.left,
                        a.top = a.top > 0 ? 0 : a.top < this.maxScrollY ? this.maxScrollY: a.top,
                        e = void 0 === e || null === e || "auto" === e ? i.max(i.abs(this.x - a.left), i.abs(this.y - a.top)) : e,
                        this.scrollTo(a.left, a.top, e, o)
                }
            },
            _transitionTime: function(t) {
                t = t || 0,
                    this.scrollerStyle[r.style.transitionDuration] = t + "ms"
            },
            _transitionTimingFunction: function(t) {
                this.scrollerStyle[r.style.transitionTimingFunction] = t
            },
            _translate: function(t, e) {
                this.scrollerStyle[r.style.transform] = "translate(" + t + "px," + e + "px)" + this.translateZ,
                    this.x = t,
                    this.y = e
            },
            _initEvents: function(e) {
                var i = e ? r.removeEvent: r.addEvent,
                    n = this.options.bindToWrapper ? this.wrapper: t;
                r.hasTouch && !this.options.disableTouch && (i(this.wrapper, "touchstart", this), i(n, "touchmove", this), i(n, "touchcancel", this), i(n, "touchend", this)),
                    i(this.scroller, "transitionend", this),
                    i(this.scroller, "webkitTransitionEnd", this),
                    i(this.scroller, "oTransitionEnd", this),
                    i(this.scroller, "MSTransitionEnd", this)
            },
            getComputedPosition: function() {
                var e, i, n = t.getComputedStyle(this.scroller, null);
                return this.options.useTransform ? (n = n[r.style.transform].split(")")[0].split(", "), e = +(n[12] || n[4]), i = +(n[13] || n[5])) : (e = +n.left.replace(/[^-\d.]/g, ""), i = +n.top.replace(/[^-\d.]/g, "")),
                {
                    x: e,
                    y: i
                }
            },
            _animate: function(t, e, i, n) {
                function o() {
                    var p, d, f, v = r.getTime();
                    return v >= u ? (a.isAnimating = !1, a._translate(t, e), void(a.resetPosition(a.options.bounceTime) || a._execEvent("scrollEnd"))) : (v = (v - h) / i, f = n(v), p = (t - c) * f + c, d = (e - l) * f + l, a._translate(p, d), void(a.isAnimating && s(o)))
                }
                var a = this,
                    c = this.x,
                    l = this.y,
                    h = r.getTime(),
                    u = h + i;
                this.isAnimating = !0,
                    o()
            },
            handleEvent: function(t) {
                switch (t.type) {
                    case "touchstart":
                        this._start(t);
                        break;
                    case "touchmove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "touchcancel":
                        this._end(t);
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(t);
                        break;
                    case "click":
                        t._constructed || (t.preventDefault(), t.stopPropagation())
                }
            }
        },
            n.utils = r,
            "undefined" != typeof module && module.exports ? module.exports = n: t.IScroll = n
    } (window, document, Math),
    !
        function() {
            function t(t) {
                return t.replace(y, "").replace(b, ",").replace(_, "").replace(T, "").replace(x, "").split(S)
            }
            function e(t) {
                return "'" + t.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
            }
            function i(i, n) {
                function s(t) {
                    return p += t.split(/\n/).length - 1,
                    h && (t = t.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")),
                    t && (t = w[1] + e(t) + w[2] + "\n"),
                        t
                }
                function r(e) {
                    var i = p;
                    if (l ? e = l(e, n) : o && (e = e.replace(/\n/g,
                            function() {
                                return p++,
                                "$line=" + p + ";"
                            })), 0 === e.indexOf("=")) {
                        var s = u && !/^=[=#]/.test(e);
                        if (e = e.replace(/^=[=#]?|[\s;]*$/g, ""), s) {
                            var r = e.replace(/\s*\([^\)]+\)/, "");
                            d[r] || /^(include|print)$/.test(r) || (e = "$escape(" + e + ")")
                        } else e = "$string(" + e + ")";
                        e = w[1] + e + w[2]
                    }
                    return o && (e = "$line=" + i + ";" + e),
                        g(t(e),
                            function(t) {
                                if (t && !v[t]) {
                                    var e;
                                    e = "print" === t ? b: "include" === t ? _: d[t] ? "$utils." + t: f[t] ? "$helpers." + t: "$data." + t,
                                        T += t + "=" + e + ",",
                                        v[t] = !0
                                }
                            }),
                    e + "\n"
                }
                var o = n.debug,
                    a = n.openTag,
                    c = n.closeTag,
                    l = n.parser,
                    h = n.compress,
                    u = n.escape,
                    p = 1,
                    v = {
                        $data: 1,
                        $filename: 1,
                        $utils: 1,
                        $helpers: 1,
                        $out: 1,
                        $line: 1
                    },
                    m = "".trim,
                    w = m ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
                    y = m ? "$out+=text;return $out;": "$out.push(text);",
                    b = "function(){var text=''.concat.apply('',arguments);" + y + "}",
                    _ = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + y + "}",
                    T = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (o ? "$line=0,": ""),
                    x = w[0],
                    S = "return new String(" + w[3] + ");";
                g(i.split(a),
                    function(t) {
                        t = t.split(c);
                        var e = t[0],
                            i = t[1];
                        1 === t.length ? x += s(e) : (x += r(e), i && (x += s(i)))
                    });
                var $ = T + x + S;
                o && ($ = "try{" + $ + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + e(i) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
                try {
                    var E = new Function("$data", "$filename", $);
                    return E.prototype = d,
                        E
                } catch(D) {
                    throw D.temp = "function anonymous($data,$filename) {" + $ + "}",
                        D
                }
            }
            var n = function(t, e) {
                return "string" == typeof e ? m(e, {
                    filename: t
                }) : o(t, e)
            };
            n.version = "3.0.0",
                n.config = function(t, e) {
                    s[t] = e
                };
            var s = n.defaults = {
                    openTag: "<%",
                    closeTag: "%>",
                    escape: !0,
                    cache: !0,
                    compress: !1,
                    parser: null
                },
                r = n.cache = {};
            n.render = function(t, e) {
                return m(t, e)
            };
            var o = n.renderFile = function(t, e) {
                var i = n.get(t) || v({
                        filename: t,
                        name: "Render Error",
                        message: "Template not found"
                    });
                return e ? i(e) : i
            };
            n.get = function(t) {
                var e;
                if (r[t]) e = r[t];
                else if ("object" == typeof document) {
                    var i = document.getElementById(t);
                    if (i) {
                        var n = (i.value || i.innerHTML).replace(/^\s*|\s*$/g, "");
                        e = m(n, {
                            filename: t
                        })
                    }
                }
                return e
            };
            var a = function(t, e) {
                    return "string" != typeof t && (e = typeof t, "number" === e ? t += "": t = "function" === e ? a(t.call(t)) : ""),
                        t
                },
                c = {
                    "<": "&#60;",
                    ">": "&#62;",
                    '"': "&#34;",
                    "'": "&#39;",
                    "&": "&#38;"
                },
                l = function(t) {
                    return c[t]
                },
                h = function(t) {
                    return a(t).replace(/&(?![\w#]+;)|[<>"']/g, l)
                },
                u = Array.isArray ||
                    function(t) {
                        return "[object Array]" === {}.toString.call(t)
                    },
                p = function(t, e) {
                    var i, n;
                    if (u(t)) for (i = 0, n = t.length; n > i; i++) e.call(t, t[i], i, t);
                    else for (i in t) e.call(t, t[i], i)
                },
                d = n.utils = {
                    $helpers: {},
                    $include: o,
                    $string: a,
                    $escape: h,
                    $each: p
                };
            n.helper = function(t, e) {
                f[t] = e
            };
            var f = n.helpers = d.$helpers;
            n.onerror = function(t) {
                var e = "Template Error\n\n";
                for (var i in t) e += "<" + i + ">\n" + t[i] + "\n\n";
                "object" == typeof console && console.error(e)
            };
            var v = function(t) {
                    return n.onerror(t),
                        function() {
                            return "{Template Error}"
                        }
                },
                m = n.compile = function(t, e) {
                    function n(i) {
                        try {
                            return new c(i, a) + ""
                        } catch(n) {
                            return e.debug ? v(n)() : (e.debug = !0, m(t, e)(i))
                        }
                    }
                    e = e || {};
                    for (var o in s) void 0 === e[o] && (e[o] = s[o]);
                    var a = e.filename;
                    try {
                        var c = i(t, e)
                    } catch(l) {
                        return l.filename = a || "anonymous",
                            l.name = "Syntax Error",
                            v(l)
                    }
                    return n.prototype = c.prototype,
                        n.toString = function() {
                            return c.toString()
                        },
                    a && e.cache && (r[a] = n),
                        n
                },
                g = d.$each,
                w = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
                y = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
                b = /[^\w$]+/g,
                _ = new RegExp(["\\b" + w.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
                T = /^\d[^,]*|,\d[^,]*/g,
                x = /^,+|,+$/g,
                S = /^$|,+/;
            s.openTag = "{{",
                s.closeTag = "}}";
            var $ = function(t, e) {
                var i = e.split(":"),
                    n = i.shift(),
                    s = i.join(":") || "";
                return s && (s = ", " + s),
                "$helpers." + n + "(" + t + s + ")"
            };
            s.parser = function(t) {
                t = t.replace(/^\s/, "");
                var e = t.split(" "),
                    i = e.shift(),
                    s = e.join(" ");
                switch (i) {
                    case "if":
                        t = "if(" + s + "){";
                        break;
                    case "else":
                        e = "if" === e.shift() ? " if(" + e.join(" ") + ")": "",
                            t = "}else" + e + "{";
                        break;
                    case "/if":
                        t = "}";
                        break;
                    case "each":
                        var r = e[0] || "$data",
                            o = e[1] || "as",
                            a = e[2] || "$value",
                            c = e[3] || "$index",
                            l = a + "," + c;
                        "as" !== o && (r = "[]"),
                            t = "$each(" + r + ",function(" + l + "){";
                        break;
                    case "/each":
                        t = "});";
                        break;
                    case "echo":
                        t = "print(" + s + ");";
                        break;
                    case "print":
                    case "include":
                        t = i + "(" + e.join(",") + ");";
                        break;
                    default:
                        if (/^\s*\|\s*[\w\$]/.test(s)) {
                            var h = !0;
                            0 === t.indexOf("#") && (t = t.substr(1), h = !1);
                            for (var u = 0,
                                     p = t.split("|"), d = p.length, f = p[u++]; d > u; u++) f = $(f, p[u]);
                            t = (h ? "=": "=#") + f
                        } else t = n.helpers[i] ? "=#" + i + "(" + e.join(",") + ");": "=" + t
                }
                return t
            },
                "function" == typeof define ? define(function() {
                    return n
                }) : "undefined" != typeof exports ? module.exports = n: this.template = n
        } (),
    $(function() {
        function t(t) {
            return t - new Date > 864e5
        }
        function e(t) {
            var e = {
                container: "",
                pageKey: "",
                series: [],
                htmlParser: function() {
                    return ""
                }
            };
            t = m.extend(e, t || {}),
                this.$container = m(t.container),
                this.series = t.series,
                this.htmlParser = t.htmlParser,
                this.pageKey = t.pageKey,
                this.width = t.width,
                this.ratio = 1.0625,
                this.maxSize = this.series.length
        }
        function i(t) {
            return "top" === L ? t + "px": "translateY(" + t + "px)"
        }
        function n(t) {
            return "pending" === D ? void(t > 20 ? (C.css("-webkit-transition-duration", Y).css(L, i( - 106)), D = "hidden") : (C.css("-webkit-transition-duration", Y).css(L, i(0)), D = "display")) : void("hidden" === D && -200 > t && 0 == P.getCurrentScroller().y && (C.css("-webkit-transition-duration", Y).css(L, i(0)), D = "display"))
        }
        function s() {
            b.on("touchstart",
                function(t) {
                    z = t.touches[0].pageY,
                        C.css("-webkit-transition-duration", "")
                }).on("touchmove",
                function(t) {
                    k = z - t.touches[0].pageY,
                    "hidden" !== D && (t.preventDefault(), k > 0 && C.css(L, i( - k / 2)), D = "pending")
                }).on("touchend",
                function() { - 1 !== P.currentViewKey.indexOf(X) && n(k)
                });
            var t = setTimeout(function() {
                    "display" === D && (D = "pending", n(30), clearTimeout(t), t = null)
                },
                5e3);
            s = null
        }
        function r() {
            x.show();
            var t = this,
                e = t.dataset.view,
                i = P,
                n = i.getRM(e),
                s = i.getCurrentView();
            return s = s.parent ? i.getRM(s.parent) : s,
                n.loaded ? (n.parent || (v(s.$subNav, "-2.9rem"), v(n.$subNav)), n.hasSub ? (t.classList.add("active"), void m('[data-view="' + [e, "_sub_", 0].join("") + '"]').trigger("click")) : (a(), i.setCurrentView(e), void c(t))) : void i.createView(e,
                    function() {
                        c(t)
                    })
        }
        function o() {
            m("#view_" + P.currentViewKey).removeClass(E)
        }
        function a() {
            m("#view_" + P.currentViewKey).addClass(E)
        }
        function c(t) {
            o(),
                x.hide(),
                t.classList.add("active"),
            -1 === P.currentViewKey.indexOf(X) && (D = "pending", n(30)),
                P.getCurrentView().viewInstance.peddlingFunc()
        }
        function l(t) {
            return template("productTemplate", t)
        }
        function h(t) {
            return t.forEach(function(t) {
                t.is_login = w.is_login,
                    t.mt = w.mt,
                    t.user_level = w.user_level,
                    t.is_sell_out = u(t),
                    t.button_text = d(t),
                    t.button_class = (t.is_sell_out ? "btn-disabled": "btn-red pass-through") + " btn pull-right",
                    t.button_url = f(t),
                    t.img_url = p(t),
                    t.width = "width:" + t.ext_info.crowdfunding_current_period_number / t.ext_info.crowdfunding_period_user * 100 + "%"
            }),
                t
        }
        function u(t) {
            return 2 != t.online_status || 7 == t.category && parseInt(t.ext_info.crowdfunding_current_period) > parseInt(t.ext_info.crowdfunding_total_period)
        }
        function p(t) {
            var e = "";
            return "1" == t.ext_info.fountain_product && (e += '_bie.dataRouter("huodong|pic|id_' + t.product_id + '");'),
                e += 'window.location.href="' + t.product_url + '"'
        }
        function d(t) {
            var e = t.category_type;
            return t.is_sell_out ? 7 == t.category ? "已结束": "已卖光": 7 == t.category ? "立即许愿": "1" == t.ext_info.fountain_product ? "免费领取": 2 == e || 3 == e ? "立即抽奖": "立即享有"
        }
        function f(t) {
            if (t.is_sell_out) return "";
            var e = "",
                i = "1" == t.ext_info.fountain_product,
                n = 4 == t.category || 5 == t.category,
                s = "1" == t.is_login,
                r = ["product_id=" + t.product_id, "mt=" + t.mt],
                o = "/waporder/wapconfirm?product_id=" + t.product_id;
            return n && (e += '_bie.dataRouter("huodong|btn|id_' + t.product_id + '");', o = t.product_url),
            i && 4 != t.category && (o = "/wapproduct/wapfountain?" + r.join("&")),
                o = !s && w.inNative ? 'BDP.login(event,"' + o + '")': 'window.location.href = "' + o + '"',
                e += o
        }
        function v(t, e) {
            t && t.css("-webkit-transform", e ? "translateY(" + e + ")": "")
        }
        var m = Zepto,
            g = window,
            w = g.ONEBAIDU,
            y = {
                isSupportLocalStorage: function() {
                    var t = !0,
                        e = localStorage;
                    try {
                        e.setItem("__1baidu_test__", 1),
                            e.removeItem("__1baidu_test__")
                    } catch(i) {
                        t = !1
                    }
                    return t
                } (),
                getData: function(t) {
                    return this.isSupportLocalStorage ? localStorage.getItem(t) : null
                },
                setData: function(t, e) {
                    this.isSupportLocalStorage && localStorage.setItem(t, e)
                }
            };
        e.getInstance = function(t) {
            var i = new e(t);
            return i.init(),
                i
        },
            e.prototype = {
                init: function() {
                    var t = this,
                        e = t.getPageKey();
                    e[2] = t.compareUpdateTag(e[2]),
                        e.unshift(t.series),
                        t.series = t.seriesSpliter.apply(t, e),
                        t.hasBrowsedDomSize = t.series.browsed.length;
                    var i = m("<div></div>");
                    t.append("browsed", t.hasBrowsedDomSize, i),
                        t.notBrowsedDomList = t.append("notBrowsed", 2, i),
                        t.$container.html(i);
                    var n = t.setNotBrowsedClass();
                    t.scroller = new IScroll(t.$container[0], {
                        probeType: 1,
                        disableMouse: !0,
                        bindToWrapper: !0,
                        preventDefaultException: {
                            className: /(^|\s)(pass-through)(\s|$)/
                        }
                    });
                    var s = t.getStep();
                    return t.scroller.maxScrollY = 0 - (t.hasBrowsedDomSize - 1) * s,
                        t.$container = i,
                        t.lazyLoad(),
                        t.scroller.on("scrollEnd",
                            function() {
                                t.peddlingFunc()
                            }),
                        t.hasBrowsedDomSize == t.maxSize ? (t.appendFooter(), t) : void t.scroller.on("beforeScrollEnd",
                            function() {
                                this.distY < -70 && this.y <= this.maxScrollY && t.hasBrowsedDomSize <= t.maxSize && (t.hasBrowsedDomSize !== t.maxSize ? (this.maxScrollY -= s, this.scrollBy(0, -s, 700), t.hasBrowsedDomSize++, t.setPageKey([ + new Date, t.hasBrowsedDomSize].join("|")), t.hasBrowsedDomSize < t.maxSize ? t.append("notBrowsed", 1) : t.appendFooter(), t.getLazyLoadImages(), n = t.setNotBrowsedClass(n)) : (t.hasBrowsedDomSize++, t.scroller.off("beforeScrollEnd")))
                            })
                },
                peddlingFunc: function() {
                    var t = P.getCurrentView();
                    return t.parent && (t = P.getRM(t.parent)),
                        this.scroller.y < -this.getStep() ? (v(t.$subNav, "-2.9rem"), S.removeClass("nav-in"), $.show()) : (v(t.$subNav), S.addClass("nav-in"), $.hide()),
                        this
                },
                getLazyLoadImages: function() {
                    var t = this,
                        e = t.scroller.wrapper;
                    return t.lazyLoadCaches = t.lazyLoadCaches || [],
                        m("[data-picurl]", e).each(function() {
                            t.lazyLoadCaches.push({
                                url: this.dataset.picurl,
                                $img: m(this)
                            })
                        }),
                        t
                },
                lazyLoadHandle: function() {
                    var t = this,
                        e = this.scroller.wrapper,
                        i = m(e).offset().top;
                    t.lazyLoadCaches.forEach(function(e, n) {
                        e && e.$img.offset().top - i <= t.getStep() && (e.$img.attr("src", e.url).removeAttr("data-picurl"), t.lazyLoadCaches[n] = null)
                    }),
                    t.lazyLoadCaches.every(function(t) {
                        return null === t
                    }) && (t.lazyLoadCaches = [])
                },
                lazyLoad: function() {
                    {
                        var t = this;
                        t.scroller.wrapper
                    }
                    return t.lazyLoadHandle = t.lazyLoadHandle.bind(t),
                        t.getLazyLoadImages().lazyLoadHandle(),
                        t.scroller.on("scrollEnd", t.lazyLoadHandle),
                        t
                },
                setNotBrowsedClass: function(t) {
                    t && t.removeClass("thumbnail-mode");
                    var e = this.notBrowsedDomList.shift();
                    return e && e.addClass("thumbnail-mode"),
                        e
                },
                getStep: function() {
                    return this.width * this.ratio
                },
                compareUpdateTag: function(t) {
                    var e = "";
                    return this.series.forEach(function(t) {
                        e += t.product_id
                    }),
                        this.tag = e,
                    e === t
                },
                getPageKey: function() {
                    var t = y.getData("swpk@" + this.pageKey);
                    return t ? t.split("|") : [ + new Date, 1]
                },
                setPageKey: function(t) {
                    return t += "|",
                        t += this.tag,
                        y.setData("swpk@" + this.pageKey, t),
                        this
                },
                seriesSpliter: function(e, i, n, s) {
                    return {
                        browsed: e.splice(0, t(i) || !s ? 1 : n),
                        notBrowsed: e
                    }
                },
                getSerialDom: function(t, e) {
                    var i = this.series[t || "notBrowsed"],
                        n = i.length,
                        s = [];
                    for (n = e && n >= e ? e: n; n--;) s.push(m(this.htmlParser(i.shift())).height(this.getStep()));
                    return s
                },
                append: function(t, e, i) {
                    if (!this.series[t].length) return [];
                    var n = this.getSerialDom(t, e),
                        s = i || this.$container;
                    return s.append.apply(s, n),
                    "notBrowsed" === t && n.length && !i && this.notBrowsedDomList.push.apply(this.notBrowsedDomList, n),
                        n
                },
                appendFooter: function() {
                    return this.$container.append(template("footerTemplate", {
                        inWalletApp: w.inWalletApp
                    })),
                        this
                }
            };
        var b = m("#translateWrapper"),
            _ = b.width(),
            T = m("[data-view]"),
            x = m("#loading"),
            S = m("#nav"),
            $ = m("#back2top"),
            E = "view-out",
            D = "display",
            z = 0,
            k = 0,
            C = m(".wrapper"),
            L = "-webkit-transform",
            Y = ".3s",
            P = {
                currentViewKey: "recommend",
                roadMap: {
                    recommend: {
                        loaded: !1
                    },
                    wapwish: {
                        url: "mock/wapwish.json",
                        loaded: !1
                    },
                    wapveteran: {
                        url: "mock/wapveteran.json",
                        loaded: !1
                    },
                    wapfresh: {
                        url: "mock/wapfresh.json",
                        loaded: !1
                    }
                },
                getRM: function(t) {
                    return this.roadMap[t]
                },
                setRM: function(t, e, i) {
                    if (i) for (var n in e) this.roadMap[t][n] = e[n];
                    else this.roadMap[t] = e;
                    return this
                },
                getData: function(t, e) {
                    var i = this,
                        n = i.getRM(t);
                    return n.url ? m.ajax({
                        url: n.url,
                        dataType: "json",
                        success: function(t) {
                            if (0 !== t.errno) return alert(t.msg),
                                !1;
                            var n = t.data;
                            e && e.call(i, n)
                        }
                    }) : e && e.call(i, w[t]),
                        i
                },
                getCurrentScroller: function() {
                    return this.getCurrentView().viewInstance.scroller
                },
                createView: function(t, e) {
                    return this.getData(t,
                        function(i) {
                            var n = this.getRM(t);
                            if (Array.isArray(i)) {
                                var s = this.getCurrentView().parent;
                                s && -1 === t.indexOf(s) && (s = this.getRM(s), v(s.$subNav, "-2.9rem")),
                                    this._createView(t, h(i))
                            } else {
                                var r = Object.keys(i);
                                n.hasSub = !0,
                                    r.forEach(function(e, n) {
                                        var s = i[e],
                                            r = [t, "_sub_", n].join("");
                                        this.setRM(r, {
                                                loaded: !1,
                                                parent: t,
                                                name: e
                                            },
                                            !1),
                                            w[r] = h(s)
                                    }.bind(this)),
                                    n.loaded = !0,
                                    this._createNav(r, t)
                            }
                            e && e()
                        })
                },
                getCurrentView: function() {
                    return this.getRM(this.currentViewKey)
                },
                setCurrentView: function(t) {
                    return this.currentViewKey = t,
                        this
                },
                _createNav: function(t, e) {
                    var i = {
                        list: []
                    };
                    t.forEach(function(t, n) {
                        t && i.list.push({
                            name: t,
                            key: [e, "_sub_", n].join("")
                        })
                    });
                    var n = m(template("subnavTemplate", i));
                    this.setRM(e, {
                            $subNav: n
                        },
                        !0),
                        v(n, "-2.9rem"),
                        S.append(n);
                    var s = n.find("[data-view]");
                    return s.on("click",
                        function() {
                            s.removeClass("active")
                        }).on("click", r),
                        s.eq(0).trigger("click"),
                        this
                },
                _createView: function(t, i) {
                    var n = m('<div class="product-groups ' + E + '" id="view_' + t + '"></div>');
                    return a(),
                        b.append(n),
                        this.setRM(t, {
                                loaded: !0,
                                viewInstance: e.getInstance({
                                    container: n,
                                    pageKey: t,
                                    series: i,
                                    htmlParser: l,
                                    width: _
                                })
                            },
                            !0),
                        n.removeClass(E),
                        this.currentViewKey = t,
                    s && s(),
                        this
                }
            };
        P.setRM("wapbbq", {
            url: "/wapproduct/wapbbq",
            loaded: !1
        });
        var X = g.location.hash.replace("#", "");
        P.getRM(X) ? P.setCurrentView(X) : X = P.currentViewKey,
            T.on("click",
                function() {
                    T.removeClass("active")
                }).on("click", r),
            m('[data-view="' + P.currentViewKey + '"]').trigger("click"),
            $.on("click",
                function() {
                    var t = P.getCurrentScroller();
                    t && t.scrollTo(0, 0, 500)
                }),
            m(g).on("resize",
                function() {
                    b.height(document.documentElement.clientHeight);
                    var t = b.width();
                    if (t - _ !== 0) {
                        _ = t;
                        var e = P.getCurrentView().viewInstance,
                            i = P.getCurrentScroller();
                        i.maxScrollY = 0 - (e.hasBrowsedDomSize - 1) * e.ratio * t,
                            i.scrollTo(0, 0, 500),
                            m(".group-item").height(t * (640 / 680))
                    }
                }).trigger("resize").on("scroll",
                function() {
                    this.scrollTo(0, 0)
                }).trigger("scroll"),
            m('[data-disable="touchmove"]').on("touchmove",
                function(t) {
                    t.preventDefault()
                }),
            b.on("touchstart", "[data-hover]",
                function() {
                    this.classList.add(this.dataset.hover)
                }).on("touchend", "[data-hover]",
                function() {
                    this.classList.remove(this.dataset.hover)
                })
    });