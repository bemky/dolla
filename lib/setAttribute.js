/*

Description
----
Assigns attribute for an `Element`.

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
import content from './content.js';

export default function setAttribute(el, key, value) {
    if (value instanceof Promise) {
        value.then(v => setAttribute.set(el, key, v))
    } else {
        setAttribute.set(el, key, value)
    }
}

setAttribute.set = function (el, key, value) {
    if (key == "value") {
        setAttribute.setValue(el, key, value)
    } else if (key == "class") {
        setAttribute.setClass(el, key, value)
    } else if (key == "data" && typeof value == 'object') {
        setAttribute.setData(el, key, value)
    } else if (key == "style" && typeof value == 'object') {
        setAttribute.setStyle(el, key, value)
    } else if (key == "content" || key == "children") {
        setAttribute.setContent(el, key, value)
    } else if (key.match(/^on[a-z]/)) {
        setAttribute.setListener(el, key, value)
    } else if (BOOLEAN_ATTRIBUTES.find(a => a.toUpperCase() == key.toUpperCase())) {
        setAttribute.setBoolean(el, key, value)
    } else if (HTML_ATTRIBUTES.find(a => key.match(new RegExp(a))) || SVG_ATTRIBUTES.includes(key)) {
        setAttribute.setAttribute(el, key, value)
    }
}

setAttribute.setValue = function (el, key, value) {
    el.value = value
}

setAttribute.setContent = function (el, key, value) {
    content(el, value)
}

setAttribute.setClass = function (el, key, value) {
    if (value != null && typeof value != "string" && !!value[Symbol.iterator]) {
        for (const c of value) {
            setAttribute.setClass.forEach(el, c)
        }
    } else if (value != null) {
        el.setAttribute('class', value)
    }
}
setAttribute.setClass.forEach = function (el, token) {
    console.log(token);
    el.classList.add(token)
}

setAttribute.setData = function (el, key, value) {
    Object.keys(value).forEach(key => {
        setAttribute.setData.forEach(el, key, value[key])
    });
}
setAttribute.setData.forEach = function (el, key, value) {
    el.dataset[camelize(key)] = typeof value == "object" ? JSON.stringify(value) : value;
}

setAttribute.setStyle = function (el, key, value) {
    Object.keys(value).forEach(key => {
        let v = value[key]
        if (v instanceof Promise) {
            return v.then(v => setAttribute.setStyle.setProperty(el, key, v))
        } else {
            return setAttribute.setStyle.setProperty(el, key, v)
        }
    });
}
setAttribute.setStyle.setProperty = function (el, key, value) {
    if (value === null) {
        el.style.removeProperty(key)
    } else {
        el.style.setProperty(key, value)
    }
}

setAttribute.setListener = function (el, key, value) {
    el[key] = value;
}

setAttribute.setBoolean = function (el, key, value) {
    key = BOOLEAN_ATTRIBUTES.find(a => a.toUpperCase() == key.toUpperCase())
    el[key] = value !== false;
}

setAttribute.setAttribute = function (el, key, value) {
    el.setAttribute(key, value)
}