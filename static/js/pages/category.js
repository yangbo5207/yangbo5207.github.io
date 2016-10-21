'use strict';

define(function (require) {
	var _ref = [require('libs/utils'), require('libs/template'), require('../modules/category/dom')];
	var utils = _ref[0];
	var template = _ref[1];
	var dom = _ref[2];


	var curURL = window.location.href;
	var category = utils.getParam(curURL, 'category');

	if (!category) {
		window.location = '/';
	}

	var curData = data[category];

	$.each(curData, function (i, val) {
		val.categories = val.categories.replace(/\s/g, '').toUpperCase().split('|');
	});

	var html = template.compile(dom.essay)({ list: curData });
	$(html).appendTo($('.content'));
});