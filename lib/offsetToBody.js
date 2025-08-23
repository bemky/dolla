import getBoundingClientRect from './getBoundingClientRect.js';

/**
 * This method returns an element's bounding `DOMRect` in relation to the rootNode (typically `document.body`)
 * 
 * @param {...Element|HTMLCollection} el - An Element or HTMLCollection
 * @returns {DOMRect} DOMRect
 */
export default function offsetToBody (...el) {
    const rect = getBoundingClientRect(...el)
    rect.x = rect.x - window.scrollX
    rect.y = rect.y - window.scrollY
    return rect
}