/**
 * This method filters a NodeList with a predicate.
 * 
 * @param {Array|NodeList} nodes - An Array or NodeList
 * @param {Function} predicate - A function where parameter is each item or node of nodes. The function should return truthy to include
 * @returns {Array} Array
 * 
 * @example
 * filter(el.childNodes, n => n.selected)
 */
export default function filter(nodes, predicate){
    const filteredNodes = [];
    nodes.forEach(node => {
      if (predicate(node)) filteredNodes.push(node);
    })
    return filteredNodes;
}