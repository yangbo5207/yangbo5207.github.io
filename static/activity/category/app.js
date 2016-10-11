requirejs.config({
   baseUrl: '/static/scripts',
   paths: {
       jquery          : 'libs/jquery-2.2.3',
       JS2CSSKeyframes : 'libs/j2ckf',
       CSSKeyframes    : 'libs/css3-animation',    
       LazyLoad        : 'libs/lazyload'
   } 
});

define(function(require) {
    var $ = require('jquery'),
        js2css = require('JS2CSSKeyframes'),
        ckframes = require('CSSKeyframes'),
        LazyLoad = require('LazyLoad'),
        header = require('components/header');
   
    LazyLoad($('.item'), function() {
        var aninodes = $(this).addClass('animated').find('[data-animation]');
        aninodes.each(function() {
            $(this).addClass($(this).attr('data-animation'));
        });
    });
});

// 判断是否在Android版微信内
function isAndroidWinxin() {
    return /android[\S\s]*micromessenger/gi.test(navigator.userAgent.toLowerCase());
}

