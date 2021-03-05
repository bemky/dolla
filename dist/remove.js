"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = remove;

function remove(el) {
  if (el instanceof NodeList) {
    el.forEach(remove);
  } else {
    el.parentNode.removeChild(el);
  }
}