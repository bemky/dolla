/*

Description
----
This method returns the width of an element including `margin`

Syntax
----
    outerWidth(element)

Arguments
----
### `element`
An `Element`

Return Value
----
`Integer`
*/
export default function outerWidth (el) {
    var style = getComputedStyle(el);
    return el.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
}