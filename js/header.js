(function($, undefined) {
    var tips = $('#tips'),
        nav = $('#nav-in-mobile');

    tap('#tips', triggerTips);

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

})(jQuery);

// 兼容 mobile 与 pc 点击事件
function tap(ele, callback) {
    var tag = 0;
    if (isMobile()) {
        $(ele).on('tuochstart', function(event) {
            event.preventDefault();
            tag = 0;
        }).on('touchmove', function() {
            tag = 1;
        }).on('touchend', function(event) {
            if (tag == 0) {
                callback(event);
            }
        })
    } else {
        $(ele).on('click', function(event) {
            callback(event);
        })
    }
}

// 判断浏览器是否在移动端
function isMobile() {
    return navigator.userAgent.match(/(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i);
}
