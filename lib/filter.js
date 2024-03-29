/*

Description
----
This method filters a `NodeList` with a predicate.

Syntax
----
    filter(nodes, predicate)

Arguments
----
### `nodes`
An `Array` or `NodeList`

### `predicate`
A `function` where parameter is each item or node of nodes. The function should return truthy to include.

Return Value
----
`Array`

Example
----
    filter(el.childNodes, n => n.selected)
*/
export default function filter(nodes, predicate){
    const filteredNodes = [];
    nodes.forEach(node => {
      if (predicate(node)) filteredNodes.push(node);
    })
    return filteredNodes;
}