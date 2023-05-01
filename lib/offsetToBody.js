/*

Description
----
This method returns an element's bounding `DOMRect` in relation to the rootNode (typically `document.body`)

Syntax
----
    offsetToBody(element)

Arguments
----
### `element`
An `Element` or `HTMLCollection`

Return Value
----
`DOMRect`
*/

import getBoundingClientRect from './getBoundingClientRect.js';
export default function offsetToBody (...el) {
    const rect = getBoundingClientRect(...el)
    rect.x = rect.x - window.scrollX
    rext.y = rect.y - window.scrollY
    return rect
}