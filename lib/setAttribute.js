/*

Description
----
Assigns attribute for an `Element`

Syntax
----
    assignAttribute(el, key, value)

Arguments
----
### `el`
An `Element` to assign attributes too

### `key`
Used to set attribute on the element. All HTMLElement attributes are accepted including an additional option to define `content`

- `content`: The value of the key `content` is passed into dolla's [append](#append) method. Reference the `append()` documentation for more details about possible content values.
- `tag`: A `String` declaring the type of HTML tag, used as an alternative to the first parameter

Example
----
    assignAttribute(el, 'class', new Promise(r => r('text-bold')))
*/

import { camelize } from './support.js';
import { BOOLEAN_ATTRIBUTES, HTML_ATTRIBUTES, SVG_ATTRIBUTES } from './constants.js';
import StateBus from './StateBus.js';
import content from './content.js';

export default function setAttribute(el, key, value) {
    if (value instanceof Promise) {
        value.then(v => setAttribute(el, key, v))
    } else if (value instanceof StateBus) {
        value.addListener(v => setAttribute(el, key, v))
        if (key == "content") {
            content(el, value.value)
        } else {
            setAttribute(el, key, value.value)
        }
    } else {
        if (key == "value") {
            el.value = value;
        } else if (key == "data" && typeof value == 'object') {
            Object.keys(value).forEach(key => {
                el.dataset[camelize(key)] = typeof value[key] == "object" ? JSON.stringify(value[key]) : value[key];
            });
        } else if (key == "style" && typeof value == 'object') {
            Object.keys(value).forEach(key => {
                let v = value[key]
                const updateProperty = (key, v) => {
                    if (v === null) {
                        el.style.removeProperty(key)
                    } else {
                        el.style.setProperty(key, v)
                    }
                    return v
                }
                if (v instanceof StateBus) {
                    v.addListener(v => updateProperty(key, v))
                    v = v.value
                }
                if (v instanceof Promise) {
                    return v.then(v => updateProperty(key, v))
                } else {
                    return updateProperty(key, v)
                }
            });
        } else if (key == "content" || key == "children") {
            content(el, value)
        } else if (key.match(/^on[a-z]/)) {
            el[key] = value
        } else if (BOOLEAN_ATTRIBUTES.find(a => a.toUpperCase() == key.toUpperCase())) {
            key = BOOLEAN_ATTRIBUTES.find(a => a.toUpperCase() == key.toUpperCase())
            el[key] = value !== false;
        } else if (HTML_ATTRIBUTES.find(a => key.match(new RegExp(a)))
                || SVG_ATTRIBUTES.includes(key)) {
            el.setAttribute(key, value)
        }
    }
}