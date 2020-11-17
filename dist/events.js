'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.trigger = trigger;
function trigger(el, eventName) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, false);
    el.dispatchEvent(event);
}