"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createElement;

var _constants = require("./constants");

function createElement(tagName = 'div', options = {}) {
  if (typeof tagName == 'object') {
    options = tagName;
    tagName = options.tag || 'div';
  }

  const el = document.createElement(tagName);
  Object.keys(options).forEach(key => {
    if (_constants.HTML_ATTRIBUTES.filter(attribute => key.match(new RegExp(attribute))).length == 0 && key != "children") {
      return;
    }

    const value = options[key];

    if (_constants.BOOLEAN_ATTRIBUTES.includes(key)) {
      if (value !== false) {
        return el[key] = true;
      }
    }

    switch (key) {
      case 'tag':
        return;

      case 'value':
        return el.value = value;

      case 'data':
        if (typeof value == 'object') {
          return Object.keys(value).forEach(key => {
            el.dataset[key] = typeof value[key] == "object" ? JSON.stringify(value[key]) : value[key];
          });
        }

        break;

      case 'style':
        if (typeof value == 'object') {
          return Object.keys(value).forEach(key => {
            el.style[key] = value[key];
          });
        }

        break;

      case 'children':
        if (typeof value == "string") {
          const tmp = document.createElement('div');
          tmp.innerHTML = value;
          tmp.childNodes.forEach(node => el.append(node.cloneNode(true)));
        } else {
          value.forEach(child => {
            if (child instanceof Element) {
              el.appendChild(child);
            } else if (typeof child == "object" && child !== null && !Array.isArray(child)) {
              el.append(createElement(child));
            } else {
              const tmp = document.createElement('div');
              tmp.innerHTML = child;
              tmp.childNodes.forEach(node => el.append(node.cloneNode(true)));
            }
          });
        }

        return;
    }

    el.setAttribute(key, value);
  });
  return el;
}