"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offset;

function offset(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX
  };
}