"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceContents;

function replaceContents(el, ...nodes) {
  el.html = '';
  el.append(...nodes);
}