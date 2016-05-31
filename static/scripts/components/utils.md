##### `Utils.camelCase`
字符串转换。将带有横杠的字符串转换为驼峰

```js
Utils.camelCase('-webkit-transform') //  WebkitTransform

-webkit-transform --> WebkitTransform
ms-transform      --> msTransform
stock-game        --> stockGame
-stock-game       --> StockGame
```

##### `Utils.uncamelCase`
字符串转换。将驼峰格式的字符串转换为由横杠分开的字符串

```js
Utils.uncamelCase('WebkitTransform') // -webkit-transform
WebkitTransform --> -webkit-transform
msTransform     --> ms-transform
stockGame       --> stock-game
StockGame       --> -stock-game
```

##### `Utils.cssVender`
获取浏览器支持的css3前缀。可能值分别有 `-webkit-` `-moz-` `-ms-` `-o-` 以及空字符串

##### `Utils.type`
精确判断元素的类型

```js
    Utils.type(2)              // number
    Utils.type('javascript')   // string
    Utils.type([1, 2])         // array
    Utils.type({a: 2})         // object
    Utils.type(null)           // null
    var ins;
    Utils.type(ins)            // undefined
    Utils.type(Object)         // function
    Utils.type(Array)          // function
    Utils.type(function(){})   // function
    Utils.type(window)         // window
    Utils.type(document)       // htmldocument
    Utils.type(document.body)  // htmlbodyelement
    Utils.type(document.getElementById('box')); //htmldivelement
```

##### `Utils.isArrayLike`
传入一个对象，判断该对象是否是类数组对象

```js
Utils.isArrayLike([1, 2, 3])  // true
Utils.isArrayLike(document.getElementsByClassName('box')); //true

+function aa() {
    Utils.isArrayLike(arguments);   //true
}
```

##### `Utils.each`
遍历数组或者对象。该方法有两个参数，第一个参数为需要被遍历的数组或者对象
第二个参数是一个回调函数。
其中回调函数中有三个参数，  
第一个参数：当前值，  
第二个参数：当前key    
第三个参数：数组或者对象本身

##### `Utils.fixCSS`
返回浏览器支持的css属性值，如在仅仅支持`-moz-`前缀的浏览器中，

```js
// 传入正常的css属性，返回浏览器支持的前缀属性
Utils.fixCSS('transition');   // -moz-transition
```

##### `Utils.isCSS`
返回浏览器支持css属性的js特性值，如在仅仅支持-moz-前缀的浏览器中

```js
Utils.isCSS('transition');    // MozTransition
```

##### `Utils.css`
该方法有两个参数，第一个参数：通过原生方法获取到的元素对象，如`document.getElementById('box')`

当第二个参数是一个字符串时，表示获取该元素的对应属性值
当第二个参数是一个json对象时，表示设置对应的属性，可以设置多个属性

#####  `Utils.getParam`

从url格式的地址中获取字符串对应的值

第一个参数：url地址
第二个参数：需要获取值的key

##### Utils.removeClass
传入id与类名，删除该类名










