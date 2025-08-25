/**
 * This method returns if an element is visible (attached to the DOM)
 * 
 * @param {Element} element - An Element
 * @returns {boolean} Boolean
 */
export default function isVisible (el) {
    return el.offsetParent !== null;
}