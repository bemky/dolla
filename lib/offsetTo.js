import offsetToBody from './offsetToBody.js';

/**
 * This method returns an elements position `{top, left}` in relation to a target element
 * 
 * @param {Element|HTMLCollection} element - An Element or HTMLCollection
 * @param {Element} target - An Element
 * @returns {DOMRect} DOMRect
 */
export default function offsetTo(el, target) {
    const elRect = offsetToBody(...(Array.isArray(el) ? el : [el]));
    const targetRect = offsetToBody(target);
    
    elRect.x = elRect.x - targetRect.x
    elRect.y = elRect.y - targetRect.y
    
    return elRect;
}