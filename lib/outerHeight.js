/**
 * This method returns the height of an element including `margin`
 * 
 * @param {Element} element - An Element
 * @returns {number} Integer
 */
export default function outerHeight (el) {
    var style = getComputedStyle(el);
    return el.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
}