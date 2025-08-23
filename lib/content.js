import append from './append.js';

/**
 * This method replaces the content of an element with new content.
 * 
 * @param {Element} element - An Element
 * @param {Element|NodeList|HTMLCollection|Array|Promise|string|Object} content - A Element, NodeList, HTMLCollection, Array, Promise, String of text or html, Object passed to dolla's createElement
 * @returns {undefined}
 */

export default function content (el, content) {
    el.innerHTML = '';
    return append(el, content)
}