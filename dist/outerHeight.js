"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = outerHeight;

function outerHeight(el) {
  var style = getComputedStyle(el);
  return el.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
}