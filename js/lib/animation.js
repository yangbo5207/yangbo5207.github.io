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
        slide: function(duration, key, targVal, callback) {
            var stime = +new Date;
            var self = this;
            var iCur = parseFloat(yb.css(this.elem, key));
            cancelFrame(self.timer);

            ani();

            function ani() {
                var offset = Math.min(duration, +new Date - stime);
                var s = ease(offset, 0, 1, duration);
                var cp = (targVal - iCur) * s + iCur;
                self.elem.style[key] = cp + 'px';
                if (offset == duration) {
                    callback && callback();
                } else {
                    this.timer = nextFrame(ani);
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
