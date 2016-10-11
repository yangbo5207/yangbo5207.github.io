'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(function (require) {
    var $parent = $('.content');
    var $aEssay = $parent.find('.essay');
    var countURL = 'http://api.duoshuo.com/threads/counts.json';

    _.each($aEssay, function (value, i) {
        var _$$ajax;

        var $v = $(value);
        var $commentCount = $v.find('.comment-count .count');
        var $likesCount = $v.find('.likes-count .count');
        var $shareCount = $v.find('.share-count .count');
        var threads_key = $v.find('.a-target').attr('href').replace(/.html/ig, '');

        var url = countURL + '?short_name=ybobo&threads=' + threads_key;
        $.ajax((_$$ajax = {
            type: 'GET',
            url: url
        }, _defineProperty(_$$ajax, 'type', 'json'), _defineProperty(_$$ajax, 'success', function success(res) {
            console.log(res);
        }), _$$ajax));
    });
});