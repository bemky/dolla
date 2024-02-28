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
import StateBus from './StateBus.js';
import content from './content.js';

export default function setAttributes(el, attributes={}) {
    Object.keys(attributes).forEach(key => setAttribute(el, key, attributes[key]));
    return el
}

function setAttribute(el, key, value) {
    if (value instanceof Promise) {
        value.then(v => setAttribute(el, key, v))
    } else if (value instanceof StateBus) {
        value.addListener(v => setAttribute(el, key, v))
        setAttribute(el, key, value.value)
    } else {
        if (key == "value") {
            el.value = value;
        } else if (key == "data" && typeof value == 'object') {
            Object.keys(value).forEach(key => {
                el.dataset[key] = typeof value[key] == "object" ? JSON.stringify(value[key]) : value[key];
            });
        } else if (key == "style" && typeof value == 'object') {
            Object.keys(value).forEach(key => {
                el.style[key] = value[key];
            });
        } else if (key == "content" || key == "children") {
            content(el, value)
        } else if (key.match(/^on[a-z]/)) {
            el[key] = value
        } else if (BOOLEAN_ATTRIBUTES.find(a => a.toUpperCase() == key.toUpperCase())) {
            key = BOOLEAN_ATTRIBUTES.find(a => a.toUpperCase() == key.toUpperCase())
            el[key] = value !== false;
        } else if (HTML_ATTRIBUTES.find(a => key.match(new RegExp(a)))) {
            el.setAttribute(key, value)
        }
    }
}