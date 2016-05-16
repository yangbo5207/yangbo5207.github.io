requirejs.config({
   baseUrl: '/static/scripts',
   paths: {
       jquery          : 'libs/jquery-2.2.3'
   }
});

define(function(require) {
    var $ = require('jquery'),
        header = require('components/header');
});
