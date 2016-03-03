(function($, undefined) {

    LazyLoad($('.item'), function() {
        var aninodes = $(this).addClass('animated').find('[data-animation]');
        aninodes.each(function() {
            $(this).addClass($(this).attr('data-animation'));
        });
    });

})(jQuery);


// 判断是否在Android版微信内
function isAndroidWinxin() {
    return /android[\S\s]*micromessenger/gi.test(navigator.userAgent.toLowerCase());
}
