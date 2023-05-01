/*

Description
----
This method returns an element's `DOMRect` in relation to it's `offsetParent`

Syntax
----
    offset(element)

Arguments
----
### `element`
An `Element` or `HTMLCollection`

Return Value
----
`DOMRect`
*/

import offsetTo from './offsetTo.js';

export default function offset (el) {
    const parent = el.offsetParent
    const rect = el.getBoundingClientRect();
    if (parent) {
        return offsetTo(el, el.offsetParent);
    } else {
        return el.getBoundingClientRect()
    }
}