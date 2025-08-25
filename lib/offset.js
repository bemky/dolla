import offsetTo from './offsetTo.js';

/**
 * This method returns an element's `DOMRect` in relation to its `offsetParent`
 * 
 * @param {Element|HTMLCollection} element - An Element or HTMLCollection
 * @returns {DOMRect} DOMRect
 */

export default function offset (el) {
    const parent = el.offsetParent
    const rect = el.getBoundingClientRect();
    if (parent) {
        return offsetTo(el, el.offsetParent);
    } else {
        return el.getBoundingClientRect()
    }
}