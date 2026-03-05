import toNodes from './toNodes.js';

/**
 * Appends content to an Element. Converts content to nodes via {@link toNodes}.
 *
 * @param {Element} el - An Element to append content to
 * @param {Element|NodeList|HTMLCollection|Array|Promise|string|Object} content - Content to append, see {@link toNodes} for supported types
 * @param {boolean} [escape] - A Boolean directing method to escape or not escape content that is a string
 * @param {*} [context] - The value to be passed as the this parameter if content is a method
 * @param {string} [method="append"] - A String stating which method of Element instance to use to add content
 * @returns {undefined}
 */

export default function append(el, content, escape, context, method) {
    if (!method) method = 'append'
    if (escape instanceof Element) {
        let contents = Array.from(arguments).slice(1).filter(x => x instanceof Element);
        el[method](...contents);
    } else {
        let nodes = toNodes(content, escape, context, el.namespaceURI)
        if (nodes.length) el[method](...nodes)
    }
}
