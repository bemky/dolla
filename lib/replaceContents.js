import remove from './remove.js';
import append from './append.js';

/**
 * This method replaces an element's content with new content
 * 
 * @param {Element} element - An Element
 * @param {...(Element|NodeList|HTMLCollection|Array|Promise|string|Object)} nodes - A Element, NodeList, HTMLCollection, Array, Promise, String of text or html, Object passed to dolla's createElement. Checkout append for more details about what content can be used
 * @returns {undefined}
 * 
 * @example
 * replaceContents(el, anotherElement.children)
 * replaceContents(el, {
 *     tag: 'button',
 *     class: 'btn'
 * })
 */

export default function replaceContents (el, ...nodes) {
    remove(el.childNodes);
    append(el, nodes);
}