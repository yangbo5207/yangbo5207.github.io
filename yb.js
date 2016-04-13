;
(function() {
    'use strict';

    var root = this,
        doc = window.document,
        divstyle = doc.createElement('div').style,
        toString = Object.prototype.toString,
        slice = Array.prototype.slice.call,
        class2type = {};

    // 简单定义构造函数
    var yb = function(obj) {
        if (obj instanceof yb) return obj;
        if(!(this instanceof yb)) return new yb(obj);
    }

    if(typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = yb;
        }
        exports.yb = yb;
    } else {
        root.yb = yb;
    }

    yb.VERSION = '1.0.0';

    // 将css属性值转换为js特性值 例如 -webkit-transform --> WebkitTransform   padding-top --> paddingTop
    yb.camelCase = function(str) {
        return (str + '').replace(/^-ms-/, 'ms-').replace(/-([a-z]|[0-9])/ig, function(all, letter) {
            return (letter + '').toUpperCase();
        })
    };

    // 返回浏览器支持的内核前缀，如在webkit内核浏览器中，会返回 -webkit-
    yb.cssVendor = function() {
        var tests = '-webkit- -moz- -o- -ms-'.split(' '),
            prop;

        while(prop = tests.shift()) {
            if (yb.camelCase(prop + 'transform') in divstyle) {
                return prop;
            }
        }
        return '';
    };

    // 返回当前浏览器支持的css属性对应的js特性值
    yb.cssTest = function(name) {
        var prop = yb.camelCase(name),
           _prop = yb.camelCase(yb.cssVendor + prop);
        return (prop in divstyle) && prop || (_prop in divstyle) && _prop || '';
    }

    // 精确判断数据类型
    yb.type = function(elem) {
        if (elem == null) return elem + '';
        return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
    }

    // 当elem是数组/类数组时返回true
    yb.isArrayLike = function(elem) {
        var tp = yb.type(elem);
        return !!elem && tp != 'function' && tp != 'string' && (elem.length === 0 || elem.length && (elem.nodeType == 1 || (elem.length - 1) in elem));
    }

    // 遍历方法，arr表示被遍历的对象  iterate回调函数有三个参数，分别表示 value key arr.
    yb.each = function(arr, iterate) {
        if (yb.isArrayLike(arr)) {
            if (yb.type(arr.forEach) == 'function') {
                return arr.forEach(iterate);
            }
            var i = 0,
                len = arr.length,
                item;
            for(; i<len; i++) {
                item = arr[i];
                if(type(item) != 'undefined') {
                    iterate(item, i, arr);
                }
            }
        } else {
            for(var key in arr) {
                iterate(arr[key], key, arr);
            }
        }
    }

    // 获取/设置元素的属性  当props时一个字符串时，表示获取  当props是一个对象是，表示设置
    yb.css = function(elem, props) {
        var transform = this.cssTest('transform');
        var style = window.getComputedStyle && window.getComputedStyle(elem, null) || elem.currentStyle || elem.style;
        if (yb.type(props) == 'string') {
            switch (props) {
                case 'translateX':
                    if (style[transform] == 'none') return 0;
                    return style[transform].match(/\d+/g)[4];
                    break;
                case 'translateY':
                    if (style[transform] == 'none') return 0;
                    return style[transform].match(/\d+/g)[5];
                default:
                    return style[props];

            }
        } else if(yb.type(props) == 'object') {
            yb.each(props, function(value, key) {
                var prop;
                switch (key) {
                    case 'opacity':
                        elem.style.filter = 'alpha(opacity:'+ value +')';
                        elem.style.opacity = value/100;
                        break;
                    case 'translateX':
                        var matrix = style[transform];
                        var prev = matrix.replace(/matrix\(|\)/gi, '').split(',');
                        prev[4] = value;
                        var _matrix = 'matrix('+ prev.join(', ') +')';
                        elem.style[transform] = _matrix;
                        break;
                    case 'translateY':
                        var matrix = style[transform];
                        var prev = matrix.replace(/matrix\(|\)/gi, '').split(',');
                        prev[5] = value;
                        var _matrix = 'matrix('+ prev.join(', ') +')';
                        elem.style[transform] = _matrix;
                        break;
                    default:
                        prop = yb.camelCase(key);
                        elem.style[prop] = value;
                }
            })
        }
    }

    if (typeof define === 'function' && define.amd) {
        define('yb', [], function() {
            return yb;
        });
    }

// 通过call让作用域来调用yb中的所有方法
}.call(this));
