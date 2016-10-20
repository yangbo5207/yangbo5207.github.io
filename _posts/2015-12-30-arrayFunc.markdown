---
layout: post
title:  "回归基础系列之数组"
date:   2015-12-30
categories: javascript array
tags: javascript
image: /static/images/post/essay-21.jpg
desc: 本文主要是针对自己复习的时候浏览使用，如果要查看详细说明，请阅读`javascript高级编程`
---

#### 原生javascript方法
#####创建数组
> 本文主要是针对自己复习的时候浏览使用，如果要查看详细说明，请阅读`javascript高级编程`
>

``` javascript
var colors = [];
var colors = ['red', 'blue'];
```

##### 检测数组


```javascript
if(arr instanceof Array) {}
```
如果网页中包含多个框架，则需要使用下面的方式检测数组


```javascript
if(Array.isArray(arr)) {}
```

##### `arr.valueOf()`

```javascript
var colors = ['red', 'yellow'];
colors.valueOf();
// > ['red', 'yellow']
```

##### `arr.toString()`


```javascript
var colors = ['red', 'yellow'];
colors.toString();
// > "red,yellow"
```

##### `arr.push(item)`
从数组末尾添加元素，并返回新数组的长度


```javascript
var colors = ['red', 'yellow'];
colors.push('pink');
// > 3
```

##### `arr.pop()`
从数组末尾删除元素，并返回被删除的元素


```javascript
var colors = ['red', 'yellow'];
colors.pop();
// > 'yellow'
```

##### `arr.unshift(item)`
从数组头部添加元素，并返回新数组的长度


```javascript
var colors = ['green', 'pink'];
colors.unshift('pink');
// > 3
```

##### `arr.shift()`
从数组头部删除元素，并返回被删除的元素


```javascript
var colors = ['yellow', 'orange'];
colors.shift();
// > 'yellow'
```

##### `arr.reverse()`
反转数组的顺序，并返回重新排序之后的数组， 原数组会被改变


```javascript
[1, 2, 3, 'reer', 'game', 2, 5].reverse();
// > [5, 2, "game", "reer", 3, 2, 1]
```

##### `arr.sort(fn)`
如果不传参数，默认情况下数组内的元素会被转换为字符串进行比较，因此一般不推荐直接使用默认的`arr.sort()`进行排序。
返回值为排序后的新数组。原数组会被改变

- 将数组内数值元素从小到大排序。

```javascript
var demo = [1, 4, 2, 'reee', 'name', '9', 'doc'];
demo.sort(function(a, b)) {
    return a - b;
}
// > [1, 2, 4, "reee", "name", "9", "doc"]
```
- 将数组内数值元素从大到小排序


```javascript
var demo = [1, 4, 2, 'reee', 'name', '9', 'doc'];
demo.sort(function(a, b) {
    return b - a;
})
// > [4, 2, 1, "reee", "name", "9", "doc"]
```

##### `arr.concat(otherArr)`
参数中传入元素或者数组， 会将该参数合并到arr中，返回合并后新的数组，原数组不会改变


```js
var arr = [1, 3, 'jake'];
arr.concat('rose', [2, 'fi']);
// > [1, 3, 'jake', 'rose', 2, 'fi']
```

##### `arr.slice()`
剪切数组，返回剪切之后的数组，元素不会改变
- 传入一个参数，表示起始位置，结束位置为最末尾

```javascript
var arr = [4, 2, 1, "reee", "name", "9", "doc"];
arr.slice(2);
// > [1, "reee", "name", "9", "doc"]
```
- 传入2个参数，表示起始位置与结束位置，但不包括结束位置所在的元素

```javascript
var arr = [4, 2, 1, "reee", "name", "9", "doc"];
arr.slice(2, 4);
// > [1, "reee"]
```

##### `arr.splice()`
根据参数的不同，可以分别实现删除，插入，替换元素的作用，会改变原始数组
- **删除**
传入2个参数， 分别表示起始位置与要删除元素的个数，返回被删除掉的元素组成的数组


```javascript
var arr = [4, 2, 1, "reee", "name", "9", "doc"];
arr.splice(2, 3);
// > [1, "reee", "name"]
// arr: [4, 2, 1, "9", "doc"]
```
- **插入**  
传入3个参数， [起始位置 | 要删除的项数 为0 | 要插入的元素]， 最终返回删除掉的元素组成的数组，因为这里删除项数为0，因此会返回空数组


```javascript
var arr = [2, 4, 6];
arr.splice(2, 0, 'red', 'green');
// > []
// arr: [2, 4, "red", "green", 6]
```

- **替换**  
传入三个参数， [ 起始位置 | 要删除的项数 为1 | 要插入的元素 ]，最终返回被删除掉的元素组成的数组


```javascript
var arr = [2, 4, 9];
arr.splice(1, 1, ['tim', 'tom']);
// > [4]
// arr: [2, ['tim', 'tom'], 9]
```
- 总结 因此，这个方法会因为参数的不同而实现不同的功能，所有的参数从头到尾依次为   
__[ 起始位置 | 要删除元素的个数 | 要插入元素的值，可以写入多个值 ]__

