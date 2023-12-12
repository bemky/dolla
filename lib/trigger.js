/*

Description
----
This method calls an element's `dispatchEvent` with a custom event.

Syntax
----
    trigger(element, eventName)

Arguments
----
### `element`
An `Element`

### `eventName`
A `String` representing the event type

### `options`
Object passed to [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) constructor. Defaults `target`, `bubbles`, `cancelable`


Return Value
----
`false` if event is cancelable, and at least one of the event handlers which received event called `Event.preventDefault()`. Otherwise `true`.

Example
----
    el.addEventListener('attachedToDOM', e => el.style.background = 'green')
    trigger(el, 'attachedToDOM')
*/
export default function trigger(el, eventName, options) {
    options = Object.assign({
        bubbles: true,
        cancelable: true
    }, options)
    return el.dispatchEvent(new CustomEvent(eventName, options));
}