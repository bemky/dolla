/**
 * This method returns the width of an element including `margin`
 * 
 * @param {Element} element - An Element
 * @returns {number} Integer
 */
export default function outerWidth (el) {
    var style = getComputedStyle(el);
    return el.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
}