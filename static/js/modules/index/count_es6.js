define( require => {
    let $parent = $('.content');
    let $aEssay = $parent.find('.essay');
    let countURL = 'http://api.duoshuo.com/threads/counts.json';

    _.each($aEssay, (value, i) => {
        let $v = $(value);
        let $commentCount = $v.find('.comment-count .count');
        let $likesCount = $v.find('.likes-count .count');
        let $shareCount = $v.find('.share-count .count');
        let threads_key = $v.find('.a-target').attr('href').replace(/.html/ig, '');

        let url = countURL + '?short_name=ybobo&threads=' + threads_key;
        $.ajax({
            type: 'GET',
            url: url,
            type: 'json',
            success: function(res) {
                console.log(res);
            }
        })
    })
});
