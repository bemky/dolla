import append from './append';
import { BOOLEAN_ATTRIBUTES, HTML_ATTRIBUTES } from './constants';
export default function createElement(tagName = 'div', options = {}) {
  if (typeof tagName == 'object') {
    options = tagName;
    tagName = options.tag || 'div';
  }

  const el = document.createElement(tagName);
  Object.keys(options).forEach(key => {
    if (HTML_ATTRIBUTES.filter(attribute => key.match(new RegExp(attribute))).length == 0 && key != "children") {
      return;
    }

    const value = options[key];

    if (BOOLEAN_ATTRIBUTES.includes(key)) {
      if (value !== false) {
        return el[key] = true;
      } else {
        return;
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

      case 'content':
      case 'children':
        append(el, value);
        return;
    }

    el.setAttribute(key, value);
  });
  return el;
}