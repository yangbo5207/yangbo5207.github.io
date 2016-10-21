define( require => {
	let [ utils, template, dom ] = [
		require('libs/utils'),
		require('libs/template'),
		require('../modules/category/dom')
	];
	
	let curURL = window.location.href;
	let category = utils.getParam(curURL, 'category');

	if (!category) {
		window.location = '/';
	}

	let curData = data[category];

	$.each(curData, function(i, val) {
		val.categories = val.categories.replace(/\s/g, '').toUpperCase().split('|');
	})

	let html = template.compile(dom.essay)({ list: curData });
	$(html).appendTo($('.content'));
});