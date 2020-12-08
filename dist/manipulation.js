'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createElement = createElement;
exports.remove = remove;
exports.replaceContents = replaceContents;
var BOOLEAN_ATTRIBUTES = exports.BOOLEAN_ATTRIBUTES = ['disabled', 'readonly', 'multiple', 'checked', 'autobuffer', 'autoplay', 'controls', 'loop', 'selected', 'hidden', 'scoped', 'async', 'defer', 'reversed', 'ismap', 'seemless', 'muted', 'required', 'autofocus', 'novalidate', 'formnovalidate', 'open', 'pubdate', 'itemscope'];

var HTML_ATTRIBUTES = exports.HTML_ATTRIBUTES = ['accept', 'accept-charset', 'accesskey', 'action', 'align', 'allow', 'alt', 'async', 'autocapitalize', 'autocomplete', 'autofocus', 'autoplay', 'background', 'bgcolor', 'border', 'buffered', 'capture', 'challenge', 'charset', 'checked', 'cite', 'class', 'code', 'codebase', 'color', 'cols', 'colspan', 'content', 'contenteditable', 'contextmenu', 'controls', 'coords', 'crossorigin', 'csp', 'data', 'data-*', 'datetime', 'decoding', 'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'dropzone', 'enctype', 'enterkeyhint', 'for', 'form', 'formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'icon', 'id', 'importance', 'integrity', 'intrinsicsize', 'inputmode', 'ismap', 'itemprop', 'keytype', 'kind', 'label', 'lang', 'language', 'loading', 'list', 'loop', 'low', 'manifest', 'max', 'maxlength', 'minlength', 'media', 'method', 'min', 'multiple', 'muted', 'name', 'novalidate', 'open', 'optimum', 'pattern', 'ping', 'placeholder', 'poster', 'preload', 'radiogroup', 'readonly', 'referrerpolicy', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'scoped', 'selected', 'shape', 'size', 'sizes', 'slot', 'span', 'spellcheck', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'style', 'summary', 'tabindex', 'target', 'title', 'translate', 'type', 'usemap', 'value', 'width', 'wrap', 'aria', 'aria-*'];

function createElement() {
  var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((typeof tagName === 'undefined' ? 'undefined' : _typeof(tagName)) == 'object') {
    options = tagName;
    tagName = options.tag || 'div';
  }
  var el = document.createElement(tagName);

  Object.keys(options).forEach(function (key) {
    if (HTML_ATTRIBUTES.filter(function (attribute) {
      return key.match(new RegExp(attribute));
    }).length == 0 && key != "children") {
      return;
    }

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

function remove(el) {
  if (el instanceof NodeList) {
    el.forEach(remove);
  } else {
    el.parentNode.removeChild(el);
  }
}
function replaceContents(el) {
  el.html = '';

  for (var _len = arguments.length, nodes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    nodes[_key - 1] = arguments[_key];
  }

  el.append.apply(el, nodes);
}