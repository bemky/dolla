"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = outerWidth;

function outerWidth(el) {
  var style = getComputedStyle(el);
  return el.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
}