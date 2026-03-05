import createElement from './createElement.js';

/**
 * Converts content of various types into an Array of DOM nodes.
 *
 * @param {Element|NodeList|HTMLCollection|Array|Promise|Function|Object|string} content - Content to convert
 * @param {boolean} [escape] - When true, do not parse strings as HTML. If not a boolean, treated as context.
 * @param {*} [context] - The value to be passed as `this` if content is a function
 * @param {string} [namespace] - A namespace URI passed to createElement for object content
 * @returns {Array} Array of DOM nodes
 *
 * @example
 * toNodes(el)
 * toNodes([el, el2, el3])
 * toNodes(el.children)
 * toNodes(el.childNodes)
 * toNodes(new Promise(resolve => {
 *     records.load().then(records => {
 *         resolve(records.map(record => {
 *             template(record)
 *         }))
 *     })
 * }))
 * toNodes({
 *     class: 'label',
 *     content: "Hello World"
 * })
 * toNodes("<span>Hello World</span>")
 * toNodes("<b>bold</b>", true)
 * toNodes(() => "<span>test</span>")
 */
export default function toNodes(content, escape, context, namespace) {
    if (typeof escape != "boolean") {
        if (!namespace) namespace = context;
        context = escape;
        escape = undefined;
    }

    if (content === null || content === undefined) {
        return []
    } else if (Array.isArray(content) || content instanceof NodeList || content instanceof HTMLCollection) {
        return Array.from(content).flatMap(i => toNodes(i, escape, context, namespace))
    } else if (content instanceof Element || content instanceof Node) {
        return [content]
    } else if (content instanceof Promise || content.then) {
        return [toNodes.fromPromise(content, escape, context, namespace)]
    } else if (typeof content == "function") {
        return toNodes(content.bind(context)(), escape, context, namespace)
    } else if (typeof content == "object") {
        const result = toNodes.fromObject(content, namespace)
        return Array.isArray(result) ? result : [result]
    } else if (!escape) {
        return toNodes.fromHTML(content)
    } else {
        return [content]
    }
}

toNodes.fromObject = function(obj, namespace) {
    return createElement(obj, namespace)
}

toNodes.fromPromise = function(p, escape, context, namespace) {
    const placeholder = document.createElement('span');
    p.then(resolvedItem => {
        if (placeholder.parentNode) {
            const nodes = toNodes(resolvedItem, escape, context, namespace)
            placeholder.replaceWith(...nodes)
        }
    });
    return placeholder
}

toNodes.fromHTML = function(html) {
    const container = document.createElement('template');
    container.innerHTML = html;
    return Array.from(container.content.childNodes)
}
