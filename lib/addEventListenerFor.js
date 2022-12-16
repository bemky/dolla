/*

Description
----
The `addEventListenerFor()` method adds a listener callback for an `Element` that is triggered when a containing target matching the selector is fired. Sets `event.delegateTarget` to the element that matches to selector, while target remains as element that fired the event.

Syntax
----
    addEventListenerFor (element, selector, type, listener, options)

Params
----
### `element`
An `Element` to add the event listener to

### `selector`
A valid CSS selector `string`

### `type`
A case-sensitive `string` representing the event type to listen for

### `listener`
An `Object` with a `handleEvent()` method or a `function`. Receives an `Event` as the param. Event has attribute `delegateTarget` added that is the element that matches the selector.

### `options` #optional
An `Object` with options for `addEventListener`
    

Return Value
----
`undefined`

Usage
----
    addEventListenerFor(el, 'checkbox', 'change', e => {
        console.log(e.delegateTarget.value)
    }, {once: true})
*/
export default function addEventListenerFor (element, selector, type, listener, options) {
    element.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            e.delegateTarget = e.target
            listener(e)
        } else if (e.target.closest(selector)) {
            e.delegateTarget = e.target.closest(selector)
            listener(e)
        }
    }, options)
}