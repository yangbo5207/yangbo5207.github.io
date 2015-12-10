---
layout: post
title:  "获取元素的正确样式"
date:   2015-12-05
categories: jekyll update
tags: javascript css3 html5 jQuery
image: https://d13yacurqjgara.cloudfront.net/users/32512/screenshots/2397726/untitled-5.gif
---
I think i should write some english owrd to show what is proxima style.
在学习js初期，就一直有一个疑问，获取元素样式的值，不是直接使用
`obj.style.left`之类的就可以得到了吗？可是使用这样的方式，有的时候能够获取得到，有的时候又不能获取，一直疑惑不已，但是由于以前学习态度的问题，也没有深究，今天专门花了点时间整理了一下这方面的知识。
####样式
-------
首先，我们要明确样式的种类有以下三种  

-------
__ 也就是行内样式，直接写在DOM元素的style属性中  
- **嵌入样式：** 写在html页面中的<style></style>中的样式  
- **外部样式：** 由link标签引入的css文件中的样式  
优先级：内联 > 嵌入 > 外部  

首先，先写一个例子来测试一下通过style方法获取元素样式的值，思路是，一个样式写在行内，一个样式写在style标签中，一个样式由link引入

```html
<head>
    <meta charset="UTF-8">
    <title>get style</title>
    <style>
        <!-- 嵌入样式 -->
        .box {
            height: 200px;
        }
    </style>
    <!-- 引入外部样式 -->
    <link rel="stylesheet" href="./index.css">
</head>
<body>
    <!-- 行内样式 -->
    <div class="box" style="width: 100px;"></div>
</body>
```

```js
// index.css
.box { background-color: orange; }
```
```js
// javascript
var box = document.getElementsByClassName('box')[0];
console.log(box.style.width);
console.log(box.style.height);
console.log(box.style.backgroundColor);
```
得到的结果为：

```js
'100px'
''
''
```
因此我们可以看到height值和backgroundColor值没有被获取到，所以我们得到以下结论：
**style只能获取行内样式的值，无法获取嵌入式样式和外部样式的值**

那么嵌入式样式和外部样式的值应该怎么办呢，看下面代码

```js
// currentStyle: IE下获取元素样式的值
if ( box.currentStyle ) {
    console.log( 'this is IE.' );
    console.log( box.currentStyle.width );
    console.log( box.currentStyle.height );
    console.log( box.currentStyle.backgroundColor );
} else {
    // chorme and firefox
    console.log( document.defaultView.getComputedStyle(box, false).width );
    console.log( document.defaultView.getComputedStyle(box, fasle).height );
    console.log( document.defaultView.getComputedStyle(box, false).backgroundColor );
}
```
输出结果

```js
'this is IE.'
'100px'
'200px'
'orange'
```

分别在IE, chrome, firefox下测试一下，最后都能够获取所有的属性。非常好，于是我们可以得出结论
**获取元素样式值的最佳方式，就是通过`obj.currentStyle` 或者
`document.defaultView.getComputedStyle( obj, false )` 的方式，其中前者适用于IE，后者适用于chrome和Firefox**

因此我们可以写一个获取元素样式值的方法

```js
var getStyle = function(obj, key) {
    return obj.currentStyle ? obj.currentStyle[key] : document.defaultView.getComputedStyle( obj, false )[key];
}
```

> 不知道这个redcarpet 引擎怎么样

