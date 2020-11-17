"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.offset = offset;
exports.offsetToViewport = offsetToViewport;
exports.outerHeight = outerHeight;
exports.outerWidth = outerWidth;
function offset(el) {
    var rect = el.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
    };
}

function offsetToViewport(el) {
    var rect = el.getBoundingClientRect();
    return {
        top: rect.top,
        left: rect.left
    };
}

function outerHeight(el) {
    var height = el.offsetHeight;
    var style = getComputedStyle(el);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
}

function outerWidth(el) {
    var width = el.offsetWidth;
    var style = getComputedStyle(el);

    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    return width;
}