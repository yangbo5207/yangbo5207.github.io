;
(function($) {

    var Dialog = (function() {
        var instance;

        function init() {
            return {
                init: function() {
                    var tips_desc = '这项修改会给你带来很大的风险，你确定要修改吗？',
                        dialog_string =
                        '<section class="dialog">' +
                            '<div class="sure-box">' +
                                '<p class="desc">'+ tips_desc +'</p>' +
                                '<div class="button-wrap">' +
                                    '<button class="sure">确定</button>' +
                                    '<button class="cancel">取消</button>' +
                                '</div>' +
                            '</div>' +
                        '</section>',
                        self = this;

                    $(dialog_string).appendTo($(document.body));

                    var $area = $('.dialog');

                    $area.on('click', function() {
                        // event.stopPropagation();
                        self.hide();
                        alert('点击空白处已经隐藏弹窗');
                    })

                    $area.find('.sure').on('click', function(event) {
                        // event.stopPropagation();
                        self.hide();
                        alert('已确认修改');
                    })

                    $area.find('.cancel').on('click', function() {
                        // event.stopPropagation();
                        self.hide();
                        alert('已取消修改');
                    })

                    $area.find('.sure-box').on('click', function(event) {
                        // event.stopPropagation();
                    })

                },
                hide: function() {
                    $('.dialog').remove();
                }
            }
        }

        if (!instance) {
            instance = init();
        }
        return instance;
    })();

    $(document.body).on('click', function() {
        Dialog.init();
        alert('已经生成弹窗');
    });
})(jQuery);
