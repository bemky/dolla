"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

function filter(nodes, predicate) {
  const filteredNodes = [];
  nodes.forEach(node => {
    if (predicate(node)) filteredNodes.push(node);
  });
  return filteredNodes;
}