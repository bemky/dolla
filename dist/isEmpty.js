"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;

function isEmpty(element) {
  return element.innerHTML === "";
}