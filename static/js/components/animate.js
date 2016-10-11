;
(function(ROOT, Utils, undefined) {
    'use strict;'

    var lastTime = 0,
        nextFrame = ROOT.requestAnimationFrame       ||
                    ROOT.webkitRequestAnimationFrame ||
                    ROOT.mozRequestAnimationFrame    ||
                    ROOT.msRequestAnimationFrame     ||
                    function(callback) {
                        var currTime = + new Date,
                            delay = Math.max(1000/60, 1000/60 - (currTime - lastTime));
                        lastTime = currTime + delay;
                        return setTimeout(callback, delay);
                    },
        cancelFrame=ROOT.cancelAnimationFrame               ||
                    ROOT.webkitCancelAnimationFrame         ||
                    ROOT.webkitCancelRequestAnimationFrame  ||
                    ROOT.mozCancelRequestAnimationFrame     ||
                    ROOT.msCancelRequestAnimationFrame      ||
                    clearTimeout,
        DOC = ROOT.document,
        transform = Utils.isCSS('transform'),
        Tween = {
            linear: function(t, b, c, d) { 
                return c * t / d + b; 
            },
            easein: function(t, b, c, d) { 
                return c * (t /= d) * t + b; 
            },
            easeout: function(t, b, c, d) { 
                return -c * (t /= d) * (t - 2) + b; 
            },
            easeinout: function(t, b, c, d) { 
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            cEasein: function(t, b, c, d) { 
                return c * (t /= d) * t * t + b; 
            },
            cEaseout: function(t, b, c, d) { 
                return c * ((t = t/d - 1) * t * t + 1) + b; 
            },
            cEaseinout: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            },
            quEasein: function(t, b, c, d) { 
                return c * (t /= d) * t * t * t + b; 
            },
            quEaseout: function(t, b, c, d) { 
                return -c * ((t = t / d - 1) * t * t * t - 1) + b; 
            },
            quEaseinout: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            },
            quintEasein: function(t, b, c, d) { 
                return c * (t /= d) * t * t * t * t + b; 
            },
            quintEaseout: function(t, b, c, d) { 
                return c * ((t = t/d - 1) * t * t * t * t + 1) + b; 
            },
            quintEaseinout: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2*((t -= 2) * t * t * t * t + 2) + b;
            },
            sineEasein: function(t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            sineEaseout: function(t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            sineEaseinout: function(t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
            },
            expoEasein: function(t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            expoEaseout: function(t, b, c, d) {
                return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            expoEaseinout: function(t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            circEasein: function(t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            circEaseout: function(t, b, c, d) {
                return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
            },
            circEaseinout: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            },
            bounceIn: function(t, b, c, d) {
                return c - Tween.bounceOut(d-t, 0, c, d) + b;
            },
            bounceOut: function(t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            bounceInOut: function(t, b, c, d) {
                if (t < d / 2) {
                    return Tween.bounceIn(t * 2, 0, c, d) * .5 + b;
                } else {
                    return Tween.bounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                }
            }
        };

    function struct(elem) {
        return new struct.fn.init(elem);
    }

    struct.prototype = struct.fn = {
        constructor: struct,
        init: function(elem) {
            this.elem = elem;
            return this;
        },
        animate: function(duration, ease, props, callback) {
            var stime = +new Date;
                self = this,
                icur = {},
                cp = {},
                elem = self.elem,
                style = ROOT.getComputedStyle && ROOT.getComputedStyle(elem, null) || elem.currentStyle || elem.style;

            cancelFrame(self.timer);
            Utils.each(props, function(val, key) {
                switch (key) {
                    case 'x':
                        if (transform) {
                            icur.translateX = parseFloat(Utils.css(elem, 'translateX'));
                            props.translateX = val;
                        } else {
                            icur.left = parseFloat(Utils.css(elem, 'left'));
                            props.left = val;
                        }
                        break;
                    case 'y':
                        if (transform) {
                            icur.translateY = parseFloat(Utils.css(elem, 'translateY'));
                            props.translateY = val;
                        } else {
                            icur.top = parseFloat(Utils.css(elem, 'top'));
                            props.top = val;
                        }
                        break;
                    default:
                        icur[key] = parseFloat(Utils.css(elem, key));
                        break;
                }
            })
            +function ani() {
                var offset = Math.min(duration, +new Date - stime),
                    s = Tween[ease](offset, 0, 1, duration);
                Utils.each(icur, function(val, key) {
                    cp[key] = (props[key] - val) * s + val;
                    Utils.css(elem, {
                        [key]: cp[key]
                    })
                })
                if (offset == duration) {
                    callback && callback();
                } else {
                    self.timer = nextFrame(ani);
                }
            }();
        },
        test: function() {
            console.log('test');
        }
    }

    struct.fn.init.prototype = struct.fn;

    if(typeof define=='function' && define.amd){
       define('ani', function(){
           return struct;
       });
    } else ROOT.ani=struct;

})(window, Utils);