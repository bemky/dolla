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
An `Element`

Return Value
----
`Object {top, left}`
*/
export default function offsetToViewport (el) {
    var rect = el.getBoundingClientRect();
    return { 
      top: rect.top,
      left: rect.left
    }
}