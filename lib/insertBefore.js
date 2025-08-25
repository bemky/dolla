/**
 * This method appends an element before an anchor
 * 
 * @param {Element|Array|NodeList|HTMLCollection} anchor - An Element, Array, NodeList, or HTMLCollection
 * @param {Element|NodeList|HTMLCollection|Array} element - An Element, NodeList, HTMLCollection, or Array
 * @returns {Element|number} The inserted element or Integer
 * 
 * @example
 * insertBefore(document.querySelector('#anchor'), document.createElement('button'))
 * insertBefore(document.querySelector('#anchor'), document.querySelector('#container').children)
 * insertBefore(document.querySelector('#anchor'), document.querySelector('#container').childNodes)
 * insertBefore(document.querySelector('#anchor'), [
 *     document.createElement('label'),
 *     document.createElement('button')
 * ])
 */
export default function insertBefore(anchor, el) {
    if (Array.isArray(el) || el instanceof NodeList || el instanceof HTMLCollection) {
        const els = Array.from(el)
        while (els.length > 0) {
            anchor = insertBefore(anchor, els.pop());
        }
        return anchor
    } else if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
        return insertBefore(anchor[0], el)
    }  else if (anchor.parentNode) {
        if (!(el instanceof Node)) {
            el = new Text(el);
        }
        anchor.parentNode.insertBefore(el, anchor);
        return el
    } else {
        throw('argument of insertBefore unsupported')
    }
}