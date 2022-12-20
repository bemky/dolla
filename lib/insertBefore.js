/*

Description
----
This method appends an element after an anchor

Syntax
----
    insertBefore(anchor, element)

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
    insertBefore(document.querySelector('#anchor'), document.createElement('button'))
    insertBefore(document.querySelector('#anchor'), document.querySelector('#container').children)
    insertBefore(document.querySelector('#anchor'), document.querySelector('#container').childNodes)
    insertBefore(document.querySelector('#anchor'), [
        document.createElement('label'),
        document.createElement('button')
    ])
*/
export default function insertBefore(anchor, el) {
    if (Array.isArray(el) || el instanceof NodeList || el instanceof HTMLCollection) {
        const els = Array.from(el)
        while (els.length > 0) {
            anchor = insertBefore(anchor, els.pop());
        }
        return anchor
    } else if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
        return insertBefore(anchor[0], el)
    }  else if (anchor.parentNode) {
        if (!(el instanceof Node)) {
            el = new Text(el);
        }
        anchor.parentNode.insertBefore(el, anchor);
        return el
    } else {
        throw('argument of insertBefore unsupported')
    }
}