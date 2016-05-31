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
    var productInstance;
    var $area = $('.product');
    var $table = $area.find('.table');

    function init() {
        return {
            table: $table,
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
                })
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
    }

    return (function() {
        if (!productInstance) {
            productInstance = init();
        }
        return productInstance;
    })();
})();

var AddDialog = (function() {
    var addInstance;
    var $area = $('.add');
    function init() {
        return {
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
                $area.addClass('disabled').on('animationend', function() {
                    $area.removeClass('active disabled');
                    $area.hide();
                    $area.off('animationend');
                })
            }
        }
    }

    return (function() {
        if (!addInstance) {
            addInstance = init();
        }
        return addInstance;
    })()

})();

var DelDialog = (function() {
    var deleteInstance;
    var $area = $('.delete');
    function init() {
        return {
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
    }
    return (function(){
        if (!deleteInstance) {
            deleteInstance = init();
        }
        return deleteInstance;
    })();
})();

+function init() {
    Product.init();
    AddDialog.init();
    DelDialog.init();
}();

})(jQuery);
