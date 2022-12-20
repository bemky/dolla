/*

Description
----
This method returns an element's height including `padding`, which is excluded from `el.offsetHeigh`.

Syntax
----
    innerHeight(element)

Arguments
----
### `element`
An `Element`


Return Value
----
`Integer`

*/
export default function innerHeight (el) {
    var style = getComputedStyle(el);
    return el.offsetHeight - parseInt(style.paddingTop) - parseInt(style.paddingBottom);
}