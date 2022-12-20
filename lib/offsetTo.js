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
An `Element`

### `target`
An `Element`

Return Value
----
`Object {top, left, right, bottom}`
*/

import getBoundingClientRect from './getBoundingClientRect';
export default function offsetTo(el, target) {
    const elRect = getBoundingClientRect(el);
    const targetRect = target.getBoundingClientRect();
    
    return {
        top: elRect.top - targetRect.top,
        left: elRect.left - targetRect.left,
        right: elRect.right - targetRect.left,
        bottom: elRect.bottom - targetRect.top
    };
}