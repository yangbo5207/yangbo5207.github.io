define(function(require) {
   var $ = require('jquery'),
       tips = $('#tips'),
       nav = $('#nav-in-mobile');
   
   require('libs/jquery.tap');
   
   tips.tap(triggerTips);
   
   function triggerTips() {
        var tag = parseInt(tips.attr('data-tag'));
        if (tag == 0) {
            tips.attr('data-tag', 1);
            $('#tips div').eq(0).removeClass().addClass('line1');
            $('#tips div').eq(1).removeClass().addClass('line2');
            $('#tips div').eq(2).removeClass().addClass('line3');

            nav.removeClass().addClass('active');
        } else if (tag == 1) {
            tips.attr('data-tag', 0);
            $('#tips div').eq(0).addClass('d-line1');
            $('#tips div').eq(1).addClass('d-line2');
            $('#tips div').eq(2).addClass('d-line3');
            nav.addClass('active2');
        }
    }
});
