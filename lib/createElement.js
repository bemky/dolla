/*

Description
----
This method mirrors `document.createElement`, but adds the ability to include attributes and content for the initialized `Element`

Syntax
----
    createElement('button', {type: 'button'})
    createElement({class: 'container'})

Params
----
### `tagName` #optional
A `String` declaring what type of HTML tag to create

### `options` #optional
An `Object` whose keys are used to set attributes on the created element. All HTMLElement attributes are accepted including an additional option to define `content`

- `content`: The value of the key `content` is passed into dolla's append method. Reference the `append()` documentation for more details about possible content values.
- `tag`: A `String` declaring the type of HTML tag, used as an alternative to the first parameter

Return Value
----
`Element`

Usage
----
    createElement('table', {
        class: 'uniformTable',
        cellpadding: 0,
        style: {
            verticalAlign: 'center'
        },
        content: [{
            tag: 'tr'
            content: [{
                tag: 'td',
                content: 'Hello World'
            }]
        }]
    })
*/

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
        append(el, value)
        return;
    }

    el.setAttribute(key, value);
  });
  return el;
}