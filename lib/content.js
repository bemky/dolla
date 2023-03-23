/*

Description
----
This method replaces the content of an element with new content.

Syntax
----
        content(element, content)

Arguments
----
### `element`
An `Element`

### `content`
A `Element`, `NodeList`, `HTMLCollection`, `Array`, `Promise`, `String` of text or html, `Object` passed to dolla's [`createElement`](/#createElement).

Return Value
----
`undefined`
*/
import append from './append.js';

export default function content (el, content) {
    el.innerHTML = '';
    return append(el, content)
}