/*

Description
----
This method returns a HTMLElement with an event listener

Syntax
----
    listenerElement([tagName], [attributes], listenerType, listenerCallback)

Arguments
----
### `tagName` #optional
A `String` for html element

### `attributes` #optional
An `Object` of attributes for dolla's [`createElement`](#createElement)

### `listenerType`
A `String` representing the event type to listen to

### `listenerCallback`
A function that receives an `Event` as a parameter

Return Value
----
`Element`

Example
----
    listenerElement('button', {
        class: 'btn',
        content: 'Confirm'
    }, 'click', e => {
        console.log(e)
    })

    listenerElement({
        class: 'btn',
        content: 'Confirm'
    }, e => {
        console.log(e)
    })
*/
import createElement from './createElement';

export default function listenerElement (...args) {
    let callback = args.pop()
    let listener = args.pop()
    if (typeof listener != 'string' && !Array.isArray(listener)) {
        args = args.concat(listener)
        listener = 'click'
    }
    if (typeof args[0] != 'string') {
        args.unshift('button')
    }
    const el = createElement(...args)
    if (!Array.isArray(listener)) listener = [listener]
    listener.forEach(listener => el.addEventListener(listener, callback))
    return el
}