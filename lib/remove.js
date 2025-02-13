/*

Description
----
This method removes an element from the document/fragment to which it is attached

Syntax
----
    remove(element)

Arguments
----
### `element`
An `Element`

Return Value
----
`Element`

*/
export default function remove (el) {
    if (el instanceof NodeList || el instanceof Array || el instanceof HTMLCollection) {
        el = Array.from(el)
        el.forEach(remove);
    } else {
        if (el.remove) {
            el.remove()
        } else if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }
    return el
}