import append from './append.js';

/**
 * This method is the same as `append`, but inserts content at the start of an elements children.
 * 
 * @param {Element} element - An Element to add the event listener to
 * @param {Element|NodeList|HTMLCollection|Array|Promise|string|Object} content - A Element, NodeList, HTMLCollection, Array, Promise, String of text or html, Object passed to dolla's createElement
 * @param {boolean} [escape] - A Boolean directing method to escape or not escape content that is a string
 * @param {*} [context] - The value to be passed as the this parameter if content is a method
 * @returns {undefined}
 * 
 * @example
 * prepend(el, el2)
 * prepend(el, [el2, el3, el4])
 * prepend(el, el2.children)
 * prepend(el, el2.childNodes)
 * prepend(el, new Promise(resolve => {
 *     records.load().then(records => {
 *         resolve(records.map(record => {
 *             template(record)
 *         }))
 *     })
 * }))
 * prepend(el, {
 *     class: 'label',
 *     content: "Hello World"
 * })
 * prepend(el, "<span>Hello World</span>")
 */
export default function prepend (el, item, escape, context) {
    return append(el, item, escape, context, 'prepend')
}