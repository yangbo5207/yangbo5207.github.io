// 修改参数的传递方式，全部改为传入对象

var calendar2 = {

	/**
	 * [通过年月计算当月有多少天]
	 * @param  date    { year: 2016, month: 1 }
	 * @return number  31 
	 */
	getMonthDayCount: function(date) {
		var monthDayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (date.year%4 === 0 && date.year%100 !== 0 || date.year%400 === 0) {
			monthDayCount[1] = 29;
		};

		return monthDayCount[date.month - 1];
	},

	/**
	 * 通过天信息获取该天的星期数
	 * @param  {object} [date] [某一天的信息] { year: 2016, month: 1, date: 9 }
	 * @return {number} [星期数]
	 */
	getWeekDay: function(date) {
		var nowdate = new Date();
		nowdate.setFullYear(date.year, date.month-1, date.date);
		return nowdate.getDay(); 
	},

	/**
	 * 通过月份获取上一月的年月
	 * @param  {object} [date] [某一天的信息] { year: 2016, month: 1 }
	 * @result {object} { year: 2015, month: 12 }
	 */
	getPreMonth: function(date) {
		var preMonth = date.month - 1,
			preMonthYear = date.year;

		if (preMonth === 0) {
			preMonth = 12;
			preMonthYear = date.year - 1;
		};

		return {
			month: preMonth,
			year: preMonthYear
		};
	},

	/**
	 * 通过月份获取下一月的年月
	 * @param  {object} [date] { year: 2016, month: 1 }
	 * @result {object} { year: 2016, month: 2 }
	 */
	getNextMonth: function(date) {
		var nextMonth = date.month + 1,
			nextMonthYear = date.year;

		if (nextMonth == 13) {
			nextMonth = 1;
			nextMonthYear = date.year + 1;
		}

		return {
			month: nextMonth,
			year: nextMonthYear
		}
	},

	/**
	 * 获取某个月的日历信息
	 * @param  {object} [date] { year: 2016, month: 1 }
	 * @result {object} { year: 2016, month: 2 }
	 */
	getCalendarMonthInfo: function(date) {
		var monthDayCount = this.getMonthDayCount(date),
			preMonth = this.getPreMonth(date),
			nextMonth = this.getNextMonth(date),

			preMonthDayCount = this.getMonthDayCount(preMonth),
			firstDate = {
				year: date.year,
				month: date.month,
				date: 1
			},
			firstWeekNumber = this.getWeekDay(firstDate),
			info = [],
			index = 0;

		for(var i = firstWeekNumber===0?6:(firstWeekNumber-1); i>=0; i--) {
			info[index] = {
				date: preMonthDayCount - i,
				isPreMonth: true,
				month: preMonth.month,
				year: preMonth.year
			};

			index ++;
		}

		for(var i=0; i<monthDayCount; i++) {
			info[index] = {
				date: i+1,
				month: date.month,
				year: date.year
			};

			index ++;
		}

		for(var i=1; index<42; index++) {
			info[index] = {
				date: i,
				isNextMonth: true,
				month: nextMonth.month,
				year: nextMonth.year
			};

			i++;
		}

		return info;

	},
	
	/**
	 * 获取天信息
	 * @param  {object} [date] { year: 2016, month: 1, date: 13 }
	 * @param  {boolean} [tag] [undefined:当天 false: previous day  true: next day]
	 * @result {object} { year: 2016, month:1 date: 14  }
	 */
	getDayInfo: function(date, tag) {
		if (typeof tag === 'undefined') {
			return date;
		};

		var tempDate = new Date(date.year, date.month-1, tag?date.date+1 : date.date-1);

		return {
			year: tempDate.getFullYear(),
			month: tempDate.getMonth() + 1,
			date: tempDate.getDate()
		}
	},

	/**
	 * 获取周信息
	 * @param  {object} [date] { year: 2016, month: 1, date: 13 }
	 * @param  {boolean} [tag] [undefined:当前周 false: previous week  true: next week]
	 * @result {object} [object, object, ..., object]
	 */
	getWeekInfo: function(date, tag) {
		var count = 0;

		if (typeof tag !== 'undefined') {
			count = !!tag ? 7 : -7;
		};

		var newDate = new Date(date.year, date.month-1, date.date-this.getWeekDay(date) + count),
			year = newDate.getFullYear(),
			month = newDate.getMonth() + 1,
			day = newDate.getDate(),
			monthInfo = {
				year: year,
				month: month
			},
			dayCount = this.getMonthDayCount(monthInfo),
			result = [],
			nextMonth;

		for(var i=0; i<7; i++) {
			if (day <= dayCount) {
				result.push({
					year: year,
					month: month,
					date: day
				});
			};

			day += 1;
		}

		day -= 1;

		if (day > dayCount) {
			nextMonth = this.getNextMonth(monthInfo);
			for(var i=0; i<day-dayCount; i++) {
				result.push({
					year: nextMonth.year,
					month: nextMonth.month,
					date: i+1
				})
			}
		};

		return result;
	},

	// 获取 7天后true | 7天前false 的日期
	getCurDate: function(date, tag) {
		var count = 0;

		if (typeof tag !== 'undefined') {
			count = tag ? 7 : -7;
		}

		var newDate = new Date(date.year, date.month-1, date.date+count);
		return {
			year: newDate.getFullYear(),
			month: newDate.getMonth() + 1,
			date: newDate.getDate()
		}
	},

	// 获取月信息
	getMonthInfo: function(date, tag) {
		var 
			monthInfo,
			tempDate,
			result = [];

		if (typeof tag !== 'undefined') {
			monthInfo = !tag ? this.getPreMonth(date) : this.getNextMonth(date);
			date = {
				year: monthInfo.year,
				month: monthInfo.month
			}
		};

		tempDate = this.getCalendarMonthInfo(date);

		$.each(tempDate, function(i, item) {
			if (!item.isPreMonth && !item.isNextMonth) {
				result.push(item);
			};
		})

		return result;
	},

	// 1 --> 01
	prefixZero: function(number) {
		return number<10 ? '0' + number : number;
	}
}