![脑图辅助我们写代码，代码完成得更加轻松](http://upload-images.jianshu.io/upload_images/1049135-51dafcfd3338885c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我自己常常在写代码的时候，会突然搞不清变量用来干嘛的，也会被理不清的逻辑搞得自己异常烦躁，我甚至常常暗示自己我不适合写代码，思维总是那么不清晰。直到我发现了思维导图的妙用。

最开始使用思维导图的时候，我其实是用来记知识点的。然而某一刻就灵光一闪了，尝试使用了思维导图来记录代码变量和逻辑，最后居然就轻松的把以为要理很久的问题搞定了。为了验证自己的想法，我又尝试自己写了一些小东西，对于我们这些初学者，肯定是选项卡和分页什么的最常用了，因为里面有一些变量总是那么令人难以捉摸，这里我以分页为例，向大家分享我是如何用脑图完成分页的。
> 这里省去使用ajax获取后台数据的部分，我自己创建一个js文件，里面用JSON存了一点数据。一般来说使用ajax都是一页一页的获取数据，我这里直接将所有数据都显示出来。

首先，根据多方了解，翻阅资料，找到了一种实现分页的方式，大概就是用一些变量来控制，比如当前页，总页数，还有第几页的按钮等等，然后再写一个比如showPage()来显示当前页的内容，通过变量的改变来控制showPage()的显示。

####首先用css画一个大概样式图

![主要关注下方的按钮就行了](http://upload-images.jianshu.io/upload_images/556173-4072e201966d8650.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后自行脑补一下想要实现的功能


![功能概括](http://upload-images.jianshu.io/upload_images/556173-580eecfa6a79aaab?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

理清变量和功能方法  

![先理清可能用到的变量和方法，多了以后去掉，不够再补](http://img0.imgtn.bdimg.com/it/u=188218895,3627381781&fm=21&gp=0.jpg)

然后我们以showBtn()为例，思考如何完成这个函数。

>我们默认每一个button页有5个按钮，为了防止最后一页不够5个，因此先隐藏所有的按钮，然后通过循环将存在的按钮显示出来

![关于showButton函数的思考](https://pages.github.com/images/automatic@2x.png)

于是我就可以完成showButton函数如下

```js
function showButton() {
    var
        $numb = $('.numb'),
        min = (btn_cur-1)*5 + 1,
        max = 0;

     if (btn_cur == btn_acount) {
        max = page_acount + 1;
     } else if (btn_cur < btn_acount) {
        max = (btn_cur*5) + 1;
     };

     $numb.hide();

    for(var i=min; i<max; i++) {
        !function() {
            $numb.eq(i%5 - 1).show();
            $numb.eq(i%5 - 1).attr('data-list', i);
            $numb.eq(i%5 - 1).html(i);
        }();
     }
}
```
当我没有使用脑图写出来的代码是这样的  - -！，完全没逻辑可言有木有

```js
function showButton() {
    var $numb = $('.numb');
    if (btn_acount == 1) {
        $numb.hide();
        $('.more').hide();
        $('.last').hide();
        for(var i=0; i<acountPage; i++) {
            $numb.eq(i).show();
            $numb.eq(i).attr('data-list', i);
        }
    };

    var min = (btn_cur-1)*5 + 1;
    var max = 0;
    if (btn_cur == btn_acount) {
        max = page_acount+1;
    } else if (btn_cur < btn_acount) {
        max = btn_cur*5+1;
    };

    $numb.hide();

    for( var i=min; i<max; i++ ) {
        $numb.eq(i%5 - 1).show();
        $numb.eq(i%5 - 1).attr('data-list', i);
        $numb.eq(i%5 - 1).html(i);
    }
}
```

- 在来一轮逻辑整理，当函数都写好，变量都整明白了，就可以添加事件了，先来一轮思维整理。  

![触发事件时，page，btn，焦点变化的情况](https://pages.github.com/images/settings@2x.png)

于是按照这个思路，轻松完成事件添加，代码如下  

```js
$('.pos_page').on('click', function(e) {
    // e.preventDefault();
    var $target = $(e.target);
    var className = $target.attr('class').split(' ')[0];

    $target.on('selectstart', function() {
        return false;
    });

    switch(className) {
        case 'prev_page':
            if (index!=0) {
                index -= 1;
                page_cur -= 1;
            } else if (index == 0) {
                if (btn_cur > 1 ) {
                    index = 4;
                    btn_cur -= 1;
                    page_cur -= 1;
                } else if (btn_cur == 1) {
                    return;
                }
            };
            showPage(page_cur, page_every);
            showButton();
            setFocus();
            break;
        case 'next_page':
            if (btn_cur == btn_acount) {
                if (index == page_acount%5 - 1) {
                    return;
                } else if( index < page_acount%5 - 1) {
                    index ++;
                    page_cur ++;
                }
            } else if (btn_cur < btn_acount) {
                if (index == 4) {
                    index = 0;
                    btn_cur += 1;
                    page_cur += 1;
                } else if (index < 4) {
                    index ++;
                    page_cur++;
                };
            };
            showPage(page_cur, page_every);
            showButton();
            setFocus();
            break;
        case 'numb':
            page_cur = $target.attr('data-list');
            index = page_cur%5-1;
            console.log(page_cur);
            showPage(page_cur, page_every);
            showButton();
            setFocus();
            break;
        case 'more':
            if (btn_cur < btn_acount) {
                btn_cur += 1;
                index = 0;
                showButton();
                setFocus();

                page_cur = $('.numb').eq(0).html();
                showPage(page_cur, page_every);
            };
            break;
        case 'last':
            if (btn_cur != btn_acount) {
                btn_cur = btn_acount;
                index = 0;
                page_cur = (btn_cur - 1)*5 +1;
                showPage(page_cur, page_every);
                showButton();
                setFocus();
            };
        default:
            break;
    }
});
```

>主要是通过类名来区分目标DOM，通过自定义data-list属性来标识当前页`github`, 可是谁[点击]()

总的来说，与我而言，[通过思维导图](http://www.baidu.com)，是写出思维严密，易于维护的代码的有效途径，`var document`看上去浪费了时间，其实增加了非常多的效率。
###### 我是h6  
##### 我是h5
#### 我是h4
### 我是h3
## 我是h2
# 我是h1

[如果你觉得简书代码视图太难看，点击我学习如何修改简书style](http://www.jianshu.com/p/d77b19a94b7f)
