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
        header = require('components/header')
});
