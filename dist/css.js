"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = css;

function css(el, rule) {
  return getComputedStyle(el)[rule];
}