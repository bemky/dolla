"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFocus;

function isFocus(element) {
  return document.activeElement === element;
}