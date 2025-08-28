import { camelize } from './support.js';
import { BOOLEAN_ATTRIBUTES, HTML_ATTRIBUTES, SVG_ATTRIBUTES } from './constants.js';
import content from './content.js';

/**
 * Assigns attribute for an `Element`.
 * 
 * @param {Element} el - An Element to assign attributes to
 * @param {string} key - Used to set attribute on the element. All HTMLElement attributes are accepted including additional options:
 * - `content`: The value of the key `content` is passed into dolla's append method. Reference the `append()` documentation for more details about possible content values.
 * - `tag`: A String declaring the type of HTML tag, used as an alternative to the first parameter
 * @param {*} value - The value to set for the attribute
 * 
 * @example
 * setAttribute(el, 'class', new Promise(r => r('text-bold')))
 */

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
        Object.keys(value).forEach(key => {
            setAttribute.setData(el, key, value[key])
        })
    } else if (key == "style" && typeof value == 'object') {
        Object.keys(value).forEach(key => {
            setAttribute.setStyle(el, key, value[key])
        })
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
            setAttribute.addClass(el, c)
        }
    } else if (value != null) {
        el.setAttribute('class', value)
    }
}

setAttribute.addClass = function (el, token) {
    token.split(" ").forEach(c => el.classList.add(c))
}

setAttribute.setData = function (el, key, value) {
    el.dataset[camelize(key)] = typeof value == "object" ? JSON.stringify(value) : value;
}

setAttribute.setStyle = function (el, key, value) {
    if (value instanceof Promise) {
        value.then(v => setAttribute.setStyle(el, key, v))
    } else if (value === null) {
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