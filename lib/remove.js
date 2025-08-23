/**
 * This method removes an element from the document/fragment to which it is attached
 * 
 * @param {Element|NodeList|Array|HTMLCollection} element - An Element, NodeList, Array, or HTMLCollection to remove
 * @returns {Element|NodeList|Array|HTMLCollection} The removed element(s)
 */
export default function remove (el) {
    if (el instanceof NodeList || el instanceof Array || el instanceof HTMLCollection) {
        el = Array.from(el)
        el.forEach(remove);
    } else {
        if (el.remove) {
            el.remove()
        } else if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }
    return el
}