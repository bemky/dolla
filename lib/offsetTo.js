/*

Description
----
This method returns an elements position `{top, left}` in relation to a target element

Syntax
----
    offsetTo(element, target)

Arguments
----
### `element`
An `Element` or `HTMLCollection`

### `target`
An `Element`

Return Value
----
`DOMRect`
*/

import offsetToBody from './offsetToBody.js';
export default function offsetTo(el, target) {
    const elRect = offsetToBody(el);
    const targetRect = offsetToBody(target);
    
    elRect.x = elRect.x - targetRect.x
    elRect.y = elRect.y - targetRect.y
    
    return elRect;
}