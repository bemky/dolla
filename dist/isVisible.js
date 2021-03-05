"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVisible;

function isVisible(el) {
  return el.offsetParent !== null;
}