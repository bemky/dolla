/*

Description
----
Assigns attributes and content for an `Element`

Syntax
----
    assignAttributes(el, attributes={})

Arguments
----
### `el`
An `Element` to assign attributes too

### `attributes` #optional
An `Object` whose keys are used to set attributes on the created element. All HTMLElement attributes are accepted including an additional option to define `content`

- `content`: The value of the key `content` is passed into dolla's [append](#append) method. Reference the `append()` documentation for more details about possible content values.
- `tag`: A `String` declaring the type of HTML tag, used as an alternative to the first parameter

Return Value
----
`Element`

Example
----
    assignAttributes(el, {
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

import { BOOLEAN_ATTRIBUTES, HTML_ATTRIBUTES } from './constants.js';
import append from './append.js';

export default function setAttributes(el, attributes={}) {
    Object.keys(attributes).forEach(key => {
      if (HTML_ATTRIBUTES.filter(attribute => key.match(new RegExp(attribute))).length == 0 && key != "children") {
        return;
      }

      const value = attributes[key];
      const boolean_match = BOOLEAN_ATTRIBUTES.find(a => a.toUpperCase() == key.toUpperCase())
      if (boolean_match) {
        if (value !== false) {
          return el[boolean_match] = true;
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
    return el
}