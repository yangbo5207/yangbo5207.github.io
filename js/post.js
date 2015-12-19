$(function() {

	var delay = 0,
		win = $(window),
		pWrap = $('#position-wrap'),
		pCon = $('.post-content'),
		header = $('header'),
		timer = null;

	win.on('scroll resize', function() {
		navFixed();
	});

	console.log($('.post-side').offset().top);

	function navFixed() {
		var navTop = $('.post-side').offset().top,
			winScrollTop = win.scrollTop(),
			header_h = header.height(),
			pWrap_h = pWrap.height(),
			pCon_h = pCon.height();

		if (navTop - header.height() > winScrollTop) {
			pWrap.css({
				position: 'absolute',
				top: 0
			})
		}
		else if (winScrollTop - header_h + pWrap_h > pCon_h ) {
			pWrap.css({
				position: 'absolute',
				top: pCon_h - 20 - pWrap_h
			});
		}
		else {
			pWrap.css({
				position: 'fixed',
				top: header_h
			})
		}
	}
});