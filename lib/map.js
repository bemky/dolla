/**
 * This method maps over elements similar to Array.prototype.map
 * 
 * @param {Array|HTMLCollection|NodeList} elements - An Array, HTMLCollection, or NodeList
 * @param {Function} iteratee - A Function that receives each item in elements as an argument, the return of which is set as the index of the return array
 * @returns {Array} Array
 * 
 * @example
 * map(element.children, el => el.offsetHeight)
 * map(element.childNodes, el => el.offsetHeight)
 * map([
 *     el1,
 *     el2,
 *     el3
 * ], el => el.offsetHeight)
 */

export default function map (elements, iteratee){
    var results = [];
    Array.from(elements).forEach((el, i) => {
      results.push(iteratee(el, i))
    })
    return results;
}