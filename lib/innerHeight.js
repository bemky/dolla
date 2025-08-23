/**
 * This method returns an element's height including `padding`, which is excluded from `el.offsetHeight`.
 * 
 * @param {Element} element - An Element
 * @returns {number} Integer
 */
export default function innerHeight (el) {
    var style = getComputedStyle(el);
    return el.offsetHeight - parseInt(style.paddingTop) - parseInt(style.paddingBottom);
}