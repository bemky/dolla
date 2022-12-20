/*

Description
----
This method appends an element after an anchor

Syntax
----
    insertAfter(anchor, element)

Arguments
----
### `anchor`
An `Element`

### `element`
An `Element`, `NodeList`, `HTMLCollection`, `Array`

Return Value
----
`Integer`

Example
----
    insertAfter(document.querySelector('#anchor'), document.createElement('button'))
    insertAfter(document.querySelector('#anchor'), document.querySelector('#container').children)
    insertAfter(document.querySelector('#anchor'), document.querySelector('#container').childNodes)
    insertAfter(document.querySelector('#anchor'), [
        document.createElement('label'),
        document.createElement('button')
    ])
*/
export default function insertAfter(anchor, el) {
    if (Array.isArray(el) || el instanceof NodeList || el instanceof HTMLCollection) {
        const els = Array.from(el)
        while (els.length > 0) {
            anchor = insertAfter(anchor, els.shift());
        }
        return anchor
    } else if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
        return insertAfter(anchor[anchor.length - 1], el);
    } else if (anchor.parentNode) {
        if (!(el instanceof Node)) {
            el = new Text(el);
        }
        anchor.parentNode.insertBefore(el, anchor.nextSibling);
        return el
    } else {
        throw('argument of insertAfter unsupported')
    }
}