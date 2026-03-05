import append from './append.js';

/**
 * Same as {@link append}, but inserts content at the start of an element's children.
 * See {@link toNodes} for supported content types.
 *
 * @param {Element} el - An Element to prepend content to
 * @param {Element|NodeList|HTMLCollection|Array|Promise|string|Object} content - Content to prepend
 * @param {boolean} [escape] - A Boolean directing method to escape or not escape content that is a string
 * @param {*} [context] - The value to be passed as the this parameter if content is a method
 * @returns {undefined}
 */
export default function prepend (el, item, escape, context) {
    return append(el, item, escape, context, 'prepend')
}
