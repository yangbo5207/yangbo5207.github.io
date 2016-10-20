---
layout: post
title: "Javascript: 时间戳格式化方法以及常用的时间相关方法总结"
date: 2016-03-08 15:51:00
tags: javascript js
image: /static/images/post/essay-20.jpg
desc: Javascript中的`Date()`是一个强大的时间处理对象。通过使用该对象的相应方法，我们能够很轻松的对时间进行处理。Date类型保存的日期能够精确到1970年1月1日之前或者之后的285616年
---

Javascript中的`Date()`是一个强大的时间处理对象。通过使用该对象的相应方法，我们能够很轻松的对时间进行处理。Date类型保存的日期能够精确到1970年1月1日之前或者之后的285616年。

要创建一个日期对象，使用new操作符和Date构造函数即可  

```js
var now = new Date();
```

> 在调用构造函数但是不传参数的情况下，新创建的对象自动获取到当前的日期和时间，也可以传入特定时间的时间戳(不仅仅限于时间戳)，那么新创建的对象就是该特定时间。  
> ```var  Specific = new Date(1457427490405)```


下面介绍一些常用的方法。  

1. 创建时间对象  

```js
var time = new Date();
```

2. 返回/设置表示日期的毫秒数，即时间戳，与`valueOf()`返回的值相同  

```js
time.getTime()   //1457428499805
time.setTime(1457428499805) 
```

3. 取得/设置4位数的年份  

```js
time.getFullYear()  // 2016
time.setFullYear(2015)
```

4. 返回/设置日期中的月份，其中0表示1月，11表示12月，因此在计算当前月份时要记得+1

```js
time.getMonth()  //2
time.setMonth(5)
```

5. 返回/设置日期中的天数  

```js
time.getDate() // 8
time.setDate(7)
```


6. 返回/设置日期中的星期数，其中0表示星期日，6表示星期六

```js
time.getDay()   // 2
time.setDay(3)
```

7. 返回/设置日期中的小时数 0 - 23  

```js
time.getHours()  // 17
time.setHours(23)
```

8. 返回/设置日期中的分钟数 0 - 59  

```js
time.getMinutes() // 14
time.setMinutes(44)
```

9. 返回/设置日期中的秒数 0 - 59  

```js
time.getSeconds()  //59
time.setSeconds(58)
```


10. 返回/设置日期中的毫秒数 

```js
time.getMilliseconds() // 805
time.setMilliseconds(805)
```


常用方法之补0，如果日期数不够2位数，前面补0  

```js

function fixZero(number) {
    if(typeof number != 'number') return;
    return number < 10 ? '0' + number : number;
}

```

常用方法之格式化时间，按照你想要的时间格式返回

```js
function formatTimestamp(timestamp) {
    var time = new Date(timestamp),
        year = time.getFullYear(),
        month = fixZero(time.getMonth()+1),
        date = fixZero(time.getDate()),
        hour = fixZero(time.getHours()),
        minute = fixZero(time.getMinutes()),
        second = fixZero(time.getSeconds());

    return year + '-'+ month +'-'+ date +' '+ hour +':'+ minute +':' + second;
}
```





