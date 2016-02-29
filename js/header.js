(function($, undefined) {
    var tips = $('#tips'),
        nav = $('#nav-in-mobile'),
        tTap = 0;

    tips.click(function() {
        if (tTap == 0) {
            $(this).addClass('active');
            tTap = 1;
            nav.removeClass().addClass('active');
        } else {
            $(this).removeClass('active');
            tTap = 0;
            nav.addClass('active2');
        }
    })

})(jQuery);
