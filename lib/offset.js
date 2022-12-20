/*

Description
----
This method returns an elements position `{top, left}` in relation to it's `offsetParent`

Syntax
----
    offset(element)

Arguments
----
### `element`
An `Element`

Return Value
----
`Object {top, left}`
*/

export default function offset (el) {
    const parent = el.offsetParent
    const rect = el.getBoundingClientRect();
    if (parent) {
        const parentRect = el.offsetParent.getBoundingClientRect();
        return { 
          top: rect.top + el.offsetParent.scrollTop - parentRect.top,
          left: rect.left + el.offsetParent.scrollLeft - parentRect.left
        }
    } else {
        return { 
          top: rect.top,
          left: rect.left
        }
    }
}