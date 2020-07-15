'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createElement = createElement;
exports.offset = offset;
exports.outerHeight = outerHeight;
exports.outerWidth = outerWidth;
exports.remove = remove;
var BOOLEAN_ATTRIBUTES = exports.BOOLEAN_ATTRIBUTES = ['disabled', 'readonly', 'multiple', 'checked', 'autobuffer', 'autoplay', 'controls', 'loop', 'selected', 'hidden', 'scoped', 'async', 'defer', 'reversed', 'ismap', 'seemless', 'muted', 'required', 'autofocus', 'novalidate', 'formnovalidate', 'open', 'pubdate', 'itemscope'];

function createElement() {
  var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((typeof tagName === 'undefined' ? 'undefined' : _typeof(tagName)) == 'object') {
    options = tagName;
    tagName = options.tag || 'div';
  }
  var el = document.createElement(tagName);

  Object.keys(options).forEach(function (key) {
    var value = options[key];

    if (BOOLEAN_ATTRIBUTES.includes(key)) {
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
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
          return Object.keys(value).forEach(function (key) {
            el.dataset[key] = _typeof(value[key]) == "object" ? JSON.stringify(value[key]) : value[key];
          });
        }
        break;
      case 'style':
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
          return Object.keys(value).forEach(function (key) {
            el.style[key] = value[key];
          });
        }
        break;
      case 'children':
        value.forEach(function (child) {
          if (child instanceof Element) {
            el.appendChild(child);
          } else if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) == "object" && child !== null && !Array.isArray(child)) {
            el.append(createElement(child));
          } else {
            var tmp = document.createElement('div');
            tmp.innerHTML = child;
            tmp.childNodes.forEach(function (node) {
              return el.append(node.cloneNode(true));
            });
          }
        });
        return;
    }

    el.setAttribute(key, value);
  });
  return el;
}

function offset(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX
  };
}

function outerHeight(el) {
  var height = el.offsetHeight;
  var style = getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}

function outerWidth(el) {
  var width = el.offsetWidth;
  var style = getComputedStyle(el);

  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  return width;
}

function remove(el) {
  if (el instanceof NodeList) {
    el.forEach(remove);
  } else {
    el.parentNode.removeChild(el);
  }
}