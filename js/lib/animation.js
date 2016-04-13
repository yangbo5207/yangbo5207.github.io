;
(function(ROOT, struct, undefined) {

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

        transform = yb.cssTest('transform');

    function ease(t,b,c,d){
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    }

    struct.prototype = {
        constructor: struct,
        slide: function(duration, props, callback) {
            var stime = +new Date;
            var self = this;
            var icur = {};
            var cp = {};
            var elem = self.elem;
            var style = ROOT.getComputedStyle && ROOT.getComputedStyle(elem, null) || elem.currentStyle || elem.style;

            // alert(transform);

            cancelFrame(self.timer);
            yb.each(props, function(val, key) {
                switch (key) {
                    case 'x':
                        if (transform) {
                            icur.translateX = parseFloat(yb.css(elem, 'translateX'));
                            props.translateX = val;
                        } else {
                            icur.left = parseFloat(yb.css(elem, 'left'));
                            props.left = val;
                        }
                        break;
                    case 'y':
                        if (transform) {
                            icur.translateY = parseFloat(yb.css(elem, 'translateY'));
                            props.translateY = val;
                        } else {
                            icur.top = parseFloat(yb.css(elem, 'top'));
                            props.top = val;
                        }
                        break;
                    default:
                        icur[key] = parseFloat(yb.css(elem, key));
                        break;
                }
            })
            ani();

            function ani() {
                var offset = Math.min(duration, +new Date - stime);
                var s = ease(offset, 0, 1, duration);
                yb.each(icur, function(val, key) {
                    cp[key] = (props[key] - val) * s + val;
                    switch (key) {
                        case 'opacity':
                            elem.style.opacity = cp[key] / 100;
                            elem.style.filter = 'alpha(opacity='+ cp[key] +')';
                            break;

                        case 'translateX':
                            var matrix = style[transform];
                            var prev = matrix.replace(/matrix\(|\)/gi, '').split(',');
                            prev[4] = cp[key];
                            var _matrix = 'matrix('+ prev.join(', ') +')';
                            elem.style[transform] = _matrix;
                            // elem.style[transform] = 'translateX('+ cp[key] +'px)';
                            break;
                        case 'translateY':
                            var matrix = style[transform];
                            var prev = matrix.replace(/matrix\(|\)/gi, '').split(',');
                            prev[5] = cp[key];
                            var _matrix = 'matrix('+ prev.join(', ') +')';
                            elem.style[transform] = _matrix;
                            break;
                        default:
                            elem.style[key] = cp[key] + 'px';
                            break;
                    }
                })
                if (offset == duration) {
                    callback && callback();
                } else {
                    self.timer = nextFrame(ani);
                }
            }
        }
    }

    if(typeof define=='function' && define.amd){
       define('TouchSlider',function(){
           return struct;
       });
    } else ROOT.TouchSlider=struct;

})(window, function(elem) {
    this.elem = elem;
});
