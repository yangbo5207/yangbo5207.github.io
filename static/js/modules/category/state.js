define(function(require) {
	/*
	用于存放绑定的事件，样式大概如下
	{
	    'changeWidth': [fn1, fn2],
	    'changeHeight': [fn1, fn2]
	}

	其中 changeWidth changeHeight 为事件的key值，类似click
	*/
	var events = {};

	// 用来存储所有状态值的对象
	var state = {};

	// 返回store对象
	return {

		// 返回当前的state对象
		getState: function() {
			return state;
		},

		// 存储回调函数到events中，key为事件类型，callback一般为状态改变时view的改变处理函数, 回调函数中接收dispatch中的value作为参数
		subscribe: function(key, callback) {
			if(!events[key]) {
				events[key] = [];
			}
			events[key].push(callback);
		},

		// 根据传入的key-value值，执行events中的回调函数
		dispatch: function(key, value) {
			if(!events[key]) {
				return false;
			}
			events[key].map(function(fn, i) {
				value && fn(value);
			});
		},

		unsubscribe: function(key) {
			if(!events[key]) {
				return false;
			}
			events[key].length = 0;
		},

		one: function(key, callback) {
			this.unsubscribe(key);
			this.subscribe(key, callback);
		}
	}
});

















