// $(function() {

// 	var delay = 0,
// 		win = $(window),
// 		pWrap = $('#position-wrap'),
// 		pCon = $('.post-content'),
// 		header = $('header'),
// 		timer = null;

// 	win.on('scroll resize', function() {
// 		navFixed();
// 	});

// 	console.log($('.post-side').offset().top);

// 	function navFixed() {
// 		var navTop = $('.post-side').offset().top,
// 			winScrollTop = win.scrollTop(),
// 			header_h = header.height(),
// 			pWrap_h = pWrap.height(),
// 			pCon_h = pCon.height();

// 		if (navTop - header.height() > winScrollTop) {
// 			pWrap.css({
// 				position: 'absolute',
// 				top: 0
// 			})
// 		}
// 		else if (winScrollTop - header_h + pWrap_h > pCon_h ) {
// 			pWrap.css({
// 				position: 'absolute',
// 				top: pCon_h - 20 - pWrap_h
// 			});
// 		}
// 		else {
// 			pWrap.css({
// 				position: 'fixed',
// 				top: header_h
// 			})
// 		}
// 	}
// });
// 

$(function() {
	var treeArray = [];
	var taget = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
	var child = $('.post-content').children();
	$.each(child, function(i, val) {
		if (taget.indexOf(val.tagName) > -1) {
			treeArray.push(val.tagName);
		};
	})

	// console.log($('.post-content').find('h1, h2, h3, h4, h5, h6'));
	console.log(treeArray);

	// 获取标题数组中标题级别最高的等级
	function getTopLevelHeader(treeArray) {
		var topLevelIndex = 0,
			topLevelNumber = parseInt(getLevelNumber(treeArray[0]));

		if (topLevelNumber === 1) {
			return treeArray[0];
		}

		$.each(treeArray, function(i, val) {
			if (getLevelNumber(val) < topLevelNumber) {
				topLevelNumber = parseInt(getLevelNumber(item));
				topLevelIndex = i; 
			};
		});

		return treeArray[topLevelIndex];
	}

	// 获取标题数组元素的标题数
	function getLevelNumber(arrayItem) {
		return parseInt(arrayItem.charAt(1));
	}

	// 
	function repeat(repeatString, times) {
		var tempArray = [],
			i = 0;
		repeatString = repeatString || '-';

		for(; i < times; i++) {
			tempArray.push(repeatString);
		}

		return tempArray.join('');
	}

	function buildTree(treeArray, parent, flag) {
		var topLevelItem = getTopLevelHeader(treeArray),
			subArray,
			startIndex = 0,
			endIndex = treeArray.indexOf(topLevelItem, startIndex),
			obj;

		while(endIndex <= treeArray.length) {
			subArray = treeArray.slice(startIndex, endIndex);
			obj = {
				p: parent.n,
				n: topLevelItem,
				l: parent.l + 1,
				s: []
			};

			if (subArray.length == 0) {
				if (startIndex != 0) {
					flag && console.log(repeat('-', obj.l) + obj.n);
					parent.s.push(obj);
				};
			} else {
				flag && console.log(repeat('-', obj.l) + obj.n);
				parent.s.push(obj);
				buildTree(subArray, obj, flag);
			}

			startIndex = endIndex + 1;
			endIndex = treeArray.indexOf(topLevelItem, startIndex);
			if (endIndex == -1) {
				endIndex = treeArray.length;
			}

			if (startIndex > endIndex) {
				var tp = startIndex;
				startIndex = endIndex;
				endIndex = tp;
			};
		}
	}

	var result = {
		p: '',
		n: 'root',
		l: 1,
		s: []
	}

	buildTree(treeArray, result, true);
	console.log(result);
});




