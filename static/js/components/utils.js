;
(function(ROOT, undefined) {

    var root = this,
            doc = window.document,
            divstyle = doc.createElement('div').style,
            toString = Object.prototype.toString,
            slice = Array.prototype.slice.call,
            class2type = {},
            event2code = {};

    var K = {
        VERSION: '1.0.0',
        camelCase: camelCase,
        uncamelCase: uncamelCase,
        transitionend: 'otransitionend oTransitionEnd webkitTransitionEnd mozTransitionEnd MSTransitionEnd transitionend',
        animationend: 'oanimationend oAnimationEnd webkitAnimationEnd mozAnimationEnd MSAnimationEnd animationend',
        // // get css3 pre
        cssVendor: (function() {
            var ds = divstyle,
                cases = ['-webkit-', '-moz-', '-ms-', '-o-', ''],
                i = 0;
            do {
                if (camelCase(cases[i] + 'transform') in ds) {
                    return cases[i];
                }
            } while (++i < cases.length);
            return '';
        })(),
        type: function(elem) {
            if (elem == null) return elem + '';
            return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
        },
        isArrayLike: function(elem) {
            var tp = this.type(elem);
            return !!elem && tp != 'function' && tp != 'string' && (elem.length === 0 || elem.length && (elem.nodeType == 1 || (elem.length - 1) in elem));
        },
        each: function(arr, iterate) {
            if (this.isArrayLike(arr)) {
                if (this.type(arr.forEach) == 'function') {
                    return arr.forEach(iterate);
                }
                var i = 0,
                    len = arr.length,
                    item;
                for(; i<len; i++) {
                    item = arr[i];
                    this.type(item) != 'undefined' && iterate(item, i, arr);
                }
            } else {
                for(var key in arr) {
                    iterate(arr[key], key, arr);
                }
            }
        },
        fixCSS: function(property) {
            var ds = divstyle;
            return (camelCase(property) in ds) && property || (camelCase(this.cssVendor + property) in ds) && this.cssVendor + property || property;
        },
        isCSS: function(property) {
            var name = camelCase(this.fixCSS(property));
            return (name in divstyle) && name || '';
        },
        css: function(elem, props) {
            var self = this,
                transform = self.isCSS('transform'),
                style = window.getComputedStyle && window.getComputedStyle(elem, null) || elem.currentStyle || elem.style;
            if (self.type(props) == 'string') {
                switch (props) {
                    case 'translateX':
                        if (style[transform] == 'none') return 0;
                        return style[transform].match(/\d+/g)[4];
                    case 'translateY':
                        if (style[transform] == 'none') return 0;
                        return style[transform].match(/\d+/g)[5];
                    default:
                        return style[props];

                }
            } else if(self.type(props) == 'object') {
                self.each(props, function(value, key) {
                    var prop;
                    switch (key) {
                        case 'opacity':
                            elem.style.filter = 'alpha(opacity:'+ value +')';
                            elem.style.opacity = value/100;
                            break;
                        case 'translateX':
                            var matrix = style[transform],
                                prev = matrix.replace(/matrix\(|\)/gi, '').split(',');
                            prev[4] = value;
                            var _matrix = 'matrix('+ prev.join(', ') +')';
                            elem.style[transform] = _matrix;
                            break;
                        case 'translateY':
                            var matrix = style[transform],
                                prev = matrix.replace(/matrix\(|\)/gi, '').split(',');
                            prev[5] = value;
                            var _matrix = 'matrix('+ prev.join(', ') +')';
                            elem.style[transform] = _matrix;
                            break;
                        default:
                            prop = camelCase(key);
                            elem.style[prop] = value;
                    }
                })
                return elem;
            }
        },
        getParam: function getParam(url, key) {
            if (!url) { return ''; }
            if (url.indexOf(key) == -1) { return ''; }
            var arr = url.slice(url.indexOf('?') + 1).split('&');
            return function() {
                for(var item in arr) {
                    var otherArr = arr[item].split('=');
                    if (otherArr[0] == key) {
                        return otherArr[1];
                    };
                }
            }();
        },
        removeClass: function(id, value) {
            var classes = ( value || "" ).match( /\S+/g ) || [],//将要删除的样式, 拆分成数组
                elem = document.getElementById(id),
                cls, cur;

            //如果没找到
            if(!elem){
                return;
            }

            //得到当前的 class
            cur = elem.nodeType === 1 && ( elem.className ?
                ( " " + elem.className + " " ).replace( /[\t\r\n\f]/g, " " ) : ""
            );

            if ( cur ) {//如果当前有样式
                //取出一个要删除的样式名
                while ( (cls = classes.shift()) ) {
                    //找样式
                    while ( cur.indexOf( " " + cls + " " ) >= 0 ) {
                        //删除样式
                        cur = cur.replace( " " + cls + " ", " " );
                    }
                }
            }

            //更新样式
            elem.className = cur.trim();
        }
    }

    function camelCase(str) {
        return (str + '').replace(/^-ms-/, 'ms-').replace(/-([a-z]|[0-9])/ig, function(all, letter) {
            return (letter + '').toUpperCase();
        })
    }

    function uncamelCase(str) {
        return str.replace(/([A-Z]|^ms)/g, "-$1").toLowerCase();
    }

    if (typeof define === 'function' && define.amd) {
        define('Utils', [], function() {
            return Utils;
        });
    } else {
        ROOT.Utils = K;
    }

})(window);