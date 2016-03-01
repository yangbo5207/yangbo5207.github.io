(function($, undefined) {

    LazyLoad($('.item'), function() {
        var aninodes = $(this).addClass('animated').find('[data-animation]');
        aninodes.each(function() {
            $(this).addClass($(this).attr('data-animation'));
        });
    });

})(jQuery);
