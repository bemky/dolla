/*

Description
----
Mimics the functionality of Node.prototype.cloneNode, but calls each element's cloneNode, which allows developer to extend cloneNode for Custom Elements

Syntax
----
    cloneNode(el, true)

Arguments
----
### `node`
A `Node`

### `deep`
A `Boolean`

Return Value
----
`Node`

*/
import content from './content.js';

export default function cloneNode (el, deep) {
    const clone = el.cloneNode()
    if (deep) {
        content(clone, Array.from(el.childNodes).map(n => cloneNode(n, true)))
    }
    return clone
}