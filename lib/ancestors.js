/**
 * This method traverses the element and it's parents returning all ancestor elements until the selector is matched.
 * 
 * @param {Element} element - An Element to add the event listener to
 * @param {string} [selector] - A valid CSS selector string
 * @returns {Array<Element>} An Array of Element ordered by closest first
 * 
 * @example
 * ancestors(el, '.container')
 */

export default function ancestors (el, selector) {
    if (selector && el.parentElement.matches(selector)) {
        return [el.parentElement]
    } else if (el.parentElement && el.parentElement.parentElement) {
        return [el.parentElement].concat(ancestors(el.parentElement, selector))
    } else if (el.parentElement) {
        return [el.parentElement]
    } else {
        return []
    }
}