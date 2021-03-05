"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ancestors;

function ancestors(el) {
  var ancestors = [];
  el = el.parentElement;

  while (el) {
    ancestors.push(el);
    el = el.parentElement;
  }

  return ancestors;
}