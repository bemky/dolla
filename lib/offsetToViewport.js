import getBoundingClientRect from './getBoundingClientRect.js';

/**
 * This method returns an elements position `{top, left}` in relation to the viewport
 * 
 * @param {...Element|HTMLCollection} element - An Element or HTMLCollection
 * @returns {DOMRect} DOMRect
 */
export default function offsetToViewport (...el) {
    return getBoundingClientRect(...el);
}