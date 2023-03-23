/*

Description
----
This method replaces an element's content with new content

Syntax
----
    remove(element, ...nodes)

Arguments
----
### `element`
An `Element`

### `nodes`
A `Element`, `NodeList`, `HTMLCollection`, `Array`, `Promise`, `String` of text or html, `Object` passed to dolla's `createElement`. Checkout `append` for more details about what content can be used

Return Value
----
`undefined`

Example
----
    replaceContents(el, anotherElement.children)
    replaceContents(el, {
        tag: 'button',
        class: 'btn'
    })

*/

import remove from './remove.js';
import append from './append.js';

export default function replaceContents (el, ...nodes) {
    remove(el.childNodes);
    append(el, nodes);
}