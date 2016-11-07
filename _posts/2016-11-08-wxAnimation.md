---
layout: post
title:  不能操作DOM，就不知道怎么玩了吗
star: 5
date: 2016-11-08 12:33:00 +0800
categories: mina
categories_array: mina
tags: mina
image: /static/images/post/essay-01.jpg
desc: 有几个同学曾经在后台问过我关于数据绑定的问题，但是由于我前段时间偷懒没有及时回答，真的很抱歉，这次借助学习小程序的机会，通过小程序的方式来解答一下，希望对感到困惑的同学有所帮助。
---

有几个同学曾经在后台问过我关于数据绑定的问题，但是由于我前段时间偷懒没有及时回答，真的很抱歉，这次借助学习小程序的机会，通过小程序的方式来解答一下，希望对感到困惑的同学有所帮助。

初学angular1.x时，也曾感到非常困惑，难以理解为什么它可以抛弃jQuery就能进行开发，实现很多我认为必须要操作DOM才能实现的功能。虽然我能够根据一些文档教程通过数据绑定的方式做一些demo，但是这个问题真的困扰了我很久，特别是当我遇到一个功能，我知道用jQuery如何实现它，但是让我用angular却无从下手的时候。

最近学习小程序时，再次遇到了这样的场景。当然，有之前的经验在，也不会有什么理解上的阻碍了，学习相对来说很顺利。

小程序的wxml文件与html不太一样，他的标签是很多自定义的标签，小程序内置的MINA框架赋予了这些标签各不一样的功能。

```html
<view></view>
<button></button>
<block></block>
<template></template>
...
```

而其中的view标签与div标签比较类似，我们仍然可以用class来定义他的样式

```html
// demo.wxml
<view class="demo"></view>

//demo.wxss
.demo {
    width: 100px;
    height: 100px;
    background-color: orange;
    margin: 20px auto;
}
```
这个时候我希望实现的功能是，给一个按钮绑定一个事件，当我点击按钮时，上面我们定义的view元素能够旋转一圈。

如果熟悉jquery或者原生js的话，结合css实现起来还算比较简单。大致的步骤如下

第一步：css中稍作修改

```css
.demo {
    transition-duration: 0.5s;
}

.rotate360 {
    transform: rotate(360deg);
}
```

第二步：获取元素对象

```js
var $target = $('.demo');
var $btn = $('.btn');  // 按钮
```

第三步：点击添加class。到这里，这样我们的功能也就实现了。

```js
$btn.click(function() {
    $target.addClass('rotate360');
})
```

但是很可惜的是，在小程序里，是获取不到元素的。也就意味着，我们不能通过获取元素的方式，然后继续对元素执行各种各样的操作了。这对于刚开始接触这种方式的同学来说，思维方式的转变将会是一个挑战。那么我们应该怎么办？

这里的关键就在于**数据绑定**。

无论是在angular，react，或者小程序中，都实现了数据绑定，有了数据绑定，我们虽然不能操作DOM元素，但是我们可以操作数据啊。我们只需要将数据绑定在元素里，然后通过修改数据的方式，来达到我们想要的效果。

那么在小程序中，具体的步骤如下

第一步： wxss文件中稍作修改，与上例中的css一致

第二步： 在view标签中绑定数据，定义该数据的名称为`animationData`，并在button标签上绑定点击事件，事件名为`addAnimation`

```html
<view class="{{animationData}}"></view>
<button bindtap="{{addAnimation}}">click me!</button>
```

第三步： 在Page中定义`animationData`的初始值为'demo'

```js
Page({
    data: {
        animationData: 'demo'
    }
})
```

第四步：在`addAnimation`方法中修改数据

```js
Page({
    data: {
        animationData: 'demo'
    },
    addAnimation: function() {
        var newClass = this.data.animationData + ' rotate360'
        this.setData({
            animationData: newClass
        })
    }
})
```

这样，效果就实现了

```js
点击 -> 修改数据 -> 数据绑定在view的class中，所以class的值自然也发生了变化 -> 动画效果得到实现
```

通过这个小例子我们发现，就算在小程序中，我们可以通过css实现更多的动画，而且这种方式在angular/react中也是非常适用的。所以一个小问题想通了，小程序的动画实现也就不再是问题，问题又回到了考验大家css3基础上。当然官方也提供了css动画的API，有兴趣的同学可以去了解一下，也非常简单就能掌握。具体使用那种就看你的喜好吧。

没有在小程序里发现animationend或者transitionend事件，感觉挺不舒服的。官方文档的例子中使用了setTimeout来替代 = =!。

好啦，今天的分享就到这里，希望这个例子能对大家理解数据绑定有所帮助。
