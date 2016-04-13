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
        DOC = ROOT.document;

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

            cancelFrame(self.timer);
            yb.each(props, function(val, key) {
                icur[key] = parseFloat(yb.css(self.elem, key));
            })
            ani();

            function ani() {
                var offset = Math.min(duration, +new Date - stime);
                var s = ease(offset, 0, 1, duration);
                yb.each(icur, function(val, key) {
                    cp[key] = (props[key] - val) * s + val;
                    self.elem.style[key] = cp[key] + 'px';
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
