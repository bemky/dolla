/**
 * This method returns an element's previous siblings.
 * 
 * @param {Element} element - An Element
 * @param {Function} [filter] - A method that receives the previous sibling as a parameter, and returns true or false
 * @returns {Array} Array of previous sibling elements
 * 
 * @example
 * previousElementSiblings(el, sibling => {
 *     return sibling.tagName == "checkbox"
 * })
 */
export default function previousElementSiblings (el, filter) {
  const siblings = [];
  while(el = el.previousElementSibling) {
    if(!filter || filter(el)) {
      siblings.push(el)
    }
  }
  return siblings.reverse()
}