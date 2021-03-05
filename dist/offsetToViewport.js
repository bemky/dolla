"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offsetToViewport;

function offsetToViewport(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left
  };
}