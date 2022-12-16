/*

Description
----
The `ancestors()` method traverses the element and it's parents returning all ancestor elements until the selector is matched.

Syntax
----
    ancestor (element, selector)
    ancestor (element)

Params
----
#### `element`
An `Element` to add the event listener to

#### `selector`
A valid CSS selector `string`
    

Return Value
----
An `Array` of `Element` ordered by closest first.

Usage
----
    ancestors(el, '.container')
*/

export default function ancestors (el, selector) {
    if (selector && el.parentElement.matches(selector)) {
        return [el.parentElement]
    } else if (el.parentElement && el.parentElement.parentElement) {
        return [el.parentElement].concat(ancestors(el.parentElement, selector))
    } else if (el.parentElement) {
        return [el.parentElement]
    } else {
        return []
    }
}