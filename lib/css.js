/**
 * Syntax sugar for `getComputedStyle`
 * 
 * @param {Element} element - An Element
 * @param {string} rule - A String of a valid CSS rule
 * @returns {string} String representation of rule value
 * 
 * @example
 * css(el, 'width')
 * // => "800px"
 */
export default function css (el, rule) {
    return getComputedStyle(el).getPropertyValue(rule);
}