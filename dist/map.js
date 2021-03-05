"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

function map(elements, method) {
  var results = [];
  elements.forEach((el, i) => {
    results.push(method(el, i));
  });
  return results;
}