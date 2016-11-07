---
layout: post
title:  background
date: 2016-11-31 15:08:00 +0800
categories: css
categories_array: css
tags: css
image: /static/images/post/essay-23.jpg
desc:
---

我也不知道为什么要把高度设置这么高，只能先这样了。可能是移动端需要先调整一下适配吧。

### 1、background-color

为背景设置一种纯色，这种颜色会填充元素的content，padding，与border区域，但不包括外边距  

> 如果边框有透明部分，则会透过这些透明显示出背景色来

可能的值有  

```css
.target {
    /* 颜色名称 ，如red, orange, blue等 */
    background-color: red;

    /* 十六进制颜色值， 如 #ffffff, #ffe100 */
    background-color: #ffe100;

    /* rgba色值，如 rgba(0, 0, 0, 0.3) */
    background-color: rgba(0, 0, 0, 0.3);

    /* transparent 默认，背景颜色为透明 */
    background-color: transparent;
}
```


### 2、background-image

比较常规的是背景只设置一张图片

```css
.target {
    background-image: url(../images/01.png);
}
```

在css3中，对其进行了功能增强，可以设置多个背景图片，引用图片之间使用逗号隔开，层级定位是第一张图片在最上层，后面的图片依次在下面显示。

```css
.target {
    background-image: url(../images/01.png), url(../images/02.png);
}
```

![demo](/static/images/post/20161031background/01.png)

> 当要使用多个图片作为背景时，虽然可以使用background的缩写形式对每一张图片进行设置，但是仍然建议在实际开发中将多张图片切成宽度相同的png，这样可以有效降低开发难度，并且便于维护

### 3、background-repeat

使用此属性可以设置背景图片的重复方式，默认情况下，背景图片会在x方向与y方向上同时重复平铺，以下的属性能够修改背景图片平铺方式

```css
.target {
    /* 默认 同时在x方向与y方向上平铺重复 */
    background-position: repeat;

    /* 只在x方向上平铺重复 */
    background-position: repeat-x;

    /* 只在y方向上平铺重复 */
    background-position: repeat-y;

    /* 不重复 */
    background-position: no-repeat;

    /* inherit 从父级继承重复方式 */
    background-position: inherit;
}
```

> 开发中除了常常使用no-repeat来防止背景图片重复之外，也常常结合切图技巧在单一方向上平铺来完成一些自适应宽度或者高度的背景设置

### 4、background-attachment

定义背景图片随着滚动轴的移动方式  

取值： scroll | fixed | inherit  

```css
scroll:  默认值，背景图片会随着页面其余部分的滚动而移动  
fixed:   当页面的其余部分滚动时，背景图片不会移动  
inherit: 规定从父级继承值  
```

使用background-attachment，还可以做一个简单的视差效果，demo如下



### 5、background-position

### 6、background-size

### 7、background-origin

### 8、background-clip


### 9、background 缩写形式

缩写顺序为

```js
.target {
    background: [background-color]
                [background-image]
                [background-repeat]
                [background-attachment]
                [background-position] / [background-size]
                [background-origin]
                [background-clip]
}
```
