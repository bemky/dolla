/*

Description
----
This method gets the bounding client rectangle of a group of elements. Similar to `Element.getBoundingClientRect()`, but for n elements.

Syntax
----
    getBoundingClientRect(...elements)

Arguments
----
### `elements`
An `Array` of `Elements`


Return Value
----
`DOMRect`

*/
export default function getBoundingClientRect(...elements) {
    if (Array.isArray(elements[0]) && elements.length == 1) {
        elements = elements[0]
    }
    let rect = elements[0].getBoundingClientRect()
    rect = {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom
    }
    elements.slice(1).forEach(el => {
        const thisRect = el.getBoundingClientRect()
        if (thisRect.left < rect.left) rect.left = thisRect.left
        if (thisRect.top < rect.top) rect.top = thisRect.top
        if (thisRect.bottom > rect.bottom) rect.bottom = thisRect.bottom
        if (thisRect.right > rect.right) rect.right = thisRect.right
    })
    
    return new DOMRect(rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top)
}