import content from './content.js';

/**
 * Mimics the functionality of Node.prototype.cloneNode, but calls each element's cloneNode, which allows developer to extend cloneNode for Custom Elements
 * 
 * @param {Node} node - A Node
 * @param {boolean} deep - A Boolean
 * @returns {Node} Node
 */

export default function cloneNode (el, deep) {
    const clone = el.cloneNode()
    if (deep) {
        content(clone, Array.from(el.childNodes).map(n => cloneNode(n, true)))
    }
    return clone
}