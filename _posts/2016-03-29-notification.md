---
layout: post
title:  HTML5桌面通知 Notification
date:   2016-03-29
tags: html important
image: /static/images/post/essay-15.jpg
desc: 现在html5中可以实现桌面提醒的功能。不过在手机端，也仅仅只有Blackberry browser实现了，实现这一功能的浏览器均是webkit内核。应用范围还很有限。不过针对某些特定的场景，能够实现出来还是非常的不错。
---

现在html5中可以实现桌面提醒的功能。不过在手机端，也仅仅只有Blackberry browser实现了，实现这一功能的浏览器均是webkit内核。应用范围还很有限。不过针对某些特定的场景，能够实现出来还是非常的不错。  

桌面提醒功能是由window对象下的`Notification`来实现的。  

一、 判断浏览器是否支持notification  

```js
if (window.Notification) {
    ...
}
```


二、 判断当前页面的消息提醒权限  `Notification.permission`，共有三种权限，分别对应三个值。  
`grant` 表示用户同意提醒  
`default` 表示默认状态，用户未拒绝也未同意  
`denied`  表示拒绝

```js
if (Notification.permission === 'granted') {
    ... 
}
```

当处于默认状态和拒绝状态时，我们需要向用户发出请求，让用户确认是否需要消息提示  

```js
// 请求授权，如果授权成功，则执行回调函数
Notification.requestPermission(callback);
```

当处于接受消息提示状态时，我们需要设置提示内容  

```js
var notification = new Notification(title, {
    body: personal.nickname + ' 当前排名：' + personal.rank + '  收益：' + rate,
    icon: avatar,
    dir: 'auto',
    tag: 'tigerbrokers'
});
```

其中：  
`title`: 表示提示的标题  
`body`: 提示的描述信息  
`icon`: 提示的头像  
`dir`: 设置消息的排列方向，`auto` 自动  `ltr` 左向右 `rtl` 右向左  
`tag`: 为消息添加标签，如果新消息出现时，标签相同，会替换老的标签，不会重复  
`onshow`： 当消息框显示时执行事件  
`onclick`: 点击消息框时执行  
`onclose`: 关闭消息框时执行  
`onerror`: 出现错误时触发   

我在实际中应用的完整代码  

```js
if (window.Notification) {
    // var trend = personal.trend < 0 ? personal.trend : '+' + personal.trend;
    var avatar = personal.avatar || '/static/images/cooperation/stockGame/init-avatar.png';
    var title = '老虎证劵炒股大赛';
    if (Notification.permission === 'granted') {
        if (personalRank != 0) {
            var notification = new Notification(title, {
                body: personal.nickname + ' 当前排名：' + personal.rank + '  收益：' + rate,
                icon: avatar,
                dir: 'auto',
                tag: 'tigerbrokers'
            });
        }
    } else {
        Notification.requestPermission();
    }
}
```


那么了解了那么多，我们来看一个实例  

<p data-height="268" data-theme-id="0" data-slug-hash="ZYLayY" data-default-tab="result" data-user="imprakash" class="codepen">See the Pen <a href="http://codepen.io/imprakash/pen/ZYLayY/">HTML5 Notification API</a> by Prakash (<a href="http://codepen.io/imprakash">@imprakash</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
