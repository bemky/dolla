/*

Description
----
This method returns an elements position `{top, left}` in relation to the viewport

Syntax
----
    offsetToViewport(element)

Arguments
----
### `element`
An `Element` or `HTMLCollection`

Return Value
----
`DOMRect`
*/
import getBoundingClientRect from './getBoundingClientRect.js';
export default function offsetToViewport (...el) {
    return getBoundingClientRect(...el);
}