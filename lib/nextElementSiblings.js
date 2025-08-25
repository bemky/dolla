/**
 * This method returns an element's following siblings.
 * 
 * @param {Element} element - An Element
 * @param {Function} [filter] - A method that receives the next sibling as a parameter, and returns true or false
 * @returns {Array} Array of sibling elements
 * 
 * @example
 * nextElementSiblings(el, sibling => {
 *     return sibling.tagName == "checkbox"
 * })
 */

export default function nextElementSiblings (el, filter) {
  const siblings = [];
  while(el = el.nextElementSibling) {
    if (!filter || filter(el)) {
      siblings.push(el)
    }
  }
  return siblings
}