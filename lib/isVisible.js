/*

Description
----
This method returns if an element is attached to the DOM

Syntax
----
    isVisible(element)

Arguments
----
### `element`
An `Element`

Return Value
----
`Boolean`
*/
export default function isVisible (el) {
    return el.offsetParent !== null;
}