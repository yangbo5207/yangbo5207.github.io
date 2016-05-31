(function($, undefined) {
    var states = {
        start: 1,
        down: 1,
        move: 2,
        end: 3,
        up: 3,
        cancel: 3
    },
    evs = [],
    event2type = {},
    event2code = {},
    POINTERS = {},
    EVENTS = {};

    $.each("mouse touch pointer MSPointer-".split(" "), function(i, prefix) {
    var _prefix = /pointer/i.test(prefix) ? 'pointer' : prefix;
    $.each(states, function(endfix, code) {
        var ev = camelCase(prefix + endfix);
        evs.push(ev);
        POINTERS[_prefix] = {};
        event2type[ev.toLowerCase()] = _prefix;
        event2code[ev.toLowerCase()] = code;
    });
    });

    EVENTS = evs.join(" ");

    function trigger(el, ev, data) {
            if (('createEvent' in document) && typeof MouseEvent == 'function') {
                var event = document.createEvent('MouseEvents');
                event.initEvent(ev, true, true);
                event.data = data;
                el.dispatchEvent(event);
            } else {
                $(el).trigger($.Event({
                    type: ev,
                    data: data
                }));
            }
        }

    function filterEvent(ev) {
            var oldEvent = ev.originalEvent,
                pointers,
                pointer;

            ev.type = ev.type.toLowerCase();
            ev.eventType = event2type[ev.type] || ev.type;
            ev.eventCode = event2code[ev.type] || 0;

            pointers = POINTERS[ev.eventType];
            switch (ev.eventType) {
                case 'mouse':
                case 'pointer':
                    var id = oldEvent.pointerId || 0;
                    ev.eventCode == 3 ? delete pointers[id] : pointers[id] = ev;
                    ev.changedPointers = [{
                        id: id,
                        pointer: ev
                    }];
                    ev.pointers = $.map(pointers, function(pointer, id) {
                        return {
                            id: id,
                            pointer: pointer
                        };
                    });
                    break;
                case 'touch':
                    POINTERS[ev.eventType] = pointers = oldEvent.touches;
                    ev.changedPointers = $.map(oldEvent.changedTouches, function(pointer) {
                        return {
                            id: pointer.identifier,
                            pointer: pointer
                        };
                    });
                    ev.pointers = $.map(oldEvent.touches, function(pointer) {
                        return {
                            id: pointer.identifier,
                            pointer: pointer
                        };
                    });
                    break;
            }

            if (pointer = ev.pointers[0]) {
                ev.pageX = pointer.pointer.pageX;
                ev.pageY = pointer.pointer.pageY;
            }

            ev.length = ev.pointers.length;

            return ev;
        }

        function camelCase(str) {
            return str.replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function(all, letter) {
                return (letter + "").toUpperCase();
            });
        }

    ;
    (function() {
        var el, stime, sx, sy, ox, oy, isRight, pointerType, timer;

        $(document).on(EVENTS, function(ev) {
            filterEvent(ev);
            isRight = ev.which < 2 && (!pointerType || pointerType == ev.eventType);

            switch (ev.eventCode) {
                case 1:
                    if (isRight && ev.length < 2 && !stime) {
                        clearTimeout(timer);
                        if (!pointerType) {
                            pointerType = ev.eventType;
                        }
                        stime = +new Date;
                        sx = ev.pageX;
                        sy = ev.pageY;
                        ox = 0;
                        oy = 0;
                        el = ev.target;
                    }
                    break;
                case 3:
                    if (isRight && !ev.length && stime) {
                        var otime = +new Date - stime,
                            _ox = Math.abs(ox),
                            _oy = Math.abs(oy),
                            dir;
                        if (_ox < 5 && _oy < 5) {
                            if (otime < 300) {
                                trigger(el, 'tap', otime);
                            } else {
                                trigger(el, 'longTap', otime);
                            }
                        } else if (otime < 600 && (_ox > 30 || _oy > 30)) {
                            if (_ox > _oy) {
                                dir = ox > 0 ? 'right' : 'left';
                                trigger(el, 'swipe', {
                                    time: otime,
                                    distance: _ox,
                                    direction: dir
                                });
                            } else {
                                dir = oy > 0 ? 'down' : 'up';
                                trigger(el, 'swipe', {
                                    time: otime,
                                    distance: _oy,
                                    direction: dir
                                });
                            }
                            trigger(el, 'swipe' + dir, {
                                time: otime,
                                distance: Math.max(_ox, _oy)
                            });
                        }
                        el = stime = sx = sy = null;
                        timer = setTimeout(function() {
                            pointerType = null
                        }, 1000);
                    }
                    break;

                case 2:
                    if (isRight && stime) {
                        ox = ev.pageX - sx;
                        oy = ev.pageY - sy;
                    }
                    break;
            }
        });
    })();
})(jQuery);