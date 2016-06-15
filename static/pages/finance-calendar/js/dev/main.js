(function() {

var cur_date = null,
	cur_month = null,
	select_date = null,
	device_width = document.querySelector('.wrap').offsetWidth,
	date = new Date(),
	init_date = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		date: date.getDate()
	},
	cur_month = {
		year: date.getFullYear(),
		month: date.getMonth() + 1
	};

FastClick.attach(document.body);

+function init() {
	cur_date = select_date = init_date;
	Share.init(true).update({
	 	url: location.href,
		title: "财经日历--老虎证券",
		desc: "汇集沪深和美股的财报数据、经济事件、新股申购等最新资讯",
		img: document.getElementById('shareImg').src,
		success: function() {
			ga('send', 'event', 'finance-calendar', 'share', 'weixinShare', 1);
		}
	});
	$(window).on('resize', function() {
		device_width = $('.wrap').width();
		$('.weekdate-item').width(device_width);
		$('.monthdate-item').width(device_width);
		Utils.css(document.querySelector('#weekdate'), { translateX: -device_width });
		Utils.css(document.querySelector('#monthdate'), { translateX: -device_width })
	})
}()

var Caption = (function() {
	var $area = $('.part-1').find('.mmmth');
	var $weekbtn = $('#weekbtn');
	var $monthbtn= $('#monthbtn');
	var instance;
	function struct() {
		return new struct.fn.init();
	}
	struct.prototype = struct.fn = {
		constructor: struct,
		init: function() {
			var self = this;
			self.setYMonth(cur_date);
			$weekbtn.click(function() {
				self.switchToWeek();
			});
			$monthbtn.click(function() {
				self.switchToMonth();
			})

		},
		setYMonth: function(cur_date) {
			if (cur_date) {
				$area.find('.YMonth').html(cur_date.year + '年' + cur_date.month + '月');
			}
		},
		switchToWeek: function() {
			$monthbtn.removeClass('active');
			$weekbtn.removeClass('active').addClass('active');
			WeekCalendar.show();
			MonthCalendar.hide();
			cur_date = select_date;
			WeekCalendar.setWeekCalendar(cur_date);
			WeekCalendar.setWeekFocus(select_date);
			this.setYMonth(select_date);
		},
		switchToMonth: function() {
			$weekbtn.removeClass('active');
			$monthbtn.removeClass('active').addClass('active');
			WeekCalendar.hide();
			MonthCalendar.show();
			Utils.css(document.querySelector('#monthdate'), { translateX: -device_width });
			cur_month = {
				year: select_date.year,
				month: select_date.month
			}
			MonthCalendar.setMonthCalendar(cur_month);
			MonthCalendar.setMonthFocus(select_date);
			this.setYMonth(select_date);
		}
	}
	struct.fn.init.prototype = struct.fn;
	return ins(struct, instance);
})();

var WeekCalendar = (function() {
	var $area = $('#weekdate');
	var area = $area[0];
	var instance;
	function struct() {
		return new struct.fn.init();
	}
	struct.prototype = struct.fn = {
		constructor: struct,
		init: function() {
			var self = this,
				// about drag varible
				iscroll = -device_width,
				istartX = 0,
				istart_pageX = 0;
			$area.find('.weekdate-item').width(device_width);
			Utils.css(area, { translateX: -device_width });
			self.setWeekCalendar(cur_date);
			self.setWeekFocus(select_date);
			$area.on('touchstart', touchstart).on('touchmove', touchmove).on('touchend', touchend);
			$area.on('click', '.weekdate-number', function(event) {
				var pre_selectstring = select_date.year + '-' + calendar2.prefixZero(select_date.month) + '-' + calendar2.prefixZero(select_date.date);
				var arr = $(this).attr('data-date').split('-');
				cur_date = select_date = {
					year: parseInt(arr[0]),
					month: parseInt(arr[1]),
					date: parseInt(arr[2])
				};
				Caption.setYMonth(cur_date);
				self.setWeekFocus(cur_date);
				var cur_selectstring = select_date.year + '-' + calendar2.prefixZero(select_date.month) + '-' + calendar2.prefixZero(select_date.date);
				if (pre_selectstring != cur_selectstring) {
					List.show(cur_date);
				};
			})
			function touchstart(event) {
				event.preventDefault();
				istartX = iscroll;
				istart_pageX = event.originalEvent.changedTouches[0].pageX;
			}
			function touchmove(event) {
				var distance = event.originalEvent.changedTouches[0].pageX - istart_pageX;
				iscroll = istartX + distance;
				Utils.css(area, { translateX: iscroll });
				console.log(distance);
			}
			function touchend(event) {
				$area.off('touchstart touchmove touchend');
				var distance = event.originalEvent.changedTouches[0].pageX - istart_pageX;
				var target = event.target;
				if (distance < -80) {
					ani(area).animate(400, 'easeout', {
						x: - device_width * 2
					}, function() {
						Utils.css(area, { translateX: -device_width });
						iscroll = -device_width;
						cur_date = calendar2.getCurDate(cur_date, true);
						self.setWeekCalendar(cur_date);
						self.setWeekFocus(select_date);
						Caption.setYMonth(cur_date);
						$area.on('touchstart', touchstart).on('touchmove', touchmove).on('touchend', touchend);
					})
				}
				else if (distance > 80) {
					ani(area).animate(400, 'easeout', {
						x: 0
					}, function() {
						Utils.css(area, { translateX: -device_width });
						iscroll = -device_width;
						cur_date = calendar2.getCurDate(cur_date, false);
						self.setWeekCalendar(cur_date);
						self.setWeekFocus(select_date);
						Caption.setYMonth(cur_date);
						$area.on('touchstart', touchstart).on('touchmove', touchmove).on('touchend', touchend);
					})
				}
				else {
					ani(area).animate(400, 'easeout', {
						x: -device_width
					}, function() {
						iscroll = -device_width;
						$area.on('touchstart', touchstart).on('touchmove', touchmove).on('touchend', touchend);
					})
				}
			}
		},
		setWeekCalendar: function(date) {
			var cur_weekinfo = calendar2.getWeekInfo(date),
				pre_weekinfo = calendar2.getWeekInfo(date, false),
				nex_weekinfo = calendar2.getWeekInfo(date, true),
				weekinfo = {
					cur: cur_weekinfo,
					pre: pre_weekinfo,
					nex: nex_weekinfo
				},
				$preweek = $area.find('.preWeek'),
				$curweek = $area.find('.curWeek'),
				$nexweek = $area.find('.nextWeek');
			$.each(weekinfo, function(i, val) {
				if (i == 'pre') {
					fill($preweek, val);
				}
				else if(i == 'cur') {
					fill($curweek, val);
				}
				else if(i == 'nex') {
					fill($nexweek, val);
				}
			})
			function fill(obj, date) {
				obj.children().remove();
				$.each(date, function(m, item) {
					var date_string = item.year + '-' + item.month + '-' + item.date,
						create_str =
						'<div class="weekdate-number" data-date="'+ date_string +'">' +
							'<span>'+ item.date +'</span>' +
							'<div class="dot">' +
								'<span class="red"></span>' +
								'<span class="yellow"></span>' +
								'<span class="gray"></span>' +
							'</div>' +
						'</div>';
					$(create_str).appendTo(obj);
				})
			}
		},
		setWeekFocus: function(date) {
			var select_string = date.year + '-' + date.month + '-' + date.date;
			$area.find('.weekdate-number').each(function(i, val) {
				$(val).children('span').removeClass('active');
				if ($(val).attr('data-date') == select_string) {
					$(val).children('span').addClass('active');
				}
			})
		},
		show: function() {
			$area.show();
		},
		hide: function() {
			$area.hide();
		}
	}
	struct.fn.init.prototype = struct.fn;
	return ins(struct, instance);
})();

var MonthCalendar = (function() {
	var $area = $('#monthdate');
	var area = $area[0];
	var instance;
	function struct() {
		return new struct.fn.init();
	}
	struct.prototype = struct.fn = {
		constructor: struct,
		init: function() {
			var self = this,
				iscroll = -device_width,
				istartX = 0,
				istart_pageX = 0;
			$area.find('.monthdate-item').width(device_width);
			Utils.css(area, { translateX: -device_width });
			self.setMonthCalendar(cur_month);
			self.setMonthFocus(select_date);
			$area.on('touchstart', touchstart).on('touchmove', touchmove).on('touchend', touchend);
			$area.on('click', '.monthdate-number', function() {
				var pre_selectstring = select_date.year + '-' + calendar2.prefixZero(select_date.month) +  '-' + calendar2.prefixZero(select_date.date);
				var arr = $(this).attr('data-date').split('-');
				cur_date = select_date = {
					year: parseInt(arr[0]),
					month: parseInt(arr[1]),
					date: parseInt(arr[2])
				}
				Caption.setYMonth(select_date);
				self.setMonthFocus(select_date);
				var cur_selectstring = select_date.year + '-' + calendar2.prefixZero(select_date.month) +  '-' + calendar2.prefixZero(select_date.date);
				if (pre_selectstring != cur_selectstring) {
					List.show(cur_date);
				}
			});
			function touchstart(event) {
				event.preventDefault();
				istartX = iscroll;
				istart_pageX = event.originalEvent.changedTouches[0].pageX;
			}
			function touchmove(event) {
				var distance = event.originalEvent.changedTouches[0].pageX - istart_pageX;
				iscroll = istartX + distance;
				Utils.css(area, { translateX: iscroll });
			}
			function touchend(event) {
				var target = event.target;
				var distance = event.originalEvent.changedTouches[0].pageX - istart_pageX;
				$area.off('touchstart touchmove touchend');
				if (distance < -80) {
					ani(area).animate(400, 'easeout', {
						x: -device_width * 2
					}, function() {
						Utils.css(area, { translateX: -device_width });
						iscroll = -device_width;
						cur_month = calendar2.getNextMonth(cur_month);
						self.setMonthCalendar(cur_month);
						Caption.setYMonth(cur_month);
						self.setMonthFocus(select_date);
						$area.on('touchstart', touchstart).on('touchmove', touchmove).on('touchend', touchend);
					})
				}
				else if (distance > 80) {
					ani(area).animate(400, 'easeout', { x: 0 }, function() {
						Utils.css(area, { translateX: -device_width });
						iscroll = -device_width;
						cur_month = calendar2.getPreMonth(cur_month);
						self.setMonthCalendar(cur_month);
						self.setMonthFocus(select_date);
						Caption.setYMonth(cur_month);
						$area.on('touchstart', touchstart).on('touchmove', touchmove).on('touchend', touchend);
					})
				}
				else {
					ani(area).animate(400, 'easeout', {
						x: -device_width
					}, function() {
						iscroll = -device_width;
						$area.on('touchstart', touchstart).on('touchmove', touchmove).on('touchend', touchend);
					})
				}

			}
		},
		setMonthCalendar: function(cur_month) {
			var pre_month = calendar2.getPreMonth(cur_month),
				nex_month = calendar2.getNextMonth(cur_month),
				pre_monthinfo = calendar2.getCalendarMonthInfo(pre_month),
				cur_monthinfo = calendar2.getCalendarMonthInfo(cur_month),
				nex_monthinfo = calendar2.getCalendarMonthInfo(nex_month),
				monthinfo = {
					pre: pre_monthinfo,
					cur: cur_monthinfo,
					nex: nex_monthinfo
				},
				$pre_month = $area.find('.preMonth'),
				$cur_month = $area.find('.curnMonth'),
				$nex_month = $area.find('.nextMonth');
			$.each(monthinfo, function(key, val) {
				var $parent;
				if (key == 'pre') {
					$parent = $pre_month;
				}
				else if (key == 'cur') {
					$parent = $cur_month;
				}
				else if (key = 'nex') {
					$parent = $nex_month;
				}
				$parent.children().remove();
				for(var i=0; i<6; i++) {
					var m = $('<div class="row clear"></div>');
					m.appendTo($parent);
					for(var k=0; k<7; k++) {
						var _date = val[i*7 + k];
						var _classname = _date.isPreMonth || _date.isNextMonth ? 'xxx' : '';
						var datestring = _date.year + '-' + _date.month + '-' + _date.date;
						var create_string =
							'<div class="monthdate-number" data-date="'+datestring+'">' +
								'<span class="'+_classname+'" data-year="'+_date.year+'" data-month="'+_date.month+'">'+ _date.date +'</span>' +
								'<div class="dot">' +
									'<span class="red"></span>' +
									'<span class="yellow"></span>' +
									'<span class="gray"></span>' +
								'</div>' +
							'</div>';
						$(create_string).appendTo(m);
					}
				}
			});
		},
		setMonthFocus: function() {
			var select_string = select_date.year + '-' + select_date.month + '-' + select_date.date;
			$area.find('.monthdate-number').each(function(i, val) {
				$(val).children('span').removeClass('active');
				if ($(val).attr('data-date') == select_string) {
					$(val).children('span').addClass('active');
				}
			});
		},
		show: function() {
			$area.show();
		},
		hide: function() {
			$area.hide();
		}
	}
	struct.fn.init.prototype = struct.fn;
	return ins(struct, instance);
})();

var List = (function() {
	var $area = $('.part-2');
	var $list_contain = $area.find('.list');
	var ajax_array = []; // cache all ajax request
	var cache = {};
	var host = 'https://hq.tigerbrokers.com';
	var datatype = 0;
	var new_date;
	var instance;
	function struct() {
		return new struct.fn.init();
	}
	struct.prototype = struct.fn = {
		constructor: struct,
		init: function() {
			var self = this;
			self.show(cur_date);
			$area.on('click', '.banner-item', function() {
				if ($(this).attr('data-type') != datatype) {
					$area.find('.banner-item').eq(datatype).removeClass('active');
					datatype = parseInt($(this).attr('data-type'));
					$(this).addClass('active');
					self.show(cur_date);
				}
			});
			$area.on('click', '.show-all', function() {
				var $parent = $(this).parent();
				$parent.html($parent.attr('data-content'));
			});
		},
		show: function(cur_date) {
			var self = this;
			var datestring = cur_date.year + '-' + calendar2.prefixZero(cur_date.month) + '-' + calendar2.prefixZero(cur_date.date);
			self.showLoading();
			$.when(self.getDate(datestring))
			.done(function() {
				self.setList();
			});
		},
		getDate: function(datestring) {
			var defer = $.Deferred();
			var self = this;
			stopAjax(ajax_array);
			if (cache[datestring]) {
				new_date = cache[datestring];
				defer.resolve();
			}
			else {
				var date_url = host + '/fundamental/finance_calendar/get_day/' + datestring;
				var item = $.ajax({
					type: 'GET',
					url: date_url,
					timeout: 3000
				})
				.done(function(res) {
					if (res.ret == 0) {
						new_date = res.items;
					} else {
						new_date = [];
					}
					cache[datestring] = new_date;
					defer.resolve();
				})
				.fail(function() {
					self.showError();
					defer.reject();
				})
				ajax_array.push(item);
			}
			return defer;
		},
		setList: function() {
			if (datatype == -1) {
				return;
			}
			var res = [];
			switch (datatype) {
				case 0:
					res = new_date;
					break;
				case 1:
					$.each(new_date, function(i, val) {
						if (val.market.toUpperCase() == 'US') {
							res.push(val);
						}
					})
					break;
				case 2:
					$.each(new_date, function(i, val) {
						if (val.market.toUpperCase() == 'SH') {
							res.push(val);
						}
					})
					break;
				case 3:
					$.each(new_date, function(i, val) {
						if (val.market.toUpperCase() == 'HK') {
							res.push(val);
						}
					})
					break;
			}
			res.sort(function(a, b) {
				return a.type - b.type;
			})
			this.clear();
			if (res.length == 0) {
				$('<div class="nodata">暂无相关数据</div>').appendTo($list_contain).show();
			}
			else {
				$.each(res, function(i, val) {
					// var content = val.content.replace(/&lt;br\/&gt;/g, '<br/>');
					var content = val.content;
					var color;
					var _content;
					if (parseInt(val.type == '1' && isTigerApp())) {
						content = content.replace(/\(([^()]+)\)/g, function(match, group0) {
							return '(<a href="https://laohu8.com/S/'+ group0 +'">'+ group0 +'</a>)';
						}) ;
					}
					if (val.type == '1') {
						color = 'red';
					} else if (val.type == '3') {
						color = 'yellow';
					} else {
						color = 'gray';
					}

					if (content.length > 100) {
						_content = content.replace(/(&lt;br\/&gt;|<br\/>)/gi, '').substring(0, 80);
						var insetstr =
							'<section class="item">' +
								'<div class="inner-section '+ color +'">' +
									'<div class="title">'+ val.title +'</div>' +
									'<div class="cItem cItem'+ i +'" data-content="'+ content +'">'+ _content +' ...<span class="show-all">查看全部</span></div>' +
									'' +
								'</div>' +
							'</section>';
					} else {
						_content = content.replace(/&lt;br\/&gt;/gi, '<br/>');
						var insetstr =
							'<section class="item">' +
								'<div class="inner-section '+ color +'">' +
									'<div class="title">'+ val.title +'</div>' +
									'<div class="cItem cItem'+ i +'">'+ _content +'</div>' +
									'' +
								'</div>' +
							'</section>';
					}
					// _content = _content.replace(/&lt;br\/&gt;/g, '<br/>');

					$(insetstr).appendTo($list_contain);
				})
			}
		},
		showError: function() {
			var self = this;
			this.clear();
			$('<div class="reload">加载失败，请稍后<span class="reloading">重试</span></div>').appendTo($list_contain);
			$area.find('.reloading').click(function() {
				self.clear();
				self.showLoading();
				self.show(cur_date);
			})
		},
		showLoading: function() {
			this.clear();
			$('<div class="loading"></div>').appendTo($list_contain);
		},
		clear: function() {
			$list_contain.children().remove();
		}
	}
	function stopAjax(arr) {
		$.each(arr, function(i, val) {
			val.abort();
			arr.splice(i, 1);
		})
	}
	struct.fn.init.prototype = struct.fn;
	return ins(struct, instance);
})();

function ins(struct, instance) {
	if (!instance) {
		instance = struct();
	}
	return instance;
}

// 判断浏览器是否在移动端
function isMobile() {
	return /(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i.test(navigator.userAgent);
}

function isTigerApp() {
	return /tigerbrokers/i.test(navigator.userAgent);
}
})();
