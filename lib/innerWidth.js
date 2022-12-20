/*

Description
----
This method returns an element's width including `padding`, which is excluded from `el.offsetWidth`.

Syntax
----
    innerWidth(element)

Arguments
----
### `element`
An `Element`


Return Value
----
`Integer`

*/
export default function innerWidth (el) {
    var style = getComputedStyle(el);
    return el.offsetWidth - parseInt(style.paddingLeft) - parseInt(style.paddingRight);
}