##### `arr.indexOf(item)`
验证数组中是否含有某个元素，返回第一个匹配到的元素在数组中所在的位置，如果没有，则返回 -1


```javascript
var arr = [2, 'tim', 4, 5, 2];
arr.indexOf('tim');
// > 1
arr.indexOf('jake');
// > -1
```

##### `arr.lastIndexOf(item)`
验证数组中是否含有某个元素，不过是从数组尾部开始查找，返回第一个匹配到的元素所在的位置，如果没有，则返回-1


```javascript
var arr = [2, 'tim', 4, 5, 2];
arr.lastIndexOf('tim');
// > 1
arr.indexOf('jake');
// > -1
```
> IE6, 7, 8 不支持indexOf与lastIndexOf方法

##### `arr.every()`
对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true。会有一个函数作为every的参数，该函数也有3个参数，分别为  
__[ 调用every的数组的每一项元素 | 对应元素所在的位置 | 表示该数组 ]__


```javascript
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var everyRes = numbers.every(function(item, index, array) {
    return item > 2;
})
// > false
```

##### `arr.some()`
对数组中的每一项运行给定函数，如果该函数对其中一项返回true，则返回true。会有一个函数作为every的参数，该函数也有3个参数，分别为  
__[ 调用every的数组的每一项元素 | 对应元素所在的位置 | 表示该数组 ]__


```javascript
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var everyRes = numbers.some(function(item, index, array) {
    return item > 2;
})
// > true
```

##### `arr.filter(fn)`
过滤方法。返回满足条件的元素组成的数组。fn的参数为  
__[ 调用every的数组的每一项元素 | 对应元素所在的位置 | 表示该数组 ]__


```javascript
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var everyRes = numbers.filter(function(item, index, array) {
    return item > 2;
})
// > [ 3, 4, 5, 4, 3 ]
```
##### `arr.map(fn)`
对数组的每一项进行计算等处理，返回处理结果组成的数组，fn的参数为  
__[ 调用every的数组的每一项元素 | 对应元素所在的位置 | 表示该数组 ]__


```javascript
var numbers = [1, 2, 3, 3, 2, 1];
var everyRes = numbers.map(function(item, index, array) {
    return item > 2;
})
// >[false, false, true, true, false, false]
```

##### `arr.forEach(fn)`
遍历数组，没有返回值，fn的参数为  
__[ 调用every的数组的每一项元素 | 对应元素所在的位置 | 表示该数组 ]__


```javascript
numbers.forEach(function(item, index) {
    // do something
})
```

##### `arr.reduce(fn)`
缩减方法。fn的参数为  
__[ 前一个元素 | 当前元素，从1开始 | 后一个元素的序列，从1开始计数 | 表示该数组 ]__


```javascript
var values = [1, 2, 3, 4, 5];
var sum = values.reduce(function(prev, cur, index, array) {
    return prev + cur;
})
// > 15
//每一次迭代之后的结果分别为
// [3, 3, 4, 5]
// [6, 4, 5]
// [10, 5]
// 15
```

##### `arr.reduceRight(fn)`
与reduce一模一样，只是方向相反。

#### jQuery相关方法
##### `$.each(arr, fn)`
遍历数组或者对象，fn有2个参数，分别为， 比原生的for in 更加健壮  
__[ 数组的索引或者对象的key值 | 索引或者key值对应的value值 ]__


```javascript
var arr = [1, 2, 3];
$.each(arr, function(key, value) {
    // do something
});
```
- 跳过一次循环 `return | return true`
- 终止循环 `return false`

##### `$.grep(arr, fn)`
过滤方法，功能类同原生中的`arr.filter(fn)`。此处fn的参数如下  
__[ value: 对象/数组的值 | key值或者序列 ]__


```javascript
var arr = [ 1, 3, 6, 4 ];
$.grep(arr, function(val, key) {
    return val >= 3;
});
// > [3, 6, 4]
// arr : [ 1, 3, 6, 4 ] 不会改变

```
##### `$.map(arr, fn)`
对每项进行处理，返回处理结果组成的数组，此处fn的参数如下  
__[ value: 对象/数组的值 | key值或者序列 ]__


```javascript
var arr = [1, 2, 5, 3];
$.map(arr, function(val, key) {
    return val * 10;
})
// > [10, 30, 30, 20, 10]
// 原数组不受影响
```

##### `$.inArray(item, array)`
检测某一个元素item是否存在与数组之中，返回其所在的位置，如果不在，则返回-1


```javascript
$.inArray(3, [1, 2, 3]);
// > 2
```

##### `$.merge(arr1, arr2)`
合并数组，会改变第一个参数的数组为合并之后的数组，返回合并之后的数组


```javascript
var arr = [1, 3, 4];
var arr2 = [4, 3, 1];
$.merge(arr, arr2);
// > [1, 3, 4, 4, 3, 1]
// 为了防止第一个数组被改变，可以使用下面的方式来写
$.merge($.merge([], arr), arr2);
```

##### `$.unique(arr)`
过滤DOM数组中重复的元素
##### `$.makeArray(obj)`
将类数组对象转换为数组
##### `$(elem).toArray()`
将jQuery对象集合恢复成DOM数组
