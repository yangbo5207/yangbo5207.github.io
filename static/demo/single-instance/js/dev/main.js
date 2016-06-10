;
(function($, undefined) {

'use strict';

var initialData = [
    {
        product: 'iPhone6s',
        price: '$200'
    },
    {
        product: '小米5',
        price: '$100'
    },
    {
        product: '华为P9',
        price: '$150'
    }
];

FastClick.attach(document.body);

var Product = (function() {
    var instance,
        $area = $('.product'),
        $table = $area.find('.table');

    function struct() {
        return new struct.fn.init();
    }
    struct.prototype = struct.fn = {
        constructor: struct,
        init: function() {
            var self = this;
            self.render();
            $table.on('click', '.add', function() {
                self.target = $(this).parent().parent();
                self.target.attr('data-status', 'add');
                AddDialog.show();
            });
            $table.on('click', '.delete', function() {
                self.target = $(this).parent().parent();
                self.target.attr('data-status', 'del');
                DelDialog.show();
            });
        },
        render: function() {
            $.each(initialData, function(i, val) {
                var elementstr =
                '<div class="item">' +
                    '<div class="t1">'+ val.product +'</div>' +
                    '<div class="t2">'+ val.price +'</div>' +
                    '<div class="t3"><a class="add" href="javascript:;">Insert</a><a class="delete" href="javascript:;">Delete</a></div>' +
                '</div>';
                $(elementstr).appendTo($table);
            })
        },
        delete: function() {
            var self = this;
            self.target.addClass('disabled').on('animationend', function() {
                self.target.remove();
            });

        },
        insertAfter: function(str) {
            $(str).insertAfter(this.target).addClass('active');
            this.target.attr('data-status', '');
        }
    }
    struct.fn.init.prototype = struct.fn;
    return ins(struct, instance);
})();

var AddDialog = (function() {
    var instance,
        $area = $('.adds');
    function Add() {
        return new Add.fn.init();
    }
    Add.prototype = Add.fn = {
        constructor: Add,
        init: function() {
            var self = this;
            $area.find('.cancel').on('click', function() {
                self.close();
            })
            $area.find('.sure').on('click', function() {
                var eProduct = $area.find('.product-name'),
                    ePrice = $area.find('.product-price'),
                    product = eProduct.val(),
                    price = ePrice.val();

                if (product == '' || price == '') {
                    alert('xxxbuneg')
                    return;
                }

                var elementstr =
                '<div class="item">' +
                    '<div class="t1">'+ product +'</div>' +
                    '<div class="t2">'+ price +'</div>' +
                    '<div class="t3"><a class="add" href="javascript:;">Insert</a><a class="delete" href="javascript:;">Delete</a></div>' +
                '</div>';
                Product.insertAfter(elementstr);
                eProduct.val('');
                ePrice.val('');
                self.close();
            })
        },
        show: function() {
            $area.show().addClass('active');
        },
        close: function() {
            $area.addClass('disabled');
            $area.addClass('disabled').on('animationend', function() {
                console.log($area);
                $area.removeClass('active disabled');
                $area.hide();
                $area.off('animationend');
            })
        }
    }
    Add.fn.init.prototype = Add.fn;
    return ins(Add, instance);
})();

var DelDialog = (function() {
    var instance,
        $area = $('.deletes');
    function struct() {
        return new struct.fn.init();
    }
    struct.prototype = struct.fn = {
        constructor: struct,
        init: function() {
            var self = this;
            $area.find('.cancel').on('click', function() {
                self.close();
            });
            $area.find('.sure').on('click', function() {
                Product.delete();
                self.close();
            })
        },
        show: function()  {
            $area.show().addClass('active');
        },
        close: function() {
            $area.addClass('disabled').on('animationend', function() {
            $area.removeClass('active disabled');
            $area.hide();
            $area.off('animationend');
            })
        }
    }
    struct.fn.init.prototype = struct.fn;
    return ins(struct, instance);
})();

function ins(struct, ins) {
    if (!ins) {
        ins = struct();
    }
    return ins;
}

})(jQuery);
