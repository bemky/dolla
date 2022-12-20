/*

Description
----
This method is a same as [`append`](#append), but inserts content at the start of an elements children.

Syntax
----
    prepend (element, content)
    prepend (element, content, escape)
    prepend (element, content, context)
    prepend (element, content, method)
    prepend (element, content, escape, context, method)

Arguments
----
### `element`
An `Element` to add the event listener to

### `content`
A `Element`, `NodeList`, `HTMLCollection`, `Array`, `Promise`, `String` of text or html, `Object` passed to dolla's `createElement`.

### `escape` #optional
A `Boolean` directing method to escape or not escape content that is a string

### `context` #optional
The value to be passed as the `this` parameter if content is a method

### `method` #optional
A `String` stating which method of `Element` instance to use to add content. Default is `"append"`
    

Return Value
----
`undefined`

Example
----
    prepend(el, el2)
    prepend(el, [el2, el3, el4])
    prepend(el, el2.children)
    prepend(el, el2.childNodes)
    prepend(el, new Promise(resolve => {
        records.load().then(records => {
            resolve(records.map(record => {
                template(record)
            }))
        })
    }))
    prepend(el, {
        class: 'label',
        content: "Hello World"
    })
    prepend(el, "<span>Hello World</span>")
*/
import append from './append';

export default function prepend (el, item, escape, context) {
    return append(el, item, escape, context, 'prepend')